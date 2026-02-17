import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding content (Courses & Notices)...')

    // Seed Courses
    const courses = [
        {
            slug: 'office-application',
            title: 'Computer Office Application',
            fee: 3000,
            duration: '3 Months / 6 Months',
            description: 'Master Microsoft Office (Word, Excel, PowerPoint) and basic computer operations.',
            syllabus: '1. Introduction to Computer\n2. MS Word\n3. MS Excel\n4. MS PowerPoint\n5. Internet Browsing\n6. Emailing',
        },
        {
            slug: 'graphics-design',
            title: 'Professional Graphics Design',
            fee: 8000,
            duration: '6 Months',
            description: 'Learn Adobe Photoshop, Illustrator, and potential career paths in design.',
            syllabus: '1. Color Theory\n2. Typography\n3. Logo Design\n4. Banner Design\n5. Photo Editing\n6. Freelancing Guide',
        },
        {
            slug: 'web-design',
            title: 'Web Design & Development',
            fee: 12000,
            duration: '6 Months',
            description: 'Build modern responsive websites using HTML, CSS, JavaScript, and Tailwind.',
            syllabus: '1. HTML5 & CSS3\n2. Responsive Design\n3. Tailwind CSS\n4. JavaScript Basics\n5. GitHub\n6. Hosting',
        },
        {
            slug: 'auto-cad',
            title: 'AutoCAD (2D & 3D)',
            fee: 10000,
            duration: '6 Months',
            description: 'Civil and Architectural drafting using AutoCAD.',
            syllabus: '1. Interface Introduction\n2. 2D Drafting\n3. 3D Modeling\n4. Floor Plans\n5. Elevations\n6. Printing/Plotting',
        },
        {
            slug: 'hardware-networking',
            title: 'Hardware & Networking',
            fee: 6000,
            duration: '4 Months',
            description: 'PC assembly, troubleshooting, and basic networking setup.',
            syllabus: '1. PC Components\n2. OS Installation\n3. Troubleshooting\n4. LAN Setup\n5. Router Configuration\n6. IP Addressing',
        },
        {
            slug: 'spoken-english',
            title: 'Spoken English',
            fee: 4000,
            duration: '4 Months',
            description: 'Improve your communication skills in English for better career opportunities.',
            syllabus: '1. Grammar Basics\n2. Vocabulary\n3. Pronunciation\n4. Conversation Practice\n5. Public Speaking\n6. Interview Prep',
        },
    ]

    for (const course of courses) {
        await prisma.course.upsert({
            where: { slug: course.slug },
            update: {},
            create: course,
        })
    }
    console.log('Courses seeded successfully')

    // Seed Notices
    const notices = [
        {
            title: 'Admission Going On - January 2026',
            content: 'Admissions are open for the January-June 2026 session. Limited seats available. Apply now!',
            isActive: true,
        },
        {
            title: 'Office Closed on Friday',
            content: 'The institute office will remain closed on Fridays. For urgent queries, call 01777-301073.',
            isActive: true,
        },
    ]

    for (const notice of notices) {
        const existingNotice = await prisma.notice.findFirst({ where: { title: notice.title } })
        if (!existingNotice) {
            await prisma.notice.create({ data: notice })
        }
    }
    console.log('Notices seeded successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
