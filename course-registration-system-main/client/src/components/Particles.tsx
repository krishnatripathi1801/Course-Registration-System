import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  twinkle: number;
}

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
    };

    const initParticles = () => {
      const area = window.innerWidth * window.innerHeight;
      // density-based count, capped for perf
      const base = Math.min(120, Math.max(40, Math.floor(area / 28000)));
      particlesRef.current = new Array(base).fill(0).map(() => makeParticle());
    };

    const makeParticle = (): Particle => {
      const speed = 0.15 + Math.random() * 0.35; // px/frame (unscaled, dpr handled by setTransform)
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 0.6 + Math.random() * 1.6,
        alpha: 0.15 + Math.random() * 0.25,
        twinkle: Math.random() * Math.PI * 2,
      };
    };

    const getColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      // soft cyan/blue in light, soft blue/violet in dark
      return isDark ? 'rgba(147, 197, 253, 0.9)' : 'rgba(59, 130, 246, 0.9)';
    };

    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(32, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stroke = getColor();
      ctx.fillStyle = stroke;

      const arr = particlesRef.current;
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        if (!reducedMotion.current) {
          p.x += p.vx * (dt / 16.7);
          p.y += p.vy * (dt / 16.7);
          p.twinkle += 0.02;
        }

        // wrap around edges for an endless float
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;

        const pulse = reducedMotion.current ? 1 : 0.85 + Math.sin(p.twinkle) * 0.15;
        const radius = p.r * pulse;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    if (!reducedMotion.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // render once when reduced motion is preferred
      tick(lastTime);
    }

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden />;
};

export default Particles;
