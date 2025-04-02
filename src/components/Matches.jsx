import matches from '../admin/matches'
import {ArrowForwardIos , ArrowBackIosNew} from '@mui/icons-material';
import { useState } from 'react'
const Matches = ()=>{
    const [currentGw , setCurrentGw] = useState(9)
    const HandlPrevGw = ()=>{
        if (currentGw > 0){
            setCurrentGw(c => c - 1)
        }
        
    }

    const HandlNextGw = ()=>{
        if (currentGw < matches.length - 1){
            setCurrentGw(c => c + 1)
        }
        
    }
    return <>
        <div className='matches'>
            <h1 className='bg-fourth p-4 text-white text-xl text-center'>Matches</h1>
            {matches.length > 0 ? <>
                <div className='flex justify-between items-center p-2'>
                <button className='w-[30px] bg-primary text-white rounded h-[30px] cursor-pointer' onClick={HandlPrevGw}><ArrowBackIosNew fontSize='small'/></button>
                <h3 className='font-bold'>{currentGw == 8 ? 'playOffs' : currentGw == 9 ? 'Round Of 16' : currentGw == 10 ? 'Quarter final' : currentGw == 11 ? 'Semi Final' : currentGw == 12 ? 'Final' : `Gameweak ${currentGw + 1}`}</h3>
                <button className='w-[30px] bg-primary text-white rounded h-[30px] cursor-pointer' onClick={HandlNextGw}><ArrowForwardIos fontSize='small'/></button>
            </div>
            <div className="p-2">
                {currentGw !== 12? matches[currentGw].length > 0 ? matches[currentGw].map((match , index) => <div key={index} className="match">
                    <span className='flex-1 text-center'>{match.teamA}</span>
                    <span className={`mx-4 font-bold py-1 px-4 rounded ${match.score !== 'Vs'  && match.score !== 'PP' ? 'bg-fourth text-white' : null}`}>{match.score}</span>
                    <span className='flex-1 text-center'>{match.teamB}</span>
                </div> ) : <h1 className='text-center text-xl'>No Availible matches</h1> :<div className="match">
                    <span className='flex-1 text-center'>{matches[12].teamA}</span>
                    <span className={`mx-4 font-bold py-1 px-4 rounded ${matches[11].score !== 'Vs'  && matches[11].score !== 'PP' ? 'bg-fourth text-white' : null}`}>{matches[12].score}</span>
                    <span className='flex-1 text-center'>{matches[12].teamB}</span>
                </div> }
                
            </div>
            </> : <h1 className='text-center font-bold text-xl p-3'>Ser Tan3yto lk hhhhh</h1>}
           
        </div>
    </>
}

export default Matches