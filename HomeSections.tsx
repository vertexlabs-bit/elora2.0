import Link from "next/link";
import { isReviewMode, isVisibleContent, site } from "@/content/site";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { SignatureCanvas } from "@/components/SignatureCanvas";
import { FilmDialog } from "@/components/FilmAndHero";
import { WaitlistForm } from "@/components/WaitlistForm";

export function ProductFacts() {
  const facts = site.product.facts.filter((fact) => isVisibleContent(fact.value));
  if (facts.length === 0) return null;

  return (
    <dl className="product-facts">
      {facts.map((fact) => (
        <div className="product-facts__item" key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HomeSections() {
  return (
    <>
      <SignatureCanvas />

      <section className="product-intro section-pad" aria-labelledby="product-heading">
        <div className="product-intro__image" data-reveal>
          <ResponsiveImage base="frasco" alt={site.product.imageAlt} sizes="(max-width: 767px) 94vw, 44vw" />
          <span className="product-intro__image-rule" aria-hidden="true" />
        </div>
        <div className="product-intro__copy" data-reveal>
          <span className="eyebrow"><i aria-hidden="true" />{site.hero.kicker}</span>
          <h2 id="product-heading">ÉLORA<br /><em>Extrait de Parfum</em></h2>
          <p>{site.pages.launch.details}</p>
          <ProductFacts />
          <Link href="/lancamento" className="button button--outline">{site.common.seeFragrance}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <BottleDetails />

      <section className="manifesto section-pad" aria-labelledby="manifesto-heading">
        <span className="manifesto__star" aria-hidden="true">✦</span>
        {isReviewMode && site.manifesto.draft && <span className="eyebrow">{site.common.draftLabel}</span>}
        <h2 id="manifesto-heading">{site.manifesto.approvedLine}</h2>
        <p>{site.manifesto.draftText}</p>
        <Link href="/a-marca" className="text-link">{site.common.readMore}<span aria-hidden="true">↗</span></Link>
      </section>

      <section className="presentation section-pad" aria-labelledby="presentation-heading">
        <div className="presentation__image" data-mask-reveal>
          <ResponsiveImage base="kit" alt={site.presentation.imageAlt} sizes="(max-width: 767px) 100vw, 55vw" />
        </div>
        <div className="presentation__copy" data-reveal>
          <span className="eyebrow">{site.presentation.kicker}</span>
          <h2 id="presentation-heading">{site.presentation.title}</h2>
          <p>{site.presentation.text}</p>
          {isReviewMode && site.presentation.draft && <span className="draft-note">{site.common.draftLabel}</span>}
        </div>
      </section>

      <WaitlistForm />
    </>
  );
}

export function BottleDetails() {
  return (
    <section className="bottle-details section-pad" aria-labelledby="details-heading">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">{site.product.shortName}</span>
        <h2 id="details-heading">{site.product.detailTitle}</h2>
      </div>
      <div className="bottle-details__grid">
        {site.product.details.map((detail, index) => (
          <article className="detail-card" key={detail.title} data-reveal>
            <picture className="detail-card__picture" data-mask-reveal>
              <source srcSet={detail.image.replace(".webp", ".avif")} type="image/avif" />
              <img src={detail.image} alt={detail.alt} width={620} height={420} loading="lazy" decoding="async" />
            </picture>
            <div className="detail-card__caption">
              <span className="detail-card__index">0{index + 1}</span>
              <div><h3>{detail.title}</h3><p>{detail.caption}</p></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductInformation() {
  return (
    <section className="launch-product section-pad" aria-labelledby="launch-product-heading">
      <div className="launch-product__photo" data-mask-reveal>
        <ResponsiveImage base="frasco" alt={site.product.imageAlt} sizes="(max-width: 767px) 100vw, 50vw" />
      </div>
      <div className="launch-product__copy" data-reveal>
        <span className="eyebrow">{site.hero.kicker}</span>
        <h2 id="launch-product-heading">{site.product.name}</h2>
        <p>{site.pages.launch.details}</p>
        <ProductFacts />
        <Link className="button button--gold" href="/#lista-de-espera">{site.common.joinWaitlist}<span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

export function LaunchFilmSection() {
  return (
    <section className="launch-film section-pad" aria-labelledby="launch-film-heading">
      <div className="launch-film__copy">
        <span className="eyebrow">{site.hero.kicker}</span>
        <h2 id="launch-film-heading">{site.hero.title}</h2>
        <p>{site.hero.product}</p>
      </div>
      <div className="launch-film__frame" data-mask-reveal>
        <ResponsiveImage base="frasco" alt={site.hero.imageAlt} sizes="(max-width: 767px) 92vw, 70vw" />
        <span className="launch-film__play" aria-hidden="true">✦</span>
        <FilmDialog />
      </div>
    </section>
  );
}

export function FragranceCollection() {
  return (
    <section className="fragrance-collection section-pad" aria-label={site.pages.fragrances.title}>
      <div className="fragrance-grid">
        {site.product.collection.map((product, index) => (
          <article className="fragrance-card" key={product.name} data-reveal>
            <Link href={site.product.launchLink} className="fragrance-card__image" aria-label={`${site.common.seeFragrance}: ${product.name}`}>
              <ResponsiveImage base="frasco" alt={product.imageAlt} sizes="(max-width: 767px) 90vw, 50vw" />
              <span className="fragrance-card__number">0{index + 1}</span>
            </Link>
            <div className="fragrance-card__info">
              <div><h2>{product.name}</h2><span>{product.type}</span></div>
              <Link href={site.product.launchLink} aria-label={`${site.common.seeFragrance}: ${product.name}`}>↗</Link>
            </div>
            {isVisibleContent(product.description) && <p>{product.description}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
