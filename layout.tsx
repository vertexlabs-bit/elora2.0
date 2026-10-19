import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@/app/globals.css";
import { site } from "@/content/site";
import { Header, Footer } from "@/components/SiteChrome";
import { ScrollEnhancements } from "@/components/ScrollEnhancements";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.metadata.home.title, template: "%s" },
  description: site.metadata.home.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.metadata.home.title,
    description: site.metadata.home.description,
    images: [{ url: "/images/og-elora.jpg", width: 1200, height: 630, alt: site.common.organizationImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.home.title,
    description: site.metadata.home.description,
    images: ["/images/og-elora.jpg"],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  description: site.slogan,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo-principal">{site.common.skip}</a>
        <Header />
        <ScrollEnhancements />
        {children}
        <Footer />
        <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
