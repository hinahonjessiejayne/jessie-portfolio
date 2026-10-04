// The free-idea form -> POST /api/lead. ?src=tiktok (facebook, instagram, messenger...) records where the
// visitor came from; the server keeps only known sources. The same source is used to count visits.
const form = document.getElementById('lead-form')
const status = document.getElementById('status')
const started = Date.now()
const source = (new URLSearchParams(location.search).get('src') || 'site').slice(0, 30) // a long ?src= must not make the form too long to send

// Count the visit, once per browser session, by source only: no name or cookie is sent, and the count keeps no
// address (the server holds the sender's address in memory for its rate limit only: see privacy.html).
try {
  if (!navigator.webdriver && !sessionStorage.getItem('free-idea-visit')) {
    sessionStorage.setItem('free-idea-visit', '1')
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'visit', source }),
      keepalive: true,
    }).catch(() => {})
  }
} catch { /* private mode without storage: the visit is simply not counted */ }

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const contact = String(data.get('contact') || '').trim()
  const pain = String(data.get('pain') || '').trim()
  const problem = !contact ? 'Add where I should reply.'
    : pain.length < 10 ? 'Tell me a little more about the task.'
    : !data.get('consent') ? 'Please tick the consent box.' : ''
  if (problem) return show(problem, true)

  const button = form.querySelector('button')
  button.disabled = true
  show('Sending...')
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.get('name'), contact, business: data.get('business'), pain,
        consent: true, source, website: data.get('website'), elapsed: Date.now() - started,
      }),
    })
    const out = await res.json().catch(() => ({}))
    if (!out.ok) throw new Error(out.error || 'Something went wrong. Please try again.')
    document.getElementById('form-wrap').hidden = true
    const done = document.getElementById('done')
    done.hidden = false
    done.focus()
  } catch (err) {
    show(err.message, true)
    button.disabled = false
  }
})

function show(text, isError = false) {
  status.textContent = text
  status.classList.toggle('error', isError)
}
