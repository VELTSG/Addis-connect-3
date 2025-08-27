import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchServices } from '../backendApi'

function Services() {
	const navigate = useNavigate()
	const [services, setServices] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
  
		// Curated built-in services that already exist in the UI
		const featured = [
			{
				key: 'ethioshield',
				name: 'EthioShield',
				description: 'Enhanced protection against phishing and scam attacks.',
				action: () => navigate('/ethioshield'),
				cta: 'Details',
				comingSoon: false,
			},
			{
				key: 'chatbot',
				name: 'Smart AI',
				description: 'Your friendly assistant.',
				action: () => navigate('/chatbot'),
				cta: 'Open',
				comingSoon: false,
			},
			{
				key: 'waterpay',
				name: 'WaterPay',
				description: 'Pay your water bills online.',
				action: () => {},
				cta: 'Details',
				comingSoon: true,
			},
			{
				key: 'trafficinfo',
				name: 'Traffic Info',
				description: 'Get real-time traffic updates.',
				action: () => {},
				cta: 'Details',
				comingSoon: true,
			},
			{
				key: 'hospital',
				name: 'Hospital Appointments',
				description: 'Book appointments at city hospitals.',
				action: () => {},
				cta: 'Details',
				comingSoon: true,
			},
			{
				key: 'taxistation',
				name: 'Taxi Stations',
				description: 'Find your nearest taxi station.',
				action: () => {},
				cta: 'Details',
				comingSoon: true,
			},
		]

	useEffect(() => {
		let mounted = true
		fetchServices()
			.then((data) => mounted && setServices(data))
			.catch((err) => mounted && setError(err?.response?.data?.message || 'Failed to load services'))
			.finally(() => mounted && setLoading(false))
		return () => { mounted = false }
	}, [])

		// Filter DB services to avoid duplicating featured ones by name
		const featuredNames = new Set(featured.map((f) => f.name.toLowerCase()))
		const dynamicServices = services.filter((s) => !featuredNames.has((s.name || '').toLowerCase()))

		return (
			<section className="section">
				<h2 className="section-title">City Services</h2>
				<p className="section-subtitle">Explore available city services.</p>

				 {/* Featured and placeholder services */}
				 <div className="mb-10">
					 <h3 className="text-xl font-bold mb-4">Featured</h3>
					 <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						 {featured.map((svc) => (
							 <div key={svc.key} className="group card bg-base-100/95 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1">
								 <div className="card-body">
									 <div className="flex items-center justify-between">
										 <h3 className="card-title">{svc.name}</h3>
									 </div>
									 <p className="text-base-content/70">{svc.description}</p>
									 <div className="card-actions justify-end">
										 <button className="btn btn-outline btn-primary" onClick={svc.action} disabled={svc.comingSoon}>
											 {svc.comingSoon ? 'Coming soon' : svc.cta}
										 </button>
									 </div>
								 </div>
							 </div>
						 ))}
					 </div>
				 </div>

				{/* Database services */}
				{loading && <div className="alert">Loading services…</div>}
				{error && <div className="alert alert-error">{error}</div>}

				{!loading && !error && (
					<>
						<h3 className="text-xl font-bold mb-4">Explore</h3>
						<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{dynamicServices.map((svc) => (
								<div
									key={svc._id}
									className="group card bg-base-100/95 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1"
								>
									<div className="card-body">
										<h3 className="card-title">{svc.name}</h3>
										<p className="text-base-content/70">{svc.description}</p>
										<div className="badge badge-outline">{svc.category}</div>
										<div className="card-actions justify-end">
											<a className="btn btn-outline btn-primary" href={`http://localhost:5000/redirect/${svc._id}`} target="_blank" rel="noreferrer">
												Visit
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</section>
		)
}

export default Services
