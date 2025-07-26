"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiPackage, FiUsers, FiDollarSign, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("products");

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Data dummy
  const products = [
    { id: 1, name: "Moodmoo Strawberry", price: 25000, stock: 42, sales: 128 },
    { id: 2, name: "Moodmoo Chocolate", price: 27000, stock: 35, sales: 95 },
    { id: 3, name: "Moodmoo Vanilla", price: 23000, stock: 28, sales: 76 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards - Lebar penuh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiPackage className="text-pink-600 text-2xl mr-4" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiUsers className="text-blue-600 text-2xl mr-4" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiDollarSign className="text-green-600 text-2xl mr-4" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
              <p className="text-2xl font-bold">Rp 7.560.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table - Lebar penuh */}
      <div className="bg-white shadow rounded-lg overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
          {session?.user?.role === "admin" && (
            <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
              <FiPlus className="mr-2" />
              Add Product
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  PRODUCT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  PRICE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  STOCK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  SALES
                </th>
                {session?.user?.role === "admin" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    ACTIONS
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rp {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.sales}
                  </td>
                  {session?.user?.role === "admin" && (
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <FiEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <FiTrash2 />
                      </button>
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