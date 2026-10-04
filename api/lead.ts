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
const SOURCES = ['facebook', 'tiktok', 'instagram', 'messenger', 'site', 'other']
const MAX_BODY = 4000
const MIN_FILL_MS = 3000
const LIMIT = 5
const WINDOW_MS = 10 * 60_000
const BOT = /bot|crawl|spider|preview|facebookexternalhit|headless|monitor|curl|wget|python|node/i
const hits = new Map<string, number[]>() // per instance, best effort

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const HANDLE = /^@?[\w.]{2,30}$/
const PHONE = /^\+?[\d\s-]{7,16}$/

const reply = (body: object, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

const field = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max) : ''

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > LIMIT
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin || new URL(origin).host !== new URL(request.url).host) return reply({ ok: false, error: 'forbidden' }, 403)

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (limited(ip)) return reply({ ok: false, error: 'Too many tries. Please wait a few minutes.' }, 429)

  const raw = await request.text()
  if (raw.length > MAX_BODY) return reply({ ok: false, error: 'That is too long.' }, 413)
  let body: Record<string, unknown>
  try { body = JSON.parse(raw) } catch { return reply({ ok: false, error: 'bad request' }, 400) }

  if (body.event === 'visit') return visit(request, field(body.source, 30).toLowerCase())

  if (field(body.website, 200) || Number(body.elapsed) < MIN_FILL_MS) return reply({ ok: true })

  const contact = field(body.contact, 120)
  const pain = field(body.pain, 300)
  if (!EMAIL.test(contact) && !HANDLE.test(contact) && !PHONE.test(contact))
    return reply({ ok: false, error: 'Add an email, a social handle or a phone number so I can reply.' }, 422)
  if (pain.length < 10) return reply({ ok: false, error: 'Tell me a little more about the task.' }, 422)
  if (body.consent !== true) return reply({ ok: false, error: 'Please tick the consent box.' }, 422)

  const src = field(body.source, 30).toLowerCase()
  const lead = {
    source: SOURCES.includes(src) ? src : 'site',
    name: field(body.name, 80),
    contact,
    business: field(body.business, 120),
    pain,
    consent: true,
    page: '/free-idea',
  }

  const store = process.env.LEAD_STORE_URL
  const secret = process.env.LEAD_SECRET
  if (!store || !secret) return reply({ ok: false, error: 'The form is not set up yet.' }, 503)
  try {
    // Apps Script answers a POST with a redirect to the result; fetch follows it as a GET
    const res = await fetch(store, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ secret, action: 'add', lead }),
      signal: AbortSignal.timeout(20_000),
    })
    const out = (await res.json()) as { ok?: boolean }
    if (!out.ok) throw new Error('store refused')
    return reply({ ok: true })
  } catch {
    return reply({ ok: false, error: 'Something went wrong on my side. Please try again later.' }, 502)
  }
}

// One visit to the page, counted per day and source. Always answers ok: the page never waits on it, and a bot
// learns nothing. Link previews and crawlers are not counted.
async function visit(request: Request, src: string) {
  const store = process.env.LEAD_STORE_URL
  const secret = process.env.LEAD_SECRET
  if (!store || !secret || BOT.test(request.headers.get('user-agent') ?? '')) return reply({ ok: true })
  try {
    await fetch(store, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ secret, action: 'click', source: SOURCES.includes(src) ? src : 'site' }),
      signal: AbortSignal.timeout(20_000),
    })
  } catch { /* a missed count is not worth an error on the page */ }
  return reply({ ok: true })
}
