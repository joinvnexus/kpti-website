"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Admission", href: "/admission" },
  { name: "Notices", href: "/notices" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container-base">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-lg bg-gradient-subtle group-hover:bg-primary/10 transition-colors">
              <GraduationCap className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:inline">KPTI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/admission" className="hidden md:block">
              <button className="btn-primary btn-sm">
                Apply Now
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in-down space-y-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admission" 
            onClick={() => setIsOpen(false)} 
            className="block pt-2 border-t border-border"
          >
            <button className="btn-primary w-full">
              Apply Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
