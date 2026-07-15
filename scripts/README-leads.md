# Leads da LP → Google Sheets + alerta por e-mail

Passo a passo para ligar o formulário da `/lp-01` na planilha. Leva ~10 minutos.
A planilha fica na **conta Google da RS** e é compartilhada com a S&S Log depois.

## Como o lead viaja

```
LP (/lp-01)  →  POST /api/lead  →  Apps Script (Web App)  →  Planilha + e-mail
  browser         servidor Vercel        conta Google da RS
                  (guarda a URL          (dona dos dados)
                   e o segredo)
```

O browser **nunca** fala com o Apps Script direto. Isso mantém a URL `/exec` e o
segredo fora do código-fonte público, e evita o CORS do Apps Script.

Em paralelo, o mesmo envio abre o **WhatsApp** com os dados já preenchidos. Se a
planilha cair, o lead não se perde — o comercial recebe pelo WhatsApp do mesmo jeito.

---

## 1. Criar a planilha

1. Na conta Google da RS, crie uma planilha nova: **"S&S Log — Leads LP"**.
2. Menu **Extensões → Apps Script**. Abre o editor num projeto vazio.

## 2. Colar o script

1. Apague o `function myFunction() {}` que vem por padrão.
2. Cole todo o conteúdo de [`apps-script-leads.gs`](./apps-script-leads.gs).
3. Edite **apenas estas duas linhas** no topo:

   ```js
   const SECRET = 'TROQUE-POR-UMA-STRING-LONGA-E-ALEATORIA'
   const ALERTA_PARA = 'andre.carvalho@seslog.com.br'
   ```

   - **`SECRET`**: gere uma string longa e aleatória (ex.: um gerador de senha de
     40+ caracteres). **Guarde** — ela precisa ser configurada igual na Vercel.
   - **`ALERTA_PARA`**: quem recebe o alerta. Vários e-mails separados por vírgula:
     `'andre.carvalho@seslog.com.br, comercial@seslog.com.br'`

4. Salve (💾 ou `Ctrl+S`).

## 3. Autorizar e testar

1. No seletor de função (topo do editor), escolha **`testar`** e clique **▷ Executar**.
2. O Google vai pedir autorização:
   - **Revisar permissões** → escolha a conta da RS
   - Aparece "O Google não verificou este app" → **Avançado** → **Acessar
     S&S Log — Leads LP (não seguro)**. Isso é esperado: o app é seu, não foi
     publicado na loja do Google.
   - **Permitir**
3. Volte na planilha: deve existir a aba **`Leads`** com o cabeçalho azul e uma
   linha de teste. **Apague a linha de teste.**
4. Confira se o e-mail de alerta chegou.

## 4. Publicar como Web App

1. No editor, botão **Implantar → Nova implantação**.
2. Engrenagem ⚙️ ao lado de "Selecionar tipo" → **App da Web**.
3. Configure exatamente assim:

   | Campo | Valor |
   |---|---|
   | Descrição | `Recebedor de leads LP` |
   | Executar como | **Eu** (a conta da RS) |
   | Quem tem acesso | **Qualquer pessoa** |

   > ⚠️ **"Qualquer pessoa" é obrigatório** — quem chama é o servidor da Vercel,
   > que não faz login no Google. A proteção contra abuso é o `SECRET`, não o
   > controle de acesso do Google. Por isso o `SECRET` precisa ser forte.

4. **Implantar** → copie a **URL do app da Web**. Ela termina em `/exec`:
   `https://script.google.com/macros/s/AKfycb.../exec`

5. **Teste rápido:** abra essa URL no navegador. Deve responder
   `{"ok":true,"service":"ss-log-leads"}`. Se responder isso, está no ar.

## 5. Mandar as duas chaves para a RS

Envie para configurarmos na Vercel (projeto `site-ss-log`, ambiente Production):

```
LEADS_WEBHOOK_URL    = https://script.google.com/macros/s/AKfycb.../exec
LEADS_WEBHOOK_SECRET = (a mesma string que você pôs em SECRET)
```

> Nenhuma das duas tem prefixo `NEXT_PUBLIC_` — de propósito. Elas só existem no
> servidor e não vão para o browser.

Enquanto elas não forem configuradas, a LP **funciona normalmente** e entrega os
leads pelo WhatsApp; só a gravação na planilha fica inativa.

## 6. Compartilhar com a S&S Log

Na planilha → **Compartilhar** → adicione o e-mail do André com permissão de
**Leitor** (ou Editor, se ele for anotar status do lead na própria planilha).

> A **propriedade** fica na conta da RS. Se um dia a planilha precisar passar para
> a S&S Log, use **Transferir propriedade** — o Apps Script vai junto e a URL
> `/exec` continua a mesma.

---

## Manutenção

**Alterar o script depois de publicado:** editar e salvar **não** atualiza o app no
ar. É preciso **Implantar → Gerenciar implantações → ✏️ editar → Versão: Nova
versão → Implantar**. A URL `/exec` continua a mesma.

**Ver erros:** editor do Apps Script → menu lateral **Execuções**. Falhas de
gravação e de e-mail aparecem ali.

**Cota de e-mail:** conta Google gratuita envia ~100 e-mails/dia; Workspace, ~1.500.
Para 30–50 leads/mês sobra folga. Se a cota estourar, o lead **ainda é gravado** —
só o alerta falha (tratado no script, não derruba nada).

**Lead não chegou na planilha?** Nesta ordem:
1. Abra a URL `/exec` no navegador → responde `{"ok":true,...}`?
2. **Execuções** no Apps Script → tem erro registrado?
3. Logs da função na Vercel → procure por `[lead]`. `not_configured` = env
   faltando; `unauthorized` no Apps Script = `SECRET` diferente dos dois lados.
