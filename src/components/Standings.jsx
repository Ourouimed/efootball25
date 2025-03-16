import Teams from '../admin/teams';
const Standings = ()=>{
    const standings = Teams.map(team => ({ ...team, points: team.wins * 3 + team.draws }));
    standings.sort((a, b) => b.points - a.points || (b.GF-b.GA) - (a.GF - a.GA) || b.GF - a.GF);
    return  <>
    <div className='w-full overflow-x-auto'>
    <table className="standing">
        <thead>
            <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Username</th>
                <th className='text-center'>+/-</th>
                <th className='text-center'>GD</th>
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
                    <td>{team.teamId}</td>
                    <td className='text-center'>{team.GF}-{team.GA}</td>
                    <td className='text-center'>{team.GF - team.GA > 0 ?'+' + (team.GF - team.GA) : team.GF - team.GA}</td>
                    <td className='text-center'>{team.wins}</td>
                    <td className='text-center'>{team.draws}</td>
                    <td className='text-center'>{team.losses}</td>
                    <td className='text-center'>{team.points}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </>
  
}

export default Standings
