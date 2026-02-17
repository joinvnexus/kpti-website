"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Notice } from "@prisma/client";

interface NoticesGridProps {
  notices: Notice[];
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function NoticesGrid({ notices }: NoticesGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {notices.map((notice) => (
        <motion.div key={notice.id} variants={itemVariants}>
          <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="h-4 w-4" />
                {new Date(notice.createdAt).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {notice.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {notice.content}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/notices" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                বিস্তারিত পড়ুন →
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}

      {notices.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
          <p>কোন নোটিস পাওয়া যায়নি।</p>
        </div>
      )}
    </motion.div>
  );
}
