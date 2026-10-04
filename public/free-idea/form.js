// The free-idea form -> POST /api/lead. ?src=tiktok (facebook, instagram, messenger...) records where the
// visitor came from; the server keeps only known sources.
const form = document.getElementById('lead-form')
const status = document.getElementById('status')
const started = Date.now()
const source = new URLSearchParams(location.search).get('src') || 'site'

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
