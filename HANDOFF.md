# S&S Log — HANDOFF (doc vivo)

Estado real do projeto e o que falta fazer. **Atualize este arquivo a cada sessão.**
Última atualização: **2026-07-18**.

> **O bloqueio de hoje:** o DNS foi migrado e `seslog.com.br` está no ar, mas a Vercel do
> Fardas ainda não tem a LP — **`seslog.com.br/lp-01` responde 404**. A campanha não tem
> URL de destino até isso ser publicado (§6). Precisa de um token novo do time.
>
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
| **Vercel Fardas** | `seslog.com.br` | **Produção real** | `vercel --prod --scope fardas-uniformes-dev-s-projects` + token |

**✅ DNS migrado (2026-07-18).** `seslog.com.br` já resolve para a Vercel e serve o site novo.
Verificado: apex `A → 216.198.79.1`, `www` via CNAME `b1c790c686453a29.vercel-dns-017.com`,
`AAAA` removido. **E-mail intacto** — os dois MX (`mx-vip-01/02.kinghost.net`), SPF
(`v=spf1 include:_spf.kinghost.net -all`), DMARC (`p=reject`) e os hosts
`webmail · imap · smtp` seguem na KingHost. O WordPress antigo saiu do ar.

> 🔴 **A Vercel do Fardas está desatualizada: `seslog.com.br/lp-01` responde 404.**
> O domínio serve a versão multicliente correta, mas **anterior à LP** — a LP só foi
> publicada na Vercel da RS. **Enquanto isso não for corrigido, a campanha não tem
> URL de destino.** Para publicar é preciso um **token novo do time** (expiram rápido)
> e o truque do `.git` (§6).

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

### 4.3 ✅ Cutover de DNS na KingHost — **CONCLUÍDO em 2026-07-18**

Registros aplicados: `A @ → 216.198.79.1`, `CNAME www → b1c790c686453a29.vercel-dns-017.com`,
`AAAA @` removido. E-mail preservado (MX, SPF, DMARC e hosts de e-mail intactos na KingHost).

Conferir a qualquer momento:

```bash
nslookup seslog.com.br 8.8.8.8            # deve dar 216.198.79.1
nslookup -type=MX seslog.com.br 8.8.8.8   # deve continuar mx-vip-01/02.kinghost.net
nslookup -type=AAAA seslog.com.br 8.8.8.8 # não deve retornar endereço
```

> **Por que o e-mail não quebrou:** a entrega usa os **MX** (que apontam para
> `mx-vip-*.kinghost.net`), não o `A @`. Trocar o registro do site não mexe nisso.

**➡️ Sobrou disso:** publicar a versão com a LP **na Vercel do Fardas** (§6) —
hoje `seslog.com.br/lp-01` dá **404**. É o que falta para a campanha ter destino.

### 4.4 Decisões do cliente — respondidas em 2026-07-18

| # | Decisão | O que foi feito |
|---|---|---|
| 1 | ✅ Incluir Sementes e Biológicos no select | Adicionados no topo da lista (agro-first): agora **15 opções**. Front e `/api/lead` validados juntos. |
| 2 | ⚠️ Registro no MAPA/RENASEM | **Ver ressalva abaixo — não foi para a copy.** |
| 3 | ✅ Vídeo institucional na LP | Nova seção "Por dentro da operação", com o vídeo **atrás de um clique**. |
| 4 | ✅ Onboarding = **72 horas úteis** | Na LP (passo 04 + FAQ nova) e no site (nota da seção "Como funciona"). Valor único em `lib/lp.ts` → `OFERTA.onboarding`. |
| 5 | ⏸️ Foto/vídeo do vigilante | **Adiado pelo cliente.** Ver §9. |

#### ⚠️ Ressalva — MAPA/RENASEM (pendência real)

Perguntado se a S&S tem registro no MAPA/RENASEM, o cliente respondeu *"se foi dito
anteriormente, tem sim"* — **não é confirmação, é suposição**. Foi verificado: nas 6
licenças recebidas **não há nenhuma do MAPA**, e nenhuma das existentes cobre sementes
ou biológicos (IMA = agrotóxicos · ANVISA = cosméticos/higiene · IBAMA = químicos).

**Por isso a copy não afirma registro no MAPA em lugar nenhum.** Sementes e biológicos
aparecem como **capacidade de estrutura**, não de licenciamento — a LP diz "licença com
número" e afirmar sem número quebraria justamente o argumento central dela. Alegação
regulatória falsa também é risco jurídico para o cliente.

**Para resolver:** pedir ao André o **certificado do MAPA/RENASEM com número**. Chegando
o documento, é trocar o texto do card de sementes/biológicos e acrescentar a linha na
tabela de licenças (§8) — 10 minutos de trabalho.

#### Vídeo institucional — como foi feito

O arquivo tem 31 MB e carregá-lo de saída atrasaria a dobra e encareceria o CPL. Só o
**poster** (263 KB) entra no carregamento; o `<video>` nasce **sem `src`** e a fonte só é
anexada no clique (`components/site/lp-video.tsx`). Medido: a LP carrega **4,2 MB de
mídia** e o `institucional.mp4` **não é baixado** por quem não clica. O play dispara
`video_play` no dataLayer (`video_title: institucional`, `cta_location: lp_video`) —
dá para medir engajamento no GA4 e usar como sinal de público.

### 4.5 Melhorias conhecidas (não bloqueiam)

- **Guarita com vigilante** — adiado pelo cliente, ver §9. Trocar quando houver material.
- Certificado MAPA/RENASEM, se existir (§4.4).
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
- **Vídeos** (`public/media/`): `institucional.mp4` (31 MB, com áudio e controles — na home e,
  desde 2026-07-18, na LP **atrás de um clique**), `hero-video.*` e 4 cortes mudos em loop:
  `cut-armazem` (00:57–01:01), `cut-expansao`, `cut-eclusas`, `cut-controle`.

### ⏸️ Guarita / controle de acesso — pode ser atualizado no futuro

O corte `cut-controle.mp4` foi recortado (78–81,5 s) para **excluir a cena em que o André
aparece sentado diante dos monitores** — ele pediu para não aparecer e preferia um vigilante
na imagem. Ficaram só o tourniquete e o reconhecimento facial.

**Gravar o vigilante ficou adiado por decisão do cliente (2026-07-18)** — não há prazo.
Já foi respondido ao André que **não é viável inserir um vigilante por IA** num vídeo real:
o resultado não se sustenta e, num claim de segurança, seria material enganoso.

Quando houver material novo (foto ou vídeo com vigilante na guarita), a troca é direta:
substituir `public/media/cut-controle.mp4` — o card da LP e o do site apontam para o mesmo
arquivo, então os dois se atualizam de uma vez. Nenhuma mudança de código é necessária.

### Arquivos-fonte

Masters pesados ficam em `temp/` (fora do git). O `.vercelignore` exclui `temp/`, `scripts/`,
`STATUS.md` e `gtm-container-*.json` do deploy.
