import { Outlet, Link, useNavigate } from 'react-router-dom'

function AdminLayout() {
	const navigate = useNavigate()

	function handleLogout() {
		localStorage.removeItem('ac_token')
		navigate('/admin/login')
	}

	return (
		<div className="min-h-screen flex flex-col">
			<div className="navbar bg-base-200 shadow">
				<div className="flex-1">
					<Link to="/admin" className="btn btn-ghost text-xl">Admin</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						<li><Link to="/admin/login">Login</Link></li>
						<li><button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
						<li><Link to="/">Back to Site</Link></li>
					</ul>
				</div>
			</div>
			<main className="flex-1 container mx-auto p-4">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminLayout


