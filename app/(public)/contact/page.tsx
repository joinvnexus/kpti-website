import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact Us | KPTI",
  description: "Get in touch with Kulaura Professional Technology Institute for admissions and course support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container-base relative section-padding">
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
            Contact KPTI
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold text-foreground md:text-5xl">
            We are here to help you start your learning journey
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Contact us for admission guidance, course details, class schedules, and fee information.
            Our support team is ready to assist you.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Fast response for admission and course queries.
          </div>
        </div>
      </section>

      <section className="container-base section-padding">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-border/70 bg-card/90">
                <CardContent className="p-5">
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Phone</h2>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p>
                      <a href="tel:01777301073" className="hover:text-primary">
                        01777-301073
                      </a>
                    </p>
                    <p>
                      <a href="tel:01797755856" className="hover:text-primary">
                        01797-755856
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/90">
                <CardContent className="p-5">
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Email</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <a href="mailto:kptibd@gmail.com" className="hover:text-primary">
                      kptibd@gmail.com
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/90 md:col-span-2">
                <CardContent className="p-5">
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Address</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Kulaura Professional Technology Institute (KPTI),
                    <br />
                    Kulaura, Moulvibazar, Sylhet
                    <br />
                    BTEB Code: 62040
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/70 bg-card/90">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
                  <span>Saturday - Thursday</span>
                  <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
                  <span>Friday</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Campus Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.183014836384!2d92.03203650734689!3d24.522302120862776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751bdb2ca2b799b%3A0xbb4493073163b15e!2sKulaura%20Professional%20Technology%20Institute%20KPTI!5e0!3m2!1sen!2sus!4v1771321705571!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KPTI Location"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Card className="border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="mb-2 inline-block">
                      Full Name
                    </Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>

                  <div>
                    <Label htmlFor="contact" className="mb-2 inline-block">
                      Phone or Email
                    </Label>
                    <Input id="contact" placeholder="Enter phone or email" />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="mb-2 inline-block">
                      Subject
                    </Label>
                    <Input id="subject" placeholder="Admission, course, or support" />
                  </div>

                  <div>
                    <Label htmlFor="message" className="mb-2 inline-block">
                      Message
                    </Label>
                    <Textarea id="message" rows={5} placeholder="Write your message here" />
                  </div>

                  <Button type="button" className="w-full">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="text-xl">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admission">Go to Admission Form</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/#courses">View Courses</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/notices">Latest Notices</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
