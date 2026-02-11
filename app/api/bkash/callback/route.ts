import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyBkashPayment } from "@/lib/bkash";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { trxID, admissionId } = data as {
    trxID: string;
    admissionId: number;
  };

  const verified = await verifyBkashPayment({ trxID });

  if (!verified.success) {
    await prisma.admission.update({
      where: { id: admissionId },
      data: { status: "rejected" },
    });
    return NextResponse.json({ success: false });
  }

  const admission = await prisma.admission.update({
    where: { id: admissionId },
    data: {
      status: "paid",
      paymentTrxId: trxID,
      paymentAmount: verified.amount,
    },
  });

  return NextResponse.json({
    success: true,
    redirectUrl: `/admission-success?admissionId=${admission.id}`,
  });
}


