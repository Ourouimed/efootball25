import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Register = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"
  const navigate = useNavigate();

  const [inscription, setInscription] = useState({
    teamName: "",
    phoneNum: "",
    userName: ""
  });

  const [statusMsg, setStatusMsg] = useState(null);
  const [status, setStatus] = useState(null);

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    const { teamName, phoneNum, userName } = inscription;

    if (!teamName || !phoneNum || !userName) {
      setStatusMsg("Please, fill all fields!!");
      setStatus(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/teams/register`, inscription);
      setStatusMsg(response.data.message);
      setStatus(true);
      setTimeout(() => navigate("/stats"), 1000);
    } catch (err) {
      console.error(err);
      const errorMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "Something went wrong. Please try again.";
      setStatusMsg(errorMsg);
      setStatus(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-secondary">
        <div className="container flex items-center justify-center min-h-screen flex-col">
          <div>
            <form
              className="bg-primary p-4 rounded-lg w-[400px] max-w-[90%] m-auto"
              onSubmit={handleRegisterTeam}
            >
              <h3 className="text-fourth text-2xl">Register Now</h3>
              <p className="text-white">
                T9yd db f <span className="text-fourth">Saison 2</span> ahsan Tournoi d efootball
              </p>
              <div className="divide-y-1 divide-[#ededed] rounded border border-[#ededed] mt-2">
                <input
                  type="text"
                  placeholder="Smiya d fr9tk hna"
                  className="register-input"
                  value={inscription.teamName}
                  onChange={(e) =>
                    setInscription({ ...inscription, teamName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Smitk f Pes"
                  className="register-input"
                  value={inscription.userName}
                  onChange={(e) =>
                    setInscription({ ...inscription, userName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Nmra d tel 06(7)..."
                  className="register-input"
                  value={inscription.phoneNum}
                  onChange={(e) =>
                    setInscription({ ...inscription, phoneNum: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-third rounded w-full cursor-pointer mt-2 p-2 text-white"
              >
                T9yd db
              </button>
            </form>
            {statusMsg && (
              <div
                className={`mt-2 text-center ${
                  status ? "success-msg" : "error-msg"
                }`}
              >
                {statusMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
