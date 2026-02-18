"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";
import { Course } from "@prisma/client";

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
          <div className="card-elevated flex flex-col h-full group overflow-hidden">
            {/* Image/Icon Section */}
            <div className="h-48 bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />
              <BookOpen className="h-20 w-20 text-primary opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" />
            </div>

            {/* Card Content */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Badges & Fee */}
              <div className="flex gap-2 flex-wrap pt-6 px-6">
                <span className="badge-muted text-xs">
                  {course.duration}
                </span>
                <span className="badge-primary font-semibold">
                  ৳ {course.fee}
                </span>
              </div>

              {/* Title */}
              <div className="px-6">
                <h3 className="text-xl font-bold text-foreground line-clamp-2">
                  {course.title}
                </h3>
              </div>

              {/* Description */}
              <div className="px-6 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {course.description || "কোর্সের বিবরণ উপলব্ধ নেই।"}
                </p>

                {course.syllabus && (
                  <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="syllabus" className="border-0">
                      <AccordionTrigger className="py-2 text-sm text-primary hover:text-primary/80 hover:no-underline">
                        সিলেবাস দেখুন
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground whitespace-pre-line">
                        {course.syllabus}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>

              {/* CTA Button */}
              <div className="pt-4 px-6 pb-6 border-t border-border">
                <Link href={`/admission?course=${course.slug}`} className="w-full block">
                  <button className="btn-primary w-full">
                    এখনই ভর্তি হোন
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
