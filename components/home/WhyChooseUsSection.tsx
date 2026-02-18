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
    transition: { duration: 0.5 },
  },
};

export default function WhyChooseUsSection() {
  return (
    <section className="w-full section-padding bg-gradient-subtle">
      <div className="container-base">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            কেন আমাদের <span className="text-gradient">বেছে নেবেন?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            আমরা শিক্ষায় সর্বোচ্চ মান নিশ্চিত করি
          </p>
        </motion.div>

        <motion.div
          className="grid-responsive"
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
                className="card-elevated flex flex-col items-center text-center group hover:-translate-y-1"
              >
                <div className="mb-6 p-4 bg-gradient-subtle group-hover:bg-primary/10 rounded-full transition-colors">
                  <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
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
