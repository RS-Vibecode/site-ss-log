# S&S Log — HANDOFF (doc vivo)

Estado real do projeto e o que falta fazer. **Atualize este arquivo a cada sessão.**
Última atualização: **2026-08-13**.

> **✅ O bloqueio de julho caiu.** `seslog.com.br/lp-01` responde **200** — a LP está na
> Vercel do Fardas e a campanha tem destino. (Este arquivo registrou 404 como bloqueio
> 🔴 até 2026-08-13; estava desatualizado.)
>
> `STATUS.md` é histórico (documenta o port do protótipo v1, de julho/2026) e está
> desatualizado em vários pontos — o site mudou de posicionamento depois dele.
> Para o estado atual, use **este** arquivo.

## Para ficar 100% — em ordem

| | O que | Quem | Tempo | Por que importa |
|---|---|---|---|---|
| 🟡 1 | **Tag `client_area_click` no GTM** (§4.6) | RS | 10 min | O botão da Área do Cliente já empurra o evento; **sem a tag não chega ao GA4** e não se mede uso do portal. |
| 🟡 2 | **Publicar o Apps Script** (§4.1) | RS | 10 min | Leads chegam só pelo WhatsApp; a planilha ainda não grava. |
| 🟡 3 | **IDs de conversão no GTM** (§4.2) | André/RS | 15 min | Sem isso a campanha roda **sem otimizar**. |
| 🔵 4 | **Certificado MAPA/RENASEM**, se existir (§4.4) | André | — | Libera falar de licença para sementes e biológicos. |

Os itens 1–3 somam menos de 40 minutos de trabalho, mas dependem de acessos que só o
cliente/André têm (token do time, conta Google, IDs das contas de anúncio).
**O produto em si está pronto e verificado.**

---

## 1. O que existe hoje

| | |
|---|---|
| **Produto** | Site institucional (`/`) + **LP de campanha** (`/lp-01`) |
| **Cliente** | SALLES & SANTOS LOG LTDA · CNPJ 44.573.981/0001-31 · Uberaba/MG |
| **Contato comercial** | André Carvalho · (34) 99904-4040 · andre.carvalho@seslog.com.br |
| **Stack** | Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · CSS próprio |
| **Repo** | `RS-Vibecode/site-ss-log` (privado) — ⚠️ ver §6 |
| **Último commit** | `b029d02` |

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
> URL de destino.** Como publicar: **§4.0**.

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

### 4.0 ✅ Publicar a LP na Vercel do Fardas — **RESOLVIDO**

`seslog.com.br/lp-01` responde **200**. Este item ficou marcado como 🔴 404 até
2026-08-13, quando foi verificado que já estava no ar — o documento é que estava velho.

O procedimento de publicação continua valendo para qualquer deploy. Peça o **token atual
do time** ao André (eles são rotacionados com frequência) e:

```bash
# o .git precisa sair, senão o deploy é BLOCKED — ver §6
mv .git ../_sslog_git_tmp
npx vercel --prod --yes --scope fardas-uniformes-dev-s-projects --token <TOKEN>
mv ../_sslog_git_tmp .git
```

Depois, confirmar que subiu de verdade:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://seslog.com.br/lp-01   # tem que dar 200
curl -s https://seslog.com.br/lp-01 | grep -o '<meta name="robots"[^>]*>'  # noindex
```

⚠️ Conferir também se a env `NEXT_PUBLIC_GTM_ID` existe **no projeto do Fardas** —
ela foi configurada lá em 2026-07-10, mas vale revalidar depois do deploy.

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

### 4.6 🟡 Tag `client_area_click` no GTM (≈10 min · **RS**)

O botão **Área do Cliente** (2026-08-13) aponta para `https://clientes.seslog.com.br/`,
sistema **VsOmni** do cliente — fora deste site. A raiz redireciona para `/VsOmni/`;
o link usa a **raiz**, para sobreviver a uma troca de sistema.

O clique empurra `client_area_click` no `dataLayer`, **sem** `fbq('track','Lead')`:

```js
window.dataLayer?.push({ event: "client_area_click" })
```

**Falta criar a tag no GTM** — hoje o evento não chega ao GA4.

> ⚠️ **Não marcar como conversão.** É cliente **atual** entrando no sistema, não geração
> de lead. Contado como conversão, contamina o aprendizado da campanha que roda na
> `/lp-01` — o Ads passaria a otimizar para quem já é cliente.

**Onde ele fica, e por quê:**

| | |
|---|---|
| Desktop | botão outline com cadeado, à **esquerda** do CTA vermelho — secundário de propósito, não disputa com "Solicitar Proposta" |
| Mobile | **aparece** no menu, em largura total — ao contrário do `.nav-cta`, que tem `display:none` abaixo do breakpoint. Cliente recorrente consulta sistema pelo celular |
| Rodapé | não está lá (só a âncora Controle de Acesso) |

**Duas armadilhas medidas** (Playwright, 8 larguras de 1151px a 1920px):

1. **Não cabia.** Com as 6 âncoras originais, o texto quebrava em duas linhas entre 1101
   e 1200px. Por isso **"Controle de Acesso" saiu do menu do topo** (era a âncora mais
   longa, ~154px com gap) e foi para o rodapé. A seção `#controle-acesso` segue na página.
2. **O gap do `.nav-menu` caiu para `--sp-3`** e o breakpoint do hambúrguer subiu de
   **960px para 1150px**. Com `--sp-4` voltava a quebrar em ~1151px.

