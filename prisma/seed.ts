import { prisma, dbPool } from './prismaClient'

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@textkpti.local' }
  })

  if (existingAdmin) {
    console.log('Admin already exists')
    return
  }

  await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@textkpti.local',
      passwordHash: '$2b$10$u4vWjs5cxYHbf.mBBQR7XuPrNba1.9dW8a9yROR0on6ZoLcyC93fK',
      role: 'ADMIN'
    }
  })

  console.log('Admin created successfully')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await dbPool.end()
  })