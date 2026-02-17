import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
// import { Switch } from "@/components/ui/switch"; // Removed unused
import { createNotice, deleteNotice, toggleNoticeStatus } from "./actions";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Notices Management</h1>

      {/* Create New Notice */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Post New Notice</h2>
        <form action={createNotice} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Notice Headline" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Details..."
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isActive">Active immediately</Label>
            </div>
          </div>
          <Button type="submit">Post Notice</Button>
        </form>
      </div>

      {/* List Notices */}
      <div className="rounded-md border bg-white">
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
                  {new Date(notice.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{notice.title}</TableCell>
                <TableCell>
                  <form action={toggleNoticeStatus.bind(null, notice.id, !notice.isActive)}>
                    <Button
                      variant={notice.isActive ? "default" : "secondary"}
                      size="sm"
                      className="h-6 text-xs"
                    >
                      {notice.isActive ? "Active" : "Inactive"}
                    </Button>
                  </form>
                </TableCell>
                <TableCell className="text-right">
                  <form action={deleteNotice.bind(null, notice.id)}>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {notices.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  No notices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
