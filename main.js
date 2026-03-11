// Add js-loaded to body IMMEDIATELY — this enables the CSS animations.
// If JS never runs, body won't have this class and all content stays visible.
document.body.classList.add('js-loaded');

/* ============================
   NAVBAR
   ============================ */
var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================
   HAMBURGER
   ============================ */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function () {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
  });
});

document.addEventListener('click', function (e) {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

/* ============================
   SCROLL REVEAL
   ============================ */
var revealEls = document.querySelectorAll('.reveal');

// Show hero immediately
document.querySelectorAll('#hero .reveal').forEach(function (el) {
  el.classList.add('visible');
});

// Observe everything else
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
} else {
  revealEls.forEach(function (el) { el.classList.add('visible'); });
}

/* ============================
   SMOOTH SCROLL
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

/* ============================
   LIGHTBOX
   ============================ */
function openLightbox(src, caption) {
  var lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
