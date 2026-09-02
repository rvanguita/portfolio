import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/base-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/projects/lake-fastf1/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects/wind-farm/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