> Ao acrescentar **qualquer** item novo no `.nav-menu`, remeça: a folga em 1151px é de
> 44px. O sintoma (texto em 2 linhas) só aparece numa faixa estreita de largura e passa
> batido em teste de olho no monitor grande.

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

> **Confirmado em 2026-08-13.** O erro exato que a Vercel devolve é:
> *"The deployment was blocked because the commit email
> `consultoria.rssolucoesdigitais@gmail.com` could not be matched to a GitHub account."*
> Com o `.git` presente o CLI **fica pendurado sem falhar** (morreu em 7 min de timeout) e
> o deploy aparece como `UNKNOWN` no `vercel ls` — **não** promove nada, produção segue
> intacta. Não adianta recommitar: o `user.email` **global** já é esse e-mail rejeitado.
>
> Alternativa ao `mv .git`, se não quiser tocar no repositório — publicar de uma cópia:
>
> ```bash
> # copie o projeto sem .git, sem node_modules e sem .env.local (~53 MB)
> # leve junto: .vercel (aponta pro Fardas), .vercelignore, package.json e configs
> npx vercel --prod --yes --scope fardas-uniformes-dev-s-projects --token <TOKEN>
> ```
>
> Confirme sempre no fim: o CLI tem que imprimir `Aliased https://seslog.com.br` e o
> `vercel ls` mostrar `● Ready` — `UNKNOWN` significa bloqueado.

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

- **Logo:** `public/ss-log-horizontal.png` (256×44, aspecto **5,82:1**) — bloco vermelho
  "S & S" + bloco azul "LOG". Usado no navbar, no rodapé do site e (desde `33e1f54`) no
  header e rodapé da LP.
  ⚠️ **Não** escrever a marca como texto: já aconteceu e não parece com o logo do cliente.
- **Selo RS:** `<DevelopedByRS />` no rodapé — obrigatório em cliente externo (regra §7 do squad).
- **Vídeos** (`public/media/`): `institucional.mp4` (31 MB, com áudio e controles — na home e,
  desde 2026-07-18, na LP **atrás de um clique**), `hero-video.*` e 4 cortes mudos em loop:
  `cut-armazem` (00:57–01:01), `cut-expansao`, `cut-eclusas`, `cut-controle`.

### ⚠️ Logo achatado dentro de flex column (corrigido em `b029d02`)

O logo do rodapé da LP saía com aspecto **13,9:1** em vez de 5,82 (417 px de largura para
30 px de altura). Causa: `.lp-footer-brand` é `flex-direction: column` e o `align-items`
padrão é **`stretch`** — o `<img>` era esticado até a largura da coluna, e o `width: auto`
resolvia para essa largura esticada. O header não tinha o problema por ser flex **row**
com `align-items: center`.

Correção: `align-items: flex-start` no container (raiz) + `object-fit: contain` no logo
(rede de segurança). **Ao colocar o logo em qualquer bloco novo em coluna, confira o
aspecto** — o sintoma é discreto e passa fácil por "só um logo largo":

```js
// no console do browser, em qualquer largura
const el = document.querySelector(".lp-footer-logo")
const r = el.getBoundingClientRect()
console.log((r.width / r.height).toFixed(2))  // tem que dar ~5.82
```

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

---

## 10. Histórico

| Commit | O que entrou |
|---|---|
| *(este)* | **Botão Área do Cliente** no header → `clientes.seslog.com.br` (§4.6). "Controle de Acesso" saiu do topo para o rodapé (não cabia). HANDOFF corrigido: o 404 da `/lp-01` já não existia. |
| `02e4055` | Favicon com a logo real do cliente + redirect das URLs antigas do WordPress. |
| `b029d02` | Logo do rodapé da LP saía achatado — `align-items: stretch` do flex column (§9). |
| `d05e79b` | Sementes e Biológicos no select · vídeo institucional na LP atrás de clique · onboarding 72h úteis. |
| `400f757` | Este HANDOFF · `STATUS.md` marcado como histórico · `scripts/valida-gtm.mjs`. |
| `33e1f54` | LP passa a usar o logo oficial e o selo RS (antes a marca era escrita como texto). |
| `dea188a` | **LP `/lp-01`** · rota `/api/lead` · Apps Script · tags de Ads e Meta no container GTM. |
| `f15eb6c` | Card de Controle de Acesso volta a ser vídeo, sem a cena dos monitores. |
| `abd7a3c` | Ajustes pedidos pelo André (RENDER, FAQ de segurança, distribuição lotação). |
| `11c3d9b` | Nº do IMA (11435473) e Alvará Sanitário. |

### Decisões que valem lembrar

- **A LP mora no projeto do site, em `/lp-01`** — não num subdomínio. `lp.seslog.com.br`
  pode ser apontado depois por domínio + rewrite, sem refazer nada.
- **Prova estrutural no lugar de cases.** A operação é recém-inaugurada e não há cliente
  liberado para citar; as licenças com número sustentam o argumento.
- **Nenhuma alegação regulatória sem número.** Vale para MAPA/RENASEM (§4.4) e para
  qualquer licença futura — é o que sustenta a promessa central da LP.
- **O vídeo institucional não bloqueia o carregamento** (§4.4). Se um dia entrar mais
  vídeo na LP, seguir o mesmo padrão de `lp-video.tsx`.
- **Não foi feito por IA:** inserir um vigilante no vídeo da guarita. Foi pedido, e a
  resposta ao André foi que não se sustenta — num claim de segurança seria material
  enganoso. A cena foi cortada (§9).
