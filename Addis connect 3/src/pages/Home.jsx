import { Link } from 'react-router-dom'

function Home() {
	return (
		<div className="hero min-h-[70vh] bg-base-200 rounded-box">
			<div className="hero-content text-center">
				<div className="max-w-xl">
					<h1 className="text-5xl font-bold">Welcome to Addis Connect</h1>
					<p className="py-6">Your smart-city hub for services, information, and administration.</p>
					<Link to="/services" className="btn btn-primary">Explore Services</Link>
				</div>
			</div>
		</div>
	)
}

export default Home


