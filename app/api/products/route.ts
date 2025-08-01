import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// GET /api/products - List all products
export async function GET(_req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}


// POST /api/products - Create a new product
export async function POST(req: NextRequest) {
  const { name, price, desc } = await req.json();
  const product = await prisma.product.create({
    data: { name, price, desc },
  });
  return NextResponse.json(product);
}
