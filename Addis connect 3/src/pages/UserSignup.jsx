import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../backendApi';

function UserSignup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');
    try {
      const res = await signup(email, password, username);
      localStorage.setItem('ac_username', username);
      setMessage('Account created! Please log in.');
      setMessageType('success');
      setTimeout(() => {
        navigate('/user-login', { replace: true });
      }, 1200);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Signup failed');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow p-6">
        <h2 className="text-3xl font-bold mb-6">User Sign Up</h2>
        {message && (
          <div className={`mb-4 text-center text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Username</span></div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full" required />
          </label>
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Email</span></div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
          </label>
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Password</span></div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
          </label>
          <button type="submit" className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`} disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Signing up
              </span>
            ) : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/user-login" className="link">Login</a>
        </div>
      </div>
    </section>
  );
}

export default UserSignup;
