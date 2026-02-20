import { prisma, dbPool } from './prismaClient'

async function main() {
  console.log('Seeding Notices...')

  const notices = [
    {
      title: 'Admission Going On - January 2026',
      content:
        'Admissions are open for the January-June 2026 session. Limited seats available.',
      isActive: true,
    },
    {
      title: 'Office Closed on Friday',
      content:
        'The institute office will remain closed on Fridays. For urgent queries call 01777-301073.',
      isActive: true,
    },
  ]

  for (const notice of notices) {
    const existingNotice = await prisma.notice.findFirst({
      where: { title: notice.title },
    })

    if (!existingNotice) {
      await prisma.notice.create({ data: notice })
    }
  }

  console.log('Notices seeded successfully')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await dbPool.end()
  })