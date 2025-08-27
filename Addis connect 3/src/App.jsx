import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Chatbot from './pages/chatbot.jsx'
import EthioShield from './pages/Ethioshield.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import UserLanding from './pages/UserLanding.jsx'

function App() {
	return (
		<Router>
			<Routes>
				{/* Main site */}
				<Route path="/" element={<MainLayout />}> 
					<Route index element={<Home />} />
					<Route path="services" element={<Services />} />
					<Route path="chatbot" element={<Chatbot />} />
					<Route path="ethioshield" element={<EthioShield />} />
					<Route path="user-login" element={<UserLogin />} />
					<Route path="user-signup" element={<UserSignup />} />
					<Route path="user-landing" element={<UserLanding />} />
					<Route path="contact" element={<div className="container mx-auto px-4 py-16 text-center"><h2 className="text-3xl font-bold mb-4">Contact Us</h2><p className="mb-4">For support or inquiries, email <a href="mailto:support@addisconnect.com" className="link">support@addisconnect.com</a> or call <span className="font-semibold">+251-XXX-XXXXXX</span>.</p></div>} />
				</Route>

				{/* Auth and dashboards */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="login" element={<AdminLogin />} />
					<Route index element={<AdminDashboard />} />
				</Route>
				<Route path="/dashboard" element={<AdminLayout />}>
					<Route index element={<UserDashboard />} />
				</Route>

				{/* Fallback */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	)
}

export default App