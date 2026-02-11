import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAdmissionPDF } from "@/lib/pdf";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("admissionId");
  const admissionId = idParam ? Number(idParam) : NaN;

  if (!admissionId || Number.isNaN(admissionId)) {
    return new NextResponse("Invalid admission id", { status: 400 });
  }

  const admission = await prisma.admission.findUnique({
    where: { id: admissionId },
    include: { course: true },
  });

  if (!admission) {
    return new NextResponse("Not found", { status: 404 });
  }

  const pdfBytes = await generateAdmissionPDF(admission);

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=admission-${admissionId}.pdf`,
    },
  });
}


