import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Extracting id from the URL

  if (!id || isNaN(Number(id))) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Extracting id from the URL

  if (!id || isNaN(Number(id))) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const { name, price, desc } = await req.json();

  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, price, desc },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Extracting id from the URL

  if (!id || isNaN(Number(id))) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const deleted = await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deleted);
}
