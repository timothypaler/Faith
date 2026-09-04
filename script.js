const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main > section[id]')];
const progressBar = document.querySelector('.page-progress span');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = !navigation.classList.contains('open');
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -45px' });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-38% 0px -55%', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.entry-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const entry = button.closest('.journal-entry');
    const open = entry.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close entry' : button.dataset.label || 'Read reflection';
  });
  button.dataset.label = button.textContent;
});

function updateProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${total > 0 ? Math.min(100, scrollY / total * 100) : 0}%`;
}

addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
document.getElementById('year').textContent = new Date().getFullYear();
