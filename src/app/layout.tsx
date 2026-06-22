import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worknflow.com";
const siteDescription =
  "Find tested AI workflows with prompts, examples, and checklists for school, coding, research, writing, and productivity.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WorknFlow — Tested AI Workflows",
    template: "%s",
  },
  description: siteDescription,
  applicationName: "WorknFlow",
  openGraph: {
    description: siteDescription,
    siteName: "WorknFlow",
    title: "WorknFlow — Tested AI Workflows",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    description: siteDescription,
    title: "WorknFlow — Tested AI Workflows",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
