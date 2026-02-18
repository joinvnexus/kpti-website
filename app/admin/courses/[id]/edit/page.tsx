import Link from "next/link";
import { notFound } from "next/navigation";

import { updateCourse } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
  const { id } = await params;
  const courseId = Number.parseInt(id, 10);

  if (Number.isNaN(courseId)) {
    notFound();
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    notFound();
  }

  const updateCourseWithId = updateCourse.bind(null, course.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <h1 className="text-3xl font-bold text-foreground">Edit Course</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Update course details shown on the public website.
        </p>
      </div>

      <Card className="border-border/80 bg-card/90">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateCourseWithId} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" defaultValue={course.title} required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fee">Course Fee (BDT)</Label>
                <Input
                  id="fee"
                  name="fee"
                  type="number"
                  defaultValue={course.fee}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={course.duration}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={course.description || ""}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="syllabus">Syllabus</Label>
              <Textarea
                id="syllabus"
                name="syllabus"
                defaultValue={course.syllabus || ""}
                rows={10}
                placeholder="Enter detailed syllabus with line breaks or module format."
              />
              <p className="text-xs text-muted-foreground">
                Tip: Use empty line between modules for better syllabus formatting.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-border pt-4">
              <Button type="submit">Save Changes</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/courses">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
