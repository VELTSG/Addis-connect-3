import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-base-200 text-base-content">
			<div className="navbar bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/70 sticky top-0 z-40 border-b border-base-200">
					<div className="flex flex-1 justify-center items-center gap-8">
						<Link to="/" className="btn btn-ghost text-2xl font-extrabold px-2" style={{fontFamily: 'var(--font-display)'}}>
							Addis <span className="text-primary">Connect</span>
						</Link>
						<ul className="menu menu-horizontal px-1 gap-2">
							<li><Link className="btn btn-ghost" to="/">Home</Link></li>
							<li><Link className="btn btn-ghost" to="/services">Services</Link></li>
							<li><Link className="btn btn-ghost" to="/chatbot">Chatbot</Link></li>
							<li><Link className="btn btn-ghost" to="/user-signup">Sign Up</Link></li>
							<li><Link className="btn btn-ghost" to="/user-login">Login</Link></li>
							<li><Link className="btn btn-ghost" to="/contact">Contact Us</Link></li>
						</ul>
						<div className="ml-auto flex items-center">
							<div className="dropdown dropdown-end">
								<label tabIndex={0} className="btn btn-ghost btn-circle text-xl" title="Admin Login">
									<span className="material-icons">more_vert</span>
								</label>
								<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
									<li><Link to="/admin" className="btn btn-ghost">Admin Login</Link></li>
								</ul>
							</div>
						</div>
					</div>
			</div>
			<main className="flex-1 container mx-auto px-4 py-12 md:py-16">
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout


