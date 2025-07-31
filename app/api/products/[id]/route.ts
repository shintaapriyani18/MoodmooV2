import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const body = await req.json();
  const { name, price, desc } = body;

  const updated = await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      desc,
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/products/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const deleted = await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json(deleted);
}
