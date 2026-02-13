import { PDFDocument, StandardFonts } from "pdf-lib";
import type { Admission, Course } from "@prisma/client";

export async function generateAdmissionPDF(
  admission: Admission & { course: Course },
) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { height } = page.getSize();
  let y = height - 40;

  const drawLine = (text: string, size = 12) => {
    page.drawText(text, { x: 50, y, size, font });
    y -= size + 8;
  };

  drawLine("TEXTKPTI Admission Receipt", 18);
  drawLine("");
  drawLine(`Name: ${admission.name}`);
  drawLine(`Phone: ${admission.phone}`);
  if (admission.email) drawLine(`Email: ${admission.email}`);
  if (admission.address) drawLine(`Address: ${admission.address}`);
  drawLine("");
  drawLine(`Course: ${admission.course.title}`);
  drawLine(`Duration: ${admission.course.duration}`);
  drawLine(`Fee: ${admission.paymentAmount ?? admission.course.fee} BDT`);
  drawLine(`Status: ${admission.status.toUpperCase()}`);
  if (admission.paymentTrxId) {
    drawLine(`Transaction ID: ${admission.paymentTrxId}`);
  }
  drawLine(`Submitted: ${admission.submittedAt.toLocaleDateString('en-BD')}`);
  drawLine("");
  drawLine("Institute Information:", 14);
  drawLine("Dokkinbazar, Kulaura, Moulvibazar-3230");
  drawLine("Phones: 01777-301073, 01797-755856");
  drawLine("Map: https://maps.app.goo.gl/", 10);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}


