import Matches from "../components/Matches"
import Standings from "../components/Standings"
import teams from '../admin/teams'
import {SportsSoccer} from '@mui/icons-material';
const Stats = ()=> {
    

    return <div className="py-5 flex justify-center items-center min-h-[90vh] flex-col gap-4">
            <h1 className="text-third font-bold text-2xl md:text-4xl">Tournaments Stats</h1>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3 w-full">
            <Standings />
            <div>
                <div className="bg-fourth mb-4 p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <div className="bg-primary rounded-full p-3 flex items-center justify-center">
                        <SportsSoccer className="text-white text-3xl" />
                    </div>
                    <div className="flex-1 ml-4">
                        <h1 className="text-2xl font-semibold text-third">Total Goals</h1>
                        <h3 className="text-xl text-gray-200">{teams.reduce((acc , team)=> acc + team.GF , 0)}</h3>
                    </div>
                </div>
                <Matches />
            </div>
        </div>  
    </div> 
}


export default Stats