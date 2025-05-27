import { Link } from "react-router-dom"
import Header from "../components/Header"
const Home = () => {
    return (
        <>
            <Header fixed={true}/>
            <div className="bg-primary">
                <div className="container flex items-center justify-center min-h-screen flex-col">
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl text-third">Welcome Everyone</h1>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl text-white">
                            To The best <span className="text-fourth">efootball</span> Tournament
                        </h3>
                        <div className="flex items-center gap-2 justify-center mt-5">
                            <Link to='/stats' className="home-btn bg-fourth text-primary">Statistique</Link>
                            <Link to='/register' className="home-btn bg-third text-white">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
