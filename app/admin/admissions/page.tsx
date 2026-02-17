import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateAdmissionStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAdmissionsPage() {
  const admissions = await prisma.admission.findMany({
    orderBy: { submittedAt: "desc" },
    include: { course: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admissions</h1>

      <div className="rounded-md border bg-white">
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
                  {new Date(admission.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{admission.name}</TableCell>
                <TableCell>{admission.phone}</TableCell>
                <TableCell>{admission.course.title}</TableCell>
                <TableCell>
                  {admission.paymentAmount ? `৳${admission.paymentAmount}` : "-"}
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
                <TableCell className="text-right space-x-2">
                  <form action={updateAdmissionStatus.bind(null, admission.id, "paid")}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      disabled={admission.status === "paid"}
                    >
                      Approve
                    </Button>
                  </form>
                  {/* Reuse form for reject if needed, tricky with multiple buttons in one form, better separate forms */}
                </TableCell>
              </TableRow>
            ))}
            {admissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No admissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
