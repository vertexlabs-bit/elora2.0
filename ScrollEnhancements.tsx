"use client";

import { useEffect } from "react";

export function ScrollEnhancements() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let context: { revert: () => void } | undefined;
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const { gsap } = gsapModule;
      const { ScrollTrigger } = triggerModule;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });
        document.querySelectorAll<HTMLElement>("[data-mask-reveal]").forEach((element) => {
          gsap.fromTo(element, { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.35,
            ease: "power3.inOut",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        });
        const image = document.querySelector<HTMLElement>("[data-parallax]");
        if (image) {
          gsap.to(image, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: image, start: "top top", end: "bottom top", scrub: 1 },
          });
        }
      });
    }).catch(() => undefined);

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return null;
}
