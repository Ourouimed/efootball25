import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [sessionChecking, setSessionChecking] = useState(true); // Add loading for session check
  const [user, setUser] = useState({
    id: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const verifySession = async (storedUser) => {
    try {
      setSessionChecking(true);
      const res = await axios.post('https://efootball25-api.vercel.app/verify-session', {
        id: storedUser.id,
        sessionCode: storedUser.sessionCode
      });
      
      // Check if the session is valid and user has proper role
      if (res.data && res.data.id_session === storedUser.sessionCode) {
        navigate('/dashboard');
      } else {
        // Clear invalid session
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.error("Session verification failed:", err);
      localStorage.removeItem('user');
    } finally {
      setSessionChecking(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      verifySession(storedUser);
    } else {
      setSessionChecking(false);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const login = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setLoading(true); 
    setError(null);
    
    // Basic validation
    if (!user.id.trim() || !user.password.trim()) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://efootball25-api.vercel.app/login', user);
      
      if (response.data && response.data.sessionCode) {
        // Store only necessary data in localStorage
        const userData = {
          id: response.data.id,
          sessionCode: response.data.sessionCode,
          role: response.data.role
        };
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      let errorMessage = 'Login failed';
      if (err.response) {
        // Use server-provided error message if available
        errorMessage = err.response.data.error || err.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (sessionChecking) {
    return (
      <div className="bg-[#ededed] min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p>Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ededed] min-h-screen">
      <div className="container flex items-center justify-center min-h-screen flex-col">
        <div className="bg-white p-6 rounded-lg w-[400px] max-w-full shadow-md">
          <h3 className="text-2xl mb-4 font-semibold">Login To Admin Panel</h3>
          <form onSubmit={login}>
            <input
              type="text"
              name="id"
              placeholder="Username or Email"
              className="login-inp mb-3"
              value={user.id}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="login-inp mb-3"
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <div className="admin-alert mb-3 text-sm text-gray-600">
              To connect to admin Panel as a guest use:<br />
              username: guest<br />
              password: guest
            </div>

            <button
              type="submit"
              className="bg-primary w-full py-2 px-4 rounded-md text-white cursor-pointer hover:bg-primary-dark transition-colors"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
          
          {error && (
            <div className="mt-3 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;