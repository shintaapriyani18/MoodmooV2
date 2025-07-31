import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();
  const users = await prisma.user.create({ data: { name, email, password, role } });
  return NextResponse.json(users);
}

