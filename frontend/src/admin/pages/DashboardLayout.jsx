import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { SideNavContext } from "../../contexts/Sidenavontext";

const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

axios.defaults.withCredentials = true;

const DashboardLayout = () => {
  const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const verifySession = async () => {
    try {
      const res = await axios.post(`${API_URL}/verify-session`);
      setUser(res.data); // Assuming res.data is the user object
    } catch (error) {
      console.error("Session verification failed:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-gray-600 text-lg">Verifying session...</span>
      </div>
    );
  }

  return (
    <SideNavContext.Provider
      value={{
        currentState: sidenavIsOpen,
        toggleSidenav: () => setSidenavIsOpen(!sidenavIsOpen),
        user,
      }}
    >
      <div className="bg-[#ededed] min-h-screen">
        <div className="flex">
          <Sidenav />
          <div className="w-full">
            <Navbar />
            <div className="py-4 px-8 w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SideNavContext.Provider>
  );
};

export default DashboardLayout;
