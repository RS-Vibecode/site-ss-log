# S&S Log — STATUS do site

Port fiel do protótipo HTML v1 (`HUB RS/squads/criacao-digital/projects/clientes/ss-log/site/v1/prototipo/`) para **Next.js 16** (App Router, Tailwind v4, TypeScript). Copy, design e comportamento portados verbatim.

Build: `npm run build` **verde** — 6 rotas, todas estáticas (`/`, `/politica-privacidade`, `/sitemap.xml`, `/robots.txt`, `/icon.png`, `/_not-found`). TypeScript sem erros.

---

## O que ficou pronto

- **Single-page completa** na ordem do brief: Hero → Problema (`#quem-somos`) → Solução → **O Armazém / showcase (`#o-armazem`)** → Estrutura & Segurança (`#estrutura`) → faixa "Movimentação real" → Segmentos (`#segmentos`) → Serviços (`#servicos`) → Como funciona → FAQ → CTA final (`#contato`) → Footer. Copy **verbatim** do protótipo (headlines, bullets, 7 serviços, 5 segmentos, timeline, 8 FAQs).
- **Design tokens** em `app/globals.css` (paleta `--c-*`, radius 6px) + `@theme` Tailwind v4 (`brand-*`) + fontes via `next/font/google` (Barlow, Inter, JetBrains Mono, self-hosted — sem request ao Google).
- **Navbar** (`components/site/navbar.tsx`): transparente sobre o hero → branca com blur ao rolar >80px; menu mobile full-screen.
- **Hero com vídeo de drone real** (único vídeo do site), otimizado com `ffmpeg` a partir do master 4K/60fps: `public/media/hero-video.webm` (VP9, ~5 MB, fonte primária) + `hero-video.mp4` (H.264 faststart, ~8,6 MB, fallback universal) + `hero-poster.webp` (~184 KB, frame do vídeo, poster/first-paint). `<video autoPlay muted loop playsInline>` cobrindo o hero (`object-fit: cover`); `scroll-effects.tsx` pausa o vídeo em `prefers-reduced-motion` (fica o poster). Todas as demais seções usam fotos.
- **Fotos reais de drone (2026-06-27) em todas as seções de mídia** — 62 masters (interior + aéreas) em `temp/FOTOS` (não versionado), otimizadas com `sharp` para `public/media/*.webp` (~1000px cards / ~1600–1920px full-bleed, total ~2,2 MB), servidas via `next/image` (`fill`, `object-fit: cover`):
  - **6 cards de Estrutura**: `estrutura-armazem` (interior porta-paletes), `estrutura-expansao` (piso livre), `estrutura-bunker` (racking segregado), `estrutura-eclusas` (doca), `estrutura-portaria` (aérea do perímetro/entrada — **ilustrativa**, ver pendências); card "Licenças" mantém os slots pontilhados.
  - **Nova seção `#o-armazem`** (bento): `showcase-predio` (fachada S&S Log) + `showcase-transporte` (docas c/ carretas) + `showcase-fachada` (logo), com legendas.
  - **Faixa "Movimentação real"**: `movimentacao.webp` de fundo + véu azul p/ legibilidade (era placeholder de vídeo).
  - **Fundo do CTA final**: `cta-aerea.webp` sob véu azul da marca (opacity ~.82) — era placeholder de vídeo.
  - **Imagem OG/Twitter**: `og-ss-log.jpg` (1200×630, fachada com logo S&S Log) — substituiu `hero-drone.jpg`.
- **Comportamentos JS** como client components mínimos (o resto é Server Component):
  - `scroll-effects.tsx` — reveal-on-scroll (IntersectionObserver, respeita `prefers-reduced-motion`; sem JS há fallback via `<noscript>`) + play/pause das bandas de vídeo.
  - `whatsapp-handler.tsx` — handler global de `[data-wa]`: reescreve o href para `wa.me/5534999044040` com mensagem contextual por `data-cta-location` (mapa `MESSAGES` em `lib/whatsapp.ts`) + passthrough de UTM `(via origem X · mídia Y · ...)` + dispara tracking.
  - `cookie-banner.tsx` — banner LGPD (Aceitar/Recusar), persiste `localStorage` `sslog_consent_v1`, reabrível por `[data-cookie-prefs]` (rodapé + política).
