import { useState, useEffect } from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const current = new Date().getTime();
        let date = '2025-04-07'
        let time = '0:00'
        const deadline = new Date(`${date} ${time}`).getTime();
        const difference = deadline - current;
        
        if (difference <= 0) {
            return { 
                days: 0, 
                hours: 0, 
                minutes: 0, 
                seconds: 0,
                expired: true
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            expired: false
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white mb-4 rounded-md overflow-hidden max-w-4xl mx-auto">
            <h1 className='bg-fourth p-4 text-white text-xl text-center'>
               semi & final Deadline
            </h1>
            <div className="p-2 md:p-4">
                {timeLeft.expired ? (
                    <div className="text-center text-xl md:text-2xl font-bold p-4">
                        The deadline has passed!
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 font-bold text-xl md:text-3xl">
                        <div className="bg-primary rounded-md text-white p-1 md:p-2 text-center min-w-[60px] md:min-w-[80px]">
                            <div>{timeLeft.days}</div>
                            <div className="text-sm md:text-xl">Days</div>
                        </div>
                        <div className="bg-primary rounded-md text-white p-1 md:p-2 text-center min-w-[60px] md:min-w-[80px]">
                            <div>{timeLeft.hours}</div>
                            <div className="text-sm md:text-xl">Hours</div>
                        </div>
                        <div className="bg-primary rounded-md text-white p-1 md:p-2 text-center min-w-[60px] md:min-w-[80px]">
                            <div>{timeLeft.minutes}</div>
                            <div className="text-sm md:text-xl">Mins</div>
                        </div>
                        <div className="bg-primary rounded-md text-white p-1 md:p-2 text-center min-w-[60px] md:min-w-[80px]">
                            <div>{timeLeft.seconds}</div>
                            <div className="text-sm md:text-xl">Secs</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timer;