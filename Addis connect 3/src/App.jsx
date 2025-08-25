import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Chatbot from './pages/chatbot.jsx'
import EthioShield from './pages/Ethioshield.jsx'

function App() {
	return (
		<Router>
			<Routes>
				{/* Main site */}
				<Route path="/" element={<MainLayout />}> 
					<Route index element={<Home />} />
					<Route path="services" element={<Services />} />
					<Route path="chatbot" element={<Chatbot />} />  {/* ✅ added chatbot route */}
					<Route path="ethioshield" element={<EthioShield />} />
				</Route>

				{/* Admin site */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="login" element={<AdminLogin />} />
					<Route index element={<AdminDashboard />} />
				</Route>

				{/* Fallback */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	)
}

export default App