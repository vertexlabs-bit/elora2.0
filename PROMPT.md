# Site da ÉLORA — Perfumes de Luxo (com destaque para o lançamento do ÉLORA Extrait de Parfum)

Crie do zero o site institucional da marca de perfumes **ÉLORA** ("Perfumes de luxo"). O site apresenta a marca como um todo, mas o protagonista agora é o **lançamento da nova fragrância, ÉLORA Extrait de Parfum**. Em poucos segundos, quem entra deve sentir que está diante de uma marca de luxo e de um lançamento. Idioma: português do Brasil.

## 1. Arquivos da marca (pasta `brand-assets/` na raiz)

- `elora-frasco.jpg` (1145×1374): foto do frasco do lançamento. Tampa facetada que lembra uma joia, colar dourado com o monograma, rótulo preto "ÉLORA / EXTRAIT DE PARFUM", fundo escuro com mármore negro de veios dourados. É a imagem principal do produto.
- `elora-kit.jpg` (1254×1254): composição da marca com frasco, caixa preta com fita dourada e o texto "Exclusividade em cada essência", cartão com selo de cera. O logo está impresso no canto superior esquerdo: ao recortar, nunca deixe o logo cortado pela metade.
- `monograma.png` (588×618), `nome.png` (1326×330, wordmark ÉLORA), `slogan.png` (966×102, "PERFUMES DE LUXO"), `ornamento.png` (846×114): peças do logo oficial recortadas da arte, com fundo transparente. São raster ampliado 3× a partir de um recorte pequeno.
- `monograma-pontos.json`: 1476 pontos normalizados (0–1, relativos à caixa de `monograma.png`) que desenham o monograma, para o efeito de partículas.
- `Elora-Lancamento.mp4`: filme de lançamento vertical 9:16, 1080×1920, 24 s, com trilha (16,6 MB).

**Lockup oficial do logo** (posições na arte original, em px da imagem do kit): monograma x228 y86 w196 h206 · nome x98 y296 w442 h110 · slogan x160 y420 w322 h34 · ornamento x182 y458 w282 h38. Sempre que o logo completo aparecer, monte-o exatamente nesse arranjo e nessas proporções (as 4 peças num contêiner com essas posições relativas, ou um único PNG composto a partir delas).

## 2. Regras de marca e de conteúdo (obrigatórias)

1. Não redesenhe, não recolora, não distorça e não reorganize o logo. Não recrie o monograma ou o nome com fonte ou SVG "parecido". A versão vetorial fica como pendência para o cliente fornecer.
2. Para manter a nitidez em telas 2×, exiba as peças raster no máximo com estas larguras CSS: monograma 290 px, nome 660 px, slogan 480 px, ornamento 420 px.
3. **Não invente informações.** Isso vale para: notas olfativas, família olfativa, ingredientes, concentração, fixação/duração, volume (ml), preço, data de lançamento, lojas, endereço, telefone, redes sociais, história/fundação, origem, prêmios, depoimentos e números. Tudo isso entra como placeholder visível, `[A DEFINIR: …]`, centralizado no arquivo de conteúdo.
4. Textos aprovados para uso direto:
   - "ÉLORA", "Perfumes de luxo" e "Extrait de Parfum" (estão no produto);
   - "Exclusividade em cada essência." (impresso na caixa);
   - "Lançamento";
   - "O novo luxo tem nome." (assinatura do filme de lançamento).
5. Você pode escrever textos de clima ou manifesto: evocativos, sem afirmações verificáveis, marcados como `rascunho: true` no arquivo de conteúdo, para aprovação. Descreva o frasco só pelo que se vê na foto.
6. As duas fotos mostram frascos diferentes: o do kit tem rótulo "Perfumes de luxo" e outro formato. Trate `elora-frasco.jpg` como o produto lançado e o kit como imagem de marca e apresentação. Registre a diferença como pergunta para o cliente.

## 3. Direção de arte

- **Clima:** joalheria noturna, luz dourada rasante, cristal, mármore negro com veios de ouro. Muito espaço escuro, poucos elementos por tela, ritmo lento e preciso. Luxo silencioso, com um "momento uau" que encante qualquer idade.
- **Paleta** (medida na arte): preto quente `#0C0703`, marrom profundo `#1E130A`, ouro do logo `#B8936A`, ouro claro `#E2C393`, marfim `#F5ECDC`. Sem amarelo saturado e sem grandes áreas de branco puro.
- **Tipografia:**
  - Títulos em serifada de alto contraste: Cormorant Garamond 500, itálico para ênfase.
  - Rótulos, menu e botões em sans geométrica, caixa alta e espaçada: Jost 400/500, letter-spacing de 0,2 a 0,35em.
  - Corpo com no mínimo 17 px, entrelinha 1,6, marfim sobre preto (contraste AA).
  - Fontes hospedadas no próprio projeto (next/font ou arquivos locais), sem CDN em produção.
- **Detalhes:** linhas finas douradas, estrela de 4 pontas como a do ornamento, granulação sutil opcional.
- **Evite:** sombras pesadas, cantos muito arredondados, gradientes coloridos, ícones genéricos e cara de template.

## 4. Estrutura do site

**Páginas:**
1. `/` **Início**: vitrine da marca, com o lançamento em primeiro plano.
2. `/lancamento`: página do ÉLORA Extrait de Parfum (filme, frasco, detalhes, notas `[A DEFINIR]`, lista de espera).
3. `/a-marca`: manifesto e universo ÉLORA (rascunho).
4. `/fragrancias`: coleção lida de um arquivo de dados. Hoje há só um produto: o layout precisa ficar bonito com um e escalar para vários. Não crie produtos fictícios.
5. `/contato`: contato e onde encontrar (placeholders).
6. `/privacidade`: modelo de política de privacidade conforme a LGPD, com placeholders.

