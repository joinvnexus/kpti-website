import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="container-base py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
