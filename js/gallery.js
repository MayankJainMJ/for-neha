/**
 * Scroll-reveal for photo gallery and other reveal elements
 * Uses Intersection Observer for staggered fade-in
 */
(function () {
  // Reveal gallery items with stagger
  const galleryItems = document.querySelectorAll('.gallery-item');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (!galleryItems.length && !revealElements.length) return;

  // Gallery observer with stagger
  if (galleryItems.length) {
    const galleryObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const item = entry.target;
          const index = parseInt(item.getAttribute('data-index') || '0', 10);
          setTimeout(function () {
            item.classList.add('visible');
          }, index * 100); // stagger by 100ms per item
          galleryObserver.unobserve(item);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    galleryItems.forEach(function (item, i) {
      item.setAttribute('data-index', i % 6); // stagger within visible rows
      galleryObserver.observe(item);
    });
  }

  // General reveal observer
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
})();
