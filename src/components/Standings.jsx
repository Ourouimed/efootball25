import Teams from '../admin/teams';
const Standings = ()=>{
    const standings = Teams.map(team => ({ ...team, points: team.wins * 3 + team.draws }));
    standings.sort((a, b) => b.points - a.points || (b.GF-b.GA) - (a.GF - a.GA) || b.GF - a.GF);
    return  <div className="p-5 flex justify-center items-center min-h-[90vh] flex-col gap-4">
    <h1 className="text-third font-bold text-2xl md:text-4xl">Tournaments Standings</h1>
    <div className='w-full overflow-x-auto'>
    <table className="standing">
        <thead>
            <tr>
                <th>#</th>
                <th>Team Name</th>
                <th className='text-center'>GF</th>
                <th className='text-center'>GA</th>
                <th className='text-center'>W</th>
                <th className='text-center'>D</th>
                <th className='text-center'>L</th>
                <th className='text-center'>Points</th>
            </tr>
        </thead>

        <tbody>
            {standings.map((team, index) => (
                <tr key={index} className={`hover:bg-slate-100 ${index < 8 ? 'top-team' : ''}`}>
                    <td>{index + 1}</td>
                    <td>{team.teamName}</td>
                    <td className='text-center'>{team.GF}</td>
                    <td className='text-center'>{team.GA}</td>
                    <td className='text-center'>{team.wins}</td>
                    <td className='text-center'>{team.draws}</td>
                    <td className='text-center'>{team.losses}</td>
                    <td className='text-center'>{team.points}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </div>
}

export default Standings
