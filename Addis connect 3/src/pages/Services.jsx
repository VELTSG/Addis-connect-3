function Services() {
	const services = [
		{ id: 1, name: 'Waste Collection', description: 'Schedule pickups and report issues.' },
		{ id: 2, name: 'Public Transport', description: 'Real-time transit updates and passes.' },
		{ id: 3, name: 'Utilities', description: 'Pay bills and track usage.' },
		{ id: 4, name: 'Permits', description: 'Apply for building and event permits.' },
		{ id: 5, name: 'Safety Alerts', description: 'City notices and emergency updates.' },
		{ id: 6, name: 'Parks & Recreation', description: 'Find events and book facilities.' },
	]

	return (
		<div>
			<h2 className="text-3xl font-bold mb-6">City Services</h2>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((svc) => (
					<div key={svc.id} className="card bg-base-100 shadow">
						<div className="card-body">
							<h3 className="card-title">{svc.name}</h3>
							<p>{svc.description}</p>
							<div className="card-actions justify-end">
								<button className="btn btn-outline btn-primary">Details</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Services


