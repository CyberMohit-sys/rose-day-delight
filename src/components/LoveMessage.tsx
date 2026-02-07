import React from 'react';

interface LoveMessageProps {
  onNext: () => void;
}

const LoveMessage: React.FC<LoveMessageProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      <div className="romantic-card text-center animate-fade-in-scale">
        <div className="text-5xl mb-6 animate-pulse-soft">❤️</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">
          I Love You Baby ❤️
        </h2>
        <div className="w-16 h-px bg-rose-blush mx-auto mb-4" />
        <p className="text-muted-foreground text-lg mb-8 font-body italic">
          Not just today, always.
        </p>
        <button
          onClick={onNext}
          className="romantic-button font-body"
        >
          Next 🌹
        </button>
      </div>
    </div>
  );
};

export default LoveMessage;
