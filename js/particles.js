/**
 * Star/shimmer particle system for index page background
 * Creates a subtle twinkling star field on a canvas
 */
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.driftX = (Math.random() - 0.5) * 0.3;
      this.driftY = (Math.random() - 0.5) * 0.15;
      this.color = ['#fff', '#ffd32a', '#ff6b9d', '#c44dff', '#55efc4'][Math.floor(Math.random() * 5)];
    }

    update() {
      this.twinklePhase += this.twinkleSpeed;
      this.x += this.driftX;
      this.y += this.driftY;

      // Wrap around
      if (this.x < -5) this.x = canvas.width + 5;
      if (this.x > canvas.width + 5) this.x = -5;
      if (this.y < -5) this.y = canvas.height + 5;
      if (this.y > canvas.height + 5) this.y = -5;
    }

    draw() {
      const alpha = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
      ctx.save();
      ctx.globalAlpha = alpha;

      // Glow
      ctx.shadowBlur = this.size * 4;
      ctx.shadowColor = this.color;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Cross sparkle for brighter stars
      if (this.size > 1.5) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = alpha * 0.4;
        const len = this.size * 3;
        ctx.beginPath();
        ctx.moveTo(this.x - len, this.y);
        ctx.lineTo(this.x + len, this.y);
        ctx.moveTo(this.x, this.y - len);
        ctx.lineTo(this.x, this.y + len);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // Create stars
  const count = Math.min(120, Math.floor(canvas.width * canvas.height / 8000));
  for (let i = 0; i < count; i++) {
    particles.push(new Star());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animate();
    }
  });
})();
