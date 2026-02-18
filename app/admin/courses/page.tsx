import Link from "next/link";
import { BookOpen, Edit } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <div>
          <Badge variant="secondary" className="mb-3">
            Courses
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Update title, duration, fee, description, and syllabus for the home page course list.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Total courses:</span>
          <span className="font-semibold text-foreground">{courses.length}</span>
        </div>
      </div>

      <Card className="border-border/80 bg-card/90">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Course List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={course.id}>
                    <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                    <TableCell className="font-medium text-foreground">
                      {course.title}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {course.slug}
                    </TableCell>
                    <TableCell>BDT {course.fee}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {courses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                      No courses found. Seed the database to add initial courses.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
