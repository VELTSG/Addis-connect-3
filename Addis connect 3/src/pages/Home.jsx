import { Link } from 'react-router-dom'

function Home() {
	 return (
		 <section className="container mx-auto px-4 py-16 md:py-24">
			 <div className="hero min-h-[70vh] rounded-2xl bg-gradient-to-br from-primary/15 via-base-200 to-base-100 mb-12">
				 <div className="hero-content text-center">
					 <div className="max-w-3xl mx-auto">
						 <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6" style={{fontFamily: 'var(--font-display)'}}>
							 Addis Connect: Your Smart City Hub
						 </h1>
						 <p className="text-lg md:text-xl text-base-content/70 mb-8">
							 A smart city model designed to serve all the online services provided in Addis Ababa. From making hospital appointments to finding your nearest taxi station, Addis Connect brings everything together in one convenient central hub.
						 </p>
									 <div className="flex flex-wrap justify-center gap-4 mb-8">
										 <span className="badge badge-lg bg-gray-200 text-gray-700">Hospital Appointments</span>
										 <span className="badge badge-lg bg-gray-200 text-gray-700">Taxi Stations</span>
										 <span className="badge badge-lg bg-gray-200 text-gray-700">Bill Payments</span>
										 <span className="badge badge-lg bg-gray-200 text-gray-700">City News</span>
										 <span className="badge badge-lg bg-gray-200 text-gray-700">AI Assistance</span>
									 </div>
						 <Link to="/services" className="btn btn-primary btn-lg">Explore Services</Link>
					 </div>
				 </div>
			 </div>
			 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				 <div className="bg-base-100 rounded-xl shadow p-8 text-center">
					 <h2 className="text-2xl font-bold mb-4">Why Addis Connect?</h2>
					 <ul className="list-disc list-inside text-base-content/80 text-left mx-auto max-w-md">
						 <li>Centralized access to all city services</li>
						 <li>Book appointments, pay bills, and get updates easily</li>
						 <li>Find locations and get directions instantly</li>
						 <li>Personalized dashboard for every citizen</li>
						 <li>Secure, fast, and always available</li>
					 </ul>
				 </div>
				 <div className="bg-gradient-to-br from-primary/10 to-base-200 rounded-xl shadow p-8 flex flex-col justify-center items-center">
					 <h2 className="text-2xl font-bold mb-4">How It Works</h2>
					 <p className="text-base-content/70 mb-4">Sign up, log in, and access all your city services from one place. Track your activity, manage appointments, and stay informed with real-time updates.</p>
					 <Link to="/signup" className="btn btn-outline btn-primary">Get Started</Link>
				 </div>
			 </div>
		 </section>
	)
}

export default Home


