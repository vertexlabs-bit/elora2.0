# ÉLORA — Perfumes de luxo

Site institucional para o lançamento do **ÉLORA Extrait de Parfum**, em Next.js 16.4.2 (versão fixada), App Router, TypeScript, Tailwind CSS e GSAP. As páginas são exportadas como HTML estático para `out/`.

## Rodar localmente

Use Node.js 20.9 ou superior. Na pasta do projeto:

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Abra `http://localhost:3000`. O `.env.example` ativa `NEXT_PUBLIC_MODO_REVISAO=true` para mostrar rótulos de rascunho e placeholders durante a revisão. O formulário de espera fica desativado sem `NEXT_PUBLIC_WAITLIST_ENDPOINT`; em desenvolvimento, o site mostra como habilitá-lo.

## Build e publicação

```powershell
npm run lint
npm run build
```

O conteúdo estático é gerado em `out/`. Publique essa pasta na Vercel, Netlify ou em qualquer hospedagem estática. Em uma plataforma de hospedagem que faça o build a partir do código, use `npm run build` como comando de build e `out` como diretório publicado. O `postinstall` tenta aplicar dois ajustes de compatibilidade ao exportador do Next.js 16.4.2 somente no Windows. Em outras plataformas, não altera `node_modules`; se a versão fixada mudar ou o código esperado não for encontrado, o script avisa e termina sem bloquear a instalação.

Antes do build de produção, configure o domínio oficial (sem barra no final):

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://seu-dominio-oficial"
$env:NEXT_PUBLIC_MODO_REVISAO = "false"
npm run build
```

O valor padrão `https://elora.example` é somente um domínio de exemplo reservado; substitua-o antes de publicar para que os endereços em `sitemap.xml`, `robots.txt` e nas metatags sejam corretos.

Use `NEXT_PUBLIC_MODO_REVISAO=true` para revisar os rótulos de rascunho e os placeholders. Antes do build de publicação, defina-o como `false`; assim os rótulos somem e os valores `[A DEFINIR]` são omitidos.

## Textos, produto e imagens

- Edite textos, links, metadados, placeholders e a coleção em [content/site.ts](content/site.ts). Componentes leem o conteúdo desse arquivo.
- Registre dados que ainda faltam em [PENDENCIAS.md](PENDENCIAS.md). Textos de clima estão marcados como rascunho no conteúdo.
- Substitua os arquivos originais em `brand-assets/` e rode `npm run assets` para gerar as imagens AVIF/WebP responsivas, os recortes dos detalhes, a imagem Open Graph e o favicon.
- Os quatro PNGs do lockup oficial permanecem sem alteração. O lockup completo usa as coordenadas e proporções aprovadas no briefing; cada peça tem largura CSS abaixo do limite de marca.
- O MP4 original permanece somente em `brand-assets/`. `npm run assets` copia os vídeos processados e os pôsteres usados pelo site para `public/brand-assets/`, além do monograma, nome, slogan e ornamento.

## Formulário de espera

Defina `NEXT_PUBLIC_WAITLIST_ENDPOINT` para um endpoint HTTPS autorizado pela marca antes de compilar o site. O navegador envia `name`, `email`, `whatsapp` (ou `null`) e `consent: true` por POST JSON. Respostas HTTP fora da faixa 2xx mostram o estado de erro. A validação básica é nativa do navegador; o endpoint também deve validar os campos e o consentimento. O site não guarda os dados no `localStorage` e não inclui serviços de terceiros para armazená-los.

## Filme de lançamento

Os arquivos de publicação já estão processados e integrados: `Elora-Lancamento-fundo-web.mp4` (720×1280, 10,6 s, 1 MB, sem áudio) é o fundo em loop no celular; `Elora-Lancamento-web.mp4` (720×1280, 24 s, 3,2 MB, com áudio) é aberto no modal; `Elora-Lancamento-poster.webp` é o pôster do primeiro quadro. Rode `npm run assets` para copiar essas versões para `public/brand-assets/`. O original `Elora-Lancamento.mp4` continua em `brand-assets/` e não é publicado.

## Capturas de tela

As capturas da home em 390×844 e 1440×900 ficam em `screenshots/`, se o navegador disponível no ambiente permitir gerá-las.

## Publicar na Vercel

O projeto já traz `vercel.json` (build `npm run build`, pasta publicada `out`, URLs sem `.html`, cabeçalhos de segurança e cache) e `.vercelignore` (não envia os vídeos grandes de `brand-assets/`; os usados pelo site já estão em `public/`).

1. Envie a pasta `site-elora-codex` para um repositório no GitHub (sem `node_modules`, `.next` e `out`; o `.gitignore` já cobre isso).
2. Em vercel.com, **Add New → Project**, escolha o repositório. Se o repositório for maior que esta pasta, defina **Root Directory** como `site-elora-codex`. As demais opções vêm do `vercel.json`.
3. Em **Settings → Environment Variables** (Production), defina:
   - `NEXT_PUBLIC_SITE_URL`: o endereço oficial, ex.: `https://www.seudominio.com.br`
   - `NEXT_PUBLIC_MODO_REVISAO`: `true` enquanto o cliente revisa (mostra rascunhos e `[A DEFINIR]`); `false` para a versão pública
   - `NEXT_PUBLIC_WAITLIST_ENDPOINT`: o destino autorizado do formulário (vazio = envio desativado)
4. **Deploy**. Depois de mudar variáveis, faça **Redeploy**, porque elas entram no build.
5. Domínio próprio: **Settings → Domains**.

Pela linha de comando: `npm i -g vercel`, depois `vercel` (prévia) e `vercel --prod` (produção).
Sugestão: deixe o projeto de revisão com `NEXT_PUBLIC_MODO_REVISAO=true` e use `false` só no de publicação.
