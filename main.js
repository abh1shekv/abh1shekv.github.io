/* Navbar scroll */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* Hamburger */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', function () {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(function (link) {
  link.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
});
document.addEventListener('click', function (e) {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

/* Smooth scroll */
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

/* Lightbox */
function openLightbox(src, caption) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
