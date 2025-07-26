"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function Page() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setAlert({
        type: "success",
        message: "Register success, please check your email to verify your account",
        isShow: true,
      });
      setIsLoading(false);
      localStorage.setItem("pendingVerifyEmail", registerEmail);
      setTimeout(() => {
        router.push("/auth/verify");
      }, 1000);
    } else {
      setAlert({
        type: "error",
        message: data.error || "Register failed",
        isShow: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
          Create your Moodmoo account
        </h2>

        {alert.isShow && (
          <BaseAlert alert={{ type: alert.type, message: alert.message }} />
        )}

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-3 transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
            {isLoading && <LoaderSpinner />}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-pink-600 hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
