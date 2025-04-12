import matches from '../admin/matches';
import teams from '../admin/teams';
import { ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
import { useState } from 'react';

const Matches = () => {
    const [currentGw, setCurrentGw] = useState(9);
    const [matchView, setMatchView] = useState('Choose Team');
    const [selectedTeam, setSelectedTeam] = useState('');

    const handlePrevGw = () => {
        if (currentGw > 0) {
            setCurrentGw(c => c - 1);
        }
    };

    const handleNextGw = () => {
        if (currentGw < matches.length - 1) {
            setCurrentGw(c => c + 1);
        }
    };

    const handleSelectTeam = (e) => {
        setSelectedTeam(e.target.value);
    };

    const handleSetMatchView = () => {
        setMatchView(prev => prev === 'Choose Team' ? 'All matches' : 'Choose Team');
    };

    const getGameweekTitle = () => {
        switch(currentGw) {
            case 8: return 'PlayOffs';
            case 9: return 'Round Of 16';
            case 10: return 'Quarter final';
            case 11: return 'Semi Final';
            case 12: return 'Final';
            default: return `Gameweek ${currentGw + 1}`;
        }
    };

    return (
        <div className='matches'>
            <h1 className='bg-fourth p-4 text-white text-xl text-center'>Matches</h1>
            <div className='flex justify-between items-center p-2'>   
                <button 
                    onClick={handleSetMatchView} 
                    className='bg-fourth p-2 text-center rounded-md w-full cursor-pointer text-white'
                >
                    {matchView}
                </button>
            </div>

            {matchView === 'Choose Team' ? (
                matches.length > 0 ? (
                    <>
                        <div className='flex justify-between items-center p-2'>
                            <button 
                                className='w-[30px] bg-primary text-white rounded h-[30px] cursor-pointer' 
                                onClick={handlePrevGw}
                            >
                                <ArrowBackIosNew fontSize='small'/>
                            </button>
                            <h3 className='font-bold'>{getGameweekTitle()}</h3>
                            <button 
                                className='w-[30px] bg-primary text-white rounded h-[30px] cursor-pointer' 
                                onClick={handleNextGw}
                            >
                                <ArrowForwardIos fontSize='small'/>
                            </button>
                        </div>
                        <div className="p-2">
                            {currentGw !== 12 ? (
                                matches[currentGw].length > 0 ? (
                                    matches[currentGw].map((match, index) => (
                                        <div key={index} className="match flex justify-between items-center py-2">
                                            <span className='flex-1 text-center'>{match.teamA}</span>
                                            <span className={`mx-4 font-bold py-1 px-4 rounded ${
                                                match.score !== 'Vs' && match.score !== 'PP' ? 'bg-fourth text-white' : ''
                                            }`}>
                                                {match.score}
                                            </span>
                                            <span className='flex-1 text-center'>{match.teamB}</span>
                                        </div>
                                    ))
                                ) : (
                                    <h1 className='text-center text-xl'>No Available matches</h1>
                                )
                            ) : (
                                <div className="match flex justify-between items-center py-2">
                                    <span className='flex-1 text-center'>{matches[12].teamA}</span>
                                    <span className={`mx-4 font-bold py-1 px-4 rounded ${
                                        matches[12].score !== 'Vs' && matches[12].score !== 'PP' ? 'bg-fourth text-white' : ''
                                    }`}>
                                        {matches[12].score}
                                    </span>
                                    <span className='flex-1 text-center'>{matches[12].teamB}</span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <h1 className='text-center font-bold text-xl p-3'>Ser Tan3yto lk hhhhh</h1>
                )
            ) : (
                <>
                    <div className='flex justify-between items-center p-2'>
                        <select 
                            value={selectedTeam} 
                            onChange={handleSelectTeam} 
                            className='p-2 rounded-md w-full border-2 border-[#ededed] outline-none'
                        >
                            <option value="">Select a team</option>
                            {teams.map(team => (
                                <option key={team.teamId} value={team.teamName}>
                                    {team.teamName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {selectedTeam && (
                        <div className="p-2">
                            {matches.flat().filter(match => 
                                match.teamA === selectedTeam || match.teamB === selectedTeam
                            ).length > 0 ? (
                                matches.flat().filter(match => 
                                    match.teamA === selectedTeam || match.teamB === selectedTeam
                                ).map((match, index) => (
                                    <div key={index} className="match flex justify-between items-center py-2">
                                        <span className='flex-1 text-center'>{match.teamA}</span>
                                        <span className={`mx-4 font-bold py-1 px-4 rounded ${
                                            match.score !== 'Vs' && match.score !== 'PP' ? 'bg-fourth text-white' : ''
                                        }`}>
                                            {match.score}
                                        </span>
                                        <span className='flex-1 text-center'>{match.teamB}</span>
                                    </div>
                                ))
                            ) : (
                                <h1 className='text-center text-xl'>No matches found for {selectedTeam}</h1>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Matches;