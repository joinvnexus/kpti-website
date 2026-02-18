import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  BookOpen,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [totalCourses, totalAdmissions, paidAdmissions, pendingAdmissions, activeNotices, recentAdmissions] =
    await Promise.all([
      prisma.course.count(),
      prisma.admission.count(),
      prisma.admission.count({ where: { status: "paid" } }),
      prisma.admission.count({ where: { status: "pending" } }),
      prisma.notice.count({ where: { isActive: true } }),
      prisma.admission.findMany({
        take: 5,
        orderBy: { submittedAt: "desc" },
        include: {
          course: {
            select: {
              title: true,
            },
          },
        },
      }),
    ]);

  return {
    totalCourses,
    totalAdmissions,
    paidAdmissions,
    pendingAdmissions,
    activeNotices,
    recentAdmissions,
  };
}

const cards = [
  {
    title: "Total Courses",
    key: "totalCourses",
    icon: BookOpen,
    href: "/admin/courses",
  },
  {
    title: "Total Admissions",
    key: "totalAdmissions",
    icon: Users,
    href: "/admin/admissions",
  },
  {
    title: "Pending Admissions",
    key: "pendingAdmissions",
    icon: Clock3,
    href: "/admin/admissions",
  },
  {
    title: "Active Notices",
    key: "activeNotices",
    icon: BellRing,
    href: "/admin/notices",
  },
] as const;

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-background p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">
              Admin Dashboard
            </Badge>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Monitor admissions, notices, and course updates from one place.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
            <p className="text-muted-foreground">Paid Admissions</p>
            <p className="text-2xl font-semibold text-primary">
              {data.paidAdmissions}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <Card
            key={item.key}
            className="border-border/80 bg-card/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="mt-1 text-3xl font-semibold text-foreground">
                {data[item.key]}
              </p>
              <Link
                href={item.href}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                View details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/80 bg-card/90">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Recent Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentAdmissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No recent admissions found.
            </p>
          ) : (
            <div className="space-y-3">
              {data.recentAdmissions.map((admission) => (
                <div
                  key={admission.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{admission.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {admission.course.title} • {admission.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        admission.status === "paid"
                          ? "default"
                          : admission.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {admission.status}
                    </Badge>
                    {admission.status === "paid" && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5">
            <Button asChild variant="outline">
              <Link href="/admin/admissions">Manage Admissions</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
