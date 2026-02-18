"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(11, "Please enter a valid mobile number."),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter your address."),
  courseSlug: z.string().min(1, "Please select a course."),
});

type FormData = z.infer<typeof schema>;

interface Course {
  id: number;
  slug: string;
  title: string;
  fee: number;
  duration: string;
}

const stepLabels = ["Personal Info", "Course", "Payment"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  );
}

export default function AdmissionForm({
  courses,
  defaultCourseSlug,
}: {
  courses: Course[];
  defaultCourseSlug?: string;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      courseSlug: defaultCourseSlug || "",
      email: "",
    },
  });

  const selectedCourseSlug = watch("courseSlug");
  const selectedCourse = courses.find((course) => course.slug === selectedCourseSlug);

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(["name", "phone", "email", "address"]);
    }

    if (step === 2) {
      isValid = await trigger("courseSlug");
    }

    if (isValid) {
      setStep((current) => current + 1);
    }
  };

  const prevStep = () => setStep((current) => current - 1);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Admission failed");
      }

      if (json.url) {
        window.location.href = json.url;
      } else {
        window.location.href = "/admission-success";
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12">
      <Card className="border-border/70 bg-card/90 shadow-sm lg:col-span-8">
        <CardContent className="p-5 md:p-8">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>

            <div className="relative mt-4 grid grid-cols-3 gap-2">
              {stepLabels.map((label, index) => {
                const number = index + 1;
                const active = step >= number;

                return (
                  <div key={label} className="relative z-10 text-center">
                    <div
                      className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {step > number ? <CheckCircle2 className="h-5 w-5" /> : number}
                    </div>
                    <p className={`mt-2 text-xs md:text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </p>
                  </div>
                );
              })}

              <div className="absolute left-0 right-0 top-5 h-[2px] bg-border" />
              <div
                className="absolute left-0 top-5 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Personal Information</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your contact details carefully.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="mb-2 inline-block">
                      Full Name *
                    </Label>
                    <Input id="name" placeholder="Your full name" {...register("name")} />
                    <FieldError message={errors.name?.message} />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 inline-block">
                      Mobile Number *
                    </Label>
                    <Input id="phone" type="tel" placeholder="017xxxxxxxx" {...register("phone")} />
                    <FieldError message={errors.phone?.message} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2 inline-block">
                    Email (optional)
                  </Label>
                  <Input id="email" type="email" placeholder="example@gmail.com" {...register("email")} />
                  <FieldError message={errors.email?.message} />
                </div>

                <div>
                  <Label htmlFor="address" className="mb-2 inline-block">
                    Address *
                  </Label>
                  <Textarea id="address" rows={4} placeholder="Your current address" {...register("address")} />
                  <FieldError message={errors.address?.message} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Choose Your Course</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select the course you want to enroll in.
                  </p>
                </div>

                <input type="hidden" {...register("courseSlug")} />

                <div>
                  <Label className="mb-2 inline-block">Course *</Label>
                  <Select
                    value={selectedCourseSlug}
                    onValueChange={(value) =>
                      setValue("courseSlug", value, { shouldValidate: true, shouldDirty: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.slug}>
                          {course.title} ({course.duration}) - BDT {course.fee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.courseSlug?.message} />
                </div>

                {selectedCourse && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">Selected Course</p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{selectedCourse.title}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-md bg-background/70 p-3">
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">{selectedCourse.duration}</p>
                      </div>
                      <div className="rounded-md bg-background/70 p-3">
                        <p className="text-muted-foreground">Course Fee</p>
                        <p className="font-medium text-primary">BDT {selectedCourse.fee}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Review and Payment</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Confirm your details and continue to bKash payment.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium text-foreground">{watch("name")}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Mobile</span>
                      <span className="font-medium text-foreground">{watch("phone")}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Course</span>
                      <span className="text-right font-medium text-foreground">{selectedCourse?.title}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Total Fee</span>
                      <span className="text-xl font-bold text-primary">BDT {selectedCourse?.fee}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} disabled={loading}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button type="button" onClick={nextStep} disabled={loading}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={loading} className="min-w-[180px]">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay with bKash"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4 lg:col-span-4">
        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Admission Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {selectedCourse ? (
              <>
                <div className="rounded-md border border-border bg-muted/30 p-3">
                  <p className="text-muted-foreground">Course</p>
                  <p className="font-medium text-foreground">{selectedCourse.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{selectedCourse.duration}</p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Fee</p>
                    <p className="font-medium text-primary">BDT {selectedCourse.fee}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                Select a course in step 2 to preview your admission summary.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Keep your phone active. Institute authority may contact you for verification.
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              After successful payment, you will be redirected to confirmation.
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Download your admission receipt from the success page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
