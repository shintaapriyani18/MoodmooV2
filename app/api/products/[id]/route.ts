import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Params) {
  const { name, price, desc } = await req.json();

  const updated = await prisma.product.update({
    where: { id: Number(params.id) },
    data: { name, price, desc },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
  const deleted = await prisma.product.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(deleted);
}
