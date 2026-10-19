"use client";

import pointsData from "@/brand-assets/monograma-pontos.json";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { BrandLockup } from "@/components/Logo";

type Point = [number, number];
type Bounds = { x: number; y: number; width: number; height: number };

const points: Point[] = pointsData.pontos.map((point): Point => [point[0]!, point[1]!]);
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

function makeParticleSprite() {
  const sprite = document.createElement("canvas");
  sprite.width = 64;
  sprite.height = 64;
  const context = sprite.getContext("2d");
  if (!context) return sprite;

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 248, 228, 1)");
  gradient.addColorStop(0.13, "rgba(255, 231, 184, .96)");
  gradient.addColorStop(0.38, "rgba(226, 195, 147, .54)");
  gradient.addColorStop(1, "rgba(184, 147, 106, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return sprite;
}

export function SignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLImageElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const glintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const sticky = section?.querySelector<HTMLElement>(".signature__sticky");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !section || !sticky || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const activePoints = mobile ? points.filter((_, index) => index % 2 === 0) : points;
    const sprite = makeParticleSprite();
    let width = 0;
    let height = 0;
    let scale = 1;
    let progress = 0;
    let elapsed = 0;
    let active = false;
    let frameId = 0;
    let targetBounds: Bounds | undefined;
    let gsapContext: { revert: () => void } | undefined;

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const measureTarget = () => {
      const monogram = monogramRef.current;
      if (!monogram) return;
      const canvasBounds = canvas.getBoundingClientRect();
      const monogramBounds = monogram.getBoundingClientRect();
      targetBounds = {
        x: monogramBounds.left - canvasBounds.left,
        y: monogramBounds.top - canvasBounds.top,
        width: monogramBounds.width,
        height: monogramBounds.height,
      };
    };

    const draw = () => {
      if (!active) return;
      context.clearRect(0, 0, width, height);
      const target = targetBounds;
      if (!target || target.width === 0 || target.height === 0) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      const centerX = target.x + target.width / 2;
      const centerY = target.y + target.height / 2;
      const formation = smooth((progress - 0.45) / 0.2);
      const haloOpacity = formation * (1 - smooth((progress - 0.76) / 0.12));
      if (haloOpacity > 0) {
        const haloRadius = Math.max(target.width, target.height) * 1.65;
        const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, haloRadius);
        halo.addColorStop(0, `rgba(184, 128, 63, ${0.43 * haloOpacity})`);
        halo.addColorStop(0.34, `rgba(184, 128, 63, ${0.19 * haloOpacity})`);
        halo.addColorStop(1, "rgba(184, 128, 63, 0)");
        context.fillStyle = halo;
        context.fillRect(centerX - haloRadius, centerY - haloRadius, haloRadius * 2, haloRadius * 2);
      }

      context.globalCompositeOperation = "lighter";
      const spiralProgress = clamp(progress / 0.34);
      const convergence = smooth((progress - 0.34) / 0.27);
      const particleFade = 1 - smooth((progress - 0.6) / 0.13);
      const maxRadius = Math.max(width, height) * 0.52;
      const rotation = elapsed * 0.00034 + spiralProgress * Math.PI * 4.5;

      activePoints.forEach(([u, v], index) => {
        const seed = ((index * 37) % 101) / 100;
        const angle = (index / activePoints.length) * Math.PI * 12 + rotation;
        const radius = maxRadius * (0.35 + seed * 0.65) * (1 - spiralProgress * 0.18);
        const swirlX = width / 2 + Math.cos(angle) * radius;
        const swirlY = height / 2 + Math.sin(angle * 0.76) * radius * 0.73;
        const targetX = target.x + u * target.width;
        const targetY = target.y + v * target.height;
        const x = swirlX + (targetX - swirlX) * convergence;
        const y = swirlY + (targetY - swirlY) * convergence;
        const twinkle = 0.8 + (Math.sin(elapsed * 0.004 + index * 1.73) + 1) * 0.1;
        const particleRadius = (1.5 + seed * 2.5) * twinkle;

        context.globalAlpha = particleFade * (0.63 + seed * 0.37);
        context.drawImage(sprite, x - particleRadius, y - particleRadius, particleRadius * 2, particleRadius * 2);
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      elapsed += 16;
      frameId = window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) {
        measureTarget();
        cancelAnimationFrame(frameId);
        frameId = window.requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frameId);
      }
    }, { rootMargin: "120px 0px" });

    const onResize = () => {
      resizeCanvas();
      measureTarget();
    };

    observer.observe(section);
    resizeCanvas();
    measureTarget();
    window.addEventListener("resize", onResize, { passive: true });

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const { gsap } = gsapModule;
      const { ScrollTrigger } = triggerModule;
      gsap.registerPlugin(ScrollTrigger);
      section.classList.add("signature--animated");
      resizeCanvas();
      measureTarget();
      gsapContext = gsap.context(() => {
        const monogram = monogramRef.current;
        const name = lockupRef.current?.querySelector<HTMLElement>(".brand-lockup__name");
        const slogan = lockupRef.current?.querySelector<HTMLElement>(".brand-lockup__slogan");
        const ornament = lockupRef.current?.querySelector<HTMLElement>(".brand-lockup__ornament");
        const kicker = kickerRef.current;
        const caption = captionRef.current;
        const glint = glintRef.current;
        if (!monogram || !name || !slogan || !ornament || !kicker || !caption || !glint) return;

        const stagedElements = [monogram, name, slogan, ornament, kicker, caption];
        gsap.set(stagedElements, { opacity: 0 });
        gsap.set([name, slogan, ornament, kicker, caption], { y: 12 });
        gsap.set(glint, { backgroundPosition: "130% 0", opacity: 0 });

        const proxy = { value: 0 };
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: sticky,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: measureTarget,
          },
        });
        timeline.to(proxy, {
          value: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => { progress = proxy.value; },
        }, 0);
        timeline.to(kicker, { opacity: 1, y: 0, duration: 0.1, ease: "none" }, 0.03);
        timeline.to(monogram, { opacity: 1, duration: 0.11, ease: "none" }, 0.59);
        timeline.to(name, { opacity: 1, y: 0, duration: 0.08, ease: "none" }, 0.7);
        timeline.to(glint, { opacity: 1, duration: 0.01, ease: "none" }, 0.78);
        timeline.to(glint, { backgroundPosition: "-130% 0", duration: 0.1, ease: "none" }, 0.78);
        timeline.to(glint, { opacity: 0, duration: 0.03, ease: "none" }, 0.87);
        timeline.to(slogan, { opacity: 1, y: 0, duration: 0.08, ease: "none" }, 0.86);
        timeline.to(ornament, { opacity: 1, y: 0, duration: 0.08, ease: "none" }, 0.94);
        timeline.to(caption, { opacity: 1, y: 0, duration: 0.05, ease: "none" }, 0.97);
      }, section);
    }).catch(() => section.classList.remove("signature--animated"));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      gsapContext?.revert();
      section.classList.remove("signature--animated");
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="signature" aria-label={site.signature.ariaLabel} ref={sectionRef}>
      <div className="signature__sticky">
        <div className="signature__grain" aria-hidden="true" />
        <canvas className="signature__canvas" ref={canvasRef} aria-hidden="true" />
        <div className="signature__copy">
          <span ref={kickerRef} className="eyebrow signature__kicker">{site.signature.kicker}</span>
          <div className="signature__lockup-wrap" ref={lockupRef}>
            <BrandLockup className="signature__lockup" monogramRef={monogramRef} />
            <span className="signature__glint" ref={glintRef} aria-hidden="true" />
          </div>
          <span ref={captionRef} className="signature__caption">{site.signature.description}</span>
        </div>
      </div>
    </section>
  );
}
