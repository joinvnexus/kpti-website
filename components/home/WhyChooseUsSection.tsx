"use client";

import { motion } from "framer-motion";
import { Award, BarChart3, Wrench, DollarSign } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "BTEB অ্যাপ্রুভড সার্টিফিকেট",
    description:
      "সরকার স্বীকৃত এবং আন্তর্জাতিক মানের সার্টিফিকেশন প্রোগ্রাম",
  },
  {
    icon: BarChart3,
    title: "অভিজ্ঞ শিক্ষক দল",
    description:
      "বছরের পর বছর ইন্ডাস্ট্রি অভিজ্ঞতা সম্পন্ন দক্ষ প্রশিক্ষক",
  },
  {
    icon: Wrench,
    title: "প্র্যাকটিক্যাল ট্রেনিং",
    description: "হাতে-কলমে শিক্ষা এবং বাস্তব-জীবনের প্রকল্পে কাজ করার সুযোগ",
  },
  {
    icon: DollarSign,
    title: "সাশ্রয়ী ফি",
    description:
      "সাশ্রয়ী মূল্যে বিশ্বমানের শিক্ষা পরিষেবা প্রদান করি আমরা",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            কেন আমাদের বেছে নেবেন?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            আমরা শিক্ষায় সর্বোচ্চ মান নিশ্চিত করি
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
