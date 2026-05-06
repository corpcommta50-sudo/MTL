/* ══════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════ */
const progressFill = document.getElementById('progress-fill');

function updateProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = pct + '%';
}

/* ══════════════════════════════════════
   FADE-UP — IntersectionObserver
══════════════════════════════════════ */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold:  0.12,
  rootMargin: '0px 0px -50px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const start    = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      entry.target.dataset.done = '1';
      animateCount(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]')
        .forEach(el => countObserver.observe(el));

/* ══════════════════════════════════════
   SIDE NAV DOTS — active state
══════════════════════════════════════ */
const panels  = document.querySelectorAll('.panel');
const navDots = document.querySelectorAll('.nav-dot');

const panelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = [...panels].indexOf(entry.target);
      navDots.forEach(d => d.classList.remove('active'));
      if (navDots[idx]) navDots[idx].classList.add('active');
    }
  });
}, { threshold: 0.5 });

panels.forEach(p => panelObserver.observe(p));

/* click → scroll to section */
navDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.idx, 10);
    if (panels[idx]) {
      panels[idx].scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════
   PRODUCT TABS
══════════════════════════════════════ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) panel.classList.add('active');
  });
});

/* ══════════════════════════════════════
   HERO PARALLAX (subtle)
══════════════════════════════════════ */
const heroBgWord = document.querySelector('.hero-bg-word');

function onScroll() {
  updateProgress();
  if (heroBgWord) {
    heroBgWord.style.transform =
      `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
updateProgress();
