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
		<section className="section">
			<div className="grid gap-6 grid-cols-1 md:grid-cols-3">
				<div className="col-span-2">
					<div className="card bg-base-100 shadow">
						<div className="card-body">
							<h2 className="card-title text-2xl">Overview</h2>
							<p>Welcome to the admin dashboard.</p>
						</div>
					</div>
				</div>
				<div className="space-y-6">
					<div className="card bg-base-100 shadow">
						<div className="card-body">
							<h3 className="card-title">Quick Actions</h3>
							<div className="flex flex-wrap gap-2">
								<button className="btn btn-primary btn-sm">Create</button>
								<button className="btn btn-outline btn-sm">Settings</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdminDashboard


