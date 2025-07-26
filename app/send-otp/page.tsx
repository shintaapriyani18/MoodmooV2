"use client";
import { useState } from "react";

export default function SendOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (res.ok) alert("Login success");
    else alert(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-3xl shadow-lg sm:p-6 md:p-8">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
          {step === 1 ? "Enter your email" : "Verify OTP"}
        </h2>

        {step === 1 && (
          <div className="space-y-6">
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
            <button
              type="button"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-3 transition disabled:opacity-50"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block mb-1 text-sm font-semibold text-gray-700"
              >
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-pink-500 focus:border-pink-500 transition"
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-3 transition disabled:opacity-50"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}