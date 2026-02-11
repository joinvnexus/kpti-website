import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: Add Header / Navbar */}
      <main className="flex-1">{children}</main>
      {/* TODO: Add Footer */}
    </div>
  );
}



