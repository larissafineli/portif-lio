// Site estático: o conteúdo vem dos JSONs, sem backend ou credenciais.
const root = new URL('../', import.meta.url);
const page = document.body.dataset.page;
const languages = new Set(['pt', 'en']);
const titleKeys = {
  about: 'aboutTitleDocument',
  projects: 'projectsTitleDocument',
  experience: 'experienceTitleDocument',
  contact: 'contactTitleDocument'
};
const techIcons = {
  HTML5: 'html5',
  CSS3: 'css3',
  JavaScript: 'javascript',
  Java: 'java',
  Python: 'python',
  'Spring Boot': 'spring-boot',
  Git: 'git',
  GitHub: 'github'
};

let language = readLanguage();
let profile;
let experiences;
let projects = null;
let contentError = false;

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS(svg.namespaceURI, 'use');
  svg.classList.add('icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  use.setAttribute('href', new URL(`assets/icons.svg#i-${name}`, root).href);
  svg.append(use);
  return svg;
}

function readLanguage() {
  const query = new URLSearchParams(location.search).get('lang');
  if (languages.has(query)) return query;
  try {
    const saved = localStorage.getItem('portfolio-language');
    return languages.has(saved) ? saved : 'pt';
  } catch {
    return 'pt';
  }
}

async function loadJSON(file) {
  const response = await fetch(new URL(`data/${file}`, root));
  if (!response.ok) throw new Error(`Falha ao carregar ${file}: ${response.status}`);
  return response.json();
}

function renderTechnologies(items) {
  const list = node('ul', 'tech-list');
  items.forEach(label => {
    const item = node('li', 'tech');
    const asset = techIcons[label];
    if (asset) {
      const image = node('img', 'tech-icon');
      image.src = new URL(`assets/tech/${asset}.svg`, root).href;
      image.alt = '';
      image.width = 26;
      image.height = 26;
      const mark = node('span', `tech-mark tech-mark--${asset}`);
      mark.append(image);
      item.append(mark);
    }
    item.append(node('span', '', label));
    list.append(item);
  });
  return list;
}

function renderStack() {
  const target = document.querySelector('#stack-groups');
  if (!target) return;
  const groups = profile.stackGrupos.map(group => {
    const section = node('section', 'stack-group');
    const heading = node('h3', '', group.label[language]);
    heading.id = `stack-${group.id}`;
    section.setAttribute('aria-labelledby', heading.id);
    section.append(heading, renderTechnologies(group.itens));
    return section;
  });
  target.replaceChildren(...groups);
}

function renderTimeline() {
  const target = document.querySelector('#timeline');
  if (!target || !experiences) return;
  if (!experiences.experiencias.length) {
    target.replaceChildren(node('p', 'content-status', profile[language].noExperiences));
    return;
  }
  const rows = experiences.experiencias.map(item => {
    const detail = item[language];
    const isEducation = item.tipo === 'formacao';
    const row = node('article', 'timeline-row');
    const mark = node('span', 'timeline-mark');
    mark.append(icon(isEducation ? 'cap' : 'code'));
    const institution = detail.instituicao || item.instituicao;
    const organization = item.local ? `${institution} · ${item.local}` : institution;
    row.append(
      mark,
      node('h2', '', detail.cargo),
      node('p', 'organization', organization),
      node('p', 'kind', profile[language][isEducation ? 'kindFormacao' : 'kindProjeto']),
      node('span', 'period', detail.periodo || item.periodo)
    );
    return row;
  });
  target.replaceChildren(...rows);
}

function renderProject() {
  if ((page !== 'projects' && page !== 'about') || !projects) return;
  const project = projects[0];
  if (!project) {
    const card = document.querySelector('#project-card') || document.querySelector('.featured-project');
    if (card) {
      const heading = node('h2', 'section-heading', profile[language].noProjects);
      heading.id = page === 'projects' ? 'project-title' : 'featured-title';
      card.replaceChildren(heading);
    }
    return;
  }
  const title = document.querySelector('#project-title') || document.querySelector('#featured-title');
  if (title) title.textContent = project.nome;
  if (page !== 'projects') return;

  const detail = project[language];
  document.querySelector('#project-kind').textContent = detail.tipo;
  document.querySelector('#project-description').textContent = `${detail.descricao} ${detail.contribuicao}`;
  document.querySelector('#project-tags').replaceChildren(renderTechnologies(project.tecnologias));
  ['#project-media', '#project-link'].forEach(selector => {
    document.querySelector(selector).href = project.repositorio;
  });
  const date = document.querySelector('#project-date');
  const publishedAt = new Date(`${project.publicadoEm}T12:00:00Z`);
  if (!Number.isNaN(publishedAt.getTime())) {
    const formatted = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short', year: 'numeric', timeZone: 'UTC'
    }).format(publishedAt);
    date.dateTime = project.publicadoEm;
    date.textContent = `${profile[language].published}: ${formatted}`;
  } else {
    date.hidden = true;
  }
}

function renderContacts() {
  const channels = {
    email: { href: `mailto:${profile.email}`, value: profile.email },
    linkedin: { href: profile.linkedin, value: profile.nome },
    github: { href: profile.github, value: `@${new URL(profile.github).pathname.split('/').filter(Boolean).pop()}` }
  };
  document.querySelectorAll('[data-contact]').forEach(link => {
    const channel = channels[link.dataset.contact];
    link.href = channel.href;
    link.querySelector('.contact-value').textContent = channel.value;
  });
}

function renderLanguage() {
  const text = profile[language];
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = `${text[titleKeys[page]]} · ${profile.nome}`;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = text[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const value = text[element.dataset.i18nAria];
    if (value !== undefined) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  document.querySelector('.site-nav').setAttribute('aria-label', language === 'pt' ? 'Principal' : 'Main navigation');
  document.querySelectorAll('[data-internal]').forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.searchParams.set('lang', language);
    link.href = url.href;
  });
  renderStack();
  renderTimeline();
  renderProject();
  renderContacts();
  if (contentError) document.querySelector('#content-status').textContent = text.loadError;
}

function changeLanguage(nextLanguage) {
  if (!languages.has(nextLanguage)) return;
  language = nextLanguage;
  try { localStorage.setItem('portfolio-language', language); }
  catch { /* A troca também funciona quando o armazenamento está bloqueado. */ }
  const url = new URL(location.href);
  url.searchParams.set('lang', language);
  history.replaceState(null, '', url);
  renderLanguage();
}

function showError(error) {
  contentError = true;
  console.error(error);
  const status = document.querySelector('#content-status');
  if (!status) return;
  status.hidden = false;
  status.classList.add('is-error');
  status.textContent = profile?.[language]?.loadError
    || (language === 'en' ? 'The content could not be loaded. Refresh this page.' : 'Não foi possível carregar os dados. Atualize a página.');
}

async function init() {
  document.querySelector('#content-status').hidden = false;
  profile = await loadJSON('perfil.json');
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => changeLanguage(button.dataset.language));
  });
  renderLanguage();
  if (page === 'projects' || page === 'about') projects = await loadJSON('projetos.json');
  if (page === 'experience') experiences = await loadJSON('experiencias.json');
  renderLanguage();
  document.querySelector('#content-status').hidden = true;
}

init().catch(showError);
