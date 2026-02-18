/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma";

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
              <img
                src={img.url}
                alt={img.caption || "Gallery Image"}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
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
