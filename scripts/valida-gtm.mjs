/**
 * Valida o container GTM antes de o André tentar importar — os dois erros que já
 * nos pegaram (enum minúsculo, TagFiringOption) eram só descobertos na hora do
 * import. Aqui checamos offline:
 *   1. JSON parseia
 *   2. todo parameter.type está em CAIXA ALTA e é um enum conhecido
 *   3. toda {{variável}} referenciada existe de fato
 *   4. o JS das tags Custom HTML compila DEPOIS da substituição do GTM
 */
import { readFile } from "node:fs/promises"
import vm from "node:vm"

const caminho = new URL("../gtm-container-ss-log.json", import.meta.url)
const c = JSON.parse(await readFile(caminho, "utf8"))
const v = c.containerVersion
const erros = []

const TIPOS_OK = new Set([
  "TEMPLATE", "BOOLEAN", "INTEGER", "LIST", "MAP", "TAG_REFERENCE",
])

// --- 1 e 2: enums dos parâmetros -------------------------------------------
function checaParams(params, onde) {
  for (const p of params || []) {
    if (!TIPOS_OK.has(p.type)) {
      erros.push(`${onde}: parameter.type inválido "${p.type}" (precisa ser CAIXA ALTA)`)
    }
    if (p.list) for (const item of p.list) checaParams([item], onde)
    if (p.map) checaParams(p.map, onde)
  }
}
for (const t of v.tag || []) checaParams(t.parameter, `tag "${t.name}"`)
for (const t of v.trigger || [])
  for (const f of t.customEventFilter || []) checaParams(f.parameter, `trigger "${t.name}"`)
for (const x of v.variable || []) checaParams(x.parameter, `variable "${x.name}"`)

// Campos que a GTM rejeitou em versões anteriores deste container.
for (const t of v.tag || []) {
  if ("tagFiringOption" in t) erros.push(`tag "${t.name}": tagFiringOption presente (já quebrou o import antes)`)
  if ("consentSettings" in t) erros.push(`tag "${t.name}": consentSettings presente (já quebrou o import antes)`)
}

// --- 3: referências {{...}} existem ----------------------------------------
const definidas = new Set([
  ...(v.variable || []).map((x) => x.name),
  ...(v.builtInVariable || []).map((x) => x.name),
  "_event",
])
const texto = JSON.stringify(v)
const referenciadas = new Set(
  [...texto.matchAll(/\{\{([^}]+)\}\}/g)].map((m) => m[1]),
)
for (const r of referenciadas) {
  if (!definidas.has(r)) erros.push(`{{${r}}} é referenciada mas não existe no container`)
}

// Toda tag aponta para um trigger existente?
const triggers = new Set([...(v.trigger || []).map((t) => t.triggerId), "2147479553"])
for (const t of v.tag || []) {
  for (const id of t.firingTriggerId || []) {
    if (!triggers.has(id)) erros.push(`tag "${t.name}": trigger ${id} inexistente`)
  }
}

// --- 4: o JS das Custom HTML compila após a substituição? -------------------
// Simula o GTM: troca {{X}} pelo valor cru, como ele faz de verdade.
const valores = {
  "Const - Meta Pixel ID": "1234567890123456",
  "DLV - cta_location": "lp_form",
  "DLV - lead_segmento": "Defensivos agrícolas",
}
for (const t of (v.tag || []).filter((t) => t.type === "html")) {
  const p = t.parameter.find((p) => p.key === "html")
  let js = p.value
  for (const [k, val] of Object.entries(valores)) js = js.split(`{{${k}}}`).join(val)

  if (/\{\{/.test(js)) erros.push(`tag "${t.name}": sobrou {{variável}} não substituída`)

  const corpo = js.replace(/<\/?script>/g, "")
  try {
    new vm.Script(corpo)
  } catch (e) {
    erros.push(`tag "${t.name}": JS não compila após substituição -> ${e.message}`)
  }
}

// --- Resultado --------------------------------------------------------------
console.log(`Tags: ${v.tag.length} | Triggers: ${v.trigger.length} | Variáveis: ${v.variable.length}`)
console.log("Tags:", v.tag.map((t) => `${t.name} [${t.type}]`).join("\n      "))
console.log()
if (erros.length) {
  console.log("❌ PROBLEMAS:")
  for (const e of erros) console.log("  -", e)
  process.exit(1)
}
console.log("✅ Container válido: enums OK, referências OK, JS das Custom HTML compila.")
