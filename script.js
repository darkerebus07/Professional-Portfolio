const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const loader = $('#loader'), loaderValue = $('#loaderValue'), loaderBar = $('#loaderBar'); let progress = 0;
const loadTimer = setInterval(() => { progress = Math.min(100, progress + 2); loaderValue.textContent = progress; loaderBar.style.width = progress + '%'; if (progress === 100) { clearInterval(loadTimer); setTimeout(() => { loader.classList.add('done'); document.body.classList.remove('locked'); setTimeout(() => $$('.hero .reveal').forEach(x => x.classList.add('visible')), 130) }, 250) } }, 28);
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('professional-portfolio-theme');
const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = savedTheme || (preferredDark ? 'dark' : 'light');
function syncThemeButton() { const dark = document.documentElement.dataset.theme === 'dark'; themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾'; themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode'); themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode' }
syncThemeButton(); themeToggle.addEventListener('click', () => { document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('professional-portfolio-theme', document.documentElement.dataset.theme); syncThemeButton() });
const profileCard = $('#profileCard'); profileCard.addEventListener('click', () => { if (matchMedia('(hover: none)').matches) profileCard.classList.toggle('is-flipped') });
const header = $('#header'); addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });
const hamburger = $('#hamburger'), navLinks = $('#navLinks'); hamburger.onclick = () => { hamburger.classList.toggle('open'); navLinks.classList.toggle('open') }; $$('.nav-links a').forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('open'); navLinks.classList.remove('open') }));
const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }), { threshold: .12 }); $$('.reveal').forEach(x => observer.observe(x));
const sections = $$('main section[id]'), links = $$('.nav-links a[href^="#"]'); const sectionObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)) }), { rootMargin: '-35% 0px -55%', threshold: 0 }); sections.forEach(s => sectionObserver.observe(s));
function printResume(e) { e.preventDefault(); document.title = 'Adarsh_Maurya_Professional_Portfolio'; window.print() } $('#resumeBtn').addEventListener('click', printResume); $('#contactResume').addEventListener('click', printResume);

// Subtle professional scroll-follow effect for the Current Focus card.
const focusCard = document.querySelector('.about-note');
const aboutSection = document.querySelector('#about');
let focusTicking = false;
function updateFocusCard() {
focusTicking = false;
if (!focusCard || !aboutSection || window.innerWidth <= 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
if (focusCard) focusCard.style.setProperty('--focus-drift', '0px');
return;
}
const sectionRect = aboutSection.getBoundingClientRect();
const progress = Math.max(0, Math.min(1, (window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height)));
const drift = (progress - .5) * 34;
focusCard.style.setProperty('--focus-drift', drift.toFixed(1) + 'px');
focusCard.classList.toggle('is-tracking', sectionRect.top < window.innerHeight * .72 && sectionRect.bottom > window.innerHeight * .25);
}
window.addEventListener('scroll', () => { if (!focusTicking) { focusTicking = true; requestAnimationFrame(updateFocusCard) } }, { passive: true });
window.addEventListener('resize', updateFocusCard);
updateFocusCard();

