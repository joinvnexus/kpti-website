import { BellRing, PlusCircle, Trash2 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { createNotice, deleteNotice, toggleNoticeStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <h1 className="text-3xl font-bold text-foreground">Notices Management</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Publish announcements and control visibility on the public notice board.
        </p>
      </div>

      <Card className="border-border/80 bg-card/90">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <PlusCircle className="h-5 w-5 text-primary" />
            Post New Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createNotice} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Notice headline" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write notice details here..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  defaultChecked
                  className="h-4 w-4 rounded border-border"
                />
                Publish immediately
              </label>
            </div>
            <Button type="submit">Post Notice</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/90">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BellRing className="h-5 w-5 text-primary" />
            Existing Notices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(notice.createdAt)}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {notice.title}
                    </TableCell>
                    <TableCell>
                      <form
                        action={toggleNoticeStatus.bind(
                          null,
                          notice.id,
                          !notice.isActive
                        )}
                      >
                        <Button
                          variant={notice.isActive ? "default" : "secondary"}
                          size="sm"
                        >
                          {notice.isActive ? "Active" : "Inactive"}
                        </Button>
                      </form>
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={deleteNotice.bind(null, notice.id)}>
                        <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
                {notices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                      No notices found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
