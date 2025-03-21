import matches from "../admin/matches";

const Knockout = () => {
    
    const PO = matches[8]
    const QF = matches[9]
    const SF = matches[10]
    const Final = matches[11]
    
    return <>
    <div className="rounded-md bg-white overflow-hidden">
        <h1 className="font-bold text-xl text-center bg-fourth p-2 text-white">Knoukout</h1>
        <div className="p-2 mb-1">
            <h3 className="text-center font-bold">Playoffs</h3>
            <div className="grid grid-cols-[1fr] md:flex md:items-center gap-1 md:justify-center">
                    {PO.length > 0 ? PO.map((match , index) => <div key={index} className="match !mb-1">
                                <span className='flex-1 text-center'>{match.teamA}</span>
                                <span className={`mx-4 font-bold py-1 px-4 rounded ${match.score !== 'Vs'  && match.score !== 'PP' ? 'bg-fourth text-white' : null}`}>{match.score}</span>
                                <span className='flex-1 text-center'>{match.teamB}</span>
                </div> ) : <h1 className='text-center text-xl'>No Availible matches</h1>}
            </div>
            <h3 className="text-center font-bold">Quarter Final</h3>
            <div className="grid grid-cols-[1fr] md:flex md:items-center gap-1 md:justify-center">
                    {QF.length > 0 ? QF.map((match , index) => <div key={index} className="match !mb-1">
                                <span className='flex-1 text-center'>{match.teamA}</span>
                                <span className={`mx-4 font-bold py-1 px-4 rounded ${match.score !== 'Vs'  && match.score !== 'PP' ? 'bg-fourth text-white' : null}`}>{match.score}</span>
                                <span className='flex-1 text-center'>{match.teamB}</span>
                </div> ) : <h1 className='text-center text-xl'>No Availible matches</h1>}
            </div>

            <h3 className="text-center font-bold">Semi Final</h3>
            <div className="grid grid-cols-[1fr] md:flex md:items-center gap-1 md:justify-center">
                    {SF.length > 0 ? SF.map((match , index) => <div key={index} className="match !mb-1">
                                <span className='flex-1 text-center'>{match.teamA}</span>
                                <span className={`mx-4 font-bold py-1 px-4 rounded ${match.score !== 'Vs'  && match.score !== 'PP' ? 'bg-fourth text-white' : null}`}>{match.score}</span>
                                <span className='flex-1 text-center'>{match.teamB}</span>
                </div> ) : <h1 className='text-center text-xl'>No Availible matches</h1>}
            </div>
            <h3 className="text-center font-bold">Final</h3>
            <div className="flex items-center gap-1 justify-center">
                <div className="match !mb-0">
                                    <span className='flex-1 text-center'>{Final.teamA}</span>
                                    <span className={`mx-4 font-bold py-1 px-4 rounded ${Final.score !== 'Vs'  && Final.score !== 'PP' ? 'bg-fourth text-white' : null}`}>{Final.score}</span>
                                    <span className='flex-1 text-center'>{Final.teamB}</span>
                </div> 
            </div>
        </div>
    </div>  
    </>
};

export default Knockout;