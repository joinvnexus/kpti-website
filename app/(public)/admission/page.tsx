import { prisma } from "@/lib/prisma";
import AdmissionForm from "./AdmissionForm";

// Force dynamic rendering since we are reading search params in a way that might be dynamic
export const dynamic = "force-dynamic";

async function getCourses() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      fee: true,
      duration: true,
    },
    orderBy: { id: "asc" },
  });
  return courses;
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdmissionPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const courseSlug = typeof resolvedSearchParams.course === 'string' ? resolvedSearchParams.course : undefined;

  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">অনলাইন ভর্তি ফরম</h1>
        <p className="text-slate-600 mt-2">
          আপনার তথ্য দিয়ে ফরমটি পূরণ করুন এবং পেমেন্ট সম্পন্ন করুন
        </p>
      </div>
      <AdmissionForm courses={courses} defaultCourseSlug={courseSlug} />
    </div>
  );
}
