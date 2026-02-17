"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAdmissionStatus(id: number, status: string) {
    await prisma.admission.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/admin/admissions");
}
