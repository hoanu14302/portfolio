import ThemeRegistry from "@/components/ThemeRegistry";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["vietnamese", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhnu.io.vn"),
  title: {
    default: "Đào Hoa Nữ (Dao Hoa Nu) — Full-stack Developer & AI Automation",
    template: "%s | Đào Hoa Nữ",
  },
  description:
    "Portfolio của Đào Hoa Nữ (Dao Hoa Nu) — Full-stack Developer & AI Engineer tại Việt Nam. Chuyên phát triển Web (Next.js, Golang, Python), tích hợp AI, Chatbot và tự động hóa quy trình (n8n, Zapier).",
  keywords: [
    "Đào Hoa Nữ",
    "Dao Hoa Nu",
    "Hoa Nữ Đào",
    "Hoa Nu Dao",
    "dhnu",
    "dhnu.io.vn",
    "hoanu14302",
    "Đào Hoa Nữ portfolio",
    "Dao Hoa Nu portfolio",
    "Đào Hoa Nữ developer",
    "Dao Hoa Nu developer",
    "full-stack developer Việt Nam",
    "AI automation developer",
    "Next.js developer",
    "Golang developer",
    "Python developer",
    "chatbot AI",
    "tự động hóa quy trình",
    "n8n automation",
  ],
  authors: [{ name: "Đào Hoa Nữ", url: "https://dhnu.io.vn" }],
  creator: "Đào Hoa Nữ",
  publisher: "Đào Hoa Nữ",
  alternates: {
    canonical: "https://dhnu.io.vn",
  },
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://dhnu.io.vn/",
    siteName: "Đào Hoa Nữ — Portfolio",
    title: "Đào Hoa Nữ (Dao Hoa Nu) — Full-stack Developer & AI Automation",
    description:
      "Portfolio của Đào Hoa Nữ — Full-stack Developer & AI Engineer. Chuyên phát triển Web hiện đại, tích hợp AI, Chatbot và tự động hóa quy trình.",
    images: [
      {
        url: "/hoa-nu.png",
        width: 1200,
        height: 630,
        alt: "Đào Hoa Nữ — Full-stack Developer & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đào Hoa Nữ (Dao Hoa Nu) — Full-stack Developer & AI Automation",
    description:
      "Portfolio của Đào Hoa Nữ — Web Development, AI Integration, Chatbot & Workflow Automation.",
    images: ["/hoa-nu.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION,
  },
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://dhnu.io.vn/#website",
        url: "https://dhnu.io.vn",
        name: "Đào Hoa Nữ — Portfolio",
        alternateName: [
          "Dao Hoa Nu Portfolio",
          "dhnu",
          "dhnu.io.vn",
          "Đào Hoa Nữ",
          "Dao Hoa Nu",
        ],
        description:
          "Trang cá nhân và portfolio của Đào Hoa Nữ (Dao Hoa Nu) — Full-stack Developer & AI Automation Engineer.",
        inLanguage: ["vi", "en"],
        publisher: {
          "@id": "https://dhnu.io.vn/#person",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://dhnu.io.vn/#webpage",
        url: "https://dhnu.io.vn",
        name: "Đào Hoa Nữ (Dao Hoa Nu) — Full-stack Developer & AI Automation",
        isPartOf: {
          "@id": "https://dhnu.io.vn/#website",
        },
        about: {
          "@id": "https://dhnu.io.vn/#person",
        },
        mainEntity: {
          "@id": "https://dhnu.io.vn/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://dhnu.io.vn/#person",
        name: "Đào Hoa Nữ",
        alternateName: [
          "Dao Hoa Nu",
          "Hoa Nữ Đào",
          "Hoa Nu Dao",
          "dhnu",
          "hoanu14302",
        ],
        url: "https://dhnu.io.vn",
        image: "https://dhnu.io.vn/hoa-nu.png",
        jobTitle: "Full-stack Developer & AI Automation Engineer",
        description:
          "Full-stack Developer tại Việt Nam, chuyên phát triển web hiện đại (Next.js, Golang, Python), AI integration, chatbot và tự động hóa quy trình (n8n, Zapier).",
        email: "mailto:hoanu14302@gmail.com",
        telephone: "+84967223771",
        gender: "Female",
        nationality: "Vietnamese",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Long Xuyên",
          addressRegion: "An Giang",
          addressCountry: "VN",
        },
        sameAs: [
          "https://github.com/hoanu14302",
          "https://linkedin.com/in/hoa-nữ-đào-79b949313",
          "https://dhnu.io.vn",
        ],
        knowsAbout: [
          "Full-stack web development",
          "Next.js",
          "React",
          "TypeScript",
          "Golang",
          "Python",
          "Artificial intelligence",
          "Workflow automation",
          "Chatbot AI",
          "Deep learning",
          "n8n",
        ],
      },
    ],
  };

  return (
    <html lang="vi" className={lexend.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
