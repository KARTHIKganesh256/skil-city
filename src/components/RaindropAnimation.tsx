"use client";

import { useEffect, useState } from "react";

interface Raindrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export function RaindropAnimation() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const generateRaindrops = () => {
      const newRaindrops: Raindrop[] = [];
      
      // Generate 20-30 raindrops
      const count = Math.floor(Math.random() * 11) + 20;
      
      for (let i = 0; i < count; i++) {
        newRaindrops.push({
          id: Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: Math.random() * 2 + 2, // 2-4 seconds
        });
      }
      
      setRaindrops(newRaindrops);
    };

    // Generate initial raindrops
    generateRaindrops();

    // Regenerate raindrops every 4 seconds
    const interval = setInterval(generateRaindrops, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {raindrops.map((raindrop) => (
        <div
          key={raindrop.id}
          className="raindrop"
          style={{
            left: `${raindrop.left}%`,
            animationDelay: `${raindrop.delay}s`,
            animationDuration: `${raindrop.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

