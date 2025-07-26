import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // pastikan path authOptions sesuai
import { redirect } from "next/navigation";

import CartContent from "./CartContent"; // komponen client

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  return <CartContent />;
}
