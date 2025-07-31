"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiPackage,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: number;
  desc: string;
};

type Stats = {
  totalUsers: number;
  totalProducts: number;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch product & stats
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productRes, statsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/stats"),
        ]);

        if (!productRes.ok || !statsRes.ok) {
          throw new Error("Gagal ambil data");
        }

        const productData = await productRes.json();
        const statsData = await statsRes.json();

        setProducts(productData);
        setStats(statsData);
      } catch (err) {
        console.error(err);
        setError("Gagal menampilkan data");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAll();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <FiPackage className="text-pink-600 text-2xl mr-4" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
              <p className="text-2xl font-bold">{stats?.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <FiUsers className="text-blue-600 text-2xl mr-4" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-bold">{stats?.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <FiDollarSign className="text-green-600 text-2xl mr-4" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
              <p className="text-2xl font-bold">Rp 7.560.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider w-1/3">
                  Product
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider w-1/3">
                  Price
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider w-1/3">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">{product.desc}</td>
                  {session?.user?.role === "admin" && (
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">{/* tombol admin nanti */}</div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
