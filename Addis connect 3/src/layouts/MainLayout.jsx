import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function MainLayout() {
	const [theme, setTheme] = useState('business')

	useEffect(() => {
		const saved = localStorage.getItem('ac_theme')
		if (saved) setTheme(saved)
	}, [])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('ac_theme', theme)
	}, [theme])
	return (
		<div className="min-h-screen flex flex-col bg-base-200 text-base-content">
			<div className="navbar bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/70 sticky top-0 z-40 border-b border-base-200">
				<div className="flex-1">
					<Link to="/" className="btn btn-ghost text-xl font-extrabold" style={{fontFamily: 'var(--font-display)'}}>
						Addis Connect
					</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1 gap-1">
						<li><Link className="btn btn-ghost" to="/">Home</Link></li>
						<li><Link className="btn btn-ghost" to="/services">Services</Link></li>
						<li><Link className="btn btn-primary" to="/admin">Admin</Link></li>
					</ul>
					<select className="select select-bordered ml-3" value={theme} onChange={(e) => setTheme(e.target.value)}>
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

export default MainLayout


