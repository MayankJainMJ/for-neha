/**
 * Celebration page: slideshow, typewriter, audio, sparkles, fireworks
 */

(function () {
  // ========== SLIDESHOW ==========
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var currentSlide = 0;
  var slideInterval;

  function showSlide(index) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });
    currentSlide = index % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  if (slides.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 3000);

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
      });
    });
  }

  // ========== TYPEWRITER ==========
  var messageEl = document.getElementById('love-message');
  if (messageEl) {
    var fullText = messageEl.getAttribute('data-message') ||
      "Neha, from the very first moment I saw you, I knew you were special. " +
      "Every day with you feels like a beautiful adventure. " +
      "Your smile lights up my entire world. " +
      "I can't imagine my life without you in it. " +
      "So here I am, asking you to be mine... forever. " +
      "I love you, Neha. 💕";

    messageEl.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    messageEl.appendChild(cursor);

    var charIndex = 0;
    function typeChar() {
      if (charIndex < fullText.length) {
        messageEl.insertBefore(
          document.createTextNode(fullText[charIndex]),
          cursor
        );
        charIndex++;
        var delay = fullText[charIndex - 1] === '.' ? 400 :
                    fullText[charIndex - 1] === ',' ? 200 :
                    30 + Math.random() * 30;
        setTimeout(typeChar, delay);
      } else {
        setTimeout(function () { cursor.style.display = 'none'; }, 2000);
      }
    }

    setTimeout(typeChar, 1500);
  }

  // ========== AUDIO PLAYER ==========
  var audioBtn = document.getElementById('audio-btn');
  var audioWave = document.getElementById('audio-wave');
  var audioElement = document.getElementById('bg-audio');
  var isPlaying = false;

  if (audioBtn && audioElement) {
    // Auto-play: try immediately, fallback to first touch/click anywhere
    function tryAutoPlay() {
      if (isPlaying) return;
      audioElement.play().then(function () {
        isPlaying = true;
        audioBtn.textContent = '⏸';
        audioWave.classList.remove('paused');
        document.removeEventListener('click', tryAutoPlay, true);
        document.removeEventListener('touchstart', tryAutoPlay, true);
      }).catch(function () {});
    }

    tryAutoPlay();
    document.addEventListener('click', tryAutoPlay, true);
    document.addEventListener('touchstart', tryAutoPlay, true);

    audioBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isPlaying) {
        audioElement.pause();
        audioBtn.textContent = '▶';
        audioWave.classList.add('paused');
      } else {
        audioElement.play().catch(function () {});
        audioBtn.textContent = '⏸';
        audioWave.classList.remove('paused');
      }
      isPlaying = !isPlaying;
    });

    audioElement.addEventListener('ended', function () {
      isPlaying = false;
      audioBtn.textContent = '▶';
      audioWave.classList.add('paused');
    });
  }

  // ========== SPARKLE PARTICLES ==========
  function createSparkle() {
    var sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.width = (Math.random() * 4 + 2) + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.background = ['#fff', '#ffd32a', '#ff6b9d', '#c44dff'][Math.floor(Math.random() * 4)];
    document.body.appendChild(sparkle);

    setTimeout(function () { sparkle.remove(); }, 2000);
  }

  setInterval(createSparkle, 200);

  // ========== FLOATING HEARTS RAIN ==========
  function createFallingHeart() {
    var heart = document.createElement('div');
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '🥰'][Math.floor(Math.random() * 6)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '-30px';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '20';
    heart.style.opacity = '0.8';
    document.body.appendChild(heart);

    var y = -30;
    var x = parseFloat(heart.style.left);
    var speed = Math.random() * 2 + 1;
    var wobbleAmp = Math.random() * 2;
    var wobbleFreq = Math.random() * 0.05 + 0.02;
    var t = 0;

    function fall() {
      y += speed;
      t += wobbleFreq;
      x += Math.sin(t) * wobbleAmp;
      heart.style.top = y + 'px';
      heart.style.left = x + 'px';
      heart.style.opacity = Math.max(0, 0.8 - y / window.innerHeight * 0.8);

      if (y < window.innerHeight + 30) {
        requestAnimationFrame(fall);
      } else {
        heart.remove();
      }
    }

    requestAnimationFrame(fall);
  }

  setInterval(createFallingHeart, 500);

  // ========== FIREWORK BURSTS ==========
  var FIREWORK_COLORS = ['#ff6b9d', '#ffd32a', '#55efc4', '#c44dff', '#ff4757', '#00cec9', '#fd79a8', '#f368e0'];

  function launchFirework() {
    var cx = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
    var cy = Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.1;
    var particleCount = 30 + Math.floor(Math.random() * 20);
    var color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.left = cx + 'px';
      particle.style.top = cy + 'px';
      particle.style.background = color;
      particle.style.boxShadow = '0 0 6px ' + color;
      document.body.appendChild(particle);

      var angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.5;
      var velocity = 2 + Math.random() * 4;
      var vx = Math.cos(angle) * velocity;
      var vy = Math.sin(angle) * velocity;
      var gravity = 0.05;
      var opacity = 1;
      var px = cx;
      var py = cy;

      (function (p, vx, vy, px, py) {
        var localOpacity = 1;
        var localPx = px;
        var localPy = py;
        var localVy = vy;

        function animateParticle() {
          localPx += vx;
          localVy += gravity;
          localPy += localVy;
          localOpacity -= 0.015;
          vx *= 0.98;

          p.style.left = localPx + 'px';
          p.style.top = localPy + 'px';
          p.style.opacity = Math.max(0, localOpacity);

          if (localOpacity > 0) {
            requestAnimationFrame(animateParticle);
          } else {
            p.remove();
          }
        }

        requestAnimationFrame(animateParticle);
      })(particle, vx, vy, px, py);
    }
  }

  // Launch fireworks periodically
  setTimeout(function () {
    launchFirework();
    launchFirework();
  }, 1500);

  setInterval(function () {
    launchFirework();
  }, 4000);

  // Extra burst every 8 seconds with double firework
  setInterval(function () {
    launchFirework();
    setTimeout(launchFirework, 300);
  }, 8000);

  // ========== SCROLL-TRIGGERED SPARKLE EXPLOSIONS ==========
  var sparkleTriggered = {};

  function checkScrollSparkles() {
    var revealSections = document.querySelectorAll('.gallery-section, .song-section, .final-section');
    revealSections.forEach(function (section, i) {
      if (sparkleTriggered[i]) return;
      var rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        sparkleTriggered[i] = true;
        // Burst of sparkles at that section
        for (var j = 0; j < 20; j++) {
          setTimeout(function () {
            var sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + window.scrollY + Math.random() * 100) + 'px';
            sparkle.style.width = (Math.random() * 6 + 3) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkle.style.background = ['#fff', '#ffd32a', '#ff6b9d', '#c44dff', '#55efc4'][Math.floor(Math.random() * 5)];
            sparkle.style.position = 'absolute';
            document.body.appendChild(sparkle);
            setTimeout(function () { sparkle.remove(); }, 2000);
          }, j * 50);
        }
      }
    });
  }

  window.addEventListener('scroll', checkScrollSparkles);
})();
