import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const Countdown = ({ targetDate, round = null, timeZone = 'UTC+1' }) => {
  const calculateTimeLeft = () => {
    const now = DateTime.now().setZone(timeZone);
    const target = DateTime.fromISO(targetDate, { zone: timeZone });

    const diff = target.diff(now, ['days', 'hours', 'minutes', 'seconds']);
    if (diff.toMillis() <= 0) return null;

    return {
      days: Math.floor(diff.days),
      hours: Math.floor(diff.hours),
      mins: Math.floor(diff.minutes),
      secs: Math.floor(diff.seconds),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, timeZone]);

  if (!timeLeft) return <div className="text-center text-lg font-semibold">Countdown finished!</div>;

  return (
    <>
      <h2 className='mb-2 text-bold text-center text-lg'>{round} Deadline</h2>
      <div className="flex gap-1 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center p-4 bg-primary rounded text-white flex-1">
            <span className="text-2xl font-mono">{value.toString().padStart(2, '0')}</span>
            <span className="text-sm capitalize">{unit}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-sm mt-2 text-gray-600">
        Ends at: {DateTime.fromISO(targetDate, { zone: timeZone }).toLocaleString(DateTime.DATETIME_MED)} ({timeZone})
      </p>
    </>
  );
};

export default Countdown;
