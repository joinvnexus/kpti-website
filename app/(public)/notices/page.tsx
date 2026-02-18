import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BellRing, CalendarDays, FileText, Megaphone } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notices | KPTI",
  description: "Latest updates and official announcements from KPTI.",
};

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

async function getAllNotices() {
  return prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });
}

function formatNoticeDate(value: Date): string {
  return new Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

function isRecentNotice(value: Date): boolean {
  return Date.now() - value.getTime() <= ONE_WEEK_IN_MS;
}

export default async function NoticesPage() {
  const notices = await getAllNotices();
  const latestNotice = notices[0];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container-base relative section-padding">
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
            Notice Board
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold text-foreground md:text-5xl">
            Latest Notices and Announcements
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Stay updated with class schedules, admission updates, and important institute notices.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Card className="border-border/70 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <BellRing className="h-4 w-4 text-primary" />
                Active notices: {notices.length}
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                Latest: {latestNotice ? formatNoticeDate(latestNotice.createdAt) : "No notices yet"}
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <Megaphone className="h-4 w-4 text-primary" />
                Official institute updates
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-base section-padding">
        {notices.length === 0 ? (
          <Card className="mx-auto max-w-2xl border-dashed border-border/80 bg-card/80 text-center">
            <CardContent className="flex flex-col items-center p-10">
              <FileText className="mb-4 h-10 w-10 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground">No notices available</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Please check again later for new announcements.
              </p>
              <Button asChild className="mt-6">
                <Link href="/">Go Back Home</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {latestNotice && (
              <Card className="border-primary/25 bg-card/90 shadow-sm">
                <CardHeader>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge>Latest</Badge>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatNoticeDate(latestNotice.createdAt)}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-foreground">{latestNotice.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Featured announcement from KPTI notice board.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                    {latestNotice.content}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {notices.map((notice) => {
                const recent = isRecentNotice(notice.createdAt);
                const longContent = notice.content.length > 220;
                const preview = longContent ? `${notice.content.slice(0, 220).trim()}...` : notice.content;

                return (
                  <Card
                    key={notice.id}
                    className="group border-border/70 bg-card/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatNoticeDate(notice.createdAt)}
                        </span>
                        {recent && <Badge variant="outline">New</Badge>}
                      </div>

                      <CardTitle className="line-clamp-2 text-xl text-foreground">{notice.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0">
                      <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{preview}</p>

                      {longContent && (
                        <details className="group/details rounded-md border border-border/70 bg-muted/30 p-3">
                          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-primary">
                            Read full notice
                            <ArrowRight className="h-4 w-4 transition-transform group-open/details:rotate-90" />
                          </summary>
                          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                            {notice.content}
                          </p>
                        </details>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
