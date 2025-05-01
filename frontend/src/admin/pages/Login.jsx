import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 
const Login = () => {
  const [loading , setLoading] = useState(null)
  const [user , setUser] = useState({
    id : '',
    password : ''
  })
  const [error , setError] = useState(null)
  const navigate = useNavigate()
  const verifySession = async (user) => {
    try {
      const res = await axios.post('http://localhost:3001/verify-session', {
        id: user.id,
        sessionCode: user.sessionCode
      });
      const { id_session} = res.data;
      if (id_session === user.sessionCode) {
        navigate('/dashboard');
      }
    } catch {
      
    }
  };

  
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) verifySession(user);
  }, [navigate]);


  const login = async () => {
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:3001/login', user);
      
      if (response.status === 200) {
        localStorage.setItem('user' , JSON.stringify(response.data))
        navigate('/dashboard'); 
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
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
            onChange={(e) =>
              setUser({ ...user, id: e.target.value })
            }
          />
          <input
            type="password" 
            placeholder="Password"
            className="login-inp"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
          <div className="admin-alert mb-1">
            To Connect to admin Panel as a guest use <br></br>username : guest <br></br> password : guest
          </div>

            <button
              className="bg-primary w-full py-2 px-4 rounded-md text-white cursor-pointer"
              onClick={login}
            >
              Login to Dashboard
            </button>
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
