import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // ⬅️ tambahkan role ke session.user
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    verifiedAt?: Date | null;
    role?: string; // ⬅️ tambahkan role ke user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // ⬅️ tambahkan role ke token
  }
}
