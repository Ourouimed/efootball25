import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Register = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
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

    try {
      const response = await axios.post(`${API_URL}/teams/register`, inscription);
      setStatusMsg(response.data.message);
      setStatus(true);
      setTimeout(() => navigate("/stats"), 1000);
    } catch (err) {
      const errorMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "Something went wrong. Please try again.";
      setStatusMsg(errorMsg);
      setStatus(false);
    }
  };

  const inputStyle = 'w-full px-4 py-3 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all duration-300'
  return (
    <>
      <Header fixed={true} />
      <div className="min-h-screen flex items-center justify-center bg-secondary px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <form
            className="bg-primary backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700"
            onSubmit={handleRegisterTeam}
          >
            <h3 className="text-3xl font-bold text-fourth mb-2">Register Now</h3>
            <p className="text-gray-300 mb-4">
              Ready for <span className="text-third font-semibold">Saison 6</span>? Compete in the ultimate{" "}
              <span className="text-fourth font-semibold">eFootball</span> tournament!
            </p>

            <div className="divide-y divide-gray-600 border border-gray-600 rounded-lg overflow-hidden">
              
                <input
                  type="text"
                  placeholder="Team Name"
                  className={inputStyle}
                  value={inscription.teamName}
                  onChange={(e) =>
                    setInscription({ ...inscription, teamName: e.target.value.trim() })
                  }
                />
              
              
                <input
                  type="text"
                  placeholder="Username in PES"
                  className={inputStyle}
                  value={inscription.userName}
                  onChange={(e) =>
                    setInscription({ ...inscription, userName: e.target.value.trim() })
                  }
                />

              
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={inputStyle}
                  value={inscription.phoneNum}
                  onChange={(e) =>
                    setInscription({ ...inscription, phoneNum: e.target.value.trim() })
                  }
                />
              
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-third text-white rounded-lg translate-y-2 transition-all duration-300"
            >
              Register Now
            </button>
          </form>

          {statusMsg && (
            <div
              className={`mt-4 p-3 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                status ? "success-msg" : "error-msg"
              }`}
            >
              {statusMsg}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;