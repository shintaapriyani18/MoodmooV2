"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const router = useRouter();

  const verifyOtp = async () => {
    setIsLoading(true);
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      setAlert({
        type: "success",
        message: "Verification successful, you can now login",
        isShow: true,
      });
      setIsLoading(false);
      localStorage.removeItem("pendingVerifyEmail");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    } else {
      setAlert({
        type: "error",
        message: data.message || "Verification failed",
        isShow: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pendingVerifyEmail = localStorage.getItem("pendingVerifyEmail");
    setEmail(pendingVerifyEmail || "");
  }, []);

  const sendOtp = async () => {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-3xl shadow-lg sm:p-6 md:p-8">
        <form className="">
          <div className="mb-3">
            <h5 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
              Enter verification OTP
            </h5>
            <p className="text-center text-[14px] text-gray-500 mb-2">
              We&apos;ve sent a code to{" "}
              <span className="font-bold text-gray-700">{email}</span>
            </p>
            {alert.isShow && <BaseAlert alert={{ type: alert.type, message: alert.message }} />}
          </div>
          <div className="mb-6">
            <label htmlFor="otp" className="block mb-2 text-sm font-semibold text-gray-700">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            onClick={verifyOtp}
            type="button"
            disabled={isLoading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-3 transition disabled:opacity-50"
          >
            {isLoading ? "Loading" : "Verify"}
            {isLoading && <LoaderSpinner />}
          </button>

          <div className="text-sm font-medium text-gray-500 mt-4">
            Didn&apos;t receive the code?{" "}
            <button onClick={sendOtp} className="text-pink-600 hover:underline cursor-pointer">
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
