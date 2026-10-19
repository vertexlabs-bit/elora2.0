type Props = {
  base: "frasco" | "kit";
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
};

const widths: Record<Props["base"], number[]> = {
  frasco: [480, 768, 960, 1145],
  kit: [480, 900, 1254],
};

export function ResponsiveImage({ base, alt, className, sizes = "100vw", priority, loading = "lazy" }: Props) {
  const candidates = widths[base];
  const srcSet = (extension: "webp" | "avif") => candidates.map((width) => `/images/${base}-${width}.${extension} ${width}w`).join(", ");
  const fallbackWidth = candidates.at(-1);

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/${base}-${fallbackWidth}.webp`}
        srcSet={srcSet("webp")}
        sizes={sizes}
        alt={alt}
        className={className}
        width={base === "frasco" ? 1145 : 1254}
        height={base === "frasco" ? 1374 : 1254}
        loading={priority ? "eager" : loading}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
