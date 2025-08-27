import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserProfile, fetchUserServices } from '../backendApi';

function UserLanding() {
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await fetchUserProfile();
        const usedServices = await fetchUserServices();
        setProfile(user);
        setServices(usedServices);
      } catch (err) {
        setProfile(null);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;

  if (!profile) return <div className="text-center mt-12 text-red-500">Failed to load profile.</div>;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-base-100 rounded-2xl shadow p-8 mb-8">
        <h2 className="text-3xl font-bold mb-4">Welcome, {profile.username || profile.email}</h2>
        <div className="mb-4 text-base-content/70">Role: {profile.role}</div>
      </div>
      <div className="max-w-2xl mx-auto bg-base-100 rounded-2xl shadow p-8">
        <h3 className="text-2xl font-bold mb-4">Services You've Used</h3>
        {services.length === 0 ? (
          <div className="text-base-content/60">You haven't used any services yet.</div>
        ) : (
          <ul className="space-y-3">
            {services.map((svc) => (
              <li key={svc.id} className="flex justify-between items-center">
                <span>{svc.name}</span>
                <Link to={svc.link} className="btn btn-outline btn-sm">Go to Service</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default UserLanding;
