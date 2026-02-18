import { CheckCircle2, Clock3, Users } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateAdmissionStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAdmissionsPage() {
  const admissions = await prisma.admission.findMany({
    orderBy: { submittedAt: "desc" },
    include: { course: true },
  });

  const paidCount = admissions.filter((item) => item.status === "paid").length;
  const pendingCount = admissions.filter((item) => item.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <h1 className="text-3xl font-bold text-foreground">Admissions</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Review submitted admissions and update payment status.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/80 bg-card/90">
          <CardContent className="p-5">
            <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">Total Admissions</p>
            <p className="text-3xl font-semibold text-foreground">{admissions.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/90">
          <CardContent className="p-5">
            <div className="mb-3 inline-flex rounded-lg bg-amber-500/10 p-2 text-amber-600">
              <Clock3 className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-semibold text-foreground">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/90">
          <CardContent className="p-5">
            <div className="mb-3 inline-flex rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-3xl font-semibold text-foreground">{paidCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/80 bg-card/90">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Admission Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admissions.map((admission) => (
                  <TableRow key={admission.id}>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(admission.submittedAt)}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {admission.name}
                    </TableCell>
                    <TableCell>{admission.phone}</TableCell>
                    <TableCell>{admission.course.title}</TableCell>
                    <TableCell>
                      {admission.paymentAmount ? `BDT ${admission.paymentAmount}` : "N/A"}
                      {admission.paymentTrxId && (
                        <div className="text-xs text-muted-foreground">
                          Trx: {admission.paymentTrxId}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <form action={updateAdmissionStatus.bind(null, admission.id, "paid")}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20"
                            disabled={admission.status === "paid"}
                          >
                            Approve
                          </Button>
                        </form>
                        <form action={updateAdmissionStatus.bind(null, admission.id, "rejected")}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-900/20"
                            disabled={admission.status === "rejected"}
                          >
                            Reject
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {admissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      No admissions found.
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
