import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Đào Hoa Nữ — Full-stack Developer",
  description: "Portfolio cá nhân của Đào Hoa Nữ — Full-stack Developer, AI & Automation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><ThemeRegistry>{children}</ThemeRegistry></body></html>;
}
