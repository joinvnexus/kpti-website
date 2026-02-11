import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

  // এখানে চাইলে সাথে সাথে bKash create API কল করতে পারেন।
  return NextResponse.json({
    success: true,
    admissionId: admission.id,
  });
}


