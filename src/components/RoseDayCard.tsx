import React from 'react';

interface RoseDayCardProps {
  onNext: () => void;
}

const RoseDayCard: React.FC<RoseDayCardProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      <div className="romantic-card text-center animate-fade-in-scale">
        <div className="text-6xl mb-6 animate-pulse-soft">🌹</div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">
          Happy Rose Day Baby 🌹
        </h1>
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
