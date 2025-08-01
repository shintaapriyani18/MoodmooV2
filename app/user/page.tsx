"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user?.role) {
      toast.error("Unauthorized access");
      router.push("/");
      return;
    }

    // Hanya admin bisa akses
    if (session.user.role !== "admin") {
      toast.error("You are not authorized");
      router.push("/");
      return;
    }

    fetchUsers();
  }, [session, status]);

  const handleAdd = async () => {
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    });
    toast.success("User added successfully!");
    setShowAddModal(false);
    resetForm();
    fetchUsers();
  };

  const handleEdit = async () => {
    if (!editId) return;
    await fetch(`/api/user/${editId}`, {
      method: "PUT",
      body: JSON.stringify({ name, email, password, role }),
    });
    toast.success("User updated successfully!");
    setShowEditModal(false);
    resetForm();
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    toast.success("User deleted successfully!");
    fetchUsers();
  };

  const openEditModal = (user: User) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setEditId(null);
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <section className="p-4">
      <Toaster />
      <h1 className="text-4xl font-bold text-pink-600 mb-6">User Management</h1>

      {/* <button
        className="bg-pink-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddModal(true)}
      >
        + Add User
      </button> */}

      <div className="grid md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow">
            <div className="font-bold text-lg text-pink-600">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-sm mb-2">Role: {user.role}</div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => openEditModal(user)}
                className="text-green-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                href={`/user/${user.id}`}
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
        <UserModal
          title="Add User"
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          name={name}
          email={email}
          password={password}
          role={role}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setRole={setRole}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <UserModal
          title="Edit User"
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
          name={name}
          email={email}
          password={password}
          role={role}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setRole={setRole}
        />
      )}
    </section>
  );
}

type UserModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  name: string;
  email: string;
  password: string;
  role: string;
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setRole: (val: string) => void;
};

function UserModal({
  title,
  onClose,
  onSave,
  name,
  email,
  password,
  role,
  setName,
  setEmail,
  setPassword,
  setRole,
}: UserModalProps) {
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="border p-1 w-full mb-2"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="border p-1 w-full mb-2"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="border p-1 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-2 py-1 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
