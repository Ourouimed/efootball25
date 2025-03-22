import teams from "../admin/teams";
const TopScorer = () =>{
    let TopScorrerClass = teams.sort((a, b) => (b.GF + b.KG) - (a.GF + a.KG)).slice(0,5)
    return <>
        <div className="bg-white mb-4 rounded-md overflow-hidden">
            <h1 className='bg-fourth p-4 text-white text-xl text-center'>
                Top Scorer
            </h1>
            <div className="p-2">
                {TopScorrerClass.map((team, index) => <div key={index} className={`flex items-center justify-between gap-2 mb-1 ${index < TopScorrerClass.length - 1 ? 'border-b-2 border-b-[#ededed]' : ''} p-2`}>
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">{index + 1}</span>
                        <span>{team.teamName}</span>
                    </div>
                    <div className="bg-fourth text-white px-4 py-2 rounded-md">
                        {team.GF + team.KG}
                    </div>
                </div>)}
            </div>
        </div>
    </>
}

export default TopScorer;