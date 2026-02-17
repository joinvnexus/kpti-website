import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
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
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 dark:from-slate-950 via-white dark:via-slate-900 to-blue-50 dark:to-slate-950 flex items-center justify-center py-20 lg:py-0">
        <HeroContent />
      </section>

      {/* 2. COURSES SHOWCASE SECTION */}
      <section
        id="courses"
        className="w-full py-16 md:py-24 bg-white dark:bg-slate-900 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              আমাদের কোর্সসমূহ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              মাত্র ৬টি নির্বাচিত কোর্স – সরকারি সার্টিফিকেট সহ
            </p>
          </div>

          <CoursesGrid courses={courses} />

          {courses.length === 0 && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
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
      <section className="w-full py-12 md:py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                সাম্প্রতিক নোটিস
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">সব আপডেট এবং ঘোষণা</p>
            </div>
            <Link
              href="/notices"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hidden md:inline-flex items-center gap-2 font-medium"
            >
              সব নোটিস দেখুন
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <NoticesGrid notices={notices} />

          <div className="mt-8 text-center md:hidden">
            <Link href="/notices">
              <Button variant="outline" size="lg">
                সব নোটিস দেখুন
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. GALLERY TEASER SECTION */}
      <section className="w-full py-12 md:py-16 bg-gray-50/50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                আমাদের ক্যাম্পাস
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                প্রতিষ্ঠানের অভ্যন্তরীণ দৃশ্য
              </p>
            </div>
            <Link
              href="/gallery"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hidden md:inline-flex items-center gap-2 font-medium"
            >
              সম্পূর্ণ গ্যালারি
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <GalleryGrid galleryImages={galleryImages} />

          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery">
              <Button variant="outline" size="lg">
                সম্পূর্ণ গ্যালারি
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION WITH MAP */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 dark:from-blue-900 to-blue-700 dark:to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text CTA */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                আজই ভর্তি হোন
              </h2>
              <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
                সীমিত আসন! এখনই আপনার ভবিষ্যৎ গড়ে তুলুন
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-blue-100 dark:text-blue-200 mb-2">
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

              <div className="space-y-3 text-sm text-blue-50 dark:text-blue-100 mb-8">
                <p>
                  <strong>ঠিকানা:</strong> কুলাউড়া প্রফেশনাল টেকনোলজি
                  ইনস্টিটিউট, কুলাউড়া, মৌলভীবাজার, সিলেট
                </p>
              </div>

              <Link href="/admission">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-100 dark:text-blue-900 dark:hover:bg-slate-200 font-bold"
                >
                  ভর্তির জন্য যোগাযোগ করুন
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
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
