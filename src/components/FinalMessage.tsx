import React, { useEffect, useState } from 'react';
import FloatingPetals from './FloatingPetals';

const FinalMessage: React.FC = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowFirst(true), 400);
    const t2 = setTimeout(() => setShowSecond(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      <FloatingPetals variant="petals" count={20} />
      <div className="romantic-card text-center max-w-sm">
        <div className="text-5xl mb-8 animate-pulse-soft">🌹</div>

        <div
          className="transition-all duration-1000 ease-out mb-8"
          style={{
            opacity: showFirst ? 1 : 0,
            transform: showFirst ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic">
            "A rose lasts for a day,
            <br />
            but love lasts every day."
          </p>
        </div>

        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: showSecond ? 1 : 0,
            transform: showSecond ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="w-16 h-px bg-rose-blush mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
            I Love You Baby ❤️
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            – Farhan
          </p>
          <div className="mt-6 flex justify-center gap-2 text-2xl">
            <span className="animate-pulse-soft">💕</span>
            <span className="animate-pulse-soft" style={{ animationDelay: '0.3s' }}>🌹</span>
            <span className="animate-pulse-soft" style={{ animationDelay: '0.6s' }}>💕</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalMessage;
