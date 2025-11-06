import { useContext, useEffect, useState } from 'react';
import Standing from "../components/Standing";
import Header from "../components/Header";
import Matches from '../components/Matches';
import axios from 'axios';
import HomeCard from '../components/HomeCard';
import TopScorer from '../components/TopScorer';
import TopDeff from '../components/TopDeff';
import Countdown from '../components/Countdown';
import { SettingsContext } from '../contexts/SettingsContext';

const Stats = () => {
  const {settings} = useContext(SettingsContext)
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teamsError, setTeamsError] = useState(null);
  const [matchesError, setMatchesError] = useState(null);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);

  const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';
  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API_URL}/teams`);
      setTeams(res.data);
    } catch (err) {
      setTeamsError(err.response?.data?.message || 'Failed to fetch teams');
    } finally {
      setTeamsLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${API_URL}/matches`);
      setMatches(res.data);
    } catch (err) {
      setMatchesError(err.response?.data?.message || 'Failed to fetch matches');
    } finally {
      setMatchesLoading(false);
    }
  };
  useEffect(() => {
    

    fetchTeams();
    fetchMatches();
  }, [API_URL]);


  const formatDatetimeLocal = (dateTime) => {
    if (!dateTime) return '';
    return dateTime.replace(' ', 'T').substring(0, 16);
  };

  const renderTeamSection = (Component) => (
    teamsLoading ? (
      <p className="text-white">Loading teams...</p>
    ) : teamsError ? (
      <p className="text-red-400">Error: {teamsError}</p>
    ) : (
      <div className='divide-y divide-[#ededed]'>
        <Component teams={teams} />
      </div>
    )
  );

  return (
    <>
      <Header />
      <div
        className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('../../assets/images/main_page_1.png')" }}
      >
        <div className="bg-primary/60 min-h-screen flex items-center justify-center w-full">
          <div className="w-6xl max-w-screen-xl mx-auto flex flex-col gap-6 px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4 relative">
              <div>
                {teamsLoading ? (
                  <p className="text-white">Loading teams...</p>
                ) : teamsError ? (
                  <p className="text-red-400">Error: {teamsError}</p>
                ) : (
                  <Standing teams={teams} />
                )}
              </div>
              <div>
                <HomeCard title="countdown">
                  <Countdown targetDate={formatDatetimeLocal(settings.deadlineDate)} round="League Phase" />
                </HomeCard>

                <HomeCard title="top scorer">
                  {renderTeamSection(TopScorer)}
                </HomeCard>

                <HomeCard title="best defence">
                  {renderTeamSection(TopDeff)}
                </HomeCard>

                <HomeCard title="matches">
                  {matchesLoading ? (
                    <p className="text-white">Loading matches...</p>
                  ) : matchesError ? (
                    <p className="text-red-400">Error: {matchesError}</p>
                  ) : (
                    <Matches matches={matches} teams={teams} />
                  )}
                </HomeCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
