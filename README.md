# S&S Log

S&S Log - armazenagem e logistica licenciada (ANVISA, IBAMA, IMA) no Triangulo Mineiro.

Projeto gerado pela fábrica **sites-rs** (hub RS). Repo independente — deploy próprio na Vercel.

- Escopo: **cliente**
- Stack: Next.js + Tailwind + shadcn/ui
- Rodapé: marca do cliente + selo `<DevelopedByRS />`

## Rodar

```bash
npm install
npm run dev
```

## Próximos passos (agente / dev)

1. Wire do `layout.tsx`: `<Header />`, `<main>`, `<Footer />` (+ `<DevelopedByRS />`).
2. Tema/marca → skill `brand-theme` (o brand RS já está em `public/brand/rs/` e `lib/rs-brand.ts`).
3. Páginas → skills `landing-page` / `institutional-site` / etc.
4. Validar → skill `quality-pipeline` (`node ...setup-quality.mjs` depois `npm run validate`).
5. Páginas legais (LGPD): `/privacidade`, `/termos` + consent.

> Brand RS vendorizado da fábrica; não editar à mão — re-vendorize da fábrica se atualizar.
