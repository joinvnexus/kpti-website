import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: { admissionId?: string };
}

export default async function AdmissionSuccessPage({ searchParams }: Props) {
  const id = searchParams.admissionId
    ? Number(searchParams.admissionId)
    : undefined;

  const admission = id
    ? await prisma.admission.findUnique({
        where: { id },
        include: { course: true },
      })
    : null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Admission Success</h1>
      {admission ? (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            {admission.name} আপনার ভর্তি আবেদন সফল হয়েছে।
          </p>
          <p className="mt-1 text-sm">
            কোর্স: <span className="font-medium">{admission.course.title}</span>
          </p>
          <a
            href={`/api/admission/pdf?admissionId=${admission.id}`}
            className="mt-4 inline-flex rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Download Admission PDF
          </a>
        </>
      ) : (
        <p className="mt-2 text-sm text-red-600">
          সঠিক admission id পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}


