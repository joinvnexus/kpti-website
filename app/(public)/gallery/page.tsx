import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const revalidate = 60;

async function getGalleryImages() {
  return await prisma.galleryImage.findMany({
    orderBy: { uploadedAt: "desc" },
  });
}

export const metadata = {
  title: "Gallery - KPTI",
  description: "Photo gallery of KPTI activities and events.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">গ্যালারি</h1>

      {images.length === 0 ? (
        <p className="text-center text-slate-500">গ্যালারিতে কোন ছবি নেই।</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={img.url}
                alt={img.caption || "Gallery Image"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
