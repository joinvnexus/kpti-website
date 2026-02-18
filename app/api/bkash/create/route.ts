import { NextRequest, NextResponse } from "next/server";
import { createBkashPayment } from "@/lib/bkash";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { admissionId, amount } = body as {
    admissionId: number;
    amount: number;
  };

  const origin = req.headers.get("origin") || "http://localhost:3000";
  const callbackURL = `${origin}/api/bkash/callback`;

  const result = await createBkashPayment({ admissionId, amount, callbackURL });
  return NextResponse.json({ url: result.paymentURL });
}


