'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from "next/navigation";
import ClientLayout from "@/components/ClientLayout";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/auth/signup") || pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/verify");

  if (hideLayout) {
    return <>{children}</>;
  }

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <ClientLayout>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          Moodmoo
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/about" className="hover:text-pink-500 transition">
            About
          </Link>
          <Link href="/products" className="hover:text-pink-500 transition">
            Products
          </Link>
          <Link href="/contact" className="hover:text-pink-500 transition">
            Contact
          </Link>

          {/* Hanya tampil jika user login dan rolenya admin */}
          {session?.user?.role === 'admin' && (
            <Link href="/user" className="hover:text-pink-500 transition">
              User
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="hover:text-pink-500 transition">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {status === 'authenticated' ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 rounded-none bg-transparent hover:bg-gray-100 transition duration-300">
                <span className="text-gray-800 text-sm">{session.user?.name}</span>
                <img
                  src="/avatar.jpg"
                  alt="profile"
                  className="w-6 h-6"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                  <div className="p-2 text-gray-800 flex items-center gap-2">
                    <img
                      src="/avatar.jpg"
                      alt="profile"
                      className="w-8 h-8"
                    />
                    <p className="font-semibold text-sm">{session.user?.name}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                      className="w-full text-center py-2 text-white bg-pink-500 hover:bg-pink-600 rounded-b-lg transition duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="hover:text-pink-500 transition">Sign In</Link>
          )}
        </div>
      </nav>

      <main className="p-6 max-w-4xl mx-auto flex-1">{children}</main>

      <footer className="bg-white text-center p-4 text-sm text-gray-500 shadow-inner">
        <p>&copy; {new Date().getFullYear()} Moodmoo. All rights reserved.</p>
        <p className="mt-1">
          Made with 💖 by{" "}
          <span className="text-pink-500 font-semibold">Moodmoo Team</span>
        </p>
      </footer>
    </ClientLayout>
  );
}
