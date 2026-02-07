import React, { useState } from 'react';

interface PickARoseProps {
  onNext: () => void;
}

const roseMessages = [
  "Your smile is my favorite thing.",
  "When you're with me, everything feels calm.",
  "You are the most beautiful part of my life.",
];

const PickARose: React.FC<PickARoseProps> = ({ onNext }) => {
  const [selectedRose, setSelectedRose] = useState<number | null>(null);
  const [hasPickedAny, setHasPickedAny] = useState(false);

  const handleRosePick = (index: number) => {
    setSelectedRose(index);
    setHasPickedAny(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      <div className="romantic-card text-center animate-fade-in-scale max-w-md">
        <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
          Pick a Rose 🌹
        </h2>
        <p className="text-muted-foreground text-base mb-8 font-body">
          Tap on any rose below<br />to reveal a message
        </p>

        <div className="flex justify-center gap-6 mb-6">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => handleRosePick(index)}
              className={`rose-icon-btn text-5xl p-3 rounded-full transition-all duration-300 ${
                selectedRose === index
                  ? 'bg-secondary scale-110'
                  : 'hover:bg-secondary/50'
              }`}
              aria-label={`Rose ${index + 1}`}
            >
              🌹
            </button>
          ))}
        </div>

        {selectedRose !== null && (
          <div className="animate-fade-in-up mb-6">
            <div className="bg-secondary/60 rounded-xl p-5 border border-border">
              <p className="text-foreground text-lg font-body italic leading-relaxed">
                "{roseMessages[selectedRose]}"
              </p>
            </div>
          </div>
        )}

        {hasPickedAny && selectedRose !== null && (
          <div className="animate-fade-in-up">
            <p className="text-muted-foreground text-sm mb-4 font-body">
              Want to try another rose? 🌹
            </p>
            <button
              onClick={onNext}
              className="romantic-button font-body"
            >
              Last Message ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickARose;
