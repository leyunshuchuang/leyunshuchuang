(function () {
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal, .stagger').forEach(function (el) {
    observer.observe(el);
  });

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(function (counter) {
    const target = Number(counter.getAttribute('data-counter'));
    if (!Number.isFinite(target)) {
      return;
    }

    let started = false;
    const run = function () {
      if (started) {
        return;
      }
      started = true;
      const duration = 1400;
      const start = performance.now();

      const animate = function (now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = value.toLocaleString('en-US');
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const cObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run();
            cObs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    cObs.observe(counter);
  });
})();
