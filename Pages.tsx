import Link from "next/link";
import { isReviewMode, isVisibleContent, site } from "@/content/site";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { BrandLockup } from "@/components/Logo";

export function PageIntro({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <header className="page-intro section-pad">
      <span className="eyebrow"><i aria-hidden="true" />{kicker}</span>
      <h1>{title}</h1>
      {intro && isVisibleContent(intro) && <p>{intro}</p>}
      <span className="page-intro__star" aria-hidden="true">✦</span>
    </header>
  );
}

export function BrandPageContent() {
  return (
    <>
      <PageIntro kicker={site.pages.brand.kicker} title={site.pages.brand.title} intro={site.pages.brand.intro} />
      <section className="brand-story section-pad" aria-labelledby="brand-story-heading">
        <div className="brand-story__image" data-mask-reveal>
          <ResponsiveImage base="kit" alt={site.presentation.imageAlt} sizes="(max-width: 767px) 100vw, 68vw" />
        </div>
        <div className="brand-story__copy" data-reveal>
          {isReviewMode && site.pages.brand.draft && <span className="eyebrow">{site.common.draftLabel}</span>}
          <h2 id="brand-story-heading">{site.manifesto.approvedLine}</h2>
          <p>{site.manifesto.draftText}</p>
          <p>{site.manifesto.brandIntro}</p>
          <p>{site.pages.brand.closing}</p>
        </div>
      </section>
      <section className="brand-wordmark section-pad">
        <div className="brand-wordmark__rule" aria-hidden="true" />
        <BrandLockup className="brand-wordmark__lockup" />
        <div className="brand-wordmark__rule" aria-hidden="true" />
      </section>
    </>
  );
}

export function ContactContent() {
  const contactChannels = [site.contact.email, site.contact.phone, site.contact.address].filter(isVisibleContent);

  return (
    <>
      <PageIntro kicker={site.pages.contact.kicker} title={site.pages.contact.title} intro={site.pages.contact.intro} />
      <section className="contact-details section-pad" aria-label={site.pages.contact.title}>
        {contactChannels.length > 0 && <div className="contact-details__column">
          <span className="eyebrow">{site.nav[3].label}</span>
          {contactChannels.map((value) => <p key={value}>{value}</p>)}
        </div>}
        <div className="contact-details__column">
          {isVisibleContent(site.contact.location) && <><span className="eyebrow">{site.pages.fragrances.kicker}</span><p>{site.contact.location}</p></>}
          {isVisibleContent(site.footer.social) && <span className="eyebrow">{site.footer.social}</span>}
          <Link className="button button--outline" href="/#lista-de-espera">{site.common.waitlist}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}

export function PrivacyContent() {
  const info = site.privacy;
  return (
    <>
      <PageIntro kicker={site.pages.privacy.kicker} title={site.pages.privacy.title} intro={site.pages.privacy.intro} />
      <article className="privacy-document section-pad">
        <p className="privacy-document__notice">{info.templateNote}</p>
        {isVisibleContent(info.version) && <p className="privacy-document__date">{info.version}</p>}

        <section>
          <h2>{info.headings.controller}</h2>
          {[info.controller, info.registration, info.contact, info.officer].filter(isVisibleContent).map((value) => <p key={value}>{value}</p>)}
        </section>
        <section>
          <h2>{info.headings.collected}</h2>
          <p>{info.collected}</p>
        </section>
        <section>
          <h2>{info.headings.purposes}</h2>
          {isVisibleContent(info.purposes) && <p>{info.purposes}</p>}
        </section>
        <section>
          <h2>{info.headings.sharing}</h2>
          {isVisibleContent(info.sharing) && <p>{info.sharing}</p>}
        </section>
        <section>
          <h2>{info.headings.retention}</h2>
          {isVisibleContent(info.retention) && <p>{info.retention}</p>}
        </section>
        <section>
          <h2>{info.headings.storage}</h2>
          {isVisibleContent(info.storage) && <p>{info.storage}</p>}
        </section>
        <section>
          <h2>{info.headings.rights}</h2>
          <ul>{info.rights.map((right) => <li key={right}>{right}</li>)}</ul>
          <p>{info.headings.controllerContactInstruction}</p>
          <a href={info.legalSourceUrl} target="_blank" rel="noreferrer">{info.legalSource}</a>
        </section>
        <section>
          <h2>{info.headings.cookies}</h2>
          <p>{info.cookies}</p>
        </section>
      </article>
    </>
  );
}
