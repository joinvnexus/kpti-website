"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Course } from "@prisma/client";
import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CoursesGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function CoursesGrid({ courses }: CoursesGridProps) {
  return (
    <motion.div
      className="grid-responsive"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants}>
          <div className="card-elevated flex h-full flex-col group overflow-hidden">
            <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-subtle">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 transition-all duration-300 group-hover:from-primary/10 group-hover:to-secondary/10" />
              <BookOpen className="h-20 w-20 text-primary opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-wrap gap-2 px-6 pt-6">
                <span className="badge-muted text-xs">{course.duration}</span>
                <span className="badge-primary font-semibold">৳ {course.fee}</span>
              </div>

              <div className="px-6">
                <h3 className="line-clamp-2 text-xl font-bold text-foreground">{course.title}</h3>
              </div>

              <div className="flex-1 px-6">
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {course.description || "Course description is not available right now."}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 border-t border-border px-6 pb-6 pt-4 sm:grid-cols-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/courses/${course.slug}`}>বিস্তারিত দেখুন</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href={`/admission?course=${course.slug}`}>এখনই ভর্তি হন</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
