import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import StatsCard from '../components/StatsCard';
import Card from '../components/Card';
import { SideNavContext } from "../../contexts/Sidenavontext";
import { useState, useEffect } from "react";
import { SportsSoccer, Group } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Dashbord = () => {
  const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user , setUser] = useState({})
  const navigate = useNavigate();

  const verifySession = async (userId) => {
    try {
      const response = await axios.get('http://localhost:3001/verify-session', {
        params: { id: userId },
      });

      if (response.status === 200) {
        fetchTeams();
      }
    } catch (error) {
      setError('Session expired or user not found');
      navigate('/login'); 
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3001/teams');
      setTeams(response.data);
    } catch (error) {
      setError('Failed to fetch teams');
    }
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); 

    if (!user) {
      navigate('/login'); 
    } else {
      verifySession(user.id);
      setUser(user)
    }
  }, [navigate]);

  if (loading) return <div className="text-center text-white py-8">Loading teams...</div>;
  if (error) return <div className="text-center text-white py-8">Error: {error}</div>;

  return (
    <div className="bg-[#ededed] min-h-screen">
      <SideNavContext.Provider
        value={{
          currentState: sidenavIsOpen,
          toggleSidenav: () => {
            setSidenavIsOpen(!sidenavIsOpen);
          },
        }}
      >
        <Navbar />
        <div className="flex">
          <Sidenav />
          <div className="py-4 px-8 w-full">
            <h1 className="text-3xl">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
              <StatsCard label="Total Goals" value={250} icon={<SportsSoccer fontSize="large" className="text-primary" />} />
              <StatsCard label="Total Teams" value={32} icon={<Group fontSize="large" className="text-primary" />} />
              <StatsCard label="Total Teams" value={32} icon={<Group fontSize="large" className="text-primary" />} />
              <StatsCard label="Total Teams" value={32} icon={<Group fontSize="large" className="text-primary" />} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              <Card title="Top Scorer">
                {teams.slice(0, 5).map((team, index) => (
                  <div className="flex justify-between items-center py-2" key={index}>
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">{index + 1}</span>
                      <span className="text-xl">{team.teamName}</span>
                    </div>
                    <p className="bg-primary/10 rounded py-2 px-5 text-primary">20</p>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </SideNavContext.Provider>
    </div>
  );
};

export default Dashbord;
