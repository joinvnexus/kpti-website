"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const courseSchema = z.object({
    title: z.string().min(3),
    fee: z.coerce.number().min(0),
    duration: z.string().min(2),
    description: z.string().optional(),
    syllabus: z.string().optional(),
});

export async function updateCourse(id: number, formData: FormData) {
    const data = {
        title: formData.get("title"),
        fee: formData.get("fee"),
        duration: formData.get("duration"),
        description: formData.get("description"),
        syllabus: formData.get("syllabus"),
    };

    const parsed = courseSchema.safeParse(data);

    if (!parsed.success) {
        throw new Error("Invalid data. Please check inputs.");
    }

    await prisma.course.update({
        where: { id },
        data: parsed.data,
    });

    revalidatePath("/admin/courses");
    revalidatePath("/"); // Update home page
    redirect("/admin/courses");
}
