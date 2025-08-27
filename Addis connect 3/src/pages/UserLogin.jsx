import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../backendApi';

function UserLogin() {
  const [email, setEmail] = useState('');
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
      const res = await login(email, password);
      setMessage('Login successful! Redirecting...');
      setMessageType('success');
      setTimeout(() => {
        navigate('/user-landing', { replace: true });
      }, 1200);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Login failed');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow p-6">
        <h2 className="text-3xl font-bold mb-6">User Login</h2>
        {message && (
          <div className={`mb-4 text-center text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                Signing in
              </span>
            ) : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <a href="/user-signup" className="link">Sign Up</a>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
