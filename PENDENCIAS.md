# Pendências para aprovação — ÉLORA

## Dados do lançamento e da coleção

- `[A DEFINIR: notas de topo]`
- `[A DEFINIR: notas de coração]`
- `[A DEFINIR: notas de fundo]`
- `[A DEFINIR: volume em ml]`
- `[A DEFINIR: preço]`
- `[A DEFINIR: família olfativa]`
- `[A DEFINIR: ingredientes]`
- `[A DEFINIR: duração / fixação]`
- `[A DEFINIR: data de lançamento e disponibilidade]`
- `[A DEFINIR: descrição aprovada da fragrância]`
- `[A DEFINIR: apresentação aprovada da coleção]`
- Confirmar a concentração e os dados que podem ser divulgados para o produto identificado como “Extrait de Parfum”.

## Contato, venda e publicação

- `[A DEFINIR: lojas e locais onde encontrar ÉLORA]`
- `[A DEFINIR: e-mail de contato]`
- `[A DEFINIR: telefone de contato]`
- `[A DEFINIR: endereço, se aplicável]`
- `[A DEFINIR: redes sociais oficiais]` (o mesmo item aparece no rodapé)
- Definir o domínio oficial e configurar `NEXT_PUBLIC_SITE_URL` antes do build de publicação. O endereço `https://elora.example` no conteúdo é reservado para exemplo.
- Definir o endpoint autorizado do formulário de espera em `NEXT_PUBLIC_WAITLIST_ENDPOINT`; confirmar o tratamento dos campos e a validação no próprio endpoint.
- Se necessário, fornecer uma data de copyright aprovada; o rodapé atual usa apenas “© ÉLORA”.

## Privacidade

- `[A DEFINIR: data de vigência / revisão]`
- `[A DEFINIR: razão social e nome do controlador]`
- `[A DEFINIR: CNPJ ou identificação aplicável]`
- `[A DEFINIR: canal para solicitações de privacidade]`
- `[A DEFINIR: contato do encarregado, se aplicável]`
- `[A DEFINIR: finalidade e base legal de cada operação]`
- `[A DEFINIR: prazo e critérios de retenção e eliminação]`
- `[A DEFINIR: operadores, destinatários e compartilhamentos]`
- `[A DEFINIR: medidas de segurança e eventual transferência internacional]`
- Rever e aprovar o modelo de privacidade com o controlador antes de publicar. A lista de direitos referencia o art. 18 da LGPD; ajustar o conteúdo às operações reais da marca.

## Marca, produtos e materiais

- As fotos têm frascos diferentes: `elora-frasco.jpg` mostra o frasco do lançamento com rótulo “ÉLORA / EXTRAIT DE PARFUM”; `elora-kit.jpg` mostra, dentro da apresentação, outro formato de frasco com rótulo “Perfumes de luxo”. Qual imagem deve representar cada produto e a diferença é intencional?
- Fornecer o logo ÉLORA em vetor (formato editável aprovado). Até lá, o site preserva os quatro arquivos oficiais fornecidos, sem redesenho, recoloração ou reorganização.
- Confirmar se as legendas descritivas dos recortes — tampa facetada, colar dourado com monograma e rótulo preto — estão aprovadas.
- Confirmar se a imagem do kit e o texto de apresentação podem ser usados para comunicar a embalagem, sem sugerir itens incluídos na compra.
- Aprovar ou editar cada texto marcado `draft: true` em `content/site.ts` antes da publicação.

## Textos em rascunho

Todos estão identificados no arquivo de conteúdo. Os rascunhos escritos para aprovação são:

- “Luz que encontra a sombra. Forma que guarda silêncio. Um gesto de presença, desenhado para se revelar devagar.”
- “Entre a luz dourada e a quietude da noite, cada detalhe compõe um universo de presença e descoberta.”
- “Uma assinatura que se revela no tempo de quem a encontra.”
- “Um universo concebido para ser revelado devagar.”
- “Uma forma, revelada em luz.”
- “Um gesto para oferecer.” e o texto de apresentação da composição.
- O título e o texto de abertura da página “A marca”.

## Arquivo audiovisual

- Os vídeos de publicação já foram processados: `Elora-Lancamento-fundo-web.mp4` (720×1280, 10,6 s, sem áudio) para o fundo móvel e `Elora-Lancamento-web.mp4` (720×1280, 24 s, com áudio) para o modal.
- O pôster `Elora-Lancamento-poster.webp` já usa o primeiro quadro do fundo. O original `Elora-Lancamento.mp4` permanece em `brand-assets/`; não é copiado para `public/`.
