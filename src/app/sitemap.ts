import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dhnu.io.vn/",
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
