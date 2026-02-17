"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const noticeSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
    isActive: z.coerce.boolean().optional(),
});

export async function createNotice(formData: FormData) {
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
        isActive: formData.get("isActive") === "on",
    };

    const parsed = noticeSchema.safeParse(data);

    if (!parsed.success) {
        throw new Error("Invalid data.");
    }

    await prisma.notice.create({
        data: {
            ...parsed.data,
            isActive: parsed.data.isActive ?? true,
        },
    });

    revalidatePath("/admin/notices");
    revalidatePath("/");
    revalidatePath("/notices");
}

export async function deleteNotice(id: number) {
    await prisma.notice.delete({ where: { id } });
    revalidatePath("/admin/notices");
    revalidatePath("/");
    revalidatePath("/notices");
}

export async function toggleNoticeStatus(id: number, isActive: boolean) {
    await prisma.notice.update({
        where: { id },
        data: { isActive },
    });
    revalidatePath("/admin/notices");
    revalidatePath("/");
    revalidatePath("/notices");
}
