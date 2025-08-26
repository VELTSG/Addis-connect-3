import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchServices, createService, updateService, deleteService, listPendingServices, approveService as approveSvc, rejectService as rejectSvc } from '../backendApi'

function AdminDashboard() {
	const navigate = useNavigate()
	const [services, setServices] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [form, setForm] = useState({ name: '', description: '', category: '', link: '', apiurl: '', isActive: true })
	const [editingId, setEditingId] = useState(null)
			const [pending, setPending] = useState([])
			const [actingId, setActingId] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('ac_token')
		const role = localStorage.getItem('ac_role')
		if (!token) return navigate('/admin/login', { replace: true })
		if (role !== 'admin' && role !== 'editor') return navigate('/dashboard', { replace: true })
	}, [navigate])

	useEffect(() => {
		let mounted = true
		fetchServices()
			.then((data) => mounted && setServices(data))
			.catch((err) => mounted && setError(err?.response?.data?.message || 'Failed to load services'))
			.finally(() => mounted && setLoading(false))
			// Load pending for admins
			listPendingServices()
				.then((d) => mounted && setPending(d))
				.catch(() => {})
		return () => { mounted = false }
	}, [])

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			if (editingId) {
				const updated = await updateService(editingId, form)
				setServices((arr) => arr.map((s) => (s._id === editingId ? updated : s)))
			} else {
				const created = await createService(form)
				setServices((arr) => [created, ...arr])
			}
			setForm({ name: '', description: '', category: '', link: '', apiurl: '', isActive: true })
			setEditingId(null)
		} catch (err) {
			alert(err?.response?.data?.message || 'Save failed')
		}
	}

	function handleEdit(svc) {
		setForm({ name: svc.name, description: svc.description, category: svc.category, link: svc.link, apiurl: svc.apiurl || '', isActive: svc.isActive })
		setEditingId(svc._id)
	}

	async function handleDelete(id) {
		if (!confirm('Delete this service?')) return
		try {
			await deleteService(id)
			setServices((arr) => arr.filter((s) => s._id !== id))
		} catch (err) {
			alert(err?.response?.data?.message || 'Delete failed')
		}

				async function handleApprove(id) {
					setActingId(id)
				try {
					const updated = await approveSvc(id)
					setPending((arr) => arr.filter((p) => p._id !== id))
					setServices((arr) => [updated, ...arr])
						// Safety: refresh pending list
						try { const d = await listPendingServices(); setPending(d) } catch {}
				} catch (err) {
					alert(err?.response?.data?.message || 'Approve failed')
					} finally {
						setActingId('')
				}
			}

			async function handleReject(id) {
					setActingId(id)
				try {
					await rejectSvc(id)
					setPending((arr) => arr.filter((p) => p._id !== id))
						try { const d = await listPendingServices(); setPending(d) } catch {}
				} catch (err) {
					alert(err?.response?.data?.message || 'Reject failed')
					} finally {
						setActingId('')
				}
			}
	}

	return (
		<section className="section">
			<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
				<div className="lg:col-span-1">
					<div className="card bg-base-100 shadow">
						<div className="card-body">
							<h2 className="card-title text-2xl">{editingId ? 'Edit Service' : 'Create Service'}</h2>
							<form onSubmit={handleSubmit} className="space-y-3">
								<input className="input input-bordered w-full" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
								<input className="input input-bordered w-full" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} required />
								<input className="input input-bordered w-full" placeholder="Link (external URL)" value={form.link} onChange={(e)=>setForm({...form,link:e.target.value})} required />
								<input className="input input-bordered w-full" placeholder="API URL (optional)" value={form.apiurl} onChange={(e)=>setForm({...form,apiurl:e.target.value})} />
								<textarea className="textarea textarea-bordered w-full" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required />
								<label className="label cursor-pointer justify-start gap-3">
									<input type="checkbox" className="checkbox" checked={form.isActive} onChange={(e)=>setForm({...form,isActive:e.target.checked})} />
									<span className="label-text">Active</span>
								</label>
								<div className="flex gap-2">
									<button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Create'}</button>
									{editingId && <button className="btn" type="button" onClick={()=>{setEditingId(null); setForm({ name:'', description:'', category:'', link:'', apiurl:'', isActive:true })}}>Cancel</button>}
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="lg:col-span-2">
					<div className="card bg-base-100 shadow">
						<div className="card-body">
							<h2 className="card-title text-2xl">Services</h2>
							{loading && <div className="alert">Loading…</div>}
							{error && <div className="alert alert-error">{error}</div>}
							{!loading && !error && (
								<div className="overflow-x-auto">
									<table className="table">
										<thead>
											<tr>
												<th>Name</th>
												<th>Category</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{services.map((s)=> (
												<tr key={s._id}>
													<td className="font-medium">{s.name}</td>
													<td>{s.category}</td>
													<td>
														{s.isActive ? <span className="badge badge-success">Active</span> : <span className="badge">Inactive</span>}
													</td>
													<td className="flex gap-2">
														<button className="btn btn-xs" onClick={()=>handleEdit(s)}>Edit</button>
														<button className="btn btn-xs btn-error" onClick={()=>handleDelete(s._id)}>Delete</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
								<div className="card bg-base-100 shadow mt-6">
									<div className="card-body">
										<h2 className="card-title text-2xl">Pending submissions</h2>
										{pending.length === 0 ? (
											<div className="text-sm opacity-70">No pending submissions.</div>
										) : (
											<div className="overflow-x-auto">
												<table className="table">
													<thead>
														<tr>
															<th>Name</th>
															<th>Category</th>
															<th>Submitted by</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														{pending.map((p)=> (
															<tr key={p._id}>
																<td className="font-medium">{p.name}</td>
																<td>{p.category}</td>
																<td className="text-sm opacity-70">{p.submittedBy?.email || '-'}</td>
																							<td className="flex gap-2">
																								<button className={`btn btn-xs btn-success ${actingId===p._id?'btn-disabled':''}`} onClick={()=>handleApprove(p._id)}>
																									{actingId===p._id ? 'Working…' : 'Approve'}
																								</button>
																								<button className={`btn btn-xs btn-error ${actingId===p._id?'btn-disabled':''}`} onClick={()=>handleReject(p._id)}>
																									{actingId===p._id ? 'Working…' : 'Reject'}
																								</button>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										)}
									</div>
								</div>
				</div>
			</div>
		</section>
	)
}

export default AdminDashboard


