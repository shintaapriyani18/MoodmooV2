import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { name, price, desc } = await request.json();
  const products = await prisma.product.create({ data: { name, price, desc } });
  return NextResponse.json(products);
}

