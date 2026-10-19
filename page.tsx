import type { Metadata } from "next";
import { site } from "@/content/site";
import { BrandPageContent } from "@/components/Pages";

export const metadata: Metadata = {
  title: site.metadata.brand.title,
  description: site.metadata.brand.description,
};

export default function BrandPage() {
  return <main id="conteudo-principal" className="inner-page brand-page"><BrandPageContent /></main>;
}
