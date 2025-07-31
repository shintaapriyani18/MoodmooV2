import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const id = Number(params.id);

  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const id = Number(params.id);

  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const data = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const id = Number(params.id);

  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
