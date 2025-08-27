import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../backendApi'

function AdminLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

			const [mode, setMode] = useState('login') // 'login' | 'signup'

			async function handleSubmit(e) {
		e.preventDefault()
			setLoading(true)
			try {
					if (mode === 'signup') {
						await signup(email, password)
						alert('Account created. Please log in.')
						setMode('login')
					} else {
						const res = await login(email, password)
						const role = res?.user?.role || localStorage.getItem('ac_role')
						if (role === 'admin' || role === 'editor') navigate('/admin', { replace: true })
						else navigate('/dashboard', { replace: true })
					}
			} catch (err) {
				console.error(err)
				alert(err?.response?.data?.message || 'Login failed')
			} finally {
				setLoading(false)
			}
	}

	return (
		<section className="section">
					<div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow p-6">
						<h2 className="text-3xl font-bold mb-6">{mode === 'signup' ? 'Create Account' : 'Sign In'}</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<label className="form-control w-full">
						<div className="label"><span className="label-text">Email</span></div>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
					</label>
					<label className="form-control w-full">
						<div className="label"><span className="label-text">Password</span></div>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
					</label>
								<button type="submit" className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}>
									{loading ? (mode === 'signup' ? 'Creating…' : 'Signing in…') : (mode === 'signup' ? 'Create account' : 'Login')}
								</button>
				</form>
							<div className="mt-4 text-center">
								{mode === 'signup' ? (
									<button className="link" onClick={()=>setMode('login')}>Have an account? Sign in</button>
								) : (
									<button className="link" onClick={()=>setMode('signup')}>No account? Create one</button>
								)}
							</div>
			</div>
		</section>
	)
}

export default AdminLogin


