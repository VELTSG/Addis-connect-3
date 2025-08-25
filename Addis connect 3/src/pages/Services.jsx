import { useNavigate } from 'react-router-dom'

function Services() {
	const navigate = useNavigate()

	const services = [
		{ id: 1, name: 'EthioShield', description: 'Enhanced protection against phishing and scam attacks.', route: '/ethioshield' },
		{ id: 2, name: 'Public Transport', description: 'Real-time transit updates and passes.' },
		{ id: 3, name: 'Smart AI', description: 'Your friendly assistant.', route: '/chatbot' },
		{ id: 4, name: 'Permits', description: 'Apply for building and event permits.' },
		{ id: 5, name: 'Safety Alerts', description: 'City notices and emergency updates.' },
		{ id: 6, name: 'Parks & Recreation', description: 'Find events and book facilities.' },
	]

	return (
		<section className="section">
			<h2 className="section-title">City Services</h2>
			<p className="section-subtitle">Explore available city services. More are coming soon.</p>
			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((svc) => (
					<div
						key={svc.id}
						className="group card bg-base-100/95 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1"
					>
						<div className="card-body">
							<h3 className="card-title">{svc.name}</h3>
							<p className="text-base-content/70">{svc.description}</p>
							<div className="card-actions justify-end">
								{svc.route ? (
									<button
										className="btn btn-outline btn-primary group-hover:translate-x-0.5 transition-transform"
										onClick={() => navigate(svc.route)}
									>
										Details
									</button>
								) : (
									<span className="text-sm text-base-content/50 italic">Coming soon</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default Services
