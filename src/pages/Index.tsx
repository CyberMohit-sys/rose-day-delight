import React, { useState, useRef, useCallback } from 'react';
import FloatingPetals from '@/components/FloatingPetals';
import RoseDayCard from '@/components/RoseDayCard';
import LoveMessage from '@/components/LoveMessage';
import AcceptRose from '@/components/AcceptRose';
import PickARose from '@/components/PickARose';
import FinalMessage from '@/components/FinalMessage';
import { Volume2, VolumeX } from 'lucide-react';

type Screen = 'greeting' | 'love' | 'accept' | 'pick' | 'final';

const Index: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('greeting');
  const [transitioning, setTransitioning] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio('/music/ishq-wala-love.mp3');
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
    audioRef.current.play().then(() => {
      setMusicPlaying(true);
    }).catch(() => {
      // Autoplay blocked, that's ok
    });
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  }, [musicPlaying]);

  const goTo = (next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 400);
  };

  const handleGreetingNext = () => {
    startMusic();
    goTo('love');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingPetals
        variant={screen === 'final' ? 'petals' : 'mixed'}
        count={screen === 'final' ? 20 : 12}
      />

      {/* Music toggle button - shown after music starts */}
      {screen !== 'greeting' && (
        <button
          onClick={toggleMusic}
          className="fixed top-5 right-5 z-50 bg-card/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-md transition-all duration-300 hover:scale-110 text-primary"
          aria-label={musicPlaying ? 'Mute music' : 'Play music'}
        >
          {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      <div
        className="transition-all duration-400 ease-in-out"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {screen === 'greeting' && <RoseDayCard onNext={handleGreetingNext} />}
        {screen === 'love' && <LoveMessage onNext={() => goTo('accept')} />}
        {screen === 'accept' && <AcceptRose onNext={() => goTo('pick')} />}
        {screen === 'pick' && <PickARose onNext={() => goTo('final')} />}
        {screen === 'final' && <FinalMessage />}
      </div>
    </div>
  );
};

export default Index;
