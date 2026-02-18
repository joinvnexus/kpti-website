"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    transition: { duration: 0.4 },
  },
};

export default function GalleryGrid({ galleryImages }: GalleryGridProps) {
  if (galleryImages.length === 0) {
    return (
      <div className="text-center py-16 card-filled rounded-lg">
        <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
        <p className="text-muted-foreground mb-6">গ্যালারি চিত্র শীঘ্রই যুক্ত করা হবে</p>
        <Link href="/gallery">
          <button className="btn-outline">গ্যালারি দেখুন</button>
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
          className="relative h-48 rounded-lg overflow-hidden group cursor-pointer border border-border hover:border-primary transition-all duration-300"
        >
          <Image
            src={image.url}
            alt={image.caption || `Gallery image ${index + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/60 transition-all duration-300 flex items-end">
            {image.caption && (
              <p className="w-full p-3 text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {image.caption}
              </p>
            )}
          </div>
          {/* Focus Ring */}
          <div className="absolute inset-0 border-2 border-secondary opacity-0 group-hover:opacity-20 transition-opacity rounded-lg pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  );
}
