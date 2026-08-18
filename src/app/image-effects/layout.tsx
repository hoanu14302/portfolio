import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Effects Studio — Đào Hoa Nữ",
  description:
    "Trải nghiệm công cụ xử lý hiệu ứng ảnh nghệ thuật trực tuyến: Pixel Glitch, Double Exposure, Dispersion, Matrix Rain, Neon Cyberpunk do Đào Hoa Nữ phát triển.",
  keywords: [
    "AI Image Effects",
    "Pixel Glitch Generator",
    "Double Exposure",
    "Matrix Rain",
    "Image Effects Studio",
    "Đào Hoa Nữ Image Effects",
    "Dao Hoa Nu AI tool",
    "xử lý ảnh nghệ thuật",
  ],
  alternates: {
    canonical: "https://dhnu.io.vn/image-effects",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://dhnu.io.vn/image-effects",
    siteName: "Đào Hoa Nữ — Portfolio",
    title: "AI Image Effects Studio — Đào Hoa Nữ",
    description:
      "Trải nghiệm công cụ xử lý hiệu ứng ảnh nghệ thuật trực tuyến: Pixel Glitch, Double Exposure, Dispersion, Matrix Rain, Neon Cyberpunk.",
    images: [
      {
        url: "/hoa-nu.png",
        width: 1200,
        height: 630,
        alt: "AI Image Effects Studio — Đào Hoa Nữ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Effects Studio — Đào Hoa Nữ",
    description:
      "Trải nghiệm công cụ xử lý hiệu ứng ảnh nghệ thuật trực tuyến do Đào Hoa Nữ phát triển.",
    images: ["/hoa-nu.png"],
  },
};

export default function ImageEffectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
