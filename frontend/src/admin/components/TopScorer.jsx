const TopScorer = ({teams}) =>{
    return <>
        {teams.slice(0, 5).map((team, index) => (
                  <div className="flex justify-between items-center p-2" key={index}>
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">{index + 1}</span>
                      <span className="text-xl">{team.teamName}</span>
                    </div>
                    <p className="bg-primary/10 rounded py-2 px-5 text-primary">{team.GF + team.KOGF }</p>
                  </div>
                ))}
    </>
}

export default TopScorer