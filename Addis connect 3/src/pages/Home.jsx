import { Link } from 'react-router-dom'

function Home() {
	return (
		<section className="container mx-auto px-4 py-16 md:py-24">
			<div className="hero min-h-[70vh] rounded-2xl bg-gradient-to-br from-primary/15 via-base-200 to-base-100">
				<div className="hero-content text-center">
					<div className="max-w-3xl">
						<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6" style={{fontFamily: 'var(--font-display)'}}>
							Welcome to Addis Connect
						</h1>
						<p className="text-lg md:text-xl text-base-content/70 mb-10">
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


