import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('ac_token')
		if (!token) {
			navigate('/admin/login', { replace: true })
		}
	}, [navigate])

	return (
		<div>
			<h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
			<p>Welcome to the admin dashboard.</p>
		</div>
	)
}

export default AdminDashboard


