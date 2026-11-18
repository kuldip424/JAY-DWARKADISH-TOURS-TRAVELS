import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Counts a ".counter-num" element up to its data-target (e.g. 15000 -> "15K+").
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const start = performance.now();
  const isThousands = target >= 1000;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    if (progress < 1) {
      const value = Math.floor((1 - Math.pow(1 - progress, 3)) * target); // ease-out
      el.textContent = isThousands ? (value / 1000).toFixed(1) + 'K+' : value + '+';
      requestAnimationFrame(step);
    } else {
      el.textContent = isThousands ? target / 1000 + 'K+' : target + '+';
    }
  }
  requestAnimationFrame(step);
}

/**
 * Adds "active" to ".reveal" elements when they scroll into view,
 * and runs the ".counter-num" animation once. Re-runs on route change.
 */
export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    let revealObserver;
    let counterObserver;

    // Small delay so the new page has rendered
    const timer = setTimeout(() => {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

      counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            document.querySelectorAll('.counter-num').forEach(animateCounter);
            counterObserver.disconnect(); // run once
          }
        },
        { threshold: 0.5 }
      );
      document.querySelectorAll('.counter-num').forEach((el) => counterObserver.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      revealObserver?.disconnect();
      counterObserver?.disconnect();
    };
  }, [pathname]);
}
