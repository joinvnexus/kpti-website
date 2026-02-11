import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