- **LGPD / Consent Mode v2**: script inline no topo do `<body>` do layout, tudo `denied` por padrão (functionality/security `granted`, `wait_for_update:500`), reaplica o consentimento salvo antes de qualquer tag. No aceite empurra `gtag('consent','update', ...granted)` + `fbq('consent','grant')`.
- **Página `/politica-privacidade`** — 10 seções verbatim, `noindex`, botão client "Limpar minhas preferências de cookies" (`cookie-reset-button.tsx`, também reabre o banner).
- **Tracking** (`tracking.tsx`) gateado por consentimento e **inerte sem IDs**: lê `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` (vazios por padrão → nada carrega). Com IDs: GA4 (`config` + `anonymize_ip`) + Meta Pixel; no clique WhatsApp dispara GA4 `whatsapp_click {cta_location}` + Meta `Lead {content_name, content_category:'whatsapp'}`.
- **SEO**: metadata (title, description, OG/Twitter com imagem, `metadataBase`, canonical), JSON-LD **LocalBusiness** (+ `priceRange "$$"`, `areaServed` Sudeste/Centro-Oeste/Sul, taxID) e **FAQPage** (8 perguntas), `app/sitemap.ts` (só a home) + `app/robots.ts`.
- **Rodapé de cliente** com selo `<DevelopedByRS/>` (marca RS vendorizada) + CNPJ 44.573.981/0001-31 + links Política de Privacidade e "Preferências de cookies".

---

## Placeholders — aguardando o cliente

| Item | Onde | Estado |
|---|---|---|
| **Fotos ilustrativas (não literais)** | Cards "Pronto p/ expansão", "Bunker" e "Controle Biométrico" | Não há foto exata no lote (área vazia, bunker isolado, portaria/facial). Usadas as internas/aéreas mais próximas como **ilustrativas**. Trocar por foto/vídeo específico se o cliente quiser literalidade — sobretudo a **portaria com reconhecimento facial** (claim de segurança). |
| **Nº das licenças** ANVISA/IBAMA/IMA | Card 6 "Licenças" + FAQ #1 | Slots pontilhados "aguardando print + nº"; texto `[PENDENTE — números de registro]`. |
| **Tempo de onboarding** | Seção "Como funciona" (nota) | `[A INCLUIR — tempo médio em dias úteis, a confirmar com o cliente]`. |
| **IDs de tracking** | `.env` | `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_META_PIXEL_ID` vazios → tracking inerte. |
| **Domínio** | `lib/site.ts` (`url: https://seslog.com.br`) | A confirmar no go-live. |

> Fotos-fonte: 62 masters JPG/DNG do cliente (drone, 2026-06-27) ficam em `projects/site-ss-log/temp/FOTOS` — pasta **ignorada pelo git** (`/temp/`). Só os derivados otimizados em `public/media` são versionados. Panorâmicas 360° (#0033–0035, #0084–0085) não foram usadas (distorção equiretangular — serviriam a um tour 360 futuro).

---

## Como rodar / deployar

```bash
cd projects/site-ss-log
npm install          # se ainda não instalado
npm run dev          # desenvolvimento (http://localhost:3000)
npm run build        # build de produção (deve ficar verde)
npm run start        # serve o build localmente
```

- **Variáveis de ambiente**: copiar `.env.example` → `.env.local` e preencher os IDs de tracking quando o cliente entregar (deixe comentado/vazio para manter o tracking inerte).
- **Deploy**: projeto Next.js padrão — Vercel (import do repositório) ou qualquer host Node. Sem repositório GitHub criado nem deploy feito (conforme instrução). Apontar o domínio real e ajustar `siteConfig.url` se mudar.
