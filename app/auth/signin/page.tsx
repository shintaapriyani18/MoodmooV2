"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";
import { getSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      console.log("Login error:", res.error);
      setAlert({
        type: "error",
        message: res.error,
        isShow: true,
      });
      setIsLoading(false);
    } else {
      // Ambil session setelah login berhasil
      const session = await getSession();

      if (session?.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-3xl shadow-lg sm:p-6 md:p-8">
        <form className="space-y-6" action="#">
          <h5 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
            Sign in to your account
          </h5>
          {alert.isShow && <BaseAlert alert={alert} />}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-3 transition disabled:opacity-50"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? "Loading" : "Login to your account"}
            {isLoading && <LoaderSpinner />}
          </button>
          <p className="text-sm text-center text-gray-600">
            Not registered?{" "}
            <Link href="/auth/signup" className="text-pink-600 hover:underline font-semibold">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
