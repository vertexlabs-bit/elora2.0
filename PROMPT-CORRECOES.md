# Site ÉLORA: correções da rodada 2

Revisei a primeira versão. `npm run lint` e `npm run build` passaram. As 6 páginas carregam sem erros no console, com um h1 cada, e não há rolagem horizontal em 390 e 1440 px. Corrija os itens abaixo nesta ordem e não altere o que não estiver listado. Os arquivos em `brand-assets/` são os originais: não os modifique.

## Arquivos novos em `brand-assets/` (já processados com ffmpeg)

- `Elora-Lancamento-fundo-web.mp4`: fundo do hero no celular. 720×1280, 10,6 s, 1,0 MB, sem áudio e **sem textos gravados** (cristal → frasco → fenda de luz → kit), com fade de entrada e saída para o loop.
- `Elora-Lancamento-web.mp4`: filme completo para o modal "Assistir ao filme". 720×1280, 24 s, 3,2 MB, com som.
- `Elora-Lancamento-poster.webp` e `.jpg`: primeiro quadro do fundo, 720×1280.

## 1. Hero no celular: título duplicado (grave)

O fundo usa `Elora-Lancamento.mp4`, que já traz gravados no vídeo os textos "Lançamento / O novo luxo tem nome.". No celular, eles aparecem por trás do título HTML, duplicados e desalinhados. Faça assim:

- Copie os arquivos novos para `public/brand-assets/` e aponte os caminhos:
  - `media.autoplayFilm` → `Elora-Lancamento-fundo-web.mp4`, mudo e em loop;
  - `media.film` → `Elora-Lancamento-web.mp4`, no modal;
  - `media.poster` → `Elora-Lancamento-poster.webp`.
- Tire `Elora-Lancamento.mp4` (16,6 MB) de `public/`. Ele fica só em `brand-assets/`, como original.
- O fundo não tem áudio, então o botão "Som" do hero perde o sentido. Troque-o por um botão que abre o modal do filme com som.
- Atualize o README e o PENDENCIAS: o vídeo já está processado.

## 2. Momento assinatura: monograma duplicado e partículas fracas (grave)

**Problema:** as partículas formam um monograma grande (cerca de 365 px no desktop) no centro da seção. Por cima dele aparece o lockup completo, que tem o próprio monograma, e o "ÉLORA" e o "PERFUMES DE LUXO" ficam sobre o monograma de partículas. Há ainda a `img.signature__monogram`, que aparece como fantasma. Na prática, isso altera o logo. As partículas também são pontos de 0,7 a 1,2 px, sem brilho, e o "momento uau" não acontece.

**Como refazer:**
1. Fixe a seção (pin do ScrollTrigger) e guie a animação pela rolagem, em três fases:
   - as partículas giram em redemoinho;
   - elas convergem **exatamente para a posição e o tamanho do monograma do lockup** (use o `getBoundingClientRect()` da peça `monograma.png` do `BrandLockup`); o PNG oficial surge por cima num cruzamento rápido, enquanto as partículas somem;
   - nome, slogan e ornamento entram depois, um de cada vez, com um brilho passando pelo nome.
2. Nunca mostre dois monogramas ao mesmo tempo. Remova a `img.signature__monogram`. Sem JavaScript, ou com `prefers-reduced-motion`, mostre só o lockup estático.
3. Dê brilho às partículas:
   - sprite radial pré-desenhado, com núcleo claro e borda dourada transparente;
   - `globalCompositeOperation = 'lighter'`;
   - raio de 1,5 a 4 px CSS e cintilação leve;
   - um halo radial dourado atrás do monograma no instante em que ele se forma.
4. Respeite o limite de 290 px de largura para o monograma.

## 3. Rótulos de rascunho e placeholders à mostra

O texto "Rascunho para aprovação" aparece no site (manifesto e apresentação), e a ficha do produto mostra nove linhas `[A DEFINIR]`. Para revisão isso ajuda, mas não pode ir ao ar.

- Crie `NEXT_PUBLIC_MODO_REVISAO`:
  - com `true`, mostre os rótulos de rascunho e os placeholders;
  - com qualquer outro valor, esconda os rótulos e omita da ficha os itens cujo valor ainda comece com `[A DEFINIR`.
- Deixe `true` no `.env.example` e explique no README como gerar o build de publicação.

## 4. Textos que afirmam material

"Vidro lapidado em formas geométricas." e "Cada linha do frasco reúne vidro facetado…" afirmam material e processo que a foto não comprova. Use descrições só visuais, ainda como rascunho:

- "Tampa facetada, de formas geométricas.";
- "Cada linha do frasco reúne facetas, reflexos dourados e o rótulo preto ÉLORA Extrait de Parfum.";
- revise os `alt` que dizem "vidro" da mesma forma.

## 5. Acento solto em "essência"

Na Cormorant Garamond 500 regular, o circunflexo de "essência" fica alto e deslocado para a direita. É do desenho da fonte: o Google Fonts mostra igual. Com 96 px e entrelinha 0,95, ele parece solto entre as linhas.

- Use o itálico 500 no título do manifesto, como já acontece no filme.
- Confira também "silêncio", no parágrafo logo abaixo.

## 6. Patch do Next.js no `postinstall`

O script altera arquivos de `node_modules/next` e lança erro se não encontrar o trecho esperado. Com isso, qualquer atualização do Next quebra o `npm install`, inclusive em servidores Linux, que nem precisam do patch.

- Aplique o patch só no Windows (`process.platform === 'win32'`).
- Quando não encontrar o trecho, mostre um aviso em vez de lançar erro.
- Mantenha a versão do Next fixa e registre isso no README.

## 7. Hero no desktop

A tampa do frasco fica cortada no topo da tela, atrás do header. Ajuste a posição ou a escala para a tampa aparecer inteira, com respiro abaixo do header, em 1440×900 e 1920×1080.

## Verificação

- `npm run lint` e `npm run build` sem erros.
- Capturas em 390×844 e 1440×900:
  - do hero;
  - da seção assinatura em três momentos (redemoinho, monograma formado, lockup completo);
  - do manifesto.
- Se o navegador integrado não acessar o servidor local, diga isso no relatório e siga em frente: as capturas serão feitas fora daqui.
