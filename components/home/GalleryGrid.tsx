"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { GalleryImage } from "@prisma/client";

interface GalleryGridProps {
  galleryImages: GalleryImage[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function GalleryGrid({ galleryImages }: GalleryGridProps) {
  if (galleryImages.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg">
        <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 mb-6">গ্যালারি চিত্র শীঘ্রই যুক্ত করা হবে</p>
        <Link href="/gallery">
          <Button variant="outline">গ্যালারি দেখুন</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {galleryImages.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
        >
          <Image
            src={image.url}
            alt={image.caption || `Gallery image ${index + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
            {image.caption && (
              <p className="w-full p-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {image.caption}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
