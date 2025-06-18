import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  maxRadius: number;
  speed: number;
  startTime: number;
}

const COLORS = {
  BASE_GRADIENT_START: '#fff9f5',
  BASE_GRADIENT_END: '#fff6e5',
  RIPPLE: '#ffd6a5',
} as const;

const RIPPLE_CONFIG = {
  INTERVAL_MS: 1500,
  MIN_RADIUS: 150,
  MAX_ADDITIONAL_RADIUS: 150,
  ANIMATION_SPEED: 0.17,
  INNER_RING_RATIO: 0.7,
  OUTER_RING_RATIO: 0.85,
} as const;

const WarmWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let currentRipple: Ripple | null = null;

    // Canvas setup with DPI handling
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Draw base gradient background
    const drawBackground = () => {
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      baseGradient.addColorStop(0, COLORS.BASE_GRADIENT_START);
      baseGradient.addColorStop(1, COLORS.BASE_GRADIENT_END);
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Create a new ripple with random position
    const createRipple = (): Ripple => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      maxRadius: RIPPLE_CONFIG.MIN_RADIUS + Math.random() * RIPPLE_CONFIG.MAX_ADDITIONAL_RADIUS,
      speed: RIPPLE_CONFIG.ANIMATION_SPEED,
      startTime: time,
    });

    // Draw a single ripple
    const drawRipple = (ripple: Ripple) => {
      const age = (time - ripple.startTime) * ripple.speed;
      const radius = ripple.maxRadius * Math.min(age, 1);
      const opacity = Math.max(0, 1 - age);

      if (opacity <= 0) return;

      // Draw ripple gradient
      const gradient = ctx.createRadialGradient(
        ripple.x, ripple.y, 0,
        ripple.x, ripple.y, radius
      );

      const getHexOpacity = (alpha: number) => 
        Math.floor(opacity * alpha * 255).toString(16).padStart(2, '0');

      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.2, `${COLORS.RIPPLE}${getHexOpacity(0.08)}`);
      gradient.addColorStop(0.5, `${COLORS.RIPPLE}${getHexOpacity(0.12)}`);
      gradient.addColorStop(0.8, `${COLORS.RIPPLE}${getHexOpacity(0.08)}`);
      gradient.addColorStop(1, 'transparent');

      // Draw main ripple
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer ring
      ctx.beginPath();
      ctx.strokeStyle = `${COLORS.RIPPLE}${getHexOpacity(0.2)}`;
      ctx.lineWidth = 2;
      ctx.arc(ripple.x, ripple.y, radius * RIPPLE_CONFIG.OUTER_RING_RATIO, 0, Math.PI * 2);
      ctx.stroke();

      // Draw inner ring
      ctx.beginPath();
      ctx.strokeStyle = `${COLORS.RIPPLE}${getHexOpacity(0.15)}`;
      ctx.lineWidth = 1.5;
      ctx.arc(ripple.x, ripple.y, radius * RIPPLE_CONFIG.INNER_RING_RATIO, 0, Math.PI * 2);
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      time += 0.016;

      drawBackground();
      if (currentRipple) {
        drawRipple(currentRipple);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    currentRipple = createRipple();
    const rippleInterval = setInterval(() => {
      currentRipple = createRipple();
    }, RIPPLE_CONFIG.INTERVAL_MS);

    animate();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(rippleInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.BASE_GRADIENT_START}, ${COLORS.BASE_GRADIENT_END})`,
      }}
      aria-hidden="true"
    />
  );
};

export default WarmWaveBackground; 