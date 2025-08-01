export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let user = null;

  try {
    const res = await fetch(`${baseUrl}/api/user/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    user = await res.json();
  } catch (err) {
    console.error("Error fetching user:", err);
  }

  if (!user) {
    return (
      <section className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-500">User Not Found</h1>
        <a
          href="/user"
          className="mt-4 inline-block text-pink-500 hover:underline"
        >
          ← Back to Users
        </a>
      </section>
    );
  }

  return (
    <section className="text-center py-8">
      <div className="text-6xl mb-4">👤</div>
      <h1 className="text-4xl font-bold text-pink-600 mb-2">{user.name}</h1>
      <p className="text-gray-700 text-lg max-w-xl mx-auto mb-1">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-gray-700 text-lg max-w-xl mx-auto">
        <span className="font-semibold">Role:</span> {user.role}
      </p>
      <a
        href="/user"
        className="mt-4 inline-block text-pink-500 hover:underline"
      >
        ← Back to Users
      </a>
    </section>
  );
}
