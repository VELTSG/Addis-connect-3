import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-base-200 text-base-content">
			<div className="navbar bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/70 sticky top-0 z-40 border-b border-base-200">
					<div className="flex flex-1 items-center gap-8 justify-center relative">
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
								<div className="absolute right-0 flex items-center">
									<div className="dropdown dropdown-end">
										<label tabIndex={0} className="btn btn-ghost btn-circle" title="Menu">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="5" cy="12" r="2" fill="currentColor" />
												<circle cx="12" cy="12" r="2" fill="currentColor" />
												<circle cx="19" cy="12" r="2" fill="currentColor" />
											</svg>
										</label>
										<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44">
											<li><Link to="/user-landing" className="btn btn-ghost">Profile</Link></li>
											<li><Link to="/admin" className="btn btn-ghost">Admin Login</Link></li>
										</ul>
									</div>
								</div>
					</div>
			</div>
			<main className="flex-1 container mx-auto px-4 py-12 md:py-16">
				{/* Universal back button, hidden on home page */}
				<Outlet />
			</main>
			<footer className="bg-base-100 border-t border-base-200 py-8 mt-12">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
					<span className="text-base-content/70">© {new Date().getFullYear()} Addis Connect</span>
					<div className="flex gap-4">
						<a href="https://facebook.com/addisconnect" target="_blank" rel="noopener" title="Facebook" className="btn btn-ghost btn-circle">
							<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.733-.592-1.325-1.325-1.325z"/></svg>
						</a>
						<a href="https://x.com/addisconnect" target="_blank" rel="noopener" title="X" className="btn btn-ghost btn-circle">
							<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3.5h3.47l-7.57 8.62 8.89 10.38h-7.02l-5.54-6.48-6.34 6.48h-3.48l8.09-9.27-8.67-9.73h7.09l5.01 5.86z"/></svg>
						</a>
						<a href="https://instagram.com/addisconnect" target="_blank" rel="noopener" title="Instagram" className="btn btn-ghost btn-circle">
							<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.072-1.276.06-2.687.334-3.678 1.325-.991.991-1.265 2.402-1.325 3.678-.06 1.28-.072 1.688-.072 4.947s.012 3.667.072 4.947c.06 1.276.334 2.687 1.325 3.678.991.991 2.402 1.265 3.678 1.325 1.28.06 1.688.072 4.947.072s3.667-.012 4.947-.072c1.276-.06 2.687-.334 3.678-1.325.991-.991 1.265-2.402 1.325-3.678.06-1.28.072-1.688.072-4.947s-.012-3.667-.072-4.947c-.06-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.265-3.678-1.325-1.28-.06-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
						</a>
						<a href="https://t.me/addisconnect" target="_blank" rel="noopener" title="Telegram" className="btn btn-ghost btn-circle">
							<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c5.522 0 10 4.478 10 10s-4.478 10-10 10S2 17.522 2 12 6.478 2 12 2zm4.707 7.293l-1.414 1.414-2.293-2.293a1 1 0 0 0-1.414 0l-2.293 2.293-1.414-1.414a1 1 0 0 0-1.414 1.414l2.293 2.293a1 1 0 0 0 1.414 0l2.293-2.293 1.414 1.414a1 1 0 0 0 1.414-1.414z"/></svg>
						</a>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default MainLayout


