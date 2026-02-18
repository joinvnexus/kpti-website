import { Sparkles, ShieldCheck, CreditCard, Clock3 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import AdmissionForm from "./AdmissionForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

async function getCourses() {
  return prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      fee: true,
      duration: true,
    },
    orderBy: { id: "asc" },
  });
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdmissionPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const courseSlug =
    typeof resolvedSearchParams.course === "string"
      ? resolvedSearchParams.course
      : undefined;

  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container-base relative section-padding">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                Online Admission
              </Badge>

              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Start Your Admission in Minutes
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Complete your personal details, select your course, and make secure payment through
                bKash. Your admission request will be recorded instantly.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
              <Card className="border-border/70 bg-card/80 backdrop-blur-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Secure payment process</p>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/80 backdrop-blur-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">bKash payment gateway</p>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/80 backdrop-blur-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Quick 3-step admission form</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Make sure your phone number is active for follow-up communication.
          </div>
        </div>
      </section>

      <section className="container-base section-padding">
        <AdmissionForm courses={courses} defaultCourseSlug={courseSlug} />
      </section>
    </div>
  );
}
