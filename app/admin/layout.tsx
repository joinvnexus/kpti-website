import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* TODO: Sidebar / Admin Navigation */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}



