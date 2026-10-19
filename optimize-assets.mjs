import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imageDir = path.join(root, "public", "images");
const publicBrand = path.join(root, "public", "brand-assets");
const appDir = path.join(root, "app");

await fs.mkdir(imageDir, { recursive: true });
await fs.mkdir(publicBrand, { recursive: true });

const copy = async (source, destination) => fs.copyFile(path.join(root, source), path.join(root, destination));
for (const name of [
  "monograma.png",
  "nome.png",
  "slogan.png",
  "ornamento.png",
  "Elora-Lancamento-fundo-web.mp4",
  "Elora-Lancamento-web.mp4",
  "Elora-Lancamento-poster.webp",
  "Elora-Lancamento-poster.jpg",
]) {
  await copy(`brand-assets/${name}`, `public/brand-assets/${name}`);
}
await fs.rm(path.join(publicBrand, "Elora-Lancamento.mp4"), { force: true });

const convertWidths = async (source, basename, widths) => {
  const input = path.join(root, source);
  for (const width of widths) {
    const webpPath = path.join(imageDir, `${basename}-${width}.webp`);
    const avifPath = path.join(imageDir, `${basename}-${width}.avif`);
    const resize = sharp(input).resize({ width, withoutEnlargement: true });
    await Promise.all([
      resize.clone().webp({ quality: 82, effort: 5 }).toFile(webpPath),
      resize.clone().avif({ quality: 52, effort: 5 }).toFile(avifPath),
    ]);
  }
};

await Promise.all([
  convertWidths("brand-assets/elora-frasco.jpg", "frasco", [480, 768, 960, 1145]),
  convertWidths("brand-assets/elora-kit.jpg", "kit", [480, 900, 1254]),
]);

const hero = sharp(path.join(root, "brand-assets", "elora-frasco.jpg"));
const heroMeta = await hero.metadata();
const bottleCrops = [
  { name: "tampa", left: 265, top: 100, width: 615, height: 430 },
  { name: "colar", left: 350, top: 300, width: 480, height: 360 },
  { name: "rotulo", left: 335, top: 600, width: 500, height: 400 },
];
for (const crop of bottleCrops) {
  const width = Math.min(crop.width, heroMeta.width ?? crop.width);
  const height = Math.min(crop.height, heroMeta.height ?? crop.height);
  const left = Math.min(crop.left, (heroMeta.width ?? crop.width) - width);
  const top = Math.min(crop.top, (heroMeta.height ?? crop.height) - height);
  const base = sharp(path.join(root, "brand-assets", "elora-frasco.jpg")).extract({ left, top, width, height });
  await Promise.all([
    base.clone().resize({ width: 620, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(path.join(imageDir, `detalhe-${crop.name}.webp`)),
    base.clone().resize({ width: 620, withoutEnlargement: true }).avif({ quality: 55, effort: 5 }).toFile(path.join(imageDir, `detalhe-${crop.name}.avif`)),
  ]);
}

const ogPath = path.join(imageDir, "og-elora.jpg");
const background = { create: { width: 1200, height: 630, channels: 3, background: "#0c0703" } };
const kitPanel = await sharp(path.join(root, "brand-assets", "elora-kit.jpg"))
  .resize(630, 630, { fit: "contain", background: "#0c0703" })
  .jpeg({ quality: 85 }).toBuffer();
const bottlePanel = await sharp(path.join(root, "brand-assets", "elora-frasco.jpg"))
  .resize(570, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 85 }).toBuffer();
await sharp(background)
  .composite([
    { input: kitPanel, left: 0, top: 0 },
    { input: bottlePanel, left: 630, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true }).toFile(ogPath);

await sharp(path.join(root, "brand-assets", "monograma.png"))
  .resize({ width: 64, height: 64, fit: "contain", background: { r: 12, g: 7, b: 3, alpha: 0 } })
  .png()
  .toFile(path.join(appDir, "icon.png"));

console.log("Imagens otimizadas em public/images e favicon criado em app/icon.png.");
