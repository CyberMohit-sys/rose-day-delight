import React, { useState } from 'react';
import FloatingPetals from '@/components/FloatingPetals';
import RoseDayCard from '@/components/RoseDayCard';
import LoveMessage from '@/components/LoveMessage';
import PickARose from '@/components/PickARose';
import FinalMessage from '@/components/FinalMessage';

type Screen = 'greeting' | 'love' | 'pick' | 'final';

const Index: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('greeting');
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingPetals
        variant={screen === 'final' ? 'petals' : 'mixed'}
        count={screen === 'final' ? 20 : 12}
      />

      <div
        className="transition-all duration-400 ease-in-out"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {screen === 'greeting' && <RoseDayCard onNext={() => goTo('love')} />}
        {screen === 'love' && <LoveMessage onNext={() => goTo('pick')} />}
        {screen === 'pick' && <PickARose onNext={() => goTo('final')} />}
        {screen === 'final' && <FinalMessage />}
      </div>
    </div>
  );
};

export default Index;
