# S&S Log — HANDOFF (doc vivo)

Estado real do projeto e o que falta fazer. **Atualize este arquivo a cada sessão.**
Última atualização: **2026-07-15**.

> `STATUS.md` é histórico (documenta o port do protótipo v1, de julho/2026) e está
> desatualizado em vários pontos — o site mudou de posicionamento depois dele.
> Para o estado atual, use **este** arquivo.

---

## 1. O que existe hoje

| | |
|---|---|
| **Produto** | Site institucional (`/`) + **LP de campanha** (`/lp-01`) |
| **Cliente** | SALLES & SANTOS LOG LTDA · CNPJ 44.573.981/0001-31 · Uberaba/MG |
| **Contato comercial** | André Carvalho · (34) 99904-4040 · andre.carvalho@seslog.com.br |
| **Stack** | Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · CSS próprio |
| **Repo** | `RS-Vibecode/site-ss-log` (privado) — ⚠️ ver §6 |
| **Último commit** | `33e1f54` |

### Ambientes

| Ambiente | URL | Papel | Deploy |
|---|---|---|---|
| **Vercel RS** | https://site-ss-log.vercel.app | Staging / revisão | `vercel --prod` com o link da RS |
| **Vercel Fardas** | site-ss-log-three.vercel.app → alias `seslog.com.br` | **Produção real** | `vercel --prod --scope fardas-uniformes-dev-s-projects` + token |
| **seslog.com.br** | ainda no WordPress antigo | — | depende do cutover de DNS (§4.3) |

> ⚠️ **A Vercel do Fardas está desatualizada** — não tem a LP. Última publicação lá foi
> antes de 2026-07-15. Para atualizar é preciso um **token novo do time** (eles expiram
> rápido) e o truque do `.git` (§6).

### Posicionamento (pós-call de 2026-07-10)

**Operador logístico multicliente** — não "operador de cargas reguladas". As licenças
são **diferencial**, não o foco. Nada de "bunker". 11.000 posições (não 13.000).
12 segmentos atendidos. Guarita com blindagem **III-A**.

---

## 2. A LP `/lp-01`

Criada em 2026-07-15. Página de campanha paga, dentro do próprio projeto (não subdomínio).

**Objetivo:** 30–50 leads/mês, CPL alvo ≤ R$ 120, foco em **agro** (sementes, defensivos,
biológicos) e indústria. Regiões: MG, SP, GO — Triângulo Mineiro + raio de 300 km.

**Oferta:** visita técnica de **1h com o André** + diagnóstico logístico + **proposta em 24h**.

**Estrutura:** hero (copy + formulário) → barra de provas → "dor → resposta" → licenças →
estrutura (3 vídeos) → 4 passos → localização → FAQ → CTA final (copy + formulário).

**Prova social:** a operação é recém-inaugurada e **não há cases/logos liberados**. No lugar,
prova **estrutural** (17.000 m², 11.000 posições, 2 eclusas, III-A) + **licenças com número**.
Esse é o ativo mais forte hoje e responde à dor "não acho operador confiável e estruturado".

### Não indexada — e por que o robots.txt continua liberado

A LP é `noindex, nofollow`, fora do `sitemap.xml` e sem link no site.
O `robots.txt` **continua permitindo o crawl de propósito**: se bloqueássemos ali, o Google
não conseguiria **ler** a tag `noindex` e poderia indexar a página assim mesmo.
**Medir ≠ indexar** — GA4/Ads seguem funcionando normalmente.

### Arquivos

```
app/lp-01/page.tsx              a LP
app/lp-01/lp.css                CSS escopado na rota (não polui o globals.css)
app/api/lead/route.ts           recebe o lead e encaminha para a planilha
components/site/lp-lead-form.tsx  formulário (renderizado 2x: hero e CTA final)
lib/lp.ts                       segmentos, faixas de volume, oferta, provas, licenças
scripts/apps-script-leads.gs    Web App do Google (fora do deploy)
scripts/README-leads.md         passo a passo para publicar o Apps Script
```

