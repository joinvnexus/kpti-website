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
    transition: { duration: 0.6 },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      className="text-center max-w-5xl mx-auto section-padding"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Trust Badges */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center mb-8 animate-fade-in-down"
        variants={itemVariants}
      >
        <span className="badge-primary">ইনস্টিটিউট কোড: 62040</span>
        <span className="badge-secondary">৯+ বছরের অভিজ্ঞতা</span>
        <span className="badge-success">১০০০+ সফল স্টুডেন্ট</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground"
        variants={itemVariants}
      >
        <span className="text-gradient">কুলাউড়া প্রফেশনাল </span>
        <br />
        <span>টেকনোলজি ইন্সটিটিউট</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-muted-foreground mb-4 font-medium leading-relaxed"
        variants={itemVariants}
      >
        BTEB অ্যাপ্রুভড | হাতে-কলমে কম্পিউটার ও স্পোকেন ইংরেজি শিক্ষা
      </motion.p>

      {/* Highlight Text */}
      <motion.div
        className="inline-block mb-12 p-4 rounded-lg bg-accent/10 border border-accent/20"
        variants={itemVariants}
      >
        <p className="text-base md:text-lg font-semibold text-accent">
          ✨ মাত্র ৬টি নির্বাচিত কোর্স – সরকারি সার্টিফিকেট সহ
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        variants={itemVariants}
      >
        <Link href="#courses">
          <button className="btn-outline">
            কোর্স দেখুন
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
        <Link href="/admission">
          <button className="btn-primary">
            এখনই ভর্তি হোন
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>

      {/* Decorative element */}
      <motion.div
        className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {[
          { label: "সার্টিফাইড প্রশিক্ষক", value: "২০+" },
          { label: "অফিস সহায়তা", value: "সক্রিয়" },
          { label: "চাকরির সহায়তা", value: "উপলব্ধ" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="card-base group hover:-translate-y-1 transition-all"
          >
            <div className="text-lg font-bold text-primary mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
