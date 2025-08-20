import { Link } from 'react-router-dom'

function Home() {
	return (
		<section className="section">
			<div className="hero min-h-[70vh] bg-gradient-to-br from-primary/10 via-base-200 to-base-100 rounded-2xl">
				<div className="hero-content text-center">
					<div className="max-w-2xl">
						<h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{fontFamily: 'var(--font-display)'}}>
							Welcome to Addis Connect
						</h1>
						<p className="text-lg md:text-xl text-base-content/70 mb-8">
							Your smart-city hub for services, information, and administration.
						</p>
						<Link to="/services" className="btn btn-primary btn-lg">Explore Services</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Home


