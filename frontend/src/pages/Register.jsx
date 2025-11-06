import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { CheckCircle, AlertCircle } from "lucide-react";

const Register = () => {
  const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';
  const navigate = useNavigate();

  const [inscription, setInscription] = useState({
    teamName: "",
    phoneNum: "",
    userName: "",
  });

  const [statusMsg, setStatusMsg] = useState(null);
  const [status, setStatus] = useState(null);

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    const { teamName, phoneNum, userName } = inscription;

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

    if (!/^\d{8,15}$/.test(phoneNum)) {
      setStatusMsg("Enter a valid phone number (8–15 digits)");
      setStatus(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/teams/register`, inscription);
      setStatusMsg(response.data.message);
      setStatus(true);
      window.open("https://chat.whatsapp.com/KaYiY1O83eZKaySn4KUJF7", "_blank" , "width=600,height=400,scrollbars=yes") ;
      setTimeout(() => navigate("/stats"), 1000);
    } catch (err) {
      setStatusMsg(err.response.data.error || "Failed to register team");
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
          <form onSubmit={handleRegisterTeam} className="space-y-2 md:space-y-4">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-fourth">Register Now</h3>
              <p className="text-sm md:text-base text-white mt-2">
                Ready for <span className="text-third font-semibold">Saison 6</span>? Join the{" "}
                <span className="text-fourth font-semibold">eFootball</span> tournament!
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Team Name"
                className={inputStyle}
                value={inscription.teamName}
                onChange={(e) =>
                  setInscription({ ...inscription, teamName: e.target.value.trimStart() })
                }
              />

              <input
                type="text"
                placeholder="Username in PES"
                className={inputStyle}
                value={inscription.userName}
                onChange={(e) =>
                  setInscription({ ...inscription, userName: e.target.value.trimStart() })
                }
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className={inputStyle}
                value={inscription.phoneNum}
                onChange={(e) =>
                  setInscription({ ...inscription, phoneNum: e.target.value.trimStart() })
                }
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-third text-white font-semibold rounded-lg hover:bg-third/90 transition duration-200"
            >
              Register Now
            </button>

            {statusMsg && (
  <div
    className={`flex items-center gap-2 text-sm sm:text-base font-medium text-center px-4 py-3 rounded-md border transition-all duration-300
      ${status 
        ? "bg-green-100 text-green-700 border-green-700" 
        : "bg-red-100 text-red-700 border-red-500"
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
