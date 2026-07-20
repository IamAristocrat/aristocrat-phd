import type { MetadataRoute } from "next";
import { serviceData } from "./services/service-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://phd.aristocratresearch.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/start`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/evidence`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/confidentiality`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/service-agreement`, changeFrequency: "yearly", priority: 0.4 },
    ...Object.keys(serviceData).map((slug) => ({ url: `${base}/services/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
