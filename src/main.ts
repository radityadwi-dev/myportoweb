import './styles.css';

const body = document.body;
const header = document.querySelector<HTMLElement>('[data-header]');
const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navMenu = document.querySelector<HTMLElement>('[data-nav-menu]');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
const contactForm = document.querySelector<HTMLFormElement>('[data-contact-form]');
const formNote = document.querySelector<HTMLElement>('[data-form-note]');
const footerSlot = document.querySelector<HTMLElement>('[data-footer]');

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

const sections = document.querySelectorAll<HTMLElement>('main section[id]');
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0,
  },
);

sections.forEach((section) => activeObserver.observe(section));

const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
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

    const backToTopLink = footerSlot.querySelector<HTMLAnchorElement>('[data-back-to-top]');
    const pageTopId = body.dataset.pageTop;

    if (backToTopLink && pageTopId) {
      backToTopLink.href = `#${pageTopId}`;
    }
  } catch {
    footerSlot.remove();
  }
};

void loadFooter();

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  contactForm.reset();

  if (formNote) {
    formNote.textContent = 'Terima kasih. Pesan kamu sudah tercatat di form ini.';
  }
});
