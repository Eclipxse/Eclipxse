(function () {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const lang = browserLang.startsWith('fr') ? 'fr' : 'en';
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  window.__I18N_LANG = lang;

  window.getCharHTML = function (ch) {
    if (ch === ' ') return '&nbsp;';
    if (ch === '🡲' || ch === '🡺') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></svg>';
    if (ch === '🡼') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-135 42 42.5)"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></g></svg>';
    if (ch === '🞣') return '<svg style="width: 0.9em; height: 0.9em; vertical-align: -0.1em; transform: translateY(-0.1em);" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"/></svg>';
    return ch;
  };

  if (lang === 'fr') {
    window.__t = function (key) { return null; };
    return;
  }

  const T = {
    'meta.description': 'Eclipxse designs and ships full-stack platforms, Discord systems, native apps, developer tools, game prototypes, and reverse-engineering studies.',

    'index.title': 'Eclipxse | Full-stack Developer & Toolmaker',
    'index.description': 'Eclipxse designs and ships full-stack platforms, Discord systems, native apps, developer tools, game prototypes, and reverse-engineering studies.',
    'index.h1': 'Eclipxse — full-stack developer and toolmaker building platforms, Discord systems, native apps, game prototypes and reverse-engineering studies.',
    'index.hero.tagline': 'Designing useful systems, <span class="other-accent">then shipping them</span>,<br>with precise interaction and distinct visual direction.',
    'index.about.text': 'I design and ship <span class="other-accent">web experiences</span>, tools, apps and small games, combining reliable engineering with <span class="other-accent">distinct interaction</span>.',
    'index.about.sub': 'I work across TypeScript, Python, Rust, C and Godot—from Discord infrastructure and encrypted file transfer to Debian customization and runtime research.',
    'index.cg.phrase': 'Every project is a chance to solve a <span class="other-accent">real system</span>, sharpen the interaction and <span class="other-accent">ship something useful</span>.',
    'index.skills.subtitle': 'Skills',
    'index.skills.text': 'Full-stack developer and toolmaker working across TypeScript, Python, Rust, C, Godot and reverse-engineering workflows.',
    'index.skills.frontend': 'Frontend',
    'index.skills.animation': 'Animation & 3D',
    'index.skills.backend': 'Backend',
    'index.skills.database': 'Databases',
    'index.skills.devops': 'DevOps & Tools',
    'index.skills.security': 'Systems & Security',
    'index.skills.design': 'Design',
    'index.contact.title': 'Contact',
    'index.contact.dispo1': 'Available for <span class="other-accent">freelance builds</span>, tools, web apps and interactive systems that need careful engineering.',
    'index.contact.dispo2': 'Open to <span class="other-accent">collaborations worldwide</span>, from polished websites to scripts, apps and game systems.',
    'index.proj.label': 'Preview',
    'index.detail.back': 'BACK',

    'info.title': 'About Eclipxse | Creative Developer & Full-Stack Builder',
    'info.description': 'About Eclipxse: a full-stack developer and toolmaker building web platforms, native apps, Discord systems, game prototypes, and technical research.',
    'info.eyebrow': 'About',
    'info.role': 'Full-stack developer and toolmaker across web, systems, native apps and games.',
    'info.desc': 'I take products from structure to interaction: designing the interface, building the system underneath and refining the details that make it feel <span class="other-accent">finished</span>.',
    'info.meta.based': 'Based in',
    'info.meta.status': 'Status',
    'info.meta.based.value': 'Worldwide',
    'info.meta.status.value': 'Building and available',
    'info.skills.frontend': 'Frontend',
    'info.skills.animation': 'Animation & 3D',
    'info.skills.backend': 'Backend',
    'info.skills.security': 'Systems & Tools',

    'contact.title': 'Contact Eclipxse | Web, Tools & App Builds',
    'contact.description': 'Contact Eclipxse for freelance web builds, scripts, tools, apps, game systems, reverse-engineering work, and collaboration requests.',
    'contact.panel.title': 'Let us talk about your project.',
    'contact.panel.copy': 'I respond to freelance builds, collaboration ideas, tooling requests and interactive web projects.',
    'contact.meta.base': 'Base',
    'contact.meta.status': 'Status',
    'contact.meta.delay': 'Avg. response',
    'contact.meta.base.value': 'Worldwide',
    'contact.meta.status.value': 'Freelance / Projects',
    'contact.meta.delay.value': '48h',
    'contact.eyebrow': 'Contact',
    'contact.role': 'Creative developer focused on interaction, tools, apps and thoughtful web experiences.',
    'contact.desc': 'If you have a build in mind, a tool that needs shaping, or an app idea worth testing, I would be glad to discuss it.',
    'contact.shortcuts': 'Shortcuts',
    'contact.brief': 'Brief format',
    'contact.maildirect': 'Direct mail',
    'contact.brief.product': 'Product goal',
    'contact.brief.deadline': 'Target deadline',
    'contact.brief.stack': 'Tech stack',
    'contact.brief.deliverables': 'Expected deliverables',

    'works.title': 'Work | Eclipxse Projects',
    'works.description': 'Eight Eclipxse case studies across full-stack platforms, Discord systems, native apps, Debian customization, game prototypes, and reverse-engineering research.',
    'works.h1': 'Selected Eclipxse projects with detailed case studies across web platforms, tools, Discord systems, native apps, games and technical research.',

    'common.aria.back': 'Back to home',
    'common.aria.menu': 'Main navigation',
    'common.aria.social': 'Social links',
    'common.aria.footer': 'Footer navigation',

    '404.title': '404 -- Eclipxse',
    '404.subtitle': 'This page got lost in the void.<br><span class="subtitle-dim">It does not exist, or no longer does.</span>',
    '404.ticker': '-- PAGE NOT FOUND -- SIGNAL LOST -- ERROR 0x404 -- THIS PAGE DOES NOT EXIST -- COORDINATES: NULL -- UNKNOWN DESTINATION -- ',
    '404.aria.back': 'Back to home',
  };

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    if (T[key] != null) el.innerHTML = T[key];
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
      const idx = pair.indexOf(':');
      if (idx < 0) return;
      const attr = pair.slice(0, idx).trim();
      const key = pair.slice(idx + 1).trim();
      if (T[key] != null) el.setAttribute(attr, T[key]);
    });
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey && T[titleKey]) document.title = T[titleKey];

  const descMeta = document.querySelector('meta[name="description"]');
  const descKey = document.documentElement.getAttribute('data-i18n-description') || 'meta.description';
  if (descMeta && T[descKey]) descMeta.setAttribute('content', T[descKey]);

  window.__t = function (key) { return T[key]; };
})();
