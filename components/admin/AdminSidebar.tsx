"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  GalleryVerticalEnd,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Admissions",
    href: "/admin/admissions",
    icon: Users,
  },
  {
    title: "Notices",
    href: "/admin/notices",
    icon: Bell,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav className="space-y-1">
      {sidebarItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-base font-semibold text-foreground"
        >
          <span className="rounded-md bg-primary/10 p-1.5 text-primary">
            <GraduationCap className="h-4 w-4" />
          </span>
          KPTI Admin
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] border-slate-800 bg-slate-950 p-0 text-slate-100">
            <SheetHeader className="border-b border-slate-800 px-5 py-4">
              <SheetTitle className="text-left text-slate-100">
                KPTI Admin
              </SheetTitle>
            </SheetHeader>
            <div className="flex h-[calc(100%-64px)] flex-col">
              <div className="flex-1 overflow-y-auto p-3">
                <SidebarNav pathname={pathname} />
              </div>
              <div className="border-t border-slate-800 p-3">
                <Link href="/api/auth/signout">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <aside className="hidden h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-slate-100 md:flex">
        <div className="flex h-16 items-center border-b border-slate-800 px-5">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-base font-semibold text-white"
          >
            <span className="rounded-md bg-primary/20 p-1.5 text-primary">
              <GraduationCap className="h-4 w-4" />
            </span>
            KPTI Admin Panel
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <SidebarNav pathname={pathname} />
        </div>

        <div className="border-t border-slate-800 p-3">
          <Link href="/api/auth/signout">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
