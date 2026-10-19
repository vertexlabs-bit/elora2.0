import Image from "next/image";
import type { Ref } from "react";

const pieces = [
  { name: "monograma.png", className: "brand-lockup__monogram", alt: "" },
  { name: "nome.png", className: "brand-lockup__name", alt: "ÉLORA" },
  { name: "slogan.png", className: "brand-lockup__slogan", alt: "Perfumes de luxo" },
  { name: "ornamento.png", className: "brand-lockup__ornament", alt: "" },
];

export function BrandLockup({ className = "", monogramRef }: { className?: string; monogramRef?: Ref<HTMLImageElement> }) {
  return (
    <span className={`brand-lockup ${className}`} aria-label="ÉLORA — Perfumes de luxo">
      {pieces.map((piece) => (
        <Image
          key={piece.name}
          ref={piece.name === "monograma.png" ? monogramRef : undefined}
          src={`/brand-assets/${piece.name}`}
          alt={piece.alt}
          width={piece.name === "monograma.png" ? 588 : piece.name === "nome.png" ? 1326 : piece.name === "slogan.png" ? 966 : 846}
          height={piece.name === "monograma.png" ? 618 : piece.name === "nome.png" ? 330 : piece.name === "slogan.png" ? 102 : 114}
          unoptimized
          className={piece.className}
        />
      ))}
    </span>
  );
}

export function HeaderBrand() {
  return (
    <span className="header-brand" aria-label="ÉLORA — Perfumes de luxo">
      <Image src="/brand-assets/monograma.png" alt="" width={588} height={618} unoptimized className="header-brand__monogram" />
      <Image src="/brand-assets/nome.png" alt="ÉLORA" width={1326} height={330} unoptimized className="header-brand__name" />
    </span>
  );
}
