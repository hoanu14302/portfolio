import ThemeRegistry from "@/components/ThemeRegistry";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dhnu.io.vn"),
  title: {
    default: "Đào Hoa Nữ — Full-stack Developer & AI Automation",
    template: "%s | Đào Hoa Nữ",
  },
  description:
    "Portfolio của Đào Hoa Nữ — Full-stack Developer tại Việt Nam, chuyên phát triển web, AI integration, chatbot và tự động hóa quy trình.",
  keywords: [
    "Đào Hoa Nữ",
    "Hoa Nữ Đào",
    "full-stack developer Việt Nam",
    "AI automation developer",
    "Next.js developer",
    "Golang developer",
    "chatbot AI",
    "tự động hóa quy trình",
  ],
  authors: [{ name: "Đào Hoa Nữ", url: "https://dhnu.io.vn" }],
  creator: "Đào Hoa Nữ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    url: "https://dhnu.io.vn/",
    siteName: "Đào Hoa Nữ",
    title: "Đào Hoa Nữ — Full-stack Developer & AI Automation",
    description:
      "Full-stack Developer chuyên phát triển web, AI integration, chatbot và tự động hóa quy trình.",
    images: [
      {
        url: "/hoa-nu.png",
        width: 1200,
        height: 630,
        alt: "Đào Hoa Nữ — Full-stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đào Hoa Nữ — Full-stack Developer & AI Automation",
    description:
      "Portfolio của Đào Hoa Nữ — phát triển web, AI integration, chatbot và tự động hóa.",
    images: ["/hoa-nu.png"],
  },
  robots: { index: true, follow: true },
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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Đào Hoa Nữ",
    alternateName: "Hoa Nữ Đào",
    url: "https://dhnu.io.vn/",
    image: "https://dhnu.io.vn/hoa-nu.png",
    jobTitle: "Full-stack Developer",
    description:
      "Full-stack Developer chuyên phát triển web, AI integration, chatbot và tự động hóa quy trình.",
    email: "mailto:hoanu14302@gmail.com",
    telephone: "+84967223771",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Long Xuyên",
      addressRegion: "An Giang",
      addressCountry: "VN",
    },
    sameAs: [
      "https://github.com/hoanu14302",
      "https://linkedin.com/in/hoa-nữ-đào-79b949313",
    ],
    knowsAbout: [
      "Full-stack web development",
      "Artificial intelligence",
      "Workflow automation",
      "Chatbot integration",
      "Deep learning",
    ],
  };

  return (
    <html lang="vi">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
