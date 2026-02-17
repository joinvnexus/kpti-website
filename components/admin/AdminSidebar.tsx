"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Bell,
    Image as ImageIcon,
    LogOut,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        icon: ImageIcon,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-slate-900 text-white">
            <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <h1 className="text-xl font-bold">KPTI Admin</h1>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800",
                                pathname.startsWith(item.href)
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "text-slate-400"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t border-slate-800 p-4">
                {/* Placeholder for Logout - integrate with NextAuth later */}
                <Link href="/api/auth/signout">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </Link>
            </div>
        </div>
    );
}
