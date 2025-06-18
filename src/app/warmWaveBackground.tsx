import React, { useEffect, useRef } from 'react';

const WarmWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas size with device pixel ratio
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Single ripple state
    let currentRipple: {
      x: number;
      y: number;
      maxRadius: number;
      speed: number;
      startTime: number;
    } | null = null;

    // Add new ripple
    const addRipple = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const maxRadius = 150 + Math.random() * 150;
      const speed = 0.17;
      
      currentRipple = {
        x,
        y,
        maxRadius,
        speed,
        startTime: time,
      };
    };

    // Start with one ripple
    addRipple();

    // Add new ripple every 1.5 seconds
    const rippleInterval = setInterval(addRipple, 1500);

    const animate = () => {
      if (!ctx || !canvas) return;
      time += 0.016;

      // Clear canvas with base gradient
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      baseGradient.addColorStop(0, '#fff9f5');
      baseGradient.addColorStop(1, '#fff6e5');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ripple if it exists
      if (currentRipple) {
        const age = (time - currentRipple.startTime) * currentRipple.speed;
        const radius = currentRipple.maxRadius * Math.min(age, 1);
        const opacity = Math.max(0, 1 - age);

        if (opacity > 0) {
          // Create gradient for ripple
          const gradient = ctx.createRadialGradient(
            currentRipple.x, currentRipple.y, 0,
            currentRipple.x, currentRipple.y, radius
          );

          // Consistent color stops with increased opacity
          const rippleColor = '#ffd6a5';
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.2, `${rippleColor}${Math.floor(opacity * 0.08 * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(0.5, `${rippleColor}${Math.floor(opacity * 0.12 * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(0.8, `${rippleColor}${Math.floor(opacity * 0.08 * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(currentRipple.x, currentRipple.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // More visible rings with consistent opacity
          ctx.beginPath();
          ctx.strokeStyle = `${rippleColor}${Math.floor(opacity * 0.2 * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 2;
          ctx.arc(currentRipple.x, currentRipple.y, radius * 0.85, 0, Math.PI * 2);
          ctx.stroke();

          // Second inner ring with consistent opacity
          ctx.beginPath();
          ctx.strokeStyle = `${rippleColor}${Math.floor(opacity * 0.15 * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1.5;
          ctx.arc(currentRipple.x, currentRipple.y, radius * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(rippleInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full"
      style={{ 
        background: 'linear-gradient(135deg, #fff9f5, #fff6e5)',
      }}
      aria-hidden="true"
    />
  );
};

export default WarmWaveBackground; 