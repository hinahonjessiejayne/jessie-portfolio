/**
 * POST /api/lead: the free-idea form (public/free-idea) -> the Jessie Calm lead store, a Google Sheet
 * behind an Apps Script web app (N8N Project/leads/apps-script/Code.gs).
 *
 * The same endpoint counts a visit to the page: {event: "visit", source} adds one to that day's total for the
 * source in the store. A visit carries no personal data and nothing about the visitor is kept.
 *
 * Env (Vercel, Production): LEAD_STORE_URL, LEAD_SECRET. The secret stays on the server.
 * Spam: same-origin only, a honeypot field, a minimum fill time and a per-IP limit. Bots get a fake
 * success so they learn nothing. The store itself dedupes a repeat contact within 30 days.
 */
// Also in N8N Project leads/apps-script/Code.gs (SOURCES) and social/stats/collect.py (LEAD_SOURCES): change the three together.
const SOURCES = ['facebook', 'tiktok', 'instagram', 'messenger', 'site', 'other']
const MAX_BODY = 4000
const MIN_FILL_MS = 3000
const LIMIT = 5
const WINDOW_MS = 10 * 60_000
const VISIT_LIMIT = 10 // visits per address per window: generous, many phones share one carrier address
const VISIT_BUDGET = 120 // visits per minute for the whole instance; the rest are dropped, the count is approximate
const VISIT_TIMEOUT_MS = 6000
const BOT = /\b(bot|crawler|spider)\b|bot\/|facebookexternalhit|headless|preview|curl|wget|python-requests|node-fetch/i
const visits = new Map<string, number[]>() // visits never spend the form's tries
let budget = { minute: 0, used: 0 }
const hits = new Map<string, number[]>() // per instance, best effort

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const HANDLE = /^@?[\w.]{2,30}$/
const PHONE = /^\+?[\d\s-]{7,16}$/

const reply = (body: object, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

const field = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max) : ''

function limited(ip: string, bucket = hits, limit = LIMIT) {
  const now = Date.now()
  // addresses are held only while they have a try inside the window: a quiet one is dropped at its next look
  for (const [key, times] of bucket) if (now - times[times.length - 1] >= WINDOW_MS) bucket.delete(key)
  const recent = (bucket.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length > limit) return true // already over: nothing more is remembered about it
  recent.push(now)
  bucket.set(ip, recent)
  return recent.length > limit
}

const known = (src: string) => (SOURCES.includes(src) ? src : 'site')

// One call to the lead store. Apps Script answers a POST with a redirect to the result; fetch follows it as a GET.
function callStore(payload: object, timeoutMs: number) {
  const url = process.env.LEAD_STORE_URL
  const secret = process.env.LEAD_SECRET
  if (!url || !secret) return null
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ secret, ...payload }),
    signal: AbortSignal.timeout(timeoutMs),
  })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin || new URL(origin).host !== new URL(request.url).host) return reply({ ok: false, error: 'forbidden' }, 403)

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const raw = await request.text()
  if (raw.length > MAX_BODY) return reply({ ok: false, error: 'That is too long.' }, 413)
  let body: Record<string, unknown>
  try { body = JSON.parse(raw) } catch { return reply({ ok: false, error: 'bad request' }, 400) }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply({ ok: false, error: 'bad request' }, 400)

  // A visit has its own allowance, checked before the form's, so opening the page never uses up a try at the form.
  if (body.event === 'visit') return visit(request, ip, known(field(body.source, 30).toLowerCase()))
  if (limited(ip)) return reply({ ok: false, error: 'Too many tries. Please wait a few minutes.' }, 429)

  if (field(body.website, 200) || Number(body.elapsed) < MIN_FILL_MS) return reply({ ok: true })

  const contact = field(body.contact, 120)
  const pain = field(body.pain, 300)
  if (!EMAIL.test(contact) && !HANDLE.test(contact) && !PHONE.test(contact))
    return reply({ ok: false, error: 'Add an email, a social handle or a phone number so I can reply.' }, 422)
  if (pain.length < 10) return reply({ ok: false, error: 'Tell me a little more about the task.' }, 422)
  if (body.consent !== true) return reply({ ok: false, error: 'Please tick the consent box.' }, 422)

  const src = field(body.source, 30).toLowerCase()
  const lead = {
    source: known(src),
    name: field(body.name, 80),
    contact,
    business: field(body.business, 120),
    pain,
    consent: true,
    page: '/free-idea',
  }

  const sent = callStore({ action: 'add', lead }, 20_000)
  if (!sent) return reply({ ok: false, error: 'The form is not set up yet.' }, 503)
  try {
    const res = await sent
    const out = (await res.json()) as { ok?: boolean }
    if (!out.ok) throw new Error('store refused')
    return reply({ ok: true })
  } catch {
    return reply({ ok: false, error: 'Something went wrong on my side. Please try again later.' }, 502)
  }
}

// One visit to the page, counted per day and source. Always answers ok: the page never waits on it, and a bot
// learns nothing. Link previews and crawlers are not counted; neither is a flood, by address or in total, so the
// count is approximate and a burst of visits can never keep a real lead out of the store.
async function visit(request: Request, ip: string, source: string) {
  const minute = Math.floor(Date.now() / 60_000)
  if (budget.minute !== minute) budget = { minute, used: 0 }
  const skip = BOT.test(request.headers.get('user-agent') ?? '') || limited(ip, visits, VISIT_LIMIT) || ++budget.used > VISIT_BUDGET
  if (!skip) {
    try { await callStore({ action: 'click', source }, VISIT_TIMEOUT_MS) } catch { /* a missed count is not worth an error on the page */ }
  }
  return reply({ ok: true })
}
