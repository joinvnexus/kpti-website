import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import HeroContent from "@/components/home/HeroContent";
import CoursesGrid from "@/components/home/CoursesGrid";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import NoticesGrid from "@/components/home/NoticesGrid";
import GalleryGrid from "@/components/home/GalleryGrid";

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getCourses() {
  return await prisma.course.findMany({
    take: 6,
    orderBy: { id: "asc" },
  });
}

async function getNotices() {
  return await prisma.notice.findMany({
    where: { isActive: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
}

async function getGalleryImages() {
  try {
    return await prisma.galleryImage.findMany({
      take: 8,
      orderBy: { uploadedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [courses, notices, galleryImages] = await Promise.all([
    getCourses(),
    getNotices(),
    getGalleryImages(),
  ]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-subtle flex items-center justify-center py-20 lg:py-0">
        <HeroContent />
      </section>

      {/* 2. COURSES SHOWCASE SECTION */}
      <section
        id="courses"
        className="w-full section-padding bg-background scroll-mt-20"
      >
        <div className="container-base">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              আমাদের <span className="text-gradient">কোর্সসমূহ</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              মাত্র ৬টি নির্বাচিত কোর্স – সরকারি সার্টিফিকেট সহ
            </p>
          </div>

          <CoursesGrid courses={courses} />

          {courses.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">
                কোর্স লোড করা যাচ্ছে না। দয়া করে পরে আবার চেষ্টা করুন।
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <WhyChooseUsSection />

      {/* 4. LATEST NOTICES TEASER */}
      <section className="w-full section-padding bg-card">
        <div className="container-base">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                সাম্প্রতিক <span className="text-gradient">নোটিস</span>
              </h2>
              <p className="text-muted-foreground mt-2">সব আপডেট এবং ঘোষণা</p>
            </div>
            <Link
              href="/notices"
              className="link-primary hidden md:inline-flex items-center gap-2"
            >
              সব নোটিস দেখুন
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <NoticesGrid notices={notices} />

          <div className="mt-8 text-center md:hidden">
            <Link href="/notices">
              <button className="btn-outline">সব নোটিস দেখুন</button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. GALLERY TEASER SECTION */}
      <section className="w-full section-padding bg-gradient-subtle">
        <div className="container-base">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                আমাদের <span className="text-gradient">ক্যাম্পাস</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                প্রতিষ্ঠানের অভ্যন্তরীণ দৃশ্য
              </p>
            </div>
            <Link
              href="/gallery"
              className="link-primary hidden md:inline-flex items-center gap-2"
            >
              সম্পূর্ণ গ্যালারি
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <GalleryGrid galleryImages={galleryImages} />

          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery">
              <button className="btn-outline">সম্পূর্ণ গ্যালারি</button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION WITH MAP */}
      <section className="w-full section-padding bg-gradient-primary-to-secondary text-primary-foreground">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text CTA */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                আজই ভর্তি হোন
              </h2>
              <p className="text-xl opacity-90 mb-8">
                সীমিত আসন! এখনই আপনার ভবিষ্যৎ গড়ে তুলুন
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm opacity-75 mb-2">
                    যোগাযোগের জন্য কল করুন:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:01777301073"
                      className="text-lg font-bold hover:underline"
                    >
                      01777-301073
                    </a>
                    <a
                      href="tel:01797755856"
                      className="text-lg font-bold hover:underline"
                    >
                      01797-755856
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm opacity-90 mb-8">
                <p>
                  <strong>ঠিকানা:</strong> কুলাউড়া প্রফেশনাল টেকনোলজি
                  ইনস্টিটিউট, কুলাউড়া, মৌলভীবাজার, সিলেট
                </p>
              </div>

              <Link href="/admission">
                <button className="bg-primary-foreground text-primary hover:bg-opacity-90 px-8 py-4 rounded-lg font-bold inline-flex items-center gap-2 transition-all">
                  ভর্তির জন্য যোগাযোগ করুন
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Right: Map Embed */}
            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.183014836384!2d92.03203650734689!3d24.522302120862776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751bdb2ca2b799b%3A0xbb4493073163b15e!2sKulaura%20Professional%20Technology%20Institute%20KPTI!5e0!3m2!1sen!2sus!4v1771321705571!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
