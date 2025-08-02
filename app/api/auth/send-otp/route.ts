import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// ✅ Paksa Node.js runtime karena nodemailer butuh TCP (Edge runtime tidak support)
export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // ✅ Validasi email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // ✅ Cari user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Generate OTP dan expiry (10 menit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    // ✅ Simpan OTP ke DB
    await prisma.otp.create({
      data: {
        code: otp,
        expiry,
        userId: user.id,
      },
    });

    // ✅ Konfigurasi transporter Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // ✅ Kirim email OTP
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Send OTP Error:", error);
    return NextResponse.json(
      {
        error: "Failed to send OTP",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
