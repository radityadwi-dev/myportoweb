import { useEffect, useState } from 'react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const setHeaderState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });

    return () => {
      window.removeEventListener('scroll', setHeaderState);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => activeObserver.observe(section));

    return () => {
      activeObserver.disconnect();
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`site-header${isScrolled ? ' scrolled' : ''}`} data-header>
      <nav className="navbar container" aria-label="Navigasi utama">
        <a className="brand" href="#home" aria-label="Raditya Dwi Pahlawadi" onClick={closeMenu}>
          <span className="brand-mark">R</span>
          <span>Raditya</span>
        </a>

        <button
          className={`nav-toggle${isMenuOpen ? ' open' : ''}`}
          type="button"
          aria-label="Buka menu"
          aria-expanded={isMenuOpen}
          data-nav-toggle
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu${isMenuOpen ? ' open' : ''}`} data-nav-menu>
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`nav-link${activeSection === item.href.slice(1) ? ' active' : ''}`}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <div className="hero-content reveal">
          <p className="eyebrow">Portfolio Personal</p>
          <h1>Raditya Dwi Pahlawadi</h1>
          <p className="hero-role">Front-End Developer</p>
          <p className="hero-description">
            Membangun antarmuka web yang responsif, rapi, dan terintegrasi API dengan fokus pada pengalaman pengguna
            serta kualitas implementasi.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">View Projects</a>
            <a className="btn btn-secondary" href="#contact">Contact Me</a>
            <a
              className="btn btn-secondary"
              href="https://drive.google.com/drive/folders/1calQRI0RHI6d7MsX4Z2iPXw9bQwz8yiR"
            >
              Certificates
            </a>
          </div>
        </div>

        <div className="profile-card reveal">
          <div className="profile-photo" aria-label="Profile photo placeholder">
            <img src="/profile-raditya.png" alt="Foto Raditya Dwi Pahlawadi" />
          </div>
          <div className="profile-summary">
            <p>Available for Front-End Developer Roles</p>
            <strong>Jakarta, Indonesia</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-card two-column reveal">
          <div className="section-heading">
            <p className="eyebrow">About Me</p>
            <h2>Clean, modern and user-friendly interfaces.</h2>
          </div>
          <div className="section-copy">
            <p>
              Fokus saya ada pada pengembangan antarmuka web yang bersih, responsif, dan mudah digunakan. Terbiasa
              mengintegrasikan API, melakukan debugging, serta membangun fitur berdasarkan kebutuhan pengguna dan tim.
            </p>
            <p>
              Dalam proses development, saya memperhatikan reusable component, detail UI, dan struktur kode yang
              maintainable. Saya juga nyaman bekerja secara kolaboratif, terbuka terhadap feedback, dan terus
              mempelajari teknologi baru untuk meningkatkan kualitas produk yang dikembangkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section section-soft" id="education">
      <div className="container">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Education</p>
          <h2>Pendidikan</h2>
        </div>
        <article className="timeline-card reveal">
          <div>
            <p className="card-kicker">Juli 2023 - Mei 2026</p>
            <h3>SMK Negeri 24 Jakarta</h3>
            <p>Rekayasa Perangkat Lunak</p>
          </div>
          <span className="status-badge">Software Engineering</span>
        </article>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-heading centered reveal">
          <h2>Experience</h2>
          <p>
            Pengalaman praktik industri yang membantu saya memahami workflow pengembangan project profesional.
          </p>
        </div>
        <article className="experience-card reveal">
          <div className="experience-heading">
            <img src="/steradian-data-optima-logo.jpeg" alt="Logo PT Steradian Data Optima" />
            <div>
              <p className="card-kicker">Internship</p>
              <h3>PT Steradian Data Optima</h3>
            </div>
          </div>
          <p className="experience-copy">
            Berperan sebagai Front-End Developer pada pengembangan module Account dan Account Detail aplikasi CRM
            berbasis web. Mengembangkan dan maintenance UI, mengimplementasikan fitur CRUD, filtering, sorting,
            pagination, dan integrasi REST API untuk pengelolaan data account. Terlibat dalam debugging, optimasi
            performa frontend, serta kolaborasi dengan tim backend untuk memastikan integrasi fitur dan workflow
            aplikasi berjalan dengan optimal selama masa internship.
          </p>
        </article>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section section-soft" id="skills">
      <div className="container">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Skills</p>
          <h2>Keterampilan</h2>
        </div>

        <div className="skills-grid">
          <article className="skill-panel reveal">
            <h3>Programming & Framework</h3>
            <div className="badge-list">
              <span>Kotlin</span>
              <span>React</span>
              <span>PHP</span>
              <span>Laravel</span>
              <span>Vue.js</span>
              <span>Vite</span>
            </div>
          </article>

          <article className="skill-panel reveal">
            <h3>Tools</h3>
            <div className="badge-list">
              <span>Visual Studio Code</span>
              <span>Antigravity</span>
              <span>Android Studio</span>
              <span>GitHub</span>
              <span>XAMPP</span>
              <span>Blender</span>
            </div>
          </article>

          <article className="skill-panel reveal">
            <h3>Soft Skills</h3>
            <div className="badge-list">
              <span>Leadership</span>
              <span>Komunikatif</span>
              <span>Kolaboratif</span>
              <span>Curious</span>
              <span>Bertanggung jawab</span>
              <span>Teamwork</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Projects</p>
          <h2>Project Utama</h2>
          <p>Beberapa project yang menunjukkan pengalaman saya dalam frontend, integrasi API, dan deployment.</p>
        </div>

        <div className="projects-grid">
          <article className="project-card reveal">
            <div className="project-topline">
              <span>April 2026 - Sekarang</span>
              <strong>Fullstack Developer</strong>
            </div>
            <h3>Javes Topup</h3>
            <p>
              Website top up game dan digital product berbasis web yang dikembangkan dari sisi frontend dan backend.
            </p>
            <ul>
              <li>Mengembangkan frontend menggunakan React dan Vite.</li>
              <li>Membuat serta mengelola backend API.</li>
              <li>Integrasi QRIS Payment Gateway dan provider top up.</li>
              <li>Deployment VPS, Nginx, domain, SSL, maintenance, dan debugging.</li>
            </ul>
            <div className="tech-stack">
              <span>React</span>
              <span>Vite</span>
              <span>API</span>
              <span>QRIS</span>
              <span>Nginx</span>
            </div>
            <div className="project-actions">
              <a className="btn btn-small btn-primary" href="https://javestopup.site/#/" aria-label="Live demo Javes Store">
                Live Demo
              </a>
            </div>
          </article>

          <article className="project-card reveal">
            <div className="project-topline">
              <span>Februari 2026 - Mei 2026</span>
              <strong>Front-End Developer</strong>
            </div>

            <h3>Website CRM</h3>

            <p>
              Aplikasi Customer Relationship Management (CRM) berbasis website untuk pengelolaan data account,
              aktivitas customer, dan workflow bisnis.
            </p>

            <ul>
              <li>
                Mengembangkan module Account dan Account Detail menggunakan Vue.js & Quasar Framework.
              </li>

              <li>
                Membangun fitur search, filtering, sorting, pagination, dan CRUD workflow untuk pengelolaan data
                account.
              </li>

              <li>
                Mengintegrasikan frontend dengan REST API serta menangani loading state, validation, dan error
                handling.
              </li>

              <li>
                Melakukan debugging, optimasi performa frontend, dan kolaborasi dengan tim backend dalam pengembangan
                workflow CRM.
              </li>
            </ul>

            <div className="tech-stack">
              <span>Vue.js</span>
              <span>Quasar</span>
              <span>REST API</span>
              <span>CRUD</span>
              <span>Frontend</span>
            </div>
          </article>

          <article className="project-card reveal">
            <div className="project-topline">
              <span>Agustus 2025 - Desember 2025</span>
              <strong>Front-End Developer</strong>
            </div>
            <h3>Aplikasi POS / Point Of Sale</h3>
            <p>
              Aplikasi POS berbasis tablet untuk transaksi penjualan, shopping cart, dan pembayaran.
            </p>
            <ul>
              <li>Mengembangkan UI transaksi dan shopping cart menggunakan Kotlin.</li>
              <li>Implementasi barcode scanner dan fitur pencarian produk.</li>
              <li>Integrasi metode pembayaran QRIS dan transfer bank.</li>
            </ul>
            <div className="tech-stack">
              <span>Kotlin</span>
              <span>Tablet UI</span>
              <span>Barcode</span>
              <span>QRIS</span>
            </div>
            <div className="project-actions">
              <a className="btn btn-small btn-primary" href="/pos-documentation.html">Dokumentasi</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formNote, setFormNote] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setFormNote('Terima kasih. Pesan kamu sudah tercatat di form ini.');
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div className="section-heading reveal">
          <p className="eyebrow">Contact</p>
          <h2>Mari wujudkan ide menjadi produk digital yang menarik.</h2>
          <p>
            Terbuka untuk peluang Front-End Developer, freelance project, dan kolaborasi lainnya
          </p>

          <div className="contact-list">
            <a href="mailto:radityadwipahlawadi@gmail.com">radityadwipahlawadi@gmail.com</a>
            <a href="https://wa.me/6281383734851" target="_blank" rel="noreferrer">WhatsApp: 0813-8373-4851</a>
            <a href="https://instagram.com/radityapahlawadi" target="_blank" rel="noreferrer">
              Instagram: @radityapahlawadi
            </a>
            <a href="https://github.com/radityadwi-dev" target="_blank" rel="noreferrer">GitHub: radityadwi-dev</a>
            <a
              href="https://www.linkedin.com/in/raditya-dwi-pahlawadi-47a2a7398/?skipRedirect=true"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn: Raditya Dwi Pahlawadi
            </a>
            <span>Kelapa Dua Wetan, Jakarta Timur</span>
          </div>
        </div>

        <form className="contact-form reveal" data-contact-form onSubmit={handleSubmit}>
          <label htmlFor="name">Nama</label>
          <input id="name" name="name" type="text" placeholder="Nama lengkap" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="email@domain.com" required />

          <label htmlFor="message">Pesan</label>
          <textarea id="message" name="message" rows="5" placeholder="Tulis pesan singkat..." required></textarea>

          <button className="btn btn-primary" type="submit">Send Message</button>
          <p className="form-note" data-form-note aria-live="polite">{formNote}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>&copy; 2026 Raditya Dwi Pahlawadi. All rights reserved.</p>
        <a href="#home" data-back-to-top>Back to top</a>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.body.classList.remove('dark-theme');
    document.body.dataset.pageTop = 'home';
  }, []);

  useEffect(() => {
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

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
