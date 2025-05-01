import { Link } from "react-router-dom"
import {ArrowBackIos , Home} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
const ErrorPage = ()=>{
    const navigate = useNavigate()
    return <>
        <div className="min-h-screen flex items-center justify-center">
            <div className=" text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <p className="text-3xl mt-2">Sorry The Page You Search for , Was Not Found!!</p>
                <div className="flex items-center gap-2 justify-center mt-5">
                    <Link to ='' className="home-btn bg-third text-white !flex items-center" onClick={()=>navigate(-1)}><ArrowBackIos/> Go back</Link>
                    <Link to='/' className="home-btn bg-primary text-white !flex items-center"><Home/>Go back To Home Page</Link>
                </div>
            </div>
        </div>
    </>
}

export default ErrorPage
