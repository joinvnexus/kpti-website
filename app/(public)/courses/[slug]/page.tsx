import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, ListChecks } from "lucide-react";

import { prisma } from "@/lib/prisma";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type SyllabusSection = {
  title: string;
  items: string[];
};

function normalizeLine(value: string): string {
  return value.replace(/^[-*\d]+[.)]?\s*/, "").trim();
}

function parseSyllabus(syllabusText: string): SyllabusSection[] {
  const blocks = syllabusText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length > 1) {
    return blocks.map((block, index) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const [firstLine = `Module ${index + 1}`, ...restLines] = lines;
      const cleanedFirstLine = normalizeLine(firstLine);
      const hasModuleLabel = /^(module|week|chapter|section|part)\b/i.test(cleanedFirstLine);

      const title = hasModuleLabel
        ? cleanedFirstLine
        : `Module ${String(index + 1).padStart(2, "0")}: ${cleanedFirstLine}`;

      const items = restLines.map(normalizeLine).filter(Boolean);

      return {
        title,
        items: items.length > 0 ? items : [cleanedFirstLine],
      };
    });
  }

  const lines = syllabusText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => ({
    title: `Lesson ${String(index + 1).padStart(2, "0")}`,
    items: [normalizeLine(line)],
  }));
}

async function getCourse(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
  });
}

async function getRelatedCourses(courseId: number) {
  return prisma.course.findMany({
    where: { id: { not: courseId } },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      duration: true,
      fee: true,
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
    },
  });

  if (!course) {
    return {
      title: "Course Not Found | KPTI",
      description: "The requested course could not be found.",
    };
  }

  const description = course.description?.trim().slice(0, 160);

  return {
    title: `${course.title} | KPTI`,
    description: description || `${course.title} course details and syllabus.`,
  };
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const course = await getCourse(slug);
  if (!course) {
    notFound();
  }

  const relatedCourses = await getRelatedCourses(course.id);
  const syllabusText = course.syllabus?.trim() ?? "";
  const syllabusSections = syllabusText ? parseSyllabus(syllabusText) : [];
  const totalTopics = syllabusSections.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="container-base relative py-10 md:py-14">
          <Link
            href="/#courses"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="mt-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              Course Details
            </div>

            <h1 className="max-w-4xl text-3xl font-bold text-foreground md:text-5xl">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{course.duration}</Badge>
              <Badge>BDT {course.fee}</Badge>
              <Badge
                variant="outline"
                className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                BTEB Approved
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container-base section-padding">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card>
              <CardContent className="space-y-3 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Course Description</h2>
                <p className="whitespace-pre-line text-base leading-8 text-muted-foreground md:text-lg">
                  {course.description?.trim() || "This course description will be updated soon."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-sm">
              <CardContent className="p-0">
                <div className="border-b border-border px-6 py-6 md:px-8">
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Detailed Syllabus</h2>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    Step-by-step learning path with module breakdown and practice topics.
                  </p>
                  {syllabusSections.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">{syllabusSections.length} Modules</Badge>
                      <Badge variant="outline">{totalTopics} Topics</Badge>
                    </div>
                  )}
                </div>

                {syllabusSections.length > 0 ? (
                  <Accordion type="single" collapsible defaultValue="syllabus" className="w-full">
                    <AccordionItem value="syllabus" className="border-b-0">
                      <AccordionTrigger className="px-6 py-5 text-left text-lg font-semibold md:px-8 md:text-xl">
                        Expand Full Syllabus
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                        <div className="space-y-4">
                          {syllabusSections.map((section, index) => (
                            <div
                              key={`${section.title}-${index}`}
                              className="rounded-xl border border-border/80 bg-card/50 p-4 md:p-5"
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                  {index + 1}
                                </div>
                                <div className="min-w-0">
                                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                                    {section.title}
                                  </h3>
                                  <ul className="mt-3 space-y-2">
                                    {section.items.map((item, itemIndex) => (
                                      <li
                                        key={`${section.title}-${itemIndex}`}
                                        className="flex items-start gap-2 text-base leading-8 text-muted-foreground"
                                      >
                                        <ListChecks className="mt-1 h-4 w-4 shrink-0 text-primary/80" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <p className="rounded-md bg-muted p-4 text-base leading-7 text-muted-foreground">
                      Detailed syllabus will be added soon.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <Card className="lg:sticky lg:top-24">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-xl font-semibold text-foreground">Start Admission</h3>
                <p className="text-sm text-muted-foreground">
                  Interested in this course? Complete your admission form now.
                </p>
                <Button asChild size="lg" className="h-11 w-full text-base">
                  <Link href={`/admission?course=${course.slug}`}>Enroll Now</Link>
                </Button>
              </CardContent>
            </Card>

            {relatedCourses.length > 0 && (
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-lg font-semibold text-foreground">Related Courses</h3>
                  <div className="space-y-3">
                    {relatedCourses.map((item) => (
                      <Link
                        key={item.id}
                        href={`/courses/${item.slug}`}
                        className="block rounded-md border border-border p-3 transition-colors hover:bg-muted"
                      >
                        <p className="line-clamp-2 font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.duration} | BDT {item.fee}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
