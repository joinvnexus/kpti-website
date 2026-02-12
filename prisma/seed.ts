import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@textkpti.local' }
  })

  if (existingAdmin) {
    console.log('Admin user already exists')
    return
  }

  // Create admin user with bcrypt password hash
  // The password hash provided is for 'admin123'
  await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@textkpti.local',
      passwordHash: '$2b$10$u4vWjs5cxYHbf.mBBQR7XuPrNba1.9dW8a9yROR0on6ZoLcyC93fK',
      role: 'ADMIN'
    }
  })

  console.log('Admin user created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
