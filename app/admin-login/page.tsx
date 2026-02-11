"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(4, "পাসওয়ার্ড দিন"),
});

type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    } else {
      router.push("/(admin)/dashboard");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 rounded-md bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold text-center">Admin Login</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message?.toString()}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}