---

## 3. Como o lead viaja

```
LP (/lp-01)  →  POST /api/lead  →  Apps Script Web App  →  Planilha + e-mail de alerta
  browser        servidor Vercel      conta Google da RS
                 (guarda URL+segredo)   (compartilhada c/ a S&S)
        │
        └──────→  WhatsApp aberto com os dados já preenchidos
```

O browser **nunca** fala com o Apps Script direto. O proxy no servidor existe por 3 motivos:
mantém a URL `/exec` e o segredo fora do bundle, evita o CORS do Apps Script, e barra bot
(honeypot) antes de sujar a planilha.

**Enquanto as envs não forem configuradas, a LP funciona e entrega o lead pelo WhatsApp** —
só a gravação na planilha fica inativa (a rota loga `not_configured`). Nenhum lead se perde.

### Armadilhas que já custaram tempo

- **`window.open` precisa ser síncrono** dentro do handler do submit. Com `await` antes, o
  browser trata como popup e bloqueia. Por isso o POST vai sem `await`, com `keepalive`.
- **Os ids dos campos vêm de `useId()`**. A LP renderiza o formulário duas vezes; com ids
  fixos, o `<label>` do formulário de baixo focava o input do de cima.
- **Injeção de fórmula na planilha**: valores que começam com `= + - @` são prefixados com
  apóstrofo na rota, senão o Sheets executa como fórmula.

---

## 4. O que falta — lista de ações

### 4.1 Publicar o Apps Script (≈10 min · **RS**) — desbloqueia a planilha

1. Conta Google **da RS**: criar planilha "S&S Log — Leads LP".
2. Extensões → Apps Script → colar `scripts/apps-script-leads.gs`.
3. Trocar `SECRET` (string longa e aleatória) e conferir `ALERTA_PARA`.
4. Rodar a função `testar` uma vez (autoriza permissões e cria a aba).
5. Implantar → App da Web → **Executar como: Eu** · **Acesso: Qualquer pessoa**.
6. Copiar a URL `/exec` e configurar na Vercel (**sem** `NEXT_PUBLIC_`):

```bash
vercel env add LEADS_WEBHOOK_URL production
vercel env add LEADS_WEBHOOK_SECRET production
# depois: redeploy, porque env nova não entra em build já feito
```

7. Compartilhar a planilha com o André (Leitor ou Editor). **A propriedade fica com a RS.**

> Passo a passo completo, com as telas e a solução de problemas: `scripts/README-leads.md`.

### 4.2 IDs de conversão no GTM (≈15 min · **André/RS**)

Importar `gtm-container-ss-log.json` (Admin → Importar container → **Mesclar**) e preencher
**4 variáveis Constante** — não é preciso tocar em nenhuma tag:

| Variável | Preencher com |
|---|---|
| `Const - Google Ads Conversion ID` | `AW-XXXXXXXXX` |
| `Const - Google Ads Label - Formulario` | rótulo da conversão de formulário |
| `Const - Google Ads Label - WhatsApp` | rótulo da conversão de WhatsApp |
| `Const - Meta Pixel ID` | ID do Pixel |

Depois: **publicar o container** + marcar `generate_lead` e `whatsapp_click` como
**eventos-chave** no GA4 + registrar `cta_location`, `lead_segmento` e `lead_volume`
como dimensões personalizadas.

> As tags do Meta **se auto-desligam** enquanto o placeholder `COLE_AQUI_*` não for trocado.
> Antes de reimportar, rode `node valida-gtm.mjs` (§7) — ele pega os erros de import offline.

### 4.3 Cutover de DNS na KingHost (**André**) — 🔴 caminho crítico da campanha

Sem isso a LP só existe em `.vercel.app`, e **não se roda Google Ads decente apontando pra lá**
(URL de exibição não bate com o domínio, atrapalha a verificação de domínio no Meta).

**Mudar (2 registros):**

| Tipo | Nome | De | Para |
|---|---|---|---|
| A | `@` | 191.6.209.198 | **216.198.79.1** |
| CNAME | `www` | web192.kinghost.net | **b1c790c686453a29.vercel-dns-017.com** |

