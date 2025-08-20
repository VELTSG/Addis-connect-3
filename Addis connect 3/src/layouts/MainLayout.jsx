import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col">
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
				</div>
			</div>
			<main className="flex-1 section">
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout


