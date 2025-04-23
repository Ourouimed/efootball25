import { useState } from "react";
import axios from 'axios';

const Register = () => {
  const [inscription, setInscription] = useState({
    teamName: '',
    phoneNum: '',
    userName: ''
  });

  // State for handling submission status (e.g., success or error)
  const [status, setStatus] = useState(null);

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    let a = await axios.get('https://3000-idx-efootball25-1745400587666.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev/register' , inscription)


  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <form
        className="bg-primary p-4 rounded-lg w-[400px] max-w-full"
        onSubmit={handleRegisterTeam} 
      >
        <h3 className="text-fourth text-xl">Aji T9YD F Ahsan Tournoi d efootball</h3>
        <div className="divide-y-1 divide-[#ededed] rounded border border-[#ededed] mt-2">
          <input
            type="text"
            placeholder="Smiya d fr9tk hna"
            className="register-input"
            value={inscription.teamName}
            onChange={(e) => setInscription({ ...inscription, teamName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Smitk f Pes"
            className="register-input"
            value={inscription.userName}
            onChange={(e) => setInscription({ ...inscription, userName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nmra d tel 06(7)..."
            className="register-input"
            value={inscription.phoneNum}
            onChange={(e) => setInscription({ ...inscription, phoneNum: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-third rounded w-full cursor-pointer mt-2 p-2 text-white"
        >
          T9yd db
        </button>
      </form>
      {status && <div className="mt-4 text-center">{status}</div>}
    </div>
  );
};

export default Register;
