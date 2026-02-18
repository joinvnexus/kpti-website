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
    transition: { duration: 0.5 },
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
          <div className="card-elevated h-full flex flex-col group hover:-translate-y-1">
            {/* Header */}
            <div className="pb-4 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4 text-secondary" />
                <span>
                  {new Date(notice.createdAt).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {notice.title}
              </h3>
            </div>

            {/* Content */}
            <div className="flex-1 py-4">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {notice.content}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border">
              <Link href="/notices" className="link-primary text-sm font-medium flex items-center gap-1 group">
                বিস্তারিত পড়ুন
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}

      {notices.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          <p>কোন নোটিস পাওয়া যায়নি।</p>
        </div>
      )}
    </motion.div>
  );
}
