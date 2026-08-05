import ThemeRegistry from "@/components/ThemeRegistry";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Đào Hoa Nữ — Full-stack Developer",
  description: "Portfolio cá nhân của Đào Hoa Nữ — Full-stack Developer, AI & Automation.",
  icons: {
    apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><ThemeRegistry>{children}</ThemeRegistry></body></html>;
}