**Remover (1):** `AAAA @` → `2804:10:8001::209:198` — senão o IPv6 continua servindo o
WordPress antigo (a Vercel não fornece AAAA aqui).

**NÃO TOCAR** (é o que mantém o e-mail vivo): `MX` (mx-vip-01/02), `TXT` SPF, `TXT _dmarc`
e os CNAMEs `mail · imap · pop · smtp · smtpi · webmail · autoconfig · autodiscover`.

> **Por que o e-mail não quebra:** a entrega usa os **MX** (que apontam para
> `mx-vip-*.kinghost.net`, não para o `A @`). Nada disso depende do `A @` nem do `www`.

Depois do cutover: publicar a versão atual **na Vercel do Fardas** (§6) e trocar
`robots`/canonical se algo mudar.

### 4.4 Decisões pendentes do cliente

| # | Pergunta | Impacto |
|---|---|---|
| 1 | **Incluir "Sementes" e "Biológicos" no select de segmento?** | Hoje só "Defensivos" existe dos 3 focos de mídia. Quem vier de sementes marca "Outro" — perde-se a qualificação do público que está sendo pago para atrair. |
| 2 | **A S&S tem registro no MAPA/RENASEM?** | Nenhuma licença atual cobre sementes ou biológicos (IMA = agrotóxicos, ANVISA = cosméticos, IBAMA = químicos). A copy foi escrita respeitando isso. Se houver registro, é argumento forte a incluir. |
| 3 | **Vídeo institucional na LP?** | Ficou de fora de propósito: 31 MB pesaria no carregamento e no CPL. Dá para colocar atrás de um clique (poster + play) se quiser. |
| 4 | Tempo médio de onboarding em dias úteis | Hoje o site diz que "depende de volume e tipo de carga". Vira número se o cliente informar. |
| 5 | Foto/vídeo do vigilante na guarita | O André pediu para não aparecer; resolvido cortando a cena. Se mandarem material com vigilante, dá para trocar. |

### 4.5 Melhorias conhecidas (não bloqueiam)

- Foto de drone da expansão e imagem da seção Segmentos (estético).
- Revisar as "saídas do WhatsApp" (mensagens por CTA) com o cliente.
- Repontar o remote do git (§6).

---

## 5. Rodar e publicar

```bash
npm install
npm run dev                     # http://localhost:3000
npm run build && npm run start  # valida o build de produção

# Deploy — Vercel da RS (staging)
cp -r .vercel .vercel-fardas-tmp && rm -rf .vercel && cp -r .vercel-rs-bak .vercel
npx vercel --prod --yes
rm -rf .vercel && cp -r .vercel-fardas-tmp .vercel && rm -rf .vercel-fardas-tmp
```

> **Não há auto-deploy GitHub → Vercel neste projeto.** `git push` **não** publica;
> publicar exige `vercel --prod`.
>
> O `.vercel` do diretório aponta para o **Fardas**; o link da RS fica guardado em
> `.vercel-rs-bak`. Troque, publique e **restaure** — como no bloco acima.

### Variáveis de ambiente

| Variável | Onde | Estado |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | Vercel (Production) + `.env.local` | ✅ `GTM-WXN88F82` |
| `NEXT_PUBLIC_META_PIXEL_ID` | opcional | vazio (Pixel vive no GTM) |
| `LEADS_WEBHOOK_URL` | **servidor** | ⬜ falta (§4.1) |
| `LEADS_WEBHOOK_SECRET` | **servidor** | ⬜ falta (§4.1) |

---

## 6. Duas armadilhas de deploy

**1. Deploy no Fardas sai `BLOCKED`.** O time do Fardas verifica se o e-mail do commit
bate com uma conta GitHub — o autor do repo (`consultoria.rssolucoesdigitais@gmail.com`)
não bate. Sintoma: o CLI **fica pendurado**. Solução que funciona — deployar **sem** git:

