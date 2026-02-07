import React, { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

interface HeartBurstProps {
  active: boolean;
  count?: number;
}

const emojis = ['❤️', '💕', '🌹', '💗', '🌸', '✨', '💖', '🩷', '💐', '🥀'];

const HeartBurst: React.FC<HeartBurstProps> = ({ active, count = 40 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: 50 + (Math.random() - 0.5) * 10,
      y: 50 + (Math.random() - 0.5) * 10,
      angle: (360 / count) * i + (Math.random() - 0.5) * 30,
      distance: 120 + Math.random() * 200,
      size: 14 + Math.random() * 20,
      delay: Math.random() * 0.3,
      duration: 1.2 + Math.random() * 1.5,
      rotation: Math.random() * 720 - 360,
    }));
  }, [count]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const endX = Math.cos(rad) * p.distance;
        const endY = Math.sin(rad) * p.distance;

        return (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              animation: `heartBurst ${p.duration}s ease-out ${p.delay}s forwards`,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              '--end-rot': `${p.rotation}deg`,
              opacity: 0,
            } as React.CSSProperties}
          >
            {p.emoji}
          </span>
        );
      })}
    </div>
  );
};

export default HeartBurst;
