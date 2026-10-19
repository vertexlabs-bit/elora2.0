"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { ResponsiveImage } from "@/components/ResponsiveImage";

export function FilmDialog({ label = site.common.watchFilm }: { label?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog?.showModal) {
      window.open(site.media.film, "_blank", "noopener,noreferrer");
      return;
    }
    dialog.showModal();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      void videoRef.current.play().catch(() => undefined);
    }
  };
  const closeDialog = () => {
    videoRef.current?.pause();
    if (dialogRef.current?.open) dialogRef.current.close();
  };

  return (
    <>
      <button type="button" className="text-link film-trigger" onClick={openDialog}>{label}<span aria-hidden="true">↗</span></button>
      <dialog
        className="film-dialog"
        ref={dialogRef}
        aria-label={site.hero.videoDialogTitle}
        onClick={(event) => { if (event.target === dialogRef.current) closeDialog(); }}
        onClose={() => videoRef.current?.pause()}
      >
        <div className="film-dialog__inner">
          <button type="button" className="film-dialog__close" onClick={closeDialog} aria-label={site.common.close}>×</button>
          <video ref={videoRef} controls playsInline preload="none" aria-label={site.hero.videoAlt}>
            <source src={site.media.film} type="video/mp4" />
          </video>
        </div>
      </dialog>
    </>
  );
}

export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__mobile-film" aria-hidden="true">
        <video
          className="hero__mobile-video"
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster={site.media.poster}
          aria-label={site.hero.videoAlt}
        >
          <source src={site.media.autoplayFilm} type="video/mp4" />
        </video>
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content">
        <span className="eyebrow hero__kicker"><i aria-hidden="true" />{site.hero.kicker}</span>
        <h1 id="hero-heading">{site.hero.title}</h1>
        <p className="hero__product">{site.hero.product}</p>
        <div className="hero__actions">
          <Link href="/lancamento" className="button button--gold">{site.common.discover}<span aria-hidden="true">↗</span></Link>
          <Link href="/#lista-de-espera" className="button button--text">{site.common.joinWaitlist}</Link>
        </div>
        <div className="hero__film-controls">
          <FilmDialog />
        </div>
      </div>
      <div className="hero__product-frame" data-parallax>
        <ResponsiveImage base="frasco" alt={site.hero.imageAlt} sizes="(max-width: 767px) 100vw, 58vw" priority className="hero__product-image" />
        <span className="hero__light" aria-hidden="true" />
      </div>
      <div className="hero__index" aria-hidden="true"><span>01</span><i /></div>
    </section>
  );
}
