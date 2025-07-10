import Link from "next/link";

const products = [
  { id: 1, name: "Strawberry Moo", desc: "Manis dan segar seperti jatuh cinta 🍓" },
  { id: 2, name: "Banana Moo", desc: "Creamy dan lembut, cocok buat hari santai 🍌" },
  { id: 3, name: "Matcha Moo", desc: "Matcha calming tapi mood booster 🍵" },
];

export default function ProductPage() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Varian Moodmoo</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
          >
            <div className="text-5xl mb-2">{p.desc.match(/\p{Emoji}/u)?.[0]}</div>
            <h2 className="text-xl font-semibold text-pink-500">{p.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
