import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  Laptop,
  MapPin,
  PhoneCall,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | KPTI",
  description:
    "Learn about Kulaura Professional Technology Institute (KPTI), our mission, facilities, and BTEB-approved technical training programs.",
};

const highlights = [
  {
    title: "BTEB Approved",
    description: "Official certification under Bangladesh Technical Education Board.",
    icon: Award,
  },
  {
    title: "Experienced Trainers",
    description: "Industry-focused trainers with practical classroom methodology.",
    icon: Users,
  },
  {
    title: "Modern Computer Lab",
    description: "Up-to-date systems and software for hands-on training.",
    icon: Laptop,
  },
  {
    title: "Career Support",
    description: "Guidance for job preparation, freelancing, and interviews.",
    icon: BriefcaseBusiness,
  },
];

const stats = [
  { value: "BTEB", label: "Approved Institute" },
  { value: "6+", label: "Professional Courses" },
  { value: "100%", label: "Practical Focus" },
  { value: "Career", label: "Skill Development" },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <section className="container-base relative section-padding">
        <div className="mx-auto max-w-5xl text-center animate-fade-in-up">
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
            About KPTI
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Kulaura Professional Technology Institute
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            KPTI is a modern technical education institute in Kulaura, Moulvibazar, focused on
            job-ready practical training and professional skill development for youth.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge className="gap-1.5 px-3 py-1 text-xs md:text-sm">
              <CheckCircle2 className="h-3.5 w-3.5" /> BTEB Institute Code: 62040
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">
              Kulaura, Moulvibazar
            </Badge>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/admission">Apply for Admission</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 animate-fade-in-up">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/70 bg-card/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center md:p-5">
                <p className="text-lg font-bold text-primary md:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-base pb-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-7">
                We empower learners with practical ICT and communication skills so they can build
                sustainable careers in jobs, freelancing, and entrepreneurship.
              </p>
              <p className="leading-7">
                Our training model is fully hands-on and project-based, ensuring every student
                can confidently apply their skills in the real world.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <GraduationCap className="h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-7">
                We aim to be a trusted technology training hub in the region by producing skilled,
                confident, and ethical professionals for the digital economy.
              </p>
              <p className="leading-7">
                Through accessible education, we want to reduce skill gaps and create stronger
                career opportunities for local youth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-base section-padding-sm">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Why Choose KPTI</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Practical, supportive, and career-focused learning environment.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <Card
              key={item.title}
              className="group border-border/70 bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardContent className="flex items-start gap-4 p-5 md:p-6">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/15">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-base section-padding">
        <div className="grid gap-5 lg:grid-cols-12">
          <Card className="overflow-hidden border-border/70 lg:col-span-8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-5 w-5 text-primary" />
                Campus Location
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.183014836384!2d92.03203650734689!3d24.522302120862776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751bdb2ca2b799b%3A0xbb4493073163b15e!2sKulaura%20Professional%20Technology%20Institute%20KPTI!5e0!3m2!1sen!2sus!4v1771321705571!5m2!1sen!2sus"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KPTI Location"
              />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-2xl">Visit KPTI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground md:text-base">
              <div className="rounded-lg border border-border/70 bg-muted/40 p-4">
                Kulaura Professional Technology Institute, Kulaura, Moulvibazar, Sylhet.
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary" /> 01777-301073
                </p>
                <p className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary" /> 01797-755856
                </p>
                <p className="flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4 text-primary" /> Practical classes and support guidance
                </p>
              </div>

              <Button asChild className="w-full">
                <Link href="/admission">Start Admission</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
