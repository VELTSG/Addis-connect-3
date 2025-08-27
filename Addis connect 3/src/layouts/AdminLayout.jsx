import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AdminLayout() {
	const navigate = useNavigate()
	const location = useLocation()
	const [role, setRole] = useState(localStorage.getItem('ac_role') || '')

	// Theme selector removed per request

	// Simple route guarding based on role
	useEffect(() => {
		const token = localStorage.getItem('ac_token')
		const r = localStorage.getItem('ac_role')
		setRole(r || '')
		if (!token) {
			// If hitting /admin without token, send to login
			if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
				navigate('/admin/login', { replace: true })
			}
			return
		}
		// If user (not admin/editor) attempts to access /admin dashboard root, redirect to user dashboard
		if ((r !== 'admin' && r !== 'editor') && location.pathname === '/admin') {
			navigate('/dashboard', { replace: true })
		}
	}, [location.pathname, navigate])

	function handleLogout() {
	localStorage.removeItem('ac_token')
	localStorage.removeItem('ac_role')
		navigate('/admin/login')
	}

	return (
		<div className="min-h-screen flex flex-col bg-base-200 text-base-content">
			<div className="navbar bg-base-200/80 backdrop-blur supports-[backdrop-filter]:bg-base-200/70 sticky top-0 z-40 border-b border-base-300">
				<div className="flex-1">
					<Link to={role==='admin'||role==='editor'?'/admin':'/dashboard'} className="btn btn-ghost text-xl font-extrabold px-2" style={{fontFamily: 'var(--font-display)'}}>
						{role==='admin'||role==='editor' ? 'Admin' : 'Account'}
					</Link>
				</div>
				<div className="navbar-center">
					<ul className="menu menu-horizontal px-1 gap-2">
						<li><Link className="btn btn-ghost" to="/admin/login">{role? 'Switch Account' : 'Login'}</Link></li>
						<li><button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
						<li><Link className="btn btn-primary" to="/">Back to Site</Link></li>
					</ul>
				</div>
			</div>
			<main className="flex-1 container mx-auto px-4 py-12 md:py-16">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminLayout


