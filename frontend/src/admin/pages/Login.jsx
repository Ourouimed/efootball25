import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

axios.defaults.withCredentials = true;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ id: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const verifySession = async () => {
    try {
      await axios.get(`${API_URL}/verify-session`);
      navigate('/dashboard');
    } catch {
      // stay on login
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  // Handle login
  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/login`, user);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ededed]">
      <div className="container flex items-center justify-center min-h-screen flex-col">
        <div className="bg-white p-4 rounded-lg w-[400px] max-w-full">
          <h3 className="text-2xl mb-2">Login To Admin Panel</h3>

          <input
            type="text"
            placeholder="Username or Email"
            className="login-inp"
            value={user.id}
            onChange={(e) => setUser({ ...user, id: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="login-inp"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="bg-green-400/30 border-2 border-green-400 mb-1 rounded p-4 text-sm">
            To connect as a guest:<br />
            <strong>Username:</strong> guest<br />
            <strong>Password:</strong> guest
          </div>

          <button
            className="bg-primary w-full py-2 px-4 rounded-md text-white"
            onClick={login}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
