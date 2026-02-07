import React, { useState, useEffect } from 'react';

interface RoseDayCardProps {
  onNext: () => void;
}

const getRoseDayTarget = (): Date => {
  const now = new Date();
  const year = now.getFullYear();
  let roseDay = new Date(year, 1, 7); // Feb 7
  if (now > roseDay) {
    // If Rose Day already passed this year, show next year
    roseDay = new Date(year + 1, 1, 7);
  }
  return roseDay;
};

const RoseDayCard: React.FC<RoseDayCardProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRoseDay, setIsRoseDay] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = getRoseDayTarget();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        // It's Rose Day today!
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        if (now.getMonth() === 1 && now.getDate() === 7) {
          setIsRoseDay(true);
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsRoseDay(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      <div className="romantic-card text-center animate-fade-in-scale">
        <div className="text-6xl mb-6 animate-pulse-soft">🌹</div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">
          Happy Rose Day Baby 🌹
        </h1>

        {/* Countdown Timer */}
        {isRoseDay ? (
          <div className="mb-6 animate-fade-in-up">
            <p className="text-primary font-display text-lg italic">
              It's Rose Day today! 🌹✨
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm font-body mb-3">
              {timeLeft.days > 0 ? 'Time until Rose Day' : 'Rose Day is here!'}
            </p>
            <div className="flex justify-center gap-3">
              {[
                { value: pad(timeLeft.days), label: 'Days' },
                { value: pad(timeLeft.hours), label: 'Hours' },
                { value: pad(timeLeft.minutes), label: 'Min' },
                { value: pad(timeLeft.seconds), label: 'Sec' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <span className="bg-secondary text-foreground font-display text-xl md:text-2xl font-semibold rounded-xl w-14 h-14 flex items-center justify-center border border-border shadow-sm">
                    {item.value}
                  </span>
                  <span className="text-muted-foreground text-xs font-body mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-muted-foreground text-lg mb-8 font-body">
          I made a small surprise just for you
        </p>
        <button
          onClick={onNext}
          className="romantic-button font-body"
        >
          Open Surprise 🌹
        </button>
      </div>
    </div>
  );
};

export default RoseDayCard;