**Início, de cima para baixo:**

- **Header:** fixo, transparente sobre o hero, escurecendo com a rolagem.
  - Monograma pequeno e o nome.
  - Menu: Lançamento, A marca, Fragrâncias, Contato.
  - Botão "Lista de espera".
  - No mobile, menu em tela cheia.
- **Hero do lançamento** (100svh):
  - Textos: kicker "LANÇAMENTO", título "O novo luxo tem nome.", subtítulo "ÉLORA Extrait de Parfum".
  - CTAs: "Descobrir a fragrância" e "Entrar na lista de espera".
  - Desktop: o frasco em destaque, com câmera lenta (zoom ou parallax na rolagem) e uma faixa de luz atravessando o vidro (máscara CSS).
  - Mobile: o filme vertical em tela cheia, mudo, com autoplay, loop e `playsinline`, mais um botão de som.
  - Nos dois casos, um botão "Assistir ao filme" abre o filme com som num modal acessível.
- **Momento assinatura**, guiado pela rolagem: um pó de ouro em canvas gira e se junta até formar o monograma (use `monograma-pontos.json`). Em seguida o lockup completo é revelado, com um brilho passando pelo nome. É o "momento uau" do site.
- **A fragrância:**
  - Foto do frasco, nome e tipo (Extrait de Parfum).
  - Notas de topo, coração e fundo como `[A DEFINIR]`; volume e preço `[A DEFINIR]`.
  - CTA.
- **Detalhes do frasco:** 3 recortes ampliados da foto (tampa facetada, colar dourado com monograma, rótulo), com legendas curtas e descritivas, revelados por máscara na rolagem.
- **Manifesto:** "Exclusividade em cada essência." em tipografia grande, um parágrafo curto (rascunho) e link para `/a-marca`.
- **A apresentação:** imagem do kit (caixa, frasco, cartão com selo) e um texto curto sobre presentear. É rascunho e não promete o que vem na compra.
- **Lista de espera:**
  - Campos: nome, e-mail, WhatsApp (opcional) e checkbox de consentimento LGPD com link para `/privacidade`.
  - Validação no navegador e estados de envio, sucesso e erro.
  - O envio vai para um endpoint configurável (`NEXT_PUBLIC_WAITLIST_ENDPOINT`). Sem endpoint, o envio fica desativado, com aviso só em desenvolvimento.
  - Não guarde dados em localStorage e não envie a serviços de terceiros por conta própria.
- **Rodapé:** lockup do logo, slogan, links, redes `[A DEFINIR]`, © ÉLORA e link de privacidade.

## 5. Movimento

- **Ferramentas:** GSAP com ScrollTrigger; Lenis opcional para rolagem suave.
- **Estilo:** animações lentas e com propósito (revelações por máscara, faixas de luz, parallax leve). Nada de bounce, giros gratuitos ou excesso de efeitos.
- **Movimento reduzido:** com `prefers-reduced-motion`, desligue parallax, partículas e varreduras, e mostre os estados finais estáticos.
- **Sem JavaScript:** o conteúdo precisa estar no HTML; o site deve fazer sentido sem JS.
- **Canvas de partículas:** pausa fora da tela, limita o devicePixelRatio a 2 e reduz a quantidade de partículas no mobile.

## 6. Técnica

- **Stack:** Next.js (App Router, versão estável atual), TypeScript e Tailwind CSS, com exportação estática (`output: 'export'`) para hospedar em qualquer lugar.
- **Conteúdo:** todos os textos, links, produtos e placeholders ficam em um arquivo de conteúdo (`content/site.ts`). Componentes não têm texto fixo.
- **Imagens:** versões AVIF/WebP responsivas, `sizes` corretos, lazy-load abaixo da dobra e prioridade para a imagem do hero.
- **Vídeo:**
  - A partir do MP4, gere uma versão web: H.264, 720×1280, cerca de 2 a 4 MB, `+faststart`.
  - Gere também uma versão sem áudio para o autoplay e um pôster do primeiro quadro.
  - Se não houver ffmpeg no ambiente, deixe os comandos no README e use o original por enquanto.
- **SEO:**
  - Title e description por página, `lang="pt-BR"`.
  - Open Graph e Twitter card, com imagem 1200×630 feita a partir do kit.
  - sitemap.xml e robots.txt.
  - JSON-LD de Organization e Product, sem `offers` enquanto não houver preço.
  - Favicon a partir do monograma.
- **Acessibilidade:** HTML semântico, um h1 por página, alt descritivo, foco visível em dourado, navegação por teclado, modal acessível e contraste AA.
- **Desempenho:**
  - Lighthouse mobile com 90 ou mais em Performance, Accessibility, Best Practices e SEO.
  - LCP abaixo de 2,5 s.
  - Nenhuma rolagem horizontal de 320 a 1920 px.
- **Privacidade:** sem analytics, pixels ou cookies de rastreamento. Deixe só um ponto preparado para incluir depois, com consentimento.

## 7. Entrega

1. O projeto roda com `npm run dev`, e `npm run build` gera o site estático sem erros nem avisos de lint.
2. `README.md`: como rodar, gerar o build e publicar (Vercel, Netlify ou hospedagem estática), como editar textos e trocar imagens.
3. `PENDENCIAS.md`: todos os `[A DEFINIR]`, os textos em rascunho e as perguntas ao cliente, incluindo a diferença entre os frascos e o pedido do logo em vetor.
4. Capturas de tela da home em 390×844 e 1440×900, se o ambiente permitir.
5. Antes de encerrar, revise criticamente cada seção no mobile e no desktop. Corrija o que estiver desalinhado, ilegível ou genérico, e confirme que nenhuma informação foi inventada.
