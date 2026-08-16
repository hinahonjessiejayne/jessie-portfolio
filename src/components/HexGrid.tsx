import { useEffect, useRef } from 'react';

const HEX_RADIUS = 25;
const MAX_DISTANCE = 350;
const BASE_OPACITY = 0.04;
const PEAK_OPACITY = 0.6;

/**
 * Full-viewport canvas of gold hexagons that light up around the cursor.
 * Intensity falls off quadratically within MAX_DISTANCE of the pointer.
 */
const HexGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const horizontalSpacing = Math.sqrt(3) * HEX_RADIUS;
    const verticalSpacing = 2 * HEX_RADIUS * 0.75;

    const drawHexagon = (cx: number, cy: number, intensity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 6 + (Math.PI / 3) * i;
        const x = cx + HEX_RADIUS * Math.cos(angle);
        const y = cy + HEX_RADIUS * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const opacity =
        BASE_OPACITY + (PEAK_OPACITY - BASE_OPACITY) * intensity;
      ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (intensity > 0.05) {
        ctx.fillStyle = `rgba(212, 175, 55, ${intensity * 0.15})`;
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const columns = Math.ceil(canvas.width / horizontalSpacing) + 2;
      const rows = Math.ceil(canvas.height / verticalSpacing) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < columns; col++) {
          let x = col * horizontalSpacing;
          const y = row * verticalSpacing;
          if (row % 2 !== 0) x += horizontalSpacing / 2;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let intensity = 0;
          if (distance < MAX_DISTANCE) {
            intensity = Math.pow(1 - distance / MAX_DISTANCE, 2);
          }

          drawHexagon(x, y, intensity);
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HexGrid;
