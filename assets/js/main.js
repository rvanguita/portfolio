document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Modo Escuro / Claro
  const themeToggleBtn = document.getElementById('themeToggle');
  const syncThemePressedState = () => {
    if (!themeToggleBtn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggleBtn.setAttribute('aria-pressed', String(isDark));
  };

  if (themeToggleBtn) {
    syncThemePressedState();
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      syncThemePressedState();
    });
  }

  // 1.1. Menu de Navegação: hambúrguer, rolagem suave e seção ativa
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeNavMenu = () => {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('open')) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeNavMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNavMenu();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const hash = link.hash;
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', hash);
      }
      closeNavMenu();
    });
  });

  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (event) => {
      const dest = new URL(navLogo.href, window.location.href);
      if (dest.pathname === window.location.pathname) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', dest.pathname);
      }
      closeNavMenu();
    });
  }

  // 1.2. Destaque da seção visível no menu (scroll-spy)
  const spySections = Array.from(navLinks)
    .map(link => (link.hash ? document.querySelector(link.hash) : null))
    .filter(Boolean);

  if (spySections.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.hash === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    spySections.forEach(section => spyObserver.observe(section));
  }

  // 2. Filtros de Categoria (Projetos e Certificados)
  function wireCategoryFilter({ buttonSelector, dataAttr, itemSelector, itemAttr, displayValue }) {
    const buttons = document.querySelectorAll(buttonSelector);
    const items = document.querySelectorAll(itemSelector);

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute(dataAttr);

        items.forEach(item => {
          const match = category === 'all' || item.getAttribute(itemAttr) === category;
          item.style.display = match ? displayValue : 'none';
          if (match && displayValue === 'flex') {
            item.style.opacity = '0';
            setTimeout(() => { item.style.opacity = '1'; }, 50);
          }
        });
      });
    });
  }

  wireCategoryFilter({
    buttonSelector: '.filter-btn',
    dataAttr: 'data-category',
    itemSelector: '.project-card-item',
    itemAttr: 'data-category',
    displayValue: 'flex',
  });

  wireCategoryFilter({
    buttonSelector: '.cert-filter-btn',
    dataAttr: 'data-cert-category',
    itemSelector: '.cert-category-group',
    itemAttr: 'data-cert-category',
    displayValue: 'block',
  });
});
