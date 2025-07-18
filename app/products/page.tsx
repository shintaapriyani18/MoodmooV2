"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Products = {
  id: number;
  name: string;
  price: number;
  desc: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, desc }),
    });
    setShowAddModal(false);
    setName("");
    setPrice(0);
    setDesc("");
    fetchProducts();
  };

  const handleEdit = async () => {
    if (!editId) return;
    await fetch(`/api/products/${editId}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, desc }),
    });
    setShowEditModal(false);
    setEditId(null);
    setName("");
    setPrice(0);
    setDesc("");
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const openEditModal = (product: Products) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDesc(product.desc || "");
    setShowEditModal(true);
  };

  return (
    <section className="p-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Varian Moodmoo</h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-pink-500 text-white rounded"
      >
        + Add Product
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col items-center"
          >
            <div className="text-2xl font-bold text-pink-500 mb-2">{p.name}</div>
            <h2 className="text-xl font-semibold text-pink-500 mb-1">
              Rp {p.price.toLocaleString()}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-2">{p.desc}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(p)}
                className="text-green-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                href={`/products/${p.id}`}
                className="text-blue-500 hover:underline"
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          title="Add Product"
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          name={name}
          price={price}
          desc={desc}
          setName={setName}
          setPrice={setPrice}
          setDesc={setDesc}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Edit Product"
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
          name={name}
          price={price}
          desc={desc}
          setName={setName}
          setPrice={setPrice}
          setDesc={setDesc}
        />
      )}
    </section>
  );
}

// Modal Component
type ModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  name: string;
  price: number;
  desc: string;
  setName: (val: string) => void;
  setPrice: (val: number) => void;
  setDesc: (val: string) => void;
};

function Modal({
  title,
  onClose,
  onSave,
  name,
  price,
  desc,
  setName,
  setPrice,
  setDesc,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-1 w-full mb-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          placeholder="Price"
          className="border p-1 w-full mb-2"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="border p-1 w-full mb-2"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-2 py-1 rounded">
            Cancel
          </button>
          <button onClick={onSave} className="bg-pink-500 text-white px-2 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}