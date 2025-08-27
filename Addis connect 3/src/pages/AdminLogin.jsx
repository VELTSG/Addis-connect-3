import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../backendApi'

function AdminLogin() {
		const [email, setEmail] = useState('')
		const [password, setPassword] = useState('')
		const [loading, setLoading] = useState(false)
		const [message, setMessage] = useState('')
		const [messageType, setMessageType] = useState('') // 'success' | 'error'
		const navigate = useNavigate()
		const [mode, setMode] = useState('login') // 'login' | 'signup'

		async function handleSubmit(e) {
			e.preventDefault()
			setLoading(true)
			setMessage('')
			setMessageType('')
			try {
				if (mode === 'signup') {
					await signup(email, password)
					setMessage('Account created. Please log in.')
					setMessageType('success')
					setMode('login')
				} else {
					const res = await login(email, password)
					const role = res?.user?.role || localStorage.getItem('ac_role')
					setMessage('Login successful! Redirecting...')
					setMessageType('success')
					setTimeout(() => {
						if (role === 'admin' || role === 'editor') navigate('/admin', { replace: true })
						else navigate('/dashboard', { replace: true })
					}, 1200)
				}
			} catch (err) {
				console.error(err)
				setMessage(err?.response?.data?.message || 'Login failed')
				setMessageType('error')
			} finally {
				setLoading(false)
			}
		}
 return (
 	<section className="section">
 		<div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow p-6">
 			<h2 className="text-3xl font-bold mb-6">{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
 			{message && (
 				<div className={`mb-4 text-center text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message}</div>
 			)}
 			<form onSubmit={handleSubmit} className="space-y-4">
 				<label className="form-control w-full">
 					<div className="label"><span className="label-text">Email</span></div>
 					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
 				</label>
 				<label className="form-control w-full">
 					<div className="label"><span className="label-text">Password</span></div>
 					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
 				</label>
 				<button type="submit" className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`} disabled={loading}>
 					{loading ? (
 						<span className="flex items-center justify-center gap-2">
 							<span className="loading loading-spinner loading-sm"></span>
 							{mode === 'signup' ? 'Creating' : 'Signing in'}
 						</span>
 					) : (mode === 'signup' ? 'Sign Up' : 'Login')}
 				</button>
 			</form>
 			<div className="mt-4 text-center">
 				{mode === 'signup' ? (
 					<button className="link" onClick={()=>setMode('login')}>Already have an account? Login</button>
 				) : (
 					<button className="link" onClick={()=>setMode('signup')}>Don't have an account? Sign Up</button>
 				)}
 			</div>
 		</div>
 	</section>
 	)
}

export default AdminLogin


