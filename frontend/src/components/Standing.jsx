const Standing = ({teams})=>{
    let sortedTeams = teams.map(team => ({...team , pts : (team.wins * 3) + (team.draws * 1) + (team.lowses * 0)})).sort((a, b) => b.pts - a.pts || (b.GF + b.KOGF) - (a.GF + a.KOGF));
    return <>
        <div className="bg-white rounded-md overflow-hidden">
            <table className="standing-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team Name</th>
                        <th>User Name</th>
                        <th>GP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>+/-</th>
                        <th>GD</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTeams.map((team , index)=> {
                    const { teamName , userName , wins , lowses , draws , GF , GA , pts} = team
                    let GP = wins + lowses + draws
                    return <tr className={`${index < 8 ? 'best-8' : index < 24 ? 'playoffs' : ''}`} key={team.userName}>
                        <td>{index+1}</td>
                        <td>{teamName}</td>
                        <td>{userName}</td>
                        <td>{GP}</td>
                        <td>{wins}</td>
                        <td>{draws}</td>
                        <td>{lowses}</td>
                        <td>{GF}/{GA}</td>
                        <td>{GF - GA}</td>
                        <td>{pts}</td>
                    </tr>
                    })}
                        
                </tbody>
            </table>
        </div>
    </>
}



export default Standing