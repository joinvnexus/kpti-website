import { NextRequest, NextResponse } from "next/server";
import { createBkashPayment } from "@/lib/bkash";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { admissionId, amount } = body as {
    admissionId: number;
    amount: number;
  };

  const result = await createBkashPayment({ admissionId, amount });
  return NextResponse.json({ url: result.paymentURL });
}


