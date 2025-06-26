import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header fixed />
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('../../public/assets/images/main_page_1.png')" }} // Ensure the image exists in public/images
      >
        <div className="bg-primary/50  min-h-screen flex items-center justify-center flex-col">
          <div className="text-center px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-third">
              Welcome Everyone
            </h1>
            <h3 className="text-2xl sm:text-4xl md:text-5xl text-white">
              To The best <span className="text-fourth">efootball</span> Tournament
            </h3>
            <div className="flex items-center gap-2 justify-center mt-5">
              <Link to="/stats" className="home-btn bg-fourth text-primary">
                Statistique
              </Link>
              <Link to="/register" className="home-btn bg-third text-white">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
