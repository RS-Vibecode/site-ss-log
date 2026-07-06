# S&S Log — STATUS do site

Port fiel do protótipo HTML v1 (`HUB RS/squads/criacao-digital/projects/clientes/ss-log/site/v1/prototipo/`) para **Next.js 16** (App Router, Tailwind v4, TypeScript). Copy, design e comportamento portados verbatim.

Build: `npm run build` **verde** — 6 rotas, todas estáticas (`/`, `/politica-privacidade`, `/sitemap.xml`, `/robots.txt`, `/icon.png`, `/_not-found`). TypeScript sem erros.

---

## O que ficou pronto

- **Single-page completa** na ordem do brief: Hero → Problema (`#quem-somos`) → Solução → Estrutura & Segurança (`#estrutura`) → banda de vídeo → Segmentos (`#segmentos`) → Serviços (`#servicos`) → Como funciona → FAQ → CTA final (`#contato`) → Footer. Copy **verbatim** do protótipo (headlines, bullets, 7 serviços, 5 segmentos, timeline, 8 FAQs).
- **Design tokens** em `app/globals.css` (paleta `--c-*`, radius 6px) + `@theme` Tailwind v4 (`brand-*`) + fontes via `next/font/google` (Barlow, Inter, JetBrains Mono, self-hosted — sem request ao Google).
- **Navbar** (`components/site/navbar.tsx`): transparente sobre o hero → branca com blur ao rolar >80px; menu mobile full-screen.
- **Hero com a foto de drone real**, otimizada com `sharp`: `public/media/hero-drone.webp` (~175 KB, 1920px) + `hero-drone.jpg` (~141 KB, 1600px, fallback/OG), servida via `next/image` (`fill`, `priority`).
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
| **Vídeos** (5 cards de estrutura, banda intermediária, fundo do CTA final) | Seções Estrutura, banda, CTA final | Placeholders CSS/gradiente com label mono (`▶ Vídeo · ...`, `PLACEHOLDER · ...`). Trocar por `<video>` quando os vídeos editados chegarem. |
| **Nº das licenças** ANVISA/IBAMA/IMA | Card 6 "Licenças" + FAQ #1 | Slots pontilhados "aguardando print + nº"; texto `[PENDENTE — números de registro]`. |
| **Tempo de onboarding** | Seção "Como funciona" (nota) | `[A INCLUIR — tempo médio em dias úteis, a confirmar com o cliente]`. |
| **IDs de tracking** | `.env` | `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_META_PIXEL_ID` vazios → tracking inerte. |
| **Domínio** | `lib/site.ts` (`url: https://seslog.com.br`) | A confirmar no go-live. |

> Nota: `public/media/drone-aerea-original.jpg` (~4,6 MB) é o master da foto aérea. Não é servido em runtime (usamos as versões otimizadas). Pode ser removido de `public/` antes do deploy para enxugar o bundle.

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
