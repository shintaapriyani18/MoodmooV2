import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Moodmoo",
  description: "Mood-boosting milk for non-coffee lovers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pink-50 text-gray-800 font-sans flex flex-col">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <Link href="/" className="text-2xl font-bold text-pink-600">Moodmoo</Link>
          <div className="space-x-4">
            <Link href="/about" className="hover:text-pink-500 transition">About</Link>
            <Link href="/products" className="hover:text-pink-500 transition">Products</Link>
            <Link href="/profile" className="hover:text-pink-500 transition">Profile</Link>
            <Link href="/contact" className="hover:text-pink-500 transition">Contact</Link>
          </div>
        </nav>

        <main className="p-6 max-w-4xl mx-auto flex-1">{children}</main>

        <footer className="bg-white text-center p-4 text-sm text-gray-500 shadow-inner">
          <p>&copy; {new Date().getFullYear()} Moodmoo. All rights reserved.</p>
          <p className="mt-1">
            Made with 💖 by <span className="text-pink-500 font-semibold">Moodmoo Team</span>
          </p>
        </footer>
      </body>
    </html>
  );
}