import './index.css';

const body = document.body;
const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const navLinks = document.querySelectorAll('.nav-link');
const footerSlot = document.querySelector('[data-footer]');

body.classList.remove('dark-theme');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.classList.toggle('open') ?? false;
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const setHeaderState = () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const loadFooter = async () => {
  if (!footerSlot) return;

  try {
    const response = await fetch('/footer.html');
    if (!response.ok) return;

    footerSlot.innerHTML = await response.text();

    const backToTopLink = footerSlot.querySelector('[data-back-to-top]');
    const pageTopId = body.dataset.pageTop;

    if (backToTopLink && pageTopId) {
      backToTopLink.href = `#${pageTopId}`;
    }
  } catch {
    footerSlot.remove();
  }
};

void loadFooter();
