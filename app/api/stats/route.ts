import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();

    return NextResponse.json({
      totalUsers,
      totalProducts,
    });
  } catch (error) {
    return NextResponse.json({ message: "Gagal ambil data" }, { status: 500 });
  }
}
