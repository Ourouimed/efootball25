const Standing = ({teams})=>{
    let sortedTeams = teams.map(team => ({...team , pts : (Number(team.wins) * 3) + (Number(team.draws) * 1) + (Number(team.losses) * 0) - team.sanction})).sort((a, b) => b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA));
    return <>
        <div className="bg-white rounded-md overflow-auto shadow-md h-[max-content] sticky top-20">
  <table className="standing-table min-w-full text-sm sm:text-base">
    <thead className="bg-third text-white">
      <tr>
        <th className="px-2 py-3">#</th>
        <th className="px-2 py-3">Team Name</th>
        <th className="px-2 py-3">User Name</th>
        <th className="px-2 py-3">GP</th>
        <th className="px-2 py-3">W</th>
        <th className="px-2 py-3">D</th>
        <th className="px-2 py-3">L</th>
        <th className="px-2 py-3">+/-</th>
        <th className="px-2 py-3">GD</th>
        <th className="px-2 py-3">PTS</th>
      </tr>
    </thead>
    <tbody>
      {sortedTeams.length === 0 ? <tr className="text-center text-gray-500 py-4">
        <td colSpan="10">No registred teams yet.</td>
        </tr> :sortedTeams.map((team, index) => {
        const { teamName, id_team, wins, losses, draws, GF, GA, pts , sanction } = team;
        const GP = wins + draws + losses;
        const rowClass = 
          index < 16 ? "best-8" : index < 48 ? "playoffs" : "";

        return (
          <tr className={`${rowClass} text-center`} key={team.userName}>
            <td className="px-2 py-2">{index + 1}</td>
            <td className="px-2 py-2">{teamName}</td>
            <td className="px-2 py-2">{id_team}</td>
            <td className="px-2 py-2">{GP}</td>
            <td className="px-2 py-2">{wins}</td>
            <td className="px-2 py-2">{draws}</td>
            <td className="px-2 py-2">{losses}</td>
            <td className="px-2 py-2">{GF}/{GA}</td>
            <td className="px-2 py-2">{GF - GA > 0 ? `+${GF - GA}` : GF - GA}</td>
            <td className="px-2 py-2 font-bold relative">
                      {pts}
                      {sanction > 0 && (
                        <span 
                          className="ml-1 text-[10px] text-red-500 align-top cursor-help" 
                          title={`Penalty: -${sanction} points`}
                        >
                          (-{sanction})
                        </span>
                      )}
                    </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </>
}



export default Standing