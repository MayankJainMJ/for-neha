/**
 * No-button dodge logic
 * Makes the "No" button impossible to click by dodging the cursor.
 * Adds screen shake effect on the areyousure page.
 */

(function () {
  var noBtn = document.getElementById('no-btn');
  if (!noBtn) return;

  var dodgeCount = 0;
  var funnyTexts = [
    "No 😤",
    "Nope! 🏃",
    "Can't catch me! 😜",
    "Too slow! 💨",
    "Try again! 🤣",
    "LMAO nice try! 😂",
    "I'm speed! ⚡",
    "Byeee! 👋",
    "Not today! 🙅",
    "You wish! 😏",
    "Seriously?! 🤨",
    "Still trying? 💀",
    "Give up! 😭",
    "YEET! 🏃‍♂️💨",
    "Just say YES! 💕"
  ];

  var isAreYouSurePage = document.body.classList.contains('bg-gradient-alt');

  function getViewportBounds() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  function getRandomPosition() {
    var bounds = getViewportBounds();
    var btnRect = noBtn.getBoundingClientRect();
    var padding = 20;
    var maxX = bounds.width - btnRect.width - padding;
    var maxY = bounds.height - btnRect.height - padding;
    return {
      x: Math.max(padding, Math.random() * maxX),
      y: Math.max(padding, Math.random() * maxY)
    };
  }

  function triggerScreenShake() {
    document.body.classList.add('shake');
    setTimeout(function () {
      document.body.classList.remove('shake');
    }, 500);
  }

  function dodge() {
    dodgeCount++;
    var pos = getRandomPosition();

    noBtn.classList.add('dodging');
    noBtn.style.left = pos.x + 'px';
    noBtn.style.top = pos.y + 'px';

    // Change text
    if (dodgeCount < funnyTexts.length) {
      noBtn.textContent = funnyTexts[dodgeCount];
    } else {
      noBtn.textContent = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
    }

    // Random size changes for fun
    var sizes = [1, 0.9, 1.1, 0.8, 1.2, 0.7, 0.6];
    var scale = dodgeCount < sizes.length ? sizes[dodgeCount] : Math.max(0.5, 1 - dodgeCount * 0.03);
    noBtn.style.transform = 'scale(' + scale + ')';

    // Random rotation for quirky feel
    var rotation = (Math.random() - 0.5) * 30;
    noBtn.style.transform = 'scale(' + scale + ') rotate(' + rotation + 'deg)';

    // Screen shake on areyousure page
    if (isAreYouSurePage) {
      triggerScreenShake();
    }

    // Vibrate on mobile if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  // Desktop: dodge on hover
  noBtn.addEventListener('mouseenter', function (e) {
    e.preventDefault();
    dodge();
  });

  // Mobile: dodge on touchstart
  noBtn.addEventListener('touchstart', function (e) {
    e.preventDefault();
    dodge();
  }, { passive: false });

  // If somehow clicked, go to "are you sure" page
  noBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'areyousure.html';
  });

  // Position the no button initially
  function initPosition() {
    var bounds = getViewportBounds();
    var isMobile = bounds.width < 600;
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '100';

    if (isMobile) {
      noBtn.style.left = (bounds.width / 2 + 30) + 'px';
      noBtn.style.top = (bounds.height * 0.78) + 'px';
    } else {
      noBtn.style.left = (bounds.width / 2 + 80) + 'px';
      noBtn.style.top = (bounds.height / 2 + 100) + 'px';
    }
  }

  initPosition();
  window.addEventListener('resize', initPosition);
})();
