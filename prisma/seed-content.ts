import { prisma, dbPool } from './prismaClient'


async function main() {
  console.log('Seeding content (Courses & Notices)...')

  // Seed Courses
  const courses = [
    {
      slug: 'office-application',
      title: 'Computer Office Application',
      fee: 3000,
      duration: '3 Months / 6 Months',
      description:
        'Master Microsoft Office tools, typing, internet communication, and practical office workflow for real job roles.',
      syllabus: `Module 01: Computer Fundamentals
- Computer hardware, software, and operating systems
- Input and output devices with practical setup
- Keyboard mastery and typing speed drills

Module 02: Windows and File Management
- Windows settings, accounts, and security basics
- Folder structure, naming conventions, and backups
- Data copy, move, compression, and recovery basics

Module 03: Microsoft Word for Office Documentation
- Letter, application, memo, and report formatting
- Tables, headers, footers, page setup, and print layout
- Mail merge for certificates, labels, and bulk letters

Module 04: Microsoft Excel for Data and Reports
- Workbook design and sheet management
- Core formulas: SUM, AVERAGE, IF, COUNTIF, VLOOKUP
- Data sorting, filtering, charts, and print setup

Module 05: Microsoft PowerPoint and Presentation Skills
- Slide structure, design hierarchy, and templates
- Visual storytelling with charts, icons, and media
- Presentation practice with timing and speaker notes

Module 06: Internet, Email, and Cloud Office
- Professional internet research workflow
- Formal email writing with attachments and signatures
- Google Drive and collaborative document sharing

Module 07: Office Productivity and Career Preparation
- Daily office task simulation project
- File handover and communication workflow
- Practical exam, viva preparation, and CV drafting`,
    },
    {
      slug: 'graphics-design',
      title: 'Professional Graphics Design',
      fee: 8000,
      duration: '6 Months',
      description:
        'Learn Photoshop and Illustrator from beginner to professional level with branding, social media design, and freelancing workflow.',
      syllabus: `Module 01: Design Foundations
- Design principles: balance, hierarchy, contrast, spacing
- Color theory and brand color systems
- Typography basics and font pairing strategies

Module 02: Adobe Photoshop Essentials
- Interface, layers, masks, and smart objects
- Selection tools and advanced retouching workflow
- Image correction, color grading, and export settings

Module 03: Adobe Illustrator Essentials
- Vector drawing tools and shape construction
- Pen tool practice with logo-friendly paths
- Artboards, symbols, and reusable components

Module 04: Branding and Identity Design
- Logo process from idea to final mark
- Brand guideline basics: color, font, clear space
- Stationery package: card, letterhead, and envelope

Module 05: Social Media and Marketing Creatives
- Facebook, Instagram, and YouTube cover design
- Banner, poster, and thumbnail design workflow
- Campaign visual consistency and ad formats

Module 06: Print and Prepress Production
- CMYK and print-safe color handling
- Bleed, margin, crop marks, and packaging mockup
- Final artwork export for press and digital channels

Module 07: Client Project and Freelancing Pipeline
- Brief analysis and moodboard creation
- File delivery, revision handling, and communication
- Portfolio setup and marketplace profile optimization`,
    },
    {
      slug: 'web-design',
      title: 'Web Design & Development',
      fee: 12000,
      duration: '6 Months',
      description:
        'Build modern responsive websites with HTML, CSS, JavaScript, Tailwind CSS, and deployment workflow for real-world projects.',
      syllabus: `Module 01: Web and Internet Fundamentals
- How websites work: domain, hosting, and DNS
- Browser rendering basics and developer workflow
- VS Code setup and project structure standards

Module 02: HTML5 Semantic Markup
- Semantic tags and page accessibility foundation
- Forms, validation, and reusable content blocks
- SEO-friendly document structure and metadata

Module 03: CSS3 and Responsive Layouts
- Box model, positioning, flexbox, and grid systems
- Mobile-first responsive design process
- Component styling and maintainable CSS strategy

Module 04: Tailwind CSS Production Workflow
- Utility-first design system fundamentals
- Building reusable UI sections and card layouts
- Responsive states, spacing scale, and consistency

Module 05: JavaScript Core for Frontend
- Variables, functions, arrays, and object handling
- DOM manipulation and event-driven interactions
- Form validation and dynamic UI updates

Module 06: Version Control and Team Collaboration
- Git basics: branch, commit, merge, and pull requests
- GitHub repository workflow and issue tracking
- Readme, changelog, and release hygiene

Module 07: Deployment and Real Project Delivery
- Build optimization and pre-launch checklist
- Deployment on modern hosting platforms
- Portfolio-ready final project with review session`,
    },
    {
      slug: 'auto-cad',
      title: 'AutoCAD (2D & 3D)',
      fee: 10000,
      duration: '6 Months',
      description:
        'Professional 2D drafting and 3D modeling for civil and architectural drawing with plotting and project presentation skills.',
      syllabus: `Module 01: CAD Interface and Drafting Setup
- AutoCAD interface navigation and shortcuts
- Drawing units, limits, layers, and templates
- Snap, grid, and precision drawing controls

Module 02: Core 2D Drafting Commands
- Line, polyline, circle, arc, and modify tools
- Trim, extend, offset, fillet, and array workflow
- Practical geometry and object editing routines

Module 03: Advanced 2D Construction Drawings
- Floor plan drafting for residential layout
- Elevation and section preparation standards
- Dimension styles, text styles, and annotation rules

Module 04: Block and Library Management
- Creating reusable blocks and dynamic blocks
- External references and drawing organization
- Symbols, legends, and detail sheet structure

Module 05: Introduction to 3D Modeling
- 3D workspace, viewports, and navigation tools
- Extrude, revolve, sweep, and boolean operations
- Material setup and simple rendering preview

Module 06: Civil and Architectural Project Workflow
- Site plan and working drawing composition
- Structural and service drafting basics
- Drawing set preparation for client submission

Module 07: Plotting, Printing, and Final Output
- Layout sheets, view scales, and title blocks
- Plot styles, PDF export, and quality checks
- Final project presentation and evaluation`,
    },
    {
      slug: 'hardware-networking',
      title: 'Hardware & Networking',
      fee: 6000,
      duration: '4 Months',
      description:
        'Hands-on training for computer hardware support, troubleshooting, LAN setup, and router configuration for entry-level IT roles.',
      syllabus: `Module 01: Computer Hardware Essentials
- Motherboard, CPU, RAM, storage, and PSU basics
- Device compatibility and upgrade planning
- Safe assembly and disassembly procedures

Module 02: Operating System Installation
- BIOS and boot sequence configuration
- Windows installation and driver management
- System optimization and update maintenance

Module 03: Troubleshooting and Diagnostics
- No display, no boot, and overheating diagnosis
- Peripheral and port-level issue isolation
- Backup, restore, and recovery workflow

Module 04: Networking Fundamentals
- LAN, WAN, and common network topologies
- IPv4 basics, subnet concept, and DHCP
- Network devices and cable standards

Module 05: Router and Wireless Configuration
- Router setup, SSID, and security hardening
- Access control and bandwidth management basics
- Shared network printer and file server setup

Module 06: System Security and Maintenance
- Antivirus strategy and malware cleanup process
- User account control and permission policy
- Preventive maintenance checklist for offices

Module 07: Support Workflow and IT Career Skills
- Helpdesk ticket handling and documentation
- Client communication and service reporting
- Practical lab exam and job interview prep`,
    },
    {
      slug: 'spoken-english',
      title: 'Spoken English',
      fee: 4000,
      duration: '4 Months',
      description:
        'Improve fluency, pronunciation, vocabulary, and confidence for daily communication, interviews, and professional speaking.',
      syllabus: `Module 01: Spoken English Foundations
- Sentence structure and daily conversation grammar
- Common speaking mistakes and correction drills
- Confidence building through guided speaking

Module 02: Vocabulary and Functional Expressions
- High-frequency vocabulary for daily life
- Office and interview expression bank
- Context-based word usage and recall techniques

Module 03: Pronunciation and Accent Clarity
- Sound patterns, stress, and rhythm practice
- Difficult word pronunciation training
- Listening shadowing and speaking control

Module 04: Conversation Skills for Real Situations
- Self introduction and personal storytelling
- Telephone and formal conversation etiquette
- Group discussion and pair speaking activities

Module 05: Public Speaking and Presentation English
- Speech structure and delivery strategy
- Eye contact, voice modulation, and body language
- Short presentation with feedback cycle

Module 06: Interview and Workplace Communication
- HR interview question-answer framework
- Professional email and meeting language basics
- Problem-solving communication scenarios

Module 07: Fluency Improvement and Final Assessment
- Rapid response speaking drills
- Debate and role-play practice sessions
- Final viva, speaking test, and improvement plan`,
    },
  ]
for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        fee: course.fee,
        duration: course.duration,
        description: course.description,
        syllabus: course.syllabus,
      },
      create: course,
    })
  }

  console.log('Courses seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await dbPool.end()
  })