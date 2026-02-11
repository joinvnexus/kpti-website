"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "নাম দিন"),
  phone: z.string().min(6, "মোবাইল নম্বর দিন"),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AdmissionPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const courseSlug = params.get("course") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, courseSlug }),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      if (json.url) {
        window.location.href = json.url;
      } else {
        setMessage("ভর্তি আবেদন সফল হয়েছে");
      }
    } catch {
      setMessage("কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Admission</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        নিচের ফর্মটি পূরণ করুন, তারপর bKash এর মাধ্যমে পেমেন্ট সম্পন্ন করুন।
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-lg space-y-4 rounded border bg-white p-4"
      >
        {courseSlug && (
          <p className="text-sm font-medium">
            নির্বাচিত কোর্স: <span className="font-semibold">{courseSlug}</span>
          </p>
        )}
        <div>
          <label className="block text-sm font-medium">নাম</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">
              {errors.name.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">মোবাইল</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">
              {errors.phone.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">ইমেইল (ঐচ্ছিক)</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            {...register("email")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ঠিকানা</label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            rows={3}
            {...register("address")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Processing..." : "Submit & Pay with bKash"}
        </button>

        {message && (
          <p className="mt-2 text-sm text-slate-700">{message}</p>
        )}
      </form>
    </section>
  );
}
