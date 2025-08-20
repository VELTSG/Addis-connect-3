import { Outlet, Link, useNavigate } from 'react-router-dom'

function AdminLayout() {
	const navigate = useNavigate()

	function handleLogout() {
		localStorage.removeItem('ac_token')
		navigate('/admin/login')
	}

	return (
		<div className="min-h-screen flex flex-col">
			<div className="navbar bg-base-200/80 backdrop-blur supports-[backdrop-filter]:bg-base-200/70 sticky top-0 z-40 border-b border-base-300">
				<div className="flex-1">
					<Link to="/admin" className="btn btn-ghost text-xl font-extrabold" style={{fontFamily: 'var(--font-display)'}}>Admin</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1 gap-1">
						<li><Link className="btn btn-ghost" to="/admin/login">Login</Link></li>
						<li><button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
						<li><Link className="btn btn-primary" to="/">Back to Site</Link></li>
					</ul>
				</div>
			</div>
			<main className="flex-1 section">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminLayout


