import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAdmissionPDF } from "@/lib/pdf";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Admission ID required" }, { status: 400 });
    }

    const admission = await prisma.admission.findUnique({
        where: { id: parseInt(id) },
        include: { course: true },
    });

    if (!admission) {
        return NextResponse.json({ error: "Admission not found" }, { status: 404 });
    }

    try {
        const pdfBytes = await generateAdmissionPDF(admission);

        return new NextResponse(Buffer.from(pdfBytes), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="admission-${admission.id}.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF Generation Error", error);
        return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }
}
