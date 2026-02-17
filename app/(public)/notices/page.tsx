import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const revalidate = 60;

async function getAllNotices() {
  return await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
}

export const metadata = {
  title: "Notices - KPTI",
  description: "Latest updates and announcements from KPTI.",
};

export default async function NoticesPage() {
  const notices = await getAllNotices();

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">নোটিশ বোর্ড</h1>

      {notices.length === 0 ? (
        <p className="text-center text-slate-500">বর্তমানে কোন নোটিশ নেই।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {notices.map((notice) => (
            <Card key={notice.id}>
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(notice.createdAt).toLocaleDateString("bn-BD", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <CardTitle className="text-xl">{notice.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-slate-700">
                  {notice.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
