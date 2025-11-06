import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitchBtn from '../components/SwitchBtn';
import { SettingsContext } from '../../contexts/SettingsContext';
import axios from 'axios';

const Settings = () => {
  const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';
  const navigate = useNavigate();
  const { settings } = useContext(SettingsContext);

  const [statusMsg, setStatusMsg] = useState(null);
  const [status, setStatus] = useState(null);

  const [currRound, setCurrRound] = useState(settings?.currentRound || 'GW1');
  const [numOfGws, setNumOfGws] = useState(settings?.totalGws || 8);
  const [deadDate, setDeadDate] = useState(() => {
    if (!settings?.deadlineDate) return new Date().toISOString().slice(0, 16);
    return settings.deadlineDate.replace(' ', 'T').substring(0, 16);
  });
  const [switchStatus, setSwitchStatus] = useState(settings?.registerIsOpen || false);

  let gwRounds = [];
  for (let i = 0; i < settings.totalGws; i++) {
    gwRounds.push(`GW${i + 1}`);
  }
  const rounds = [...gwRounds, 'PO', 'R16', 'QF', 'SF', 'Final'];

  useEffect(() => {
    if (settings) {
      const formatDatetimeLocal = (dateTime) => {
        if (!dateTime) return '';
        return dateTime.replace(' ', 'T').substring(0, 16);
      };

      setCurrRound(settings.currentRound);
      setNumOfGws(settings.totalGws);
      setDeadDate(formatDatetimeLocal(settings.deadlineDate));
      setSwitchStatus(settings.registerIsOpen);
    }
  }, [settings]);

  axios.defaults.withCredentials = true;

  const verifySession = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/verify-session`,
        {}, 
        { withCredentials: true } 
      );
      const { role } = res.data;
      if (role !== 'admin') {
        setStatusMsg('You do not have the necessary permissions.');
        setStatus(false);
        return false;
      }
      return true;
    } catch {
      navigate('/login');
      return false;
    }
  };

  const formatDatetimeToMySQL = (datetimeLocal) => {
    if (!datetimeLocal) return null;
    return datetimeLocal.replace('T', ' ') + ':00';
  };

  const handleUpdateSettings = async () => {
    const validSession = await verifySession();
    if (!validSession) return;

    try {
      await axios.post(
        `${API_URL}/settings/set`,
        {
          currentRound: currRound,
          totalGws: Number(numOfGws),
          deadlineDate: formatDatetimeToMySQL(deadDate),
          registerIsOpen: switchStatus,
        },
        { withCredentials: true }
      );
      setStatus(true);
      setStatusMsg('Settings Updated Successfully');
    } catch (error) {
      console.error(error);
      setStatus(false);
      setStatusMsg(error.response?.data?.message || 'Impossible to Update Settings');
    }
  };

  const inputStyle =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 outline-none p-2';

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-5">Tournament Settings</h1>
        {statusMsg && (
          <div
            className={`p-2 rounded mb-4 ${
              status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {statusMsg}
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label>Current Round</label>
                <select
                  className={inputStyle}
                  value={currRound}
                  onChange={(e) => setCurrRound(e.target.value)}
                >
                  {rounds.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Total gameweeks</label>
                <input
                  type="number"
                  className={inputStyle}
                  value={numOfGws}
                  onChange={(e) => setNumOfGws(e.target.value)}
                  min={1}
                />
              </div>
              <div>
                <label>Current Round deadline</label>
                <input
                  type="datetime-local"
                  className={inputStyle}
                  value={deadDate}
                  onChange={(e) => setDeadDate(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label>Register is Open</label>
                <SwitchBtn
                  isOn={switchStatus}
                  onToggle={() => setSwitchStatus(!switchStatus)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdateSettings}
              className="bg-primary text-white px-6 py-2 rounded-md outline-none cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
