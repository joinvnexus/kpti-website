import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdmissionSuccessPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const admissionIdStr = typeof resolvedSearchParams.admissionId === 'string'
        ? resolvedSearchParams.admissionId
        : undefined;

    if (!admissionIdStr) {
        redirect("/");
    }

    const admissionId = parseInt(admissionIdStr);

    const admission = await prisma.admission.findUnique({
        where: { id: admissionId },
        include: { course: true },
    });

    if (!admission) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-red-600">Admission Not Found</h1>
                <p className="mt-4">The admission record could not be found.</p>
                <Link href="/">
                    <Button className="mt-8">Go Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Admission Successful!
                </h1>

                <p className="text-slate-600">
                    Thank you, <strong>{admission.name}</strong>. Your admission for{" "}
                    <span className="font-semibold text-slate-900">
                        {admission.course.title}
                    </span>{" "}
                    has been received.
                </p>

                <div className="bg-green-50 p-4 rounded-md border border-green-100 text-sm">
                    <p>
                        <strong>Status:</strong> {admission.status.toUpperCase()}
                    </p>
                    {admission.paymentTrxId && (
                        <p>
                            <strong>TrxID:</strong> {admission.paymentTrxId}
                        </p>
                    )}
                </div>

                <div className="space-y-3 pt-4">
                    <a href={`/api/pdf/admission?id=${admission.id}`} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full gap-2" variant="outline">
                            <Download className="h-4 w-4" /> Download Receipt (PDF)
                        </Button>
                    </a>

                    <Link href="/" className="block">
                        <Button className="w-full gap-2">
                            <Home className="h-4 w-4" /> Go to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
