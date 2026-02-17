"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      className="text-center max-w-4xl mx-auto px-4 py-20 lg:py-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Trust Badges */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center mb-8"
        variants={itemVariants}
      >
        <Badge variant="secondary" className="px-3 py-1">
          ইনস্টিটিউট কোড: 62040
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          ৯+ বছরের অভিজ্ঞতা
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          ১০০০+ সফল স্টুডেন্ট
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        variants={itemVariants}
      >
        কুলাউড়া প্রফেশনাল টেকনোলজি ইন্সটিটিউট
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-4 font-medium"
        variants={itemVariants}
      >
        BTEB অ্যাপ্রুভড | হাতে-কলমে কম্পিউটার ও স্পোকেন ইংরেজি শিক্ষা
      </motion.p>

      {/* Highlight Text */}
      <motion.p
        className="text-lg md:text-xl text-blue-600 font-bold mb-12"
        variants={itemVariants}
      >
        ✨ মাত্র ৬টি নির্বাচিত কোর্স – সরকারি সার্টিফিকেট সহ
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        variants={itemVariants}
      >
        <Link href="#courses">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            কোর্স দেখুন
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/admission">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            এখনই ভর্তি হোন
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
