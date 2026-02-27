import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { CheckCircle, AlertCircle, Globe } from "lucide-react";

const Register = () => {
  const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';
  const navigate = useNavigate();

  // State for form data
  const [inscription, setInscription] = useState({
    teamName: "",
    phoneNum: "",
    userName: "",
    countryCode: "+212", // Default (e.g., Morocco)
  });

  // State for API country data
  const [countries, setCountries] = useState([]);
  const [statusMsg, setStatusMsg] = useState(null);
  const [status, setStatus] = useState(null);
  const [loadingCountries, setLoadingCountries] = useState(true);

  // Fetch country codes from RestCountries API on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,idd,cca2");
        const formatted = res.data
          .filter(c => c.idd.root) 
          .map(c => ({
            name: c.name.common,
            code: `${c.idd.root}${c.idd.suffixes?.[0] || ""}`,
            flag: c.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(formatted);
        setLoadingCountries(false);
      } catch (err) {
        console.error("Error fetching country codes:", err);
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    const { teamName, phoneNum, userName, countryCode } = inscription;

    // Validation
    if (!teamName || !phoneNum || !userName) {
      setStatusMsg("Please fill all fields!");
      setStatus(false);
      return;
    }

    if (teamName.length < 3) {
      setStatusMsg("Team name must be at least 3 characters long");
      setStatus(false);
      return;
    }

    // Combine code + number for the backend
    const fullPhone = `${countryCode}${phoneNum.replace(/\s/g, "")}`;

    try {
      const response = await axios.post(`${API_URL}/teams/register`, {
        ...inscription,
        phoneNum: fullPhone // Send the full concatenated number
      });
      
      setStatusMsg(response.data.message);
      setStatus(true);
      setTimeout(() => navigate("/stats"), 1500);
    } catch (err) {
      setStatusMsg(err.response?.data?.error || "Failed to register team");
      setStatus(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-md border border-gray-600 focus:ring-2 focus:ring-third focus:outline-none transition duration-200";

  return (
    <>
      <Header fixed />
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('../../assets/images/main_page_1.png')" }} 
      >
        <div className="bg-primary/60 p-4 min-h-screen flex items-center justify-center w-full">
          <div className="w-full max-w-xl bg-primary/90 rounded-2xl p-4 md:p-8 shadow-xl backdrop-blur-md">
            <form onSubmit={handleRegisterTeam} className="space-y-4 md:space-y-6">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-fourth uppercase tracking-wider">Register Now</h3>
                <p className="text-sm md:text-base text-white mt-2">
                  Ready for <span className="text-third font-semibold">Second edition</span>? Join the{" "}
                  <span className="text-fourth font-semibold">eFootball</span> tournament!
                </p>
              </div>

              <div className="space-y-4">
                {/* Team Name */}
                <input
                  type="text"
                  placeholder="Team Name"
                  className={inputStyle}
                  value={inscription.teamName}
                  onChange={(e) => setInscription({ ...inscription, teamName: e.target.value.trimStart() })}
                />

                {/* PES Username */}
                <input
                  type="text"
                  placeholder="Username in PES"
                  className={inputStyle}
                  value={inscription.userName}
                  onChange={(e) => setInscription({ ...inscription, userName: e.target.value.trimStart() })}
                />

                {/* Phone Number Group */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-white/60 ml-1">Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      className="w-[100px] px-2 py-3 bg-white/10 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-third outline-none cursor-pointer"
                      value={inscription.countryCode}
                      onChange={(e) => setInscription({ ...inscription, countryCode: e.target.value })}
                    >
                      {loadingCountries ? (
                        <option>...</option>
                      ) : (
                        countries.map((c, i) => (
                          <option key={i} value={c.code} className="bg-primary text-white">
                            {c.code} ({c.flag})
                          </option>
                        ))
                      )}
                    </select>
                    
                    <input
                      type="tel"
                      placeholder="612345678"
                      className={`${inputStyle} flex-1`}
                      value={inscription.phoneNum}
                      onChange={(e) =>
                        setInscription({ ...inscription, phoneNum: e.target.value.replace(/\D/g, "") })
                      }
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-4 bg-third text-white font-bold rounded-lg hover:bg-third/80 hover:scale-[1.01] active:scale-95 transition-all duration-200 shadow-lg"
              >
                Register Now
              </button>

              {statusMsg && (
                <div
                  className={`flex items-center gap-2 text-sm sm:text-base font-medium px-4 py-3 rounded-md border animate-in fade-in zoom-in duration-300
                    ${status 
                      ? "bg-green-500/20 text-green-400 border-green-500/50" 
                      : "bg-red-500/20 text-red-400 border-red-500/50"
                    }`}
                >
                  {status ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{statusMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;