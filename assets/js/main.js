(function () {
  'use strict';

  const STORAGE_KEY = 'gabrielalves-opsec-theme';
  const EMAIL = 'gabrielalves.opsec@gmail.com';

  const PROJECT_DETAILS = {
    pentest: {
      category: 'AppSec & Pentest',
      title: 'Segurança Web e APIs — Portfólio Educacional',
      repo: 'https://github.com/GabrielalvesOpsec/web-app-pentest-portfolio',
      summary:
        'Exercício autônomo de avaliação de segurança black-box em plataforma SaaS B2B de chatbots integrada ao WhatsApp, com todos os dados, domínios e identificadores 100% anonimizados.',
      methodology: [
        'OWASP Web Security Testing Guide (WSTG v4.2)',
        'OWASP API Security Top 10 (2023)',
        'Classificação de risco com CVSS v3.1 (média 8.9 nos achados críticos/altos)'
      ],
      findings: [
        'RLS Bypass em banco PostgreSQL/Supabase via chave pública com permissões destrutivas (CVSS 9.1).',
        'Webhook Injection sem validação de assinatura HMAC nos endpoints receptores (CVSS 9.1).',
        'XSS Reflected em atributo richText do painel de atendimento, encadeável para hijacking de sessão (CVSS 8.8).',
        'Enumeração de usuários no fluxo de recuperação de senha e componentes com CVEs conhecidas.'
      ],
      deliverables: [
        'Relatório técnico executivo e detalhado (REPORT.pdf)',
        '3 scripts PoC anonimizados em Bash (rls_bypass.sh, webhook_injection.sh, xss_cookie_stealer.sh)',
        'Plano de mitigação priorizado (ações imediatas e curto prazo)'
      ]
    },
    bandit: {
      category: 'Linux & Automação Bash',
      title: 'OverTheWire Bandit — Walkthrough Linux & Bash (Níveis 0–11)',
      repo: 'https://github.com/GabrielalvesOpsec/bandit-overthewire-portfolio',
      summary:
        'Documentação estruturada dos fundamentos de administração Linux, linha de comando POSIX, inspeção de arquivos e automação em Shell Script aplicada à cibersegurança.',
      methodology: [
        'Documentação técnica replicável por nível: conceito, lógica aplicada e comando executado',
        'Prática orientada a investigação em linha de comando (base essencial para triagem SOC e hardening)'
      ],
      findings: [
        'Manipulação segura de arquivos especiais, dotfiles, espaços e metacaracteres POSIX.',
        'Análise de assinaturas de arquivos (Magic Bytes com file) e extração de texto em binários (strings).',
        'Auditoria com find por tamanho, usuário e permissões + pipelines com grep, sort, uniq e redirecionamento de erros.',
        'Decodificação Base64 e automação de conexões SSH em porta não padrão via scripts/connect.sh.'
      ],
      deliverables: [
        'Walkthrough técnico completo em Markdown (docs/bandit-0-11.md)',
        'Script Bash interativo para conexão SSH automatizada (scripts/connect.sh)'
      ]
    },
    mgl: {
      category: 'Desenvolvimento Seguro',
      title: 'M.G.L Connect — Sistema Acadêmico em ASP.NET Core',
      repo: 'https://github.com/GabrielalvesOpsec/mgl-connect-portfolio',
      summary:
        'Aplicação web acadêmica de gestão logística construída em C# / ASP.NET Core (.NET 10) com controles de acesso por perfil, proteção de dados, APIs, auditoria e esteira de CI com detecção de segredos.',
      methodology: [
        'Arquitetura em camadas com ASP.NET Core MVC/Razor, EF Core, SignalR e Swagger/OpenAPI',
        'Práticas de desenvolvimento seguro, privacidade por design e validação automatizada'
      ],
      findings: [
        'Autenticação e segregação de perfis (RBAC): Administrador, Cliente/Intermediador e Motorista.',
        'Rastreamento público usando códigos de alta entropia com projeção mínima de dados via SignalR.',
        'Uso de ASP.NET Core DataProtection persistido e suporte multi-banco (SQLite, SQL Server e PostgreSQL).',
        'Dockerfile, docker-compose e GitHub Actions com testes .NET/JS e varredura Gitleaks.'
      ],
      deliverables: [
        'Código-fonte completo (.NET 10) + suíte de testes automatizados',
        'Documentação de arquitetura, segurança, isolamento e infraestrutura Docker'
      ]
    }
  };

  /* Theme Initialization & Toggle */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    if (iconSun && iconMoon) {
      iconSun.style.display = isLight ? 'none' : 'block';
      iconMoon.style.display = isLight ? 'block' : 'none';
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        'aria-label',
        isLight ? 'Ativar modo escuro' : 'Ativar modo claro'
      );
      themeBtn.setAttribute(
        'title',
        isLight ? 'Ativar modo escuro' : 'Ativar modo claro'
      );
    }
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  /* Mobile Menu Toggle */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function () {
      const open = navLinks.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Toast Helper */
  const toastEl = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 2800);
  }

  /* Copy Email Buttons */
  document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(EMAIL)
          .then(function () {
            showToast('E-mail copiado: ' + EMAIL);
          })
          .catch(function () {
            showToast('E-mail: ' + EMAIL);
          });
      } else {
        const temp = document.createElement('input');
        temp.value = EMAIL;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('E-mail copiado: ' + EMAIL);
      }
    });
  });

  /* Print / Save PDF Buttons */
  document.querySelectorAll('[data-print-cv]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.print();
    });
  });

  /* Skills Category Filter */
  const filterButtons = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('[data-skill-card]');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-skill-filter');
      filterButtons.forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      skillCards.forEach(function (card) {
        const cat = card.getAttribute('data-skill-card');
        const match = target === 'all' || cat === target;
        card.classList.toggle('is-dimmed', !match);
      });
    });
  });

  /* Project Technical Details Modal */
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseFooterBtn = document.getElementById('modalCloseFooterBtn');
  const modalCat = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalMethodology = document.getElementById('modalMethodology');
  const modalFindings = document.getElementById('modalFindings');
  const modalDeliverables = document.getElementById('modalDeliverables');
  const modalRepoLink = document.getElementById('modalRepoLink');
  let lastFocused = null;

  function renderList(el, items) {
    if (!el) return;
    el.innerHTML = '';
    items.forEach(function (text) {
      const li = document.createElement('li');
      li.textContent = text;
      el.appendChild(li);
    });
  }

  function openProjectModal(key) {
    const data = PROJECT_DETAILS[key];
    if (!data || !modalBackdrop) return;
    lastFocused = document.activeElement;
    modalCat.textContent = data.category;
    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;
    renderList(modalMethodology, data.methodology);
    renderList(modalFindings, data.findings);
    renderList(modalDeliverables, data.deliverables);
    modalRepoLink.href = data.repo;

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  document.querySelectorAll('[data-project-detail]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openProjectModal(btn.getAttribute('data-project-detail'));
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener('click', closeProjectModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  /* Active Navigation Section Highlight on Scroll */
  const navAnchorList = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const observedSections = navAnchorList
    .map(function (a) {
      return document.querySelector(a.getAttribute('href'));
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && observedSections.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navAnchorList.forEach(function (a) {
              a.classList.toggle('active', a.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    observedSections.forEach(function (sec) {
      observer.observe(sec);
    });
  }
})();
