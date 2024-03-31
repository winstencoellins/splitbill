import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const inter = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Split Bill Application",
  description: "Split bill application created to simplify our internal split bill purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
