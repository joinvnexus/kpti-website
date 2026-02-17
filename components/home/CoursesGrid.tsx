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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CoursesGrid({ courses }: CoursesGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants}>
          <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            {/* Placeholder Image/Icon */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent group-hover:opacity-75 transition-opacity" />
              <BookOpen className="h-20 w-20 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Card Content */}
            <CardHeader>
              <div className="flex gap-2 mb-3 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {course.duration}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 font-bold">
                  ৳ {course.fee}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {course.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {course.description || "কোর্সের বিবরণ উপলব্ধ নেই।"}
              </p>

              {course.syllabus && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="syllabus" className="border-0">
                    <AccordionTrigger className="py-2 text-sm text-blue-600 hover:text-blue-700 hover:no-underline">
                      সিলেবাস দেখুন
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 whitespace-pre-line">
                      {course.syllabus}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </CardContent>

            <CardFooter className="pt-4 border-t">
              <Link href={`/admission?course=${course.slug}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  এখনই ভর্তি হোন
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
