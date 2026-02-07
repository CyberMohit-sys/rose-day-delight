import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  type: 'heart' | 'petal';
  opacity: number;
}

interface FloatingPetalsProps {
  variant?: 'hearts' | 'petals' | 'mixed';
  count?: number;
}

const FloatingPetals: React.FC<FloatingPetalsProps> = ({ variant = 'mixed', count = 15 }) => {
  const items = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const isHeart = variant === 'hearts' ? true : variant === 'petals' ? false : Math.random() > 0.5;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${8 + Math.random() * 12}s`,
        size: `${14 + Math.random() * 16}px`,
        type: isHeart ? 'heart' : 'petal',
        opacity: 0.3 + Math.random() * 0.4,
      };
    });
  }, [count, variant]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <span
          key={item.id}
          className={item.type === 'heart' ? 'animate-float-up' : 'animate-fall'}
          style={{
            position: 'absolute',
            left: item.left,
            bottom: item.type === 'heart' ? '-10%' : undefined,
            top: item.type === 'petal' ? '-10%' : undefined,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
            opacity: item.opacity,
          }}
        >
          {item.type === 'heart' ? '💕' : '🌸'}
        </span>
      ))}
    </div>
  );
};

export default FloatingPetals;
