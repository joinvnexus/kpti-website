"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
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
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <div className="mb-8">
                <div className="flex justify-between items-center relative">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold z-10 bg-background ${step >= s
                                ? "border-blue-600 text-blue-600"
                                : "border-slate-300 text-slate-400"
                                }`}
                        >
                            {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-0">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground px-1">
                    <span>তথ্য</span>
                    <span>কোর্স</span>
                    <span>পেমেন্ট</span>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {step === 1 && "ব্যক্তিগত তথ্য"}
                        {step === 2 && "কোর্স নির্বাচন"}
                        {step === 3 && "রিভিউ ও পেমেন্ট"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>নাম</Label>
                                    <Input {...register("name")} placeholder="আপনার পুরো নাম" />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>মোবাইল নম্বর</Label>
                                    <Input {...register("phone")} placeholder="017xxxxxxxx" type="tel" />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>ইমেইল (যদি থাকে)</Label>
                                    <Input {...register("email")} placeholder="example@gmail.com" type="email" />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>ঠিকানা</Label>
                                    <Textarea {...register("address")} placeholder="আপনার বর্তমান ঠিকানা" />
                                    {errors.address && (
                                        <p className="text-sm text-red-500">{errors.address.message}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>কোর্স বেছে নিন</Label>
                                    <Select
                                        onValueChange={(val) => setValue("courseSlug", val)}
                                        defaultValue={watch("courseSlug")}
                                    >
                                        <SelectTrigger>
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
                                        <p className="text-sm text-red-500">
                                            {errors.courseSlug.message}
                                        </p>
                                    )}
                                </div>

                                {selectedCourse && (
                                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
                                        <h4 className="font-medium">{selectedCourse.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            ফি: <span className="font-bold text-slate-900">৳{selectedCourse.fee}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="rounded-lg border p-4 space-y-3 bg-slate-50">
                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                        <span className="text-muted-foreground">নাম:</span>
                                        <span className="col-span-2 font-medium">{watch("name")}</span>

                                        <span className="text-muted-foreground">মোবাইল:</span>
                                        <span className="col-span-2 font-medium">{watch("phone")}</span>

                                        <span className="text-muted-foreground">কোর্স:</span>
                                        <span className="col-span-2 font-medium">
                                            {selectedCourse?.title}
                                        </span>

                                        <span className="text-muted-foreground">মোট ফি:</span>
                                        <span className="col-span-2 font-bold text-blue-600">
                                            ৳{selectedCourse?.fee}
                                        </span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-6 text-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> প্রোসেসিং...
                                        </>
                                    ) : (
                                        "Confirm & Pay with bKash"
                                    )}
                                </Button>
                                <p className="text-xs text-center text-muted-foreground">
                                    বিকাশ পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা হবে।
                                </p>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                    {step > 1 && (
                        <Button variant="outline" onClick={prevStep} disabled={loading}>
                            পেছনে
                        </Button>
                    )}
                    {step < 3 && (
                        <Button onClick={nextStep} className="ml-auto">
                            পরবর্তী
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
