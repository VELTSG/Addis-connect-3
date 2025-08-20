import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		setLoading(true)
		setTimeout(() => {
			localStorage.setItem('ac_token', 'mock-token')
			setLoading(false)
			navigate('/admin')
		}, 600)
	}

	return (
		<section className="section">
			<div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow p-6">
				<h2 className="text-3xl font-bold mb-6">Admin Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<label className="form-control w-full">
						<div className="label"><span className="label-text">Email</span></div>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
					</label>
					<label className="form-control w-full">
						<div className="label"><span className="label-text">Password</span></div>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
					</label>
					<button type="submit" className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}>{loading ? 'Signing in…' : 'Login'}</button>
				</form>
			</div>
		</section>
	)
}

export default AdminLogin


