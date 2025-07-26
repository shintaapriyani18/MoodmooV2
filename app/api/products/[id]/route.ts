import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const param = await params;  // ✅ Await params  
  const id = Number(param.id);

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const param = await params;
  const id = Number(param.id);

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const { name, price, desc } = await req.json();

  const updated = await prisma.product.update({
    where: { id },
    data: { name, price, desc },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const param = await params;
  const id = Number(param.id);

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const deleted = await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json(deleted);
}