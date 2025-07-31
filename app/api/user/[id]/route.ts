import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const id = String(params.id);

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const id = String(params.id);

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const { name, email, role, password } = await req.json();

  let updatedData: any = { name, email, role };

  if (password && password.trim() !== '') {
    const hashedPassword = await bcrypt.hash(password, 10); 
    updatedData.password = hashedPassword;
  }

  const updated = await prisma.user.update({
    where: { id },
    data: updatedData,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const id = String(params.id);

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const deleted = await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json(deleted);
}
