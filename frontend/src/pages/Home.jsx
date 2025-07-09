import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header fixed />
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('../../assets/images/main_page_1.png')" }}
      >
        <div className="bg-primary/60 min-h-screen flex items-center justify-center flex-col">
          <div className="text-center px-6 md:px-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-third drop-shadow">
              Welcome everyone
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 drop-shadow-lg">
              Join the <span className="text-fourth">ourouimed</span> efootball Tournament
            </h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto text-sm sm:text-lg">
            Register now and join Season 6 of the tournament. Play matches, check your stats, and have fun with other players!
            </p>

            <div className="flex items-center gap-4 justify-center mt-8 flex-wrap">
              <Link
                to="/stats"
                className="home-btn bg-fourth text-primary hover:bg-fourth/90 transition duration-200"
              >
                View Statistics
              </Link>
              <Link
                to="/register"
                className="home-btn bg-third text-white hover:bg-third/90 transition duration-200"
              >
                Join the Tournament
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
