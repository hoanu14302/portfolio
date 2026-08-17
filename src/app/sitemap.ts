import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dhnu.io.vn/",
      lastModified: new Date("2026-08-06"),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://dhnu.io.vn/image-effects",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
