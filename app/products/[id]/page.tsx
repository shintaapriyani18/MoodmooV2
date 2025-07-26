interface ProductPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params; 
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let product = null;

  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    product = await res.json();
  } catch (err) {
    console.error("Error fetching product:", err);
  }

  if (!product) {
    return (
      <section className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        <a href="/products" className="mt-4 inline-block text-pink-500 hover:underline">
          ← Back to Products
        </a>
      </section>
    );
  }

  return (
    <section className="text-center py-8">
      <div className="text-6xl mb-4">🥛</div>
      <h1 className="text-4xl font-bold text-pink-600 mb-2">{product.name}</h1>
      <p className="text-gray-700 text-lg max-w-xl mx-auto">{product.desc}</p>
      <p className="text-lg font-bold mt-4">
        Rp {product.price.toLocaleString()}
      </p>
      <a href="/products" className="mt-4 inline-block text-pink-500 hover:underline">
        ← Back to Products
      </a>
    </section>
  );
}
