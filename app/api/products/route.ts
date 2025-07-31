import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(_req: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const { name, price, desc } = await req.json();
  const product = await prisma.product.create({ data: { name, price, desc } });
  return NextResponse.json(product);
}
