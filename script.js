/* ================================================
   SAMUEL FILHO & HADASSA GABRIELLE
   script.js — Premium Wedding Site
================================================ */

// ── LOADER ──────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
  // Trigger hero reveals right away
  document.querySelectorAll('.hero .reveal, .hero .reveal-delay-1, .hero .reveal-delay-2, .hero .reveal-delay-3, .hero .reveal-delay-4')
    .forEach(el => el.classList.add('in-view'));
});

// ── COUNTDOWN ───────────────────────────────────
function updateCountdown() {
  const target = new Date('2028-01-22T15:00:00').getTime();
  const now    = Date.now();
  const diff   = target - now;

  if (diff <= 0) {
    ['days','hours','minutes','seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);

  const fmt = (n, pad) => String(n).padStart(pad, '0');
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('days',    fmt(d, 3));
  set('hours',   fmt(h, 2));
  set('minutes', fmt(m, 2));
  set('seconds', fmt(s, 2));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── NAV SCROLL GLASS EFFECT ─────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    const topBtn = document.getElementById('topButton');
    if (topBtn) topBtn.classList.toggle('visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', handleScroll, { passive:true });
  handleScroll();
}

// ── TOP BUTTON ───────────────────────────────────
const topBtn = document.getElementById('topButton');
if (topBtn) {
  topBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

// ── MOBILE MENU ──────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
}
function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (navToggle)  navToggle.classList.remove('open');
  document.body.style.overflow = '';
}

// ── SCROLL REVEAL ────────────────────────────────
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4'
);
// Filter out hero elements (handled separately)
const outsideHero = [...revealEls].filter(el => !el.closest('.hero'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

outsideHero.forEach(el => revealObserver.observe(el));

// ── FALLING PETALS ───────────────────────────────
const petalsContainer = document.getElementById('petals');
if (petalsContainer) {
  const N = 18;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left       = Math.random() * 100 + '%';
    p.style.width      = (6 + Math.random() * 8) + 'px';
    p.style.height     = (6 + Math.random() * 8) + 'px';
    p.style.animationDuration  = (8 + Math.random() * 12) + 's';
    p.style.animationDelay     = (Math.random() * 14) + 's';
    p.style.opacity    = 0;
    // Alternate colors
    const colors = ['rgba(201,132,158,.25)','rgba(239,204,214,.35)','rgba(196,162,101,.2)'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    petalsContainer.appendChild(p);
  }
}

// ── GIFT MODAL (presentes.html) ──────────────────
window.abrirModal = function(nome, valor, qr, pix) {
  const modal = document.getElementById('modalGift');
  if (!modal) return;
  document.getElementById('giftName').textContent  = nome;
  document.getElementById('giftValue').textContent = valor;
  const imgEl = document.getElementById('giftQR');
  if (imgEl) { imgEl.src = qr; imgEl.alt = 'QR Code Pix'; }
  document.getElementById('pixCode').value = pix;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.fecharModal = function() {
  const modal = document.getElementById('modalGift');
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
};

window.copiarPix = function() {
  const el = document.getElementById('pixCode');
  if (!el) return;
  navigator.clipboard.writeText(el.value).catch(() => {
    el.select();
    document.execCommand('copy');
  });
  const btn = el.nextElementSibling;
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado!';
    setTimeout(() => btn.textContent = orig, 2000);
  }
};

// Close modal on overlay click
document.addEventListener('click', e => {
  const modal = document.getElementById('modalGift');
  if (modal && e.target === modal) fecharModal();
});
