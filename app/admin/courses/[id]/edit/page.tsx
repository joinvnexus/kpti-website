import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateCourse } from "@/app/admin/actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
    const { id } = await params;
    const courseId = parseInt(id);

    if (isNaN(courseId)) notFound();

    const course = await prisma.course.findUnique({
        where: { id: courseId },
    });

    if (!course) notFound();

    const updateCourseWithId = updateCourse.bind(null, course.id);

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Course: {course.title}</h1>

            <form action={updateCourseWithId} className="space-y-6 bg-white p-6 rounded-lg border">
                <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" name="title" defaultValue={course.title} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="syllabus">Syllabus</Label>
                    <Textarea
                        id="syllabus"
                        name="syllabus"
                        defaultValue={course.syllabus || ""}
                        rows={6}
                        placeholder="Enter syllabus details (supports line breaks)"
                    />
                    <p className="text-xs text-muted-foreground">
                        Formatting tip: Use line breaks to separate topics.
                    </p>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit">Update Course</Button>
                    <Button variant="outline" type="button" asChild>
                        <a href="/admin/courses">Cancel</a>
                    </Button>
                </div>
            </form>
        </div>
    );
}
