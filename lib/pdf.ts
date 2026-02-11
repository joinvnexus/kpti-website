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
  drawLine(`Course: ${admission.course.title}`);
  drawLine(`Duration: ${admission.course.duration}`);
  drawLine(`Fee: ${admission.paymentAmount ?? admission.course.fee} BDT`);
  drawLine(`Status: ${admission.status}`);
  drawLine(`Transaction ID: ${admission.paymentTrxId ?? "N/A"}`);
  drawLine("");
  drawLine("Institute Address:", 14);
  drawLine("Dokkinbazar, Kulaura, Moulvibazar-3230");
  drawLine("Phones: 01777-301073, 01797-755856");
  drawLine("Map: https://maps.app.goo.gl/", 10);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}


