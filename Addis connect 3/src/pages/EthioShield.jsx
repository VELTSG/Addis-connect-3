import { useState } from 'react'

function quickScan(raw) {
  const reasons = []
  let risk = 0
  const t = String(raw || '').trim().toLowerCase()
  if (!t) return { verdict: 'UNKNOWN', risk, reasons }

  // Try URL parsing
  let url
  try { url = new URL(t) } catch {}

  const suspWords = ['verify','login','update','confirm','secure','reset','invoice','payment','gift','urgent','account','unlock']
  const suspTlds = ['.ru','.tk','.zip','.xyz','.click','.top','.country','.work']

  if (url) {
    if (suspTlds.some(s => url.hostname.endsWith(s))) { risk += 30; reasons.push('Suspicious TLD') }
    if ((url.hostname.match(/\./g) || []).length >= 4) { risk += 15; reasons.push('Too many subdomains') }
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(url.hostname)) { risk += 35; reasons.push('IP address as host') }
    if (/xn--/.test(url.hostname)) { risk += 20; reasons.push('Punycode domain') }
  }

  const wordHits = suspWords.filter(w => t.includes(w)).length
  if (wordHits >= 1) { risk += 15; reasons.push('Phishing keywords detected') }

  const verdict = risk >= 45 ? 'MALICIOUS' : risk >= 20 ? 'SUSPICIOUS' : 'SAFE'
  return { verdict, risk: Math.min(100, risk), reasons }
}

export default function EthioShield() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function scan(e) {
    e.preventDefault()
    setLoading(true)
    // local quick scan (demo)
    const r = quickScan(input)
    setTimeout(() => { // simulate processing
      setResult(r)
      setLoading(false)
    }, 600)
  }

  const badge =
    result?.verdict === 'MALICIOUS' ? 'badge-error' :
    result?.verdict === 'SUSPICIOUS' ? 'badge-warning' :
    result?.verdict === 'SAFE' ? 'badge-success' : 'badge-ghost'

  const sample = (text) => setInput(text)

  return (
    <section className="section">
      <div className="mx-auto max-w-xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-start gap-3">
              <div className="mask mask-hexagon bg-primary/10 p-2">
                {/* Shield icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.3 1.3a1 1 0 0 1 1.4 0l7 7a1 1 0 0 1 .3.7V12c0 5.5-3.6 9.3-8.7 10.6a1 1 0 0 1-.5 0C5.6 21.3 2 17.5 2 12V9a1 1 0 0 1 .3-.7l7-7Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">EthioShield</h1>
                <p className="text-sm text-base-content/60">Scan links or messages for common phishing signs.</p>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn btn-xs" onClick={() => sample('https://paypal-login.verify.ru')}>
                Example 1
              </button>
              <button className="btn btn-xs" onClick={() => sample('Your account is locked. Confirm now: http://secure-update.top/login')}>
                Example 2
              </button>
              <button className="btn btn-xs" onClick={() => sample('https://www.addisababa.gov.et/')}>
                Example 3
              </button>
            </div>

            {/* Input */}
            <form onSubmit={scan} className="mt-4">
              <label className="label">
                <span className="label-text">Paste a link or message</span>
              </label>
              <div className="join w-full">
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="https://example.com … or a suspicious message"
                  className="input input-bordered join-item w-full"
                />
                <button type="submit" className={`btn btn-primary join-item ${loading ? 'btn-disabled' : ''}`}>
                  {loading ? 'Scanning…' : 'Scan'}
                </button>
              </div>
              <p className="mt-2 text-xs text-base-content/60">
                Demo only — quick client checks. No personal data is stored.
              </p>
            </form>

            {/* Result */}
            {result && (
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <div className={`badge ${badge}`}>{result.verdict}</div>
                  {typeof result.risk === 'number' && (
                    <span className="text-sm text-base-content/70">{result.risk}/100 risk</span>
                  )}
                </div>
                {result.reasons?.length > 0 && (
                  <ul className="mt-2 list-disc ml-5 text-sm">
                    {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
