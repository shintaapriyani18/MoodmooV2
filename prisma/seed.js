const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Produk 1', price: 100000 },
      { name: 'Produk 2', price: 150000 },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Seeding selesai');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Error saat seeding:', e);
    prisma.$disconnect();
    process.exit(1);
  });
