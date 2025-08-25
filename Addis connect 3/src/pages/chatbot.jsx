import { useEffect, useRef, useState } from 'react'
import api from '../api'

export default function Chatbot() {
	const [messages, setMessages] = useState([{ role: 'system', content: 'Ask me anything about Addis Connect.' }])
	const [input, setInput] = useState('')
	const [loading, setLoading] = useState(false)
	const endRef = useRef(null)

	useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

	async function sendMessage(e) {
		e.preventDefault()
		if (!input.trim()) return
		const user = { role: 'user', content: input.trim() }
		setMessages((m) => [...m, user])
		setInput('')
		setLoading(true)
		try {
			console.log('Sending to:', import.meta.env.VITE_AI_URL)
			const res = await api.post('/chat', { 
				messages: [...messages, user],
				model: 'gpt-1.5-flash',
				max_tokens: 500
			})
			const assistant = res.data?.assistant || res.data || { role: 'assistant', content: 'No response.' }
			setMessages((m) => [...m, assistant])
		} catch (err) {
			console.error('AI API Error:', err)
			const errorMsg = err.response?.data?.error || err.message || 'Error contacting AI service.'
			setMessages((m) => [...m, { role: 'assistant', content: `Error: ${errorMsg}` }])
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-3xl mx-auto w-full h-[calc(100vh-8rem)] flex flex-col bg-base-100 rounded-xl shadow p-4">
			<div className="font-bold text-lg mb-2">Chatbot</div>
			<div className="flex-1 overflow-auto space-y-3">
				{messages.map((m, i) => (
					<div key={i} className={`chat ${m.role === 'user' ? 'chat-end' : 'chat-start'}`}>
						<div className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-primary' : ''}`}>{m.content}</div>
					</div>
				))}
				<div ref={endRef} />
			</div>
			<form onSubmit={sendMessage} className="mt-3 flex gap-2">
				<input className="input input-bordered flex-1" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
				<button className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} type="submit">Send</button>
			</form>
		</div>
	)
}
  