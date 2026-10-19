import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/lancamento", "/a-marca", "/fragrancias", "/contato", "/privacidade"];
  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
