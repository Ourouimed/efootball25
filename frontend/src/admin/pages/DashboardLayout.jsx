import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { useState , useEffect } from "react";
import { SideNavContext } from "../../contexts/Sidenavontext";
import axios from "axios";
const DashboardLayout = () => {
  const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
  const navigate = useNavigate()
  const verifySession = async (user) => {
    try {
      const res = await axios.post('http://localhost:3001/verify-session', {
        id: user.id,
        sessionCode: user.sessionCode
      });
      const { id_session} = res.data;
      if (id_session !== user.sessionCode) {
        navigate('/login');
      }
    } catch {
      navigate('/login');
    }
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) navigate('/login');
    else verifySession(user);
  }, [navigate]);
  return (
    <SideNavContext.Provider
      value={{
        currentState: sidenavIsOpen,
        toggleSidenav: () => setSidenavIsOpen(!sidenavIsOpen),
      }}
    >
      <div className="bg-[#ededed] min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidenav />
          <div className="py-4 px-8 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SideNavContext.Provider>
  );
};

export default DashboardLayout;
