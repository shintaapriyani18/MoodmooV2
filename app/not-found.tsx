"use client"

import Lottie from "lottie-react";
import milkAnim from "../public/pagenot.json";


export default function NotFound() {
  return (
    <section className="text-center mt-32">
      <p className="text-xl mt-2">Moo~ Halaman tidak ditemukan</p>
        <div className="max-w-sm mx-auto">
            <Lottie animationData={milkAnim} loop={true} />
        </div>
    </section>
  );
}