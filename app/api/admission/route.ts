import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBkashPayment } from "@/lib/bkash";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, address, courseSlug } = body as {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    courseSlug?: string;
  };

  const course = await prisma.course.findFirst({
    where: { slug: courseSlug ?? undefined },
  });

  if (!course) {
    return NextResponse.json(
      { error: "কোর্স পাওয়া যায়নি" },
      { status: 400 },
    );
  }

  const admission = await prisma.admission.create({
    data: {
      name,
      phone,
      email: email || null,
      address: address || null,
      courseId: course.id,
    },
  });

  // Create bKash payment session
  const paymentResult = await createBkashPayment({
    admissionId: admission.id,
    amount: course.fee,
    callbackURL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/bkash/callback`,
  });

  return NextResponse.json({
    success: true,
    admissionId: admission.id,
    url: paymentResult.paymentURL,
  });
}


