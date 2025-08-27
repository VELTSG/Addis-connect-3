import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitService, listMyServices } from '../backendApi'

export default function UserDashboard() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', description: '', category: '', link: '', apiurl: '', keywords: '' })
  const [mine, setMine] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('ac_token')
    if (!token) navigate('/admin/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    let mounted = true
    listMyServices()
      .then((d) => mounted && setMine(d))
      .catch((e) => mounted && setError(e?.response?.data?.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      link: form.link,
      apiurl: form.apiurl || undefined,
      keywords: form.keywords ? form.keywords.split(',').map((k)=>k.trim()).filter(Boolean) : undefined,
    }
    try {
      const created = await submitService(payload)
      setMine((arr) => [created, ...arr])
      setForm({ name: '', description: '', category: '', link: '', apiurl: '', keywords: '' })
      alert('Submitted for approval.')
    } catch (err) {
      alert(err?.response?.data?.message || 'Submit failed')
    }
  }

  return (
    <section className="section">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-2xl">Add your service</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="input input-bordered w-full" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
              <input className="input input-bordered w-full" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} required />
              <input className="input input-bordered w-full" placeholder="Link (external URL)" value={form.link} onChange={(e)=>setForm({...form,link:e.target.value})} required />
              <input className="input input-bordered w-full" placeholder="API URL (optional)" value={form.apiurl} onChange={(e)=>setForm({...form,apiurl:e.target.value})} />
              <textarea className="textarea textarea-bordered w-full" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required />
              <input className="input input-bordered w-full" placeholder="Keywords (comma-separated)" value={form.keywords} onChange={(e)=>setForm({...form,keywords:e.target.value})} />
              <button className="btn btn-primary" type="submit">Submit for approval</button>
            </form>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-2xl">My submissions</h2>
            {loading && <div className="alert">Loading…</div>}
            {error && <div className="alert alert-error">{error}</div>}
            {!loading && !error && (
              <ul className="space-y-2">
                {mine.map((s)=> (
                  <li key={s._id} className="p-3 rounded border border-base-300 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm opacity-70">{s.category} • {s.status}</div>
                    </div>
                    <span className={`badge ${s.status==='approved'?'badge-success': s.status==='rejected'?'badge-error':'badge-ghost'}`}>{s.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
