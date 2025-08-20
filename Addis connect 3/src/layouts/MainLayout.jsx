import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="navbar bg-base-100 shadow">
				<div className="flex-1">
					<Link to="/" className="btn btn-ghost text-xl">Addis Connect</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/services">Services</Link></li>
						<li><Link to="/admin">Admin</Link></li>
					</ul>
				</div>
			</div>
			<main className="flex-1 container mx-auto p-4">
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout


