import { useEffect, useState } from 'react';

const Countdown = ({ targetDate , round = null}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      mins: Math.floor((difference / 1000 / 60) % 60),
      secs: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="text-center text-lg font-semibold">Countdown finished!</div>;

  return (
    <>
      <h2 className='mb-2 text-bold text-center text-lg'>{round} Deadline</h2>
      <div className="flex gap-1 justify-center ">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center p-4 bg-primary rounded text-white flex-1">
            <span className="text-2xl font-mono">{value.toString().padStart(2, '0')}</span>
            <span className="text-sm capitalize">{unit}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Countdown;
