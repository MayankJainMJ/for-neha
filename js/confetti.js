/**
 * Canvas-based confetti explosion + continuous rain
 */

(function () {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  const COLORS = [
    '#ff6b9d', '#c44dff', '#ff4757', '#ffa502',
    '#55efc4', '#fd79a8', '#e17055', '#00cec9',
    '#ff9ff3', '#f368e0', '#ff6348', '#ffd32a'
  ];

  const SHAPES = ['circle', 'rect', 'heart'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor(burst = false) {
      this.reset(burst);
    }

    reset(burst = false) {
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.size = Math.random() * 8 + 4;

      if (burst) {
        // Burst from center
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
        this.y = canvas.height / 3;
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = Math.random() * -18 - 5;
      } else {
        // Rain from top
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 3 + 1;
      }

      this.gravity = 0.15;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.opacity = 1;
      this.decay = Math.random() * 0.005 + 0.002;
      this.wobble = Math.random() * 10;
      this.wobbleSpeed = Math.random() * 0.1 + 0.05;
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx + Math.sin(this.wobble) * 0.5;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.wobble += this.wobbleSpeed;
      this.opacity -= this.decay;
      this.vx *= 0.99;

      return this.opacity > 0 && this.y < canvas.height + 20;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else if (this.shape === 'heart') {
        this.drawHeart(this.size * 0.6);
      }

      ctx.restore();
    }

    drawHeart(s) {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s, 0, -s * 0.5);
      ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.3, 0, s * 0.3);
      ctx.fill();
    }
  }

  // Initial burst
  function burst(count = 150) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(true));
    }
  }

  // Continuous rain
  let rainInterval;
  function startRain() {
    rainInterval = setInterval(() => {
      if (particles.length < 200) {
        particles.push(new Particle(false));
      }
    }, 100);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => {
      const alive = p.update();
      if (alive) p.draw();
      return alive;
    });

    animationId = requestAnimationFrame(animate);
  }

  // Start
  burst(200);
  animate();

  // Delayed continuous rain
  setTimeout(() => startRain(), 2000);

  // Second burst after 1 second
  setTimeout(() => burst(100), 1000);

  // Cleanup on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(rainInterval);
      cancelAnimationFrame(animationId);
    } else {
      animate();
      startRain();
    }
  });
})();
