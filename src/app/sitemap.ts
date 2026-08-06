import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dhnu.io.vn/",
      lastModified: new Date("2026-08-06"),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
