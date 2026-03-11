/* ============================
   NAVBAR — scroll behavior
   ============================ */
var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ============================
   HAMBURGER MENU
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
function initReveal() {
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }
}

/* ============================
   HERO — reveal on load
   ============================ */
window.addEventListener('load', function () {
  // Make hero elements visible immediately on load
  document.querySelectorAll('#hero .reveal').forEach(function (el) {
    setTimeout(function () {
      el.classList.add('visible');
    }, 80);
  });

  // Then init scroll reveal for everything else
  initReveal();
});

/* ============================
   SMOOTH ANCHOR SCROLL
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var navHeight = navbar.offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

/* ============================
   LIGHTBOX
   ============================ */
function openLightbox(src, caption) {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var cap = document.getElementById('lightbox-caption');
  if (!lb || !img || !cap) return;
  img.src = src;
  cap.textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
