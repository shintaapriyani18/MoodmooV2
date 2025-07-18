"use client";
import Lottie from "lottie-react";
import milkAnim from "../public/animation1.json";

export default function HomePage() {
  return (
    <section className="text-center">
      <h1 className="text-5xl font-bold text-pink-600 mb-4">Welcome to Moodmoo</h1>
      <p className="text-lg text-gray-700 mb-6">
        Susu enak, lucu, dan penuh mood! Untuk kamu yang gak suka ngopi!!
      </p>
      <div className="max-w-sm mx-auto">
        <Lottie animationData={milkAnim} loop={true} />
      </div>
    </section>
  );
}