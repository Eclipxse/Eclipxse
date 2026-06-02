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
    'meta.description': 'Creative developer building web experiences, tools, scripts, apps, and small games with a focus on detail and interaction.',

    'index.title': 'Eclipxse, Creative Developer',
    'index.h1': 'Eclipxse, Creative Developer, toolmaker, game scripter, reverse engineering learner, full-stack web developer, and Godot game creator.',
    'index.hero.tagline': 'Quiet builder, <span class="other-accent">bringing ideas to life</span>,<br>through motion, systems and detail.',
    'index.about.text': 'As a<span class="other-accent"> creative developer</span>, I build tailored web experiences, tools, apps and small games, blending clean engineering with <span class="other-accent">emotion</span>.',
    'index.about.sub': "I'm Eclipxse. I make scripts, reverse-engineer systems, build full-stack apps, write Python and C, and experiment with Godot games while keeping the experience quiet, precise and human.",
    'index.cg.phrase': 'Every project is a chance to <span class="other-accent">learn</span>, <span class="other-accent">experiment</span> and keep improving.',
    'index.skills.subtitle': 'Skills',
    'index.skills.text': 'Full-stack developer and toolmaker, comfortable with game scripting, reverse engineering, Python, app development, C, and modern web projects.',
    'index.skills.frontend': 'Frontend',
    'index.skills.animation': 'Animation & 3D',
    'index.skills.backend': 'Backend',
    'index.skills.database': 'Databases',
    'index.skills.devops': 'DevOps & Tools',
    'index.skills.security': 'Systems & Security',
    'index.skills.design': 'Design',
    'index.contact.title': 'Contact',
    'index.contact.dispo1': 'Available for <span class="other-accent">freelance builds</span>, tools, web apps and experiments that need careful engineering.',
    'index.contact.dispo2': 'Open to <span class="other-accent">collaborations worldwide</span>, from polished websites to scripts, apps and game systems.',
    'index.proj.label': 'Preview',
    'index.detail.back': 'BACK',

    'info.title': 'Info, Eclipxse',
    'info.eyebrow': 'About',
    'info.role': 'Creative developer, toolmaker, game scripter, and full-stack builder.',
    'info.desc': 'I build web experiences, scripts, apps and small games with the same care: clean systems, useful interactions and a strong sense of <span class="other-accent">detail</span>.',
    'info.meta.based': 'Based in',
    'info.meta.status': 'Status',
    'info.meta.based.value': 'Worldwide',
    'info.meta.status.value': 'Building and available',
    'info.skills.frontend': 'Frontend',
    'info.skills.animation': 'Animation & 3D',
    'info.skills.backend': 'Backend',
    'info.skills.security': 'Systems & Tools',

    'contact.title': 'Contact, Eclipxse',
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

    'works.title': 'Work, Eclipxse',
    'works.h1': 'Projects, Eclipxse, Creative Developer. Explore selected builds across web development, tools, scripts, apps and games.',

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
  if (descMeta && T['meta.description']) descMeta.setAttribute('content', T['meta.description']);

  window.__t = function (key) { return T[key]; };
})();
