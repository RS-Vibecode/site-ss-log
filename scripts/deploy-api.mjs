/**
 * Deploy do site-ss-log na Vercel do Grupo Fardas pela API REST.
 * Estratégia: cria o deployment primeiro; a Vercel responde quais shas faltam
 * (missing) e só esses sobem — o resto já está no armazenamento do time.
 * Sem .git na pasta => sem BLOCKED por autor de commit.
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

// Uso: VT=<token> node scripts/deploy-api.mjs [caminho-da-copia]
// (o caminho tem que ser uma cópia SEM .git — ver HANDOFF §4.0)
const ROOT = process.argv[2] || process.env.DEPLOY_ROOT || 'X:/Apps RS/_deploy-clientes/site-ss-log'
const TOKEN = process.env.VT
const TEAM = 'team_6cB9cv9QVRwMSzZhZmJO2mEf'
const PROJECT = 'prj_L4O5Ijl0jEIxOs4PibA3IzFQlrE0'
if (!TOKEN) { console.error('sem token em VT'); process.exit(1) }

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '.vercel', 'temp', 'scripts'])
const SKIP_FILES = new Set(['STATUS.md', 'tsconfig.tsbuildinfo', '.env.local', '.env.example'])
const skipFile = rel => {
  const b = path.basename(rel)
  return SKIP_FILES.has(b) || b.endsWith('.DNG') || b.startsWith('gtm-container-')
}

function walk(dir, rel = '') {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? rel + '/' + e.name : e.name
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) out.push(...walk(path.join(dir, e.name), r)) }
    else if (!skipFile(r)) out.push(r)
  }
  return out
}

const files = walk(ROOT).map(rel => {
  const buf = fs.readFileSync(path.join(ROOT, rel))
  return { file: rel, sha: crypto.createHash('sha1').update(buf).digest('hex'), size: buf.length, buf }
})
console.log('arquivos: ' + files.length + ' · ' + (files.reduce((a, f) => a + f.size, 0) / 1e6).toFixed(1) + ' MB')

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function api(url, opts, tentativas = 5) {
  for (let i = 1; i <= tentativas; i++) {
    try { return await fetch(url, opts) }
    catch (e) {
      if (i === tentativas) throw e
      console.log('  rede falhou (' + (e.cause?.code || e.message) + '), tentativa ' + i)
      await sleep(3000 * i)
    }
  }
}

async function upload(f) {
  for (let i = 1; i <= 8; i++) {
    const res = await api('https://api.vercel.com/v2/files?teamId=' + TEAM, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(f.size),
        'x-vercel-digest': f.sha,
      },
      body: f.buf,
    }, 8)
    if (res.ok) return
    const t = await res.text()
    console.log('  ' + f.file + ' -> ' + res.status + ' (tentativa ' + i + ')')
    if (i === 8) throw new Error(t.slice(0, 200))
    await sleep(2000 * i)
  }
}

async function criar() {
  const res = await api('https://api.vercel.com/v13/deployments?teamId=' + TEAM + '&skipAutoDetectionConfirmation=1', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'site-ss-log',
      project: PROJECT,
      target: 'production',
      files: files.map(f => ({ file: f.file, sha: f.sha, size: f.size })),
      projectSettings: { framework: 'nextjs' },
    }),
  })
  return { res, json: await res.json() }
}

let dep = null
for (let rodada = 1; rodada <= 6; rodada++) {
  const { res, json } = await criar()
  if (res.ok) { dep = json; break }
  const faltando = json?.error?.missing || json?.missing || []
  if (!faltando.length) {
    console.error('erro ' + res.status + ': ' + JSON.stringify(json).slice(0, 500))
    process.exit(1)
  }
  const alvo = files.filter(f => faltando.includes(f.sha))
  console.log('rodada ' + rodada + ': faltam ' + alvo.length + ' arquivos (' + (alvo.reduce((a, f) => a + f.size, 0) / 1e6).toFixed(1) + ' MB) — subindo')
  // sequencial: uploads paralelos estouraram a rede desta máquina
  let n = 0
  for (const f of alvo) { await upload(f); n++; console.log('  ' + n + '/' + alvo.length + ' ' + f.file) }
}

if (!dep) { console.error('nao consegui criar o deployment'); process.exit(1) }
console.log('deployment ' + dep.id + ' · ' + dep.url)

let estado = dep.readyState || dep.status
for (let i = 0; i < 150 && !['READY', 'ERROR', 'CANCELED', 'BLOCKED'].includes(estado); i++) {
  await sleep(5000)
  const r = await api('https://api.vercel.com/v13/deployments/' + dep.id + '?teamId=' + TEAM, {
    headers: { Authorization: 'Bearer ' + TOKEN },
  })
  const j = await r.json()
  estado = j.readyState || j.status
  if (i % 4 === 0) console.log('  ...' + estado)
  if (estado === 'READY') console.log('aliases: ' + JSON.stringify(j.alias))
  if (estado === 'ERROR') console.log('erro: ' + JSON.stringify(j.errorMessage || j.errorCode || '').slice(0, 400))
}
console.log('estado final: ' + estado)
