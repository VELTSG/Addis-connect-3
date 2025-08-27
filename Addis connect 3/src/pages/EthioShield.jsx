import React, { useState } from "react"

const API_KEY = import.meta.env.VITE_SAFE_BROWSING_KEY

function normalizeUrl(raw) {
	try {
		if (!/^https?:\/\//i.test(raw)) {
			return new URL(`http://${raw}`).toString()
		}
		return new URL(raw).toString()
	} catch {
		return raw
	}
}

// --- Local quick checks ---
function quickScan(url) {
	const badTLDs = [".ru", ".tk", ".cn", ".gq", ".ml", ".ga"]
	const suspiciousPatterns = [/@/, /\.zip$/, /\.rar$/, /^http:\/\/\d+\.\d+\.\d+\.\d+/]

	let risk = 0
	let reasons = []

	try {
		const parsed = new URL(url)

		// Shady TLDs
		badTLDs.forEach(tld => {
			if (parsed.hostname.endsWith(tld)) {
				risk += 40
				reasons.push(`Suspicious TLD (${tld})`)
			}
		})

		// Suspicious patterns
		suspiciousPatterns.forEach(p => {
			if (p.test(url)) {
				risk += 30
				reasons.push("Suspicious pattern detected")
			}
		})

		// Too many subdomains
		if (parsed.hostname.split(".").length > 4) {
			risk += 20
			reasons.push("Excessive subdomains")
		}

		// Punycode
		if (parsed.hostname.includes("xn--")) {
			risk += 50
			reasons.push("Punycode detected (possible homograph attack)")
		}

	} catch {
		risk += 10
		reasons.push("Invalid URL format")
	}

	return {
		verdict: risk > 60 ? "MALICIOUS" : risk > 30 ? "SUSPICIOUS" : "SAFE",
		risk,
		reasons
	}
}

// --- Google Safe Browsing API ---
async function checkWithGoogle(url) {
	if (!API_KEY) {
		throw new Error("Missing VITE_SAFE_BROWSING_KEY in .env")
	}
	const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${encodeURIComponent(API_KEY)}`
	const payload = {
		client: { clientId: "ethioshield-demo", clientVersion: "1.0" },
		threatInfo: {
			threatTypes: [
				"MALWARE",
				"SOCIAL_ENGINEERING",
				"UNWANTED_SOFTWARE",
				"POTENTIALLY_HARMFUL_APPLICATION"
			],
			platformTypes: ["ANY_PLATFORM"],
			threatEntryTypes: ["URL"],
			threatEntries: [{ url }]
		}
	}

	const res = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	})

	if (!res.ok) {
		const text = await res.text().catch(() => "")
		throw new Error(`Safe Browsing ${res.status} ${res.statusText} ${text}`)
	}

	const data = await res.json().catch(() => ({}))
	if (data?.matches?.length > 0) {
		return {
			verdict: "MALICIOUS",
			risk: 95,
			reasons: ["Flagged by Google Safe Browsing"]
		}
	}
	return null
}

// --- Main Component ---
export default function EthioShield() {
	const [input, setInput] = useState("")
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState(null)
	const [error, setError] = useState("")

	async function scan(e) {
		e.preventDefault()
		setLoading(true)
		setError("")
		setResult(null)

		const normalized = normalizeUrl(input.trim())

		try {
			let r = null
			if (/^https?:\/\//i.test(normalized)) {
				r = await checkWithGoogle(normalized)
			}
			if (!r) {
				r = quickScan(normalized)
			}
			setResult(r)
		} catch (err) {
			setError(err.message || "Scan failed. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="mx-auto max-w-2xl bg-base-100 rounded-2xl shadow border border-base-200">
				<div className="p-6 border-b border-base-200 bg-gradient-to-r from-primary/10 to-base-200 rounded-t-2xl">
					<h2 className="text-2xl font-extrabold">🛡️ EthioShield</h2>
					<p className="text-base-content/70">Check a URL against Google Safe Browsing and quick heuristics.</p>
					{!API_KEY && (
						<div className="alert alert-warning mt-3">
							<div>
								<span className="font-semibold">Missing API key.</span> Add VITE_SAFE_BROWSING_KEY to your .env and restart.
							</div>
						</div>
					)}
				</div>
				<form onSubmit={scan} className="p-6 flex gap-3">
					<input
						type="text"
						placeholder="Enter a URL (e.g., example.com or https://example.com)"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="input input-bordered flex-1"
					/>
					<button className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}>
						{loading ? "Scanning..." : "Scan"}
					</button>
				</form>
				{error && (
					<div className="px-6 pb-2">
						<div className="alert alert-error">
							<span>{error}</span>
						</div>
					</div>
				)}
				{result && (
					<div className="p-6 pt-0">
						<div className={`p-4 rounded-xl border ${
							result.verdict === "MALICIOUS" ? "bg-red-100/60 border-red-300" :
							result.verdict === "SUSPICIOUS" ? "bg-yellow-100/60 border-yellow-300" :
							"bg-green-100/60 border-green-300"
						}`}> 
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-bold text-lg">Verdict: {result.verdict}</h3>
								<span className="badge">Risk: {result.risk}%</span>
							</div>
							<ul className="list-disc list-inside text-sm">
								{result.reasons.map((r, i) => <li key={i}>{r}</li>)}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
