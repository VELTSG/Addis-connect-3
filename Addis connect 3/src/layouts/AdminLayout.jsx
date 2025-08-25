import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AdminLayout() {
	const navigate = useNavigate()
	const [theme, setTheme] = useState('business')

	useEffect(() => {
		const attr = document.documentElement.getAttribute('data-theme')
		const saved = localStorage.getItem('ac_theme')
		setTheme(attr || saved || 'business')
	}, [])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('ac_theme', theme)
	}, [theme])

	function handleLogout() {
		localStorage.removeItem('ac_token')
		navigate('/admin/login')
	}

	return (
		<div className="min-h-screen flex flex-col bg-base-200 text-base-content">
			<div className="navbar bg-base-200/80 backdrop-blur supports-[backdrop-filter]:bg-base-200/70 sticky top-0 z-40 border-b border-base-300">
				<div className="flex-1">
					<Link to="/admin" className="btn btn-ghost text-xl font-extrabold px-2" style={{fontFamily: 'var(--font-display)'}}>Admin</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1 gap-2">
						<li><Link className="btn btn-ghost" to="/admin/login">Login</Link></li>
						<li><button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
						<li><Link className="btn btn-primary" to="/">Back to Site</Link></li>
					</ul>
					<select className="select select-bordered ml-3" value={theme} onChange={(e) => setTheme(e.target.value)}>
						<option value="valentine">Valentine</option>
						<option value="business">Business</option>
						<option value="corporate">Corporate</option>
						<option value="emerald">Emerald</option>
						<option value="lofi">Lofi</option>
						<option value="winter">Winter</option>
					</select>
				</div>
			</div>
			<main className="flex-1 container mx-auto px-4 py-12 md:py-16">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminLayout


