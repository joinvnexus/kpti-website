import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, BookOpen, Calendar, ChevronRight } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

async function getCourses() {
  return await prisma.course.findMany({
    take: 6,
    orderBy: { id: "asc" },
  });
}

async function getNotices() {
  return await prisma.notice.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const [courses, notices] = await Promise.all([getCourses(), getNotices()]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Kulaura Professional Technology Institute
          </h1>
          <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            BTEB Approved Computer & Spoken English Training Center.
            <br />
            Efficiency • Skill • Success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#courses">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                কোর্স দেখুন <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admission">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                ভর্তি হোন
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-400 font-medium tracking-wide">
            মাত্র ৬টি বিশেষায়িত কোর্স | সরকারি সনদপ্রাপ্ত
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">আমাদের কোর্সসমূহ</h2>
            <p className="text-slate-600 mt-2">দক্ষতা অর্জন করে নিজের ক্যারিয়ার গড়ুন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-200 flex items-center justify-center rounded-t-lg">
                  <BookOpen className="h-16 w-16 text-slate-400" />
                  {/* TODO: Add course image if available */}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{course.duration}</Badge>
                    <Badge variant="secondary">৳ {course.fee}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {course.description || "No description available."}
                  </p>
                  {course.syllabus && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="syllabus" className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm hover:no-underline text-blue-600">
                          সিলেবাস দেখুন
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-600">
                          <div className="whitespace-pre-line">{course.syllabus}</div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/admission?course=${course.slug}`} className="w-full">
                    <Button className="w-full">Enroll Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              কোর্স লোড করা যাচ্ছে না অথবা ডাটাবেজে কোন কোর্স নেই।
            </div>
          )}
        </div>
      </section>

      {/* Notices Teaser Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">নোটিশ বোর্ড</h2>
              <p className="text-slate-600 mt-2">সর্বশেষ আপডেট এবং ঘোষণা</p>
            </div>
            <Link href="/notices" className="text-blue-600 hover:underline hidden sm:inline-flex items-center">
              সব নোটিশ <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <Card key={notice.id}>
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(notice.createdAt).toLocaleDateString("bn-BD")}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{notice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {notice.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/notices" className="text-sm text-blue-600 hover:underline">
                    বিস্তারিত পড়ুন
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/notices">
              <Button variant="outline">সব নোটিশ দেখুন</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">আমাদের সাথে যোগাযোগ করুন</h2>
          <p className="text-xl text-blue-100 mb-8">ভর্তি বা যেকোনো তথ্যের জন্য কল করুন</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <a href="tel:01777301073">Call 01777-301073</a>
            </Button>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                অফিস ভিজিট করুন
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
