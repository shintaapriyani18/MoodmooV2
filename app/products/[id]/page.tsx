import { notFound } from 'next/navigation'


interface ProductPageProps {
  params: { id: string };
}

const productDetails: Record<number, { name: string; desc: string; emoji: string }> = {
  1: {
    name: "Strawberry Moo",
    desc: "Manis dan segar seperti jatuh cinta! Dengan rasa stroberi yang lembut 🍓",
    emoji: "🍓",
  },
  2: {
    name: "Banana Moo",
    desc: "Creamy dan lembut, cocok buat harimu yang tenang 🍌",
    emoji: "🍌",
  },
  3: {
    name: "Matcha Moo",
    desc: "Matcha calm vibes tapi tetap kasih semangat! 🍵",
    emoji: "🍵",
  },
};

export default function ProductDetailPage({ params }: ProductPageProps) {
  const id = parseInt(params.id);
  const product = productDetails[id];

  if (!product) {
    notFound();
  }

  return (
    <section className="text-center">
      <div className="text-6xl mb-4">{product.emoji}</div>
      <h1 className="text-4xl font-bold text-pink-600 mb-2">{product.name}</h1>
      <p className="text-gray-700 text-lg max-w-xl mx-auto">{product.desc}</p>
    </section>
  );
}