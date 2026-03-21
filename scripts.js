/* ============================================================
   STEM Made Easy — Interactive Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initParallax();
  initMobileDropdowns();
  highlightActiveNav();
});

/* --- Sticky Navbar with Scroll Effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!navbar) return;

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a:not(.nav-link-label)').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && 
          !links.contains(e.target) && 
          !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* --- Scroll Reveal Animations via IntersectionObserver --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Parallax Effect on Hero Background --- */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
    if (scrollY < heroHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
    }
  }, { passive: true });
}

/* --- Mobile Dropdown Toggle --- */
function initMobileDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dd => {
    const label = dd.querySelector('.nav-link-label');
    if (label) {
      label.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close other dropdowns first
          dropdowns.forEach(other => {
            if (other !== dd) other.classList.remove('open');
          });
          dd.classList.toggle('open');
        }
        // On desktop, let the <a> tag navigate normally
      });
    }
  });
}

/* --- Highlight Active Nav Link --- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const links = document.querySelectorAll('.nav-links a, .dropdown-menu a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#')) {
      // Resolve the href to a full URL, then compare pathnames
      const resolved = new URL(href, window.location.href).pathname.toLowerCase();
      if (resolved === currentPath) {
        link.classList.add('active');
        // Also highlight parent dropdown if exists
        const dd = link.closest('.nav-dropdown');
        if (dd) {
          const parentLabel = dd.querySelector('.nav-link-label');
          if (parentLabel) parentLabel.classList.add('active');
        }
      }
    }
  });
}
