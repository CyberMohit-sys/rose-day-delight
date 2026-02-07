import React, { useState } from 'react';
import sajidaImg from '@/assets/sajida.jpg';

interface AcceptRoseProps {
  onNext: () => void;
}

const AcceptRose: React.FC<AcceptRoseProps> = ({ onNext }) => {
  const [roseState, setRoseState] = useState<'offering' | 'moving' | 'accepted'>('offering');

  const handleAccept = () => {
    setRoseState('moving');
    setTimeout(() => {
      setRoseState('accepted');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      <div className="romantic-card text-center animate-fade-in-scale max-w-sm relative overflow-visible">
        {/* Sajida's Photo */}
        <div className="mb-5 relative inline-block">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-rose-blush shadow-lg mx-auto">
            <img
              src={sajidaImg}
              alt="Sajida"
              className="w-full h-full object-cover"
            />
          </div>
          {roseState === 'accepted' && (
            <div className="absolute -bottom-2 -right-2 text-3xl animate-fade-in-scale">
              🌹
            </div>
          )}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
          For You, Sajida 🌹
        </h2>
        <p className="text-muted-foreground text-base mb-6 font-body">
          Farhan is offering you a rose
        </p>

        {/* Rose Animation Area */}
        <div className="relative h-40 flex items-center justify-center mb-6">
          {/* The animated rose */}
          <div
            className="text-6xl transition-all ease-in-out"
            style={{
              transform:
                roseState === 'offering'
                  ? 'translateY(0) scale(1)'
                  : roseState === 'moving'
                  ? 'translateY(-80px) scale(1.3) rotate(-15deg)'
                  : 'translateY(-80px) scale(0)',
              transitionDuration: roseState === 'moving' ? '1.2s' : '0.4s',
              opacity: roseState === 'accepted' ? 0 : 1,
            }}
          >
            🌹
          </div>

          {/* Sparkles when accepted */}
          {roseState === 'accepted' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {['✨', '💕', '🌸', '✨', '💗'].map((emoji, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl animate-fade-in-up"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      left: `${(i - 2) * 30}px`,
                      top: `${Math.sin(i) * 20 - 10}px`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {roseState === 'offering' && (
          <button
            onClick={handleAccept}
            className="romantic-button font-body animate-pulse-soft"
          >
            Accept This Rose 🌹
          </button>
        )}

        {roseState === 'accepted' && (
          <div className="animate-fade-in-up">
            <p className="text-foreground text-lg font-display italic mb-4">
              "You accepted my rose! 💕"
            </p>
            <p className="text-muted-foreground text-sm font-body mb-5">
              Now you are officially my Rose Day Valentine
            </p>
            <button
              onClick={onNext}
              className="romantic-button font-body"
            >
              Continue 🌹
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptRose;
