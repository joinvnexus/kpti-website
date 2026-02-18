import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "TEXTKPTI – Technical & Vocational Training Institute",
  description:
    "BTEB approved technical training institute – courses, admission, notices, gallery and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