```bash
mv .git ../_sslog_git_tmp
npx vercel --prod --yes --scope fardas-uniformes-dev-s-projects --token <TOKEN>
mv ../_sslog_git_tmp .git
```

O token do time é rotacionado com frequência: **peça o atual ao André a cada deploy**.

**2. O repo mudou de dono.** `site-ss-log` agora vive em **`RS-Vibecode/site-ss-log`**
(org criada em 2026-07-15), mas o remote local ainda aponta para `rssolucoesdigitais/site-ss-log`.
O push funciona **pelo redirect do GitHub**. Para repontar:

```bash
git remote set-url origin https://github.com/RS-Vibecode/site-ss-log.git
```

> Provavelmente os outros projetos dentro da fábrica `sites-rs` estão iguais —
> conferir `git remote -v` projeto a projeto.

---

## 7. Como verificar antes de publicar

O que foi exercitado de verdade nesta LP (não só "compilou"):

```bash
# Container GTM — pega offline os erros que só apareceriam na hora do import
node scripts/valida-gtm.mjs
# checa: enums em CAIXA ALTA, campos que a GTM rejeita (tagFiringOption,
# consentSettings), {{variáveis}} inexistentes, triggers órfãos e se o JS das
# tags Custom HTML compila DEPOIS da substituição das variáveis.
```

A LP também foi exercitada no browser com Playwright: validação de campos, LGPD,
máscara de telefone, evento no `dataLayer`, POST com UTM+`gclid`, WhatsApp preenchido
e isolamento entre os dois formulários.

Checagens rápidas em qualquer ambiente:

```bash
curl -s <URL>/lp-01 | grep -o '<meta name="robots"[^>]*>'   # noindex presente
curl -s <URL>/sitemap.xml | grep -c "lp-01"                 # deve ser 0
curl -s <URL>/ | grep -o '<meta name="robots"[^>]*>'        # home segue index,follow
```

⚠️ Screenshot full-page da LP **sai com as seções em branco**: o `.reveal` só ganha
opacidade quando entra no viewport. É preciso **rolar a página** antes de capturar.

---

## 8. Licenças (todas com número — nenhuma pendência)

| Órgão | Número | Escopo | Validade |
|---|---|---|---|
| ANVISA | AFE nº 2.11874-1 | Cosméticos e produtos de higiene | — |
| IBAMA | CTF nº 8777018 | Produtos químicos e perigosos | — |
| IMA/MG | Reg. nº 11435473 | Estabelecimento de agrotóxicos | 04/08/2028 |
| SEMAD/MG | Certificado nº 737 | Transporte de produtos perigosos | 11/02/2035 |
| Prefeitura de Uberaba | Alvará Sanitário nº 0017/2026 | Armazéns gerais | — |
| Prefeitura de Uberaba | Declaração 3207/2024 | Não passível de licenciamento ambiental | 09/12/2028 |

Decisão do cliente: **exibir só os dados**, sem publicar os PDFs. Os arquivos ficam em
`temp/licenças/` (fora do git e do deploy).

---

## 9. Marca e mídia

- **Logo:** `public/ss-log-horizontal.png` — bloco vermelho "S & S" + bloco azul "LOG".
  Usado no navbar, no rodapé do site e (desde `33e1f54`) no header e rodapé da LP.
  ⚠️ **Não** escrever a marca como texto: já aconteceu e não parece com o logo do cliente.
- **Selo RS:** `<DevelopedByRS />` no rodapé — obrigatório em cliente externo (regra §7 do squad).
- **Vídeos** (`public/media/`): `institucional.mp4` (31 MB, com áudio e controles, só na home),
  `hero-video.*` e 4 cortes mudos em loop — `cut-armazem` (00:57–01:01), `cut-expansao`,
  `cut-eclusas`, `cut-controle` (recortado para excluir a cena dos monitores, a pedido do André).
- Masters pesados ficam em `temp/` (fora do git). `.vercelignore` exclui `temp/`, `scripts/`,
  `STATUS.md` e `gtm-container-*.json` do deploy.
