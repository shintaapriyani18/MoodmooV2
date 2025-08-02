"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);

  // Redirect kalau cart kosong
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = 10000; // Estimasi ongkir (Rp 10.000)
  const total = subtotal + shippingCost;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Checkout Data:", { ...formData, items, total });
    alert("Pesanan berhasil dikonfirmasi!");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= FORM ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detail Pengiriman */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Detail Pengiriman</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Nama Penerima</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-pink-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Nomor HP</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-pink-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Alamat Lengkap</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-pink-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Catatan (Opsional)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-pink-500"
                />
              </div>
            </form>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Metode Pembayaran</h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-pink-500"
            >
              <option value="cod">Bayar di Tempat (COD)</option>
              <option value="transfer">Transfer Bank</option>
            </select>
          </div>
        </div>

        {/* ================= RINGKASAN PESANAN ================= */}
        <div className="bg-gray-50 shadow-md rounded-lg p-6 sticky top-4 self-start">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="text-pink-600 font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.qty} pcs x Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold">
                  Rp {(item.price * item.qty).toLocaleString()}
                </p>
              </div>
            ))}

            {/* Subtotal & Ongkir */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Ongkir</span>
                <span>Rp {shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span className="text-pink-600">Rp {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tombol Konfirmasi */}
          <button
            onClick={() => handleSubmit()}
            className="w-full mt-6 bg-pink-500 text-white py-3 rounded hover:bg-pink-600 text-lg font-semibold"
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
