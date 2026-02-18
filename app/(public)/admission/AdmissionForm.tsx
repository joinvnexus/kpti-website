"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Validation Schema
const schema = z.object({
    name: z.string().min(2, "নাম অবশ্যই দিতে হবে"),
    phone: z.string().min(11, "সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)"),
    email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
    address: z.string().min(5, "ঠিকানা দিন"),
    courseSlug: z.string().min(1, "একটি কোর্স সিলেক্ট করুন"),
});

type FormData = z.infer<typeof schema>;

interface Course {
    id: number;
    slug: string;
    title: string;
    fee: number;
    duration: string;
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
    const selectedCourse = courses.find((c) => c.slug === selectedCourseSlug);

    const nextStep = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await trigger(["name", "phone", "email", "address"]);
        } else if (step === 2) {
            isValid = await trigger("courseSlug");
        }

        if (isValid) setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

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
                window.location.href = json.url; // Redirect to bKash
            } else {
                // Fallback success
                window.location.href = "/admission-success";
            }
        } catch (err: Error | unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-base py-12 md:py-16">
            <div className="max-w-2xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex justify-between items-center relative mb-6">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold z-10 transition-all duration-300 ${
                                    step >= s
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-background text-muted-foreground"
                                }`}
                            >
                                {step > s ? (
                                    <CheckCircle2 className="w-6 h-6 text-accent" />
                                ) : (
                                    s
                                )}
                            </div>
                        ))}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-border -z-0 transform -translate-y-1/2">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                style={{ width: `${((step - 1) / 2) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-muted-foreground px-1">
                        <span className={step >= 1 ? "text-foreground" : ""}>তথ্য</span>
                        <span className={step >= 2 ? "text-foreground" : ""}>কোর্স</span>
                        <span className={step >= 3 ? "text-foreground" : ""}>পেমেন্ট</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="card-elevated">
                    <div className="border-b border-border pb-6 mb-6">
                        <h2 className="text-2xl font-bold text-foreground">
                            {step === 1 && "ব্যক্তিগত তথ্য"}
                            {step === 2 && "কোর্স নির্বাচন"}
                            {step === 3 && "রিভিউ ও পেমেন্ট"}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-foreground">নাম *</Label>
                                    <Input 
                                        {...register("name")} 
                                        placeholder="আপনার পুরো নাম" 
                                        className="input-base"
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <span>⚠</span> {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-foreground">মোবাইল নম্বর *</Label>
                                    <Input 
                                        {...register("phone")} 
                                        placeholder="017xxxxxxxx" 
                                        type="tel" 
                                        className="input-base"
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <span>⚠</span> {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-foreground">ইমেইল</Label>
                                    <Input 
                                        {...register("email")} 
                                        placeholder="example@gmail.com" 
                                        type="email" 
                                        className="input-base"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <span>⚠</span> {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-foreground">ঠিকানা *</Label>
                                    <Textarea 
                                        {...register("address")} 
                                        placeholder="আপনার বর্তমান ঠিকানা" 
                                        className="input-base"
                                        rows={4}
                                    />
                                    {errors.address && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <span>⚠</span> {errors.address.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-3">
                                    <Label className="font-semibold text-foreground">কোর্স বেছে নিন *</Label>
                                    <Select
                                        onValueChange={(val) => setValue("courseSlug", val)}
                                        defaultValue={watch("courseSlug")}
                                    >
                                        <SelectTrigger className="input-base">
                                            <SelectValue placeholder="কোর্স সিলেক্ট করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem key={course.id} value={course.slug}>
                                                    {course.title} ({course.duration}) - ৳{course.fee}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.courseSlug && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <span>⚠</span> {errors.courseSlug.message}
                                        </p>
                                    )}
                                </div>

                                {selectedCourse && (
                                    <div className="card-outlined border-primary">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">
                                                    {selectedCourse.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    সময়কাল: <span className="font-medium text-foreground">{selectedCourse.duration}</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground mb-1">মোট খরচ</p>
                                                <p className="text-2xl font-bold text-primary">
                                                    ৳{selectedCourse.fee}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                {/* Summary Card */}
                                <div className="card-base border-2 border-primary/20 bg-primary/5">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-foreground">আপনার তথ্য পর্যালোচনা করুন</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">নাম:</span>
                                                <span className="font-semibold text-foreground">{watch("name")}</span>
                                            </div>
                                            <div className="divider" />
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">মোবাইল:</span>
                                                <span className="font-semibold text-foreground">{watch("phone")}</span>
                                            </div>
                                            <div className="divider" />
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">কোর্স:</span>
                                                <span className="font-semibold text-foreground">
                                                    {selectedCourse?.title}
                                                </span>
                                            </div>
                                            <div className="divider" />
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">সর্বমোট খরচ:</span>
                                                <span className="text-2xl font-bold text-primary">
                                                    ৳{selectedCourse?.fee}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Alert */}
                                {error && (
                                    <div className="alert-error">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold">ত্রুটি</p>
                                            <p className="text-sm opacity-90">{error}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Pay Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full py-4 text-lg font-bold"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            প্রোসেসিং...
                                        </>
                                    ) : (
                                        <>
                                            <span>bKash দিয়ে পেমেন্ট করুন</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-muted-foreground">
                                    আপনি bKash পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা হবেন। নিরাপদ ও সুরক্ষিত লেনদেন।
                                </p>
                            </div>
                        )}
                    </form>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4 mt-8">
                    {step > 1 && (
                        <button 
                            onClick={prevStep} 
                            disabled={loading}
                            className="btn-outline"
                        >
                            ← পেছনে
                        </button>
                    )}
                    {step < 3 && (
                        <button 
                            onClick={nextStep} 
                            disabled={loading}
                            className={`btn-primary ${step === 1 ? "ml-auto" : ""}`}
                        >
                            পরবর্তী →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
