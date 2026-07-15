/**
 * S&S Log — recebedor de leads da LP (/lp-01).
 *
 * Fluxo: LP → POST /api/lead (Next, servidor) → este Web App → planilha + e-mail.
 * Quem chama é sempre o servidor da Vercel, nunca o browser — por isso o segredo
 * abaixo nunca fica exposto e não há CORS envolvido.
 *
 * COMO PUBLICAR — ver scripts/README-leads.md (passo a passo com prints do fluxo).
 * Resumo: Implantar → Nova implantação → Tipo "App da Web" →
 *   Executar como: Eu  |  Quem tem acesso: Qualquer pessoa
 * Copie a URL /exec gerada e mande para o Claude/RS colocar na env da Vercel.
 */

// ============================================================================
// CONFIGURAÇÃO — os 3 valores abaixo são os únicos que você precisa mexer.
// ============================================================================

/** Aba da planilha onde os leads são gravados (criada automaticamente). */
const SHEET_NAME = 'Leads'

/**
 * Segredo compartilhado com a Vercel. TROQUE por uma string longa e aleatória
 * e mande a MESMA string para configurarmos em LEADS_WEBHOOK_SECRET.
 * Sem isso, qualquer um que descobrir a URL /exec consegue poluir a planilha.
 */
const SECRET = 'TROQUE-POR-UMA-STRING-LONGA-E-ALEATORIA'

/** Quem recebe o alerta de lead novo. Separe múltiplos com vírgula. */
const ALERTA_PARA = 'andre.carvalho@seslog.com.br'

// ============================================================================
// Não é necessário editar daqui para baixo.
// ============================================================================

const COLUNAS = [
  'Data/Hora',
  'Nome',
  'Telefone',
  'E-mail',
  'Empresa',
  'Segmento',
  'Volume de carga',
  'Origem (utm_source)',
  'Mídia (utm_medium)',
  'Campanha (utm_campaign)',
  'Termo (utm_term)',
  'Anúncio (utm_content)',
  'gclid',
  'fbclid',
  'Página',
  'Consentimento LGPD',
]

/** Recebe o lead. Responde sempre JSON. */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ ok: false, error: 'empty_body' })
    }

    const d = JSON.parse(e.postData.contents)

    if (d.secret !== SECRET) {
      return _json({ ok: false, error: 'unauthorized' })
    }

    const aba = _getAba()
    const agora = new Date()

    aba.appendRow([
      Utilities.formatDate(agora, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
      d.nome || '',
      d.telefone || '',
      d.email || '',
      d.empresa || '',
      d.segmento || '',
      d.volume || '',
      d.utm_source || '',
      d.utm_medium || '',
      d.utm_campaign || '',
      d.utm_term || '',
      d.utm_content || '',
      d.gclid || '',
      d.fbclid || '',
      d.page || '',
      d.consent || '',
    ])

    _alertar(d)
    return _json({ ok: true })
  } catch (err) {
    // Loga no painel do Apps Script (Execuções) para depuração.
    console.error('Falha ao gravar lead: ' + err)
    return _json({ ok: false, error: String(err) })
  }
}

/** Health check — abrir a URL /exec no navegador deve responder isto. */
function doGet() {
  return _json({ ok: true, service: 'ss-log-leads' })
}

/** Pega (ou cria) a aba de leads, já com cabeçalho formatado. */
function _getAba() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let aba = ss.getSheetByName(SHEET_NAME)

  if (!aba) {
    aba = ss.insertSheet(SHEET_NAME)
  }

  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS)
    const cab = aba.getRange(1, 1, 1, COLUNAS.length)
    cab.setFontWeight('bold')
    cab.setBackground('#081740')
    cab.setFontColor('#ffffff')
    aba.setFrozenRows(1)
    aba.autoResizeColumns(1, COLUNAS.length)
  }

  return aba
}

/** Alerta por e-mail — CPL de R$ 120 não pode esfriar dentro de uma planilha. */
function _alertar(d) {
  if (!ALERTA_PARA) return

  const assunto = '[Lead S&S Log] ' + (d.empresa || d.nome || 'novo contato') +
    ' — ' + (d.segmento || 'segmento não informado')

  const origem = [d.utm_source, d.utm_medium, d.utm_campaign]
    .filter(function (v) { return v })
    .join(' · ') || 'direto / não identificado'

  const corpo =
    'Lead novo pela LP da S&S Log.\n\n' +
    'Nome:      ' + (d.nome || '-') + '\n' +
    'Telefone:  ' + (d.telefone || '-') + '\n' +
    'E-mail:    ' + (d.email || '-') + '\n' +
    'Empresa:   ' + (d.empresa || '-') + '\n' +
    'Segmento:  ' + (d.segmento || '-') + '\n' +
    'Volume:    ' + (d.volume || '-') + '\n\n' +
    'Origem:    ' + origem + '\n' +
    'Página:    ' + (d.page || '-') + '\n\n' +
    'WhatsApp direto: https://wa.me/55' + String(d.telefone || '').replace(/\D/g, '') + '\n\n' +
    'Planilha: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '\n\n' +
    '— SLA combinado: retorno em até 30 min no horário comercial, proposta em até 24h.'

  try {
    MailApp.sendEmail(ALERTA_PARA, assunto, corpo)
  } catch (err) {
    // Cota de e-mail estourada não pode derrubar a gravação do lead.
    console.error('Falha ao enviar alerta: ' + err)
  }
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

/**
 * Rode UMA vez pelo editor (menu ▷ Executar, com `testar` selecionado) para
 * criar a aba com cabeçalho e autorizar as permissões antes de publicar.
 * Grava uma linha de teste — apague depois.
 */
function testar() {
  doPost({
    postData: {
      contents: JSON.stringify({
        secret: SECRET,
        nome: 'Teste RS',
        telefone: '(34) 99904-4040',
        email: 'teste@rssolucoesdigitais.com.br',
        empresa: 'Teste — apagar esta linha',
        segmento: 'Defensivos agrícolas',
        volume: '500 a 2.000 posições-palete',
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'teste-instalacao',
        page: '/lp-01',
        consent: 'sim',
      }),
    },
  })
}
