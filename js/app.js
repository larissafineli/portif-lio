// Conteúdo do portfólio em JSON; sem backend e sem credenciais neste projeto.
const root = new URL('../', import.meta.url);
const page = document.body.dataset.page;
const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};
const icon = (name) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#t-${name}`);
  svg.append(use);
  return svg;
};
async function loadJSON(file) {
  const response = await fetch(new URL(`data/${file}`, root));
  if (!response.ok) throw new Error(`Falha ao carregar ${file}: ${response.status}`);
  return response.json();
}
function readLanguage() {
  const query = new URLSearchParams(location.search).get('lang');
  if (query === 'pt' || query === 'en') return query;
  try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; }
  catch { return 'pt'; }
}
let language = readLanguage();
let profile, experiences, projects = [];
const locale = () => language === 'pt' ? 'pt-BR' : 'en-US';
const monthYear = (date) => new Intl.DateTimeFormat(locale(), {
  month: 'short', year: 'numeric', timeZone: 'UTC'
}).format(new Date(`${date.slice(0, 7)}-01T12:00:00Z`));
const TECH_ICONS = {
  'HTML5':'html5','CSS3':'css3','HTML / CSS':'html5','JavaScript':'javascript',
  'Java':'java','Git & GitHub':'git','Git':'git','GitHub':'github'
};

function techChip(label) {
  const chip = node('span', 'tech');
  const iconName = TECH_ICONS[label];
  if (iconName) chip.append(icon(iconName));
  chip.append(node('span', '', label));
  return chip;
}
function renderStack() {
  const target = document.querySelector('#stack-chips');
  if (!target) return;
  target.replaceChildren();
  profile.tecnologias.forEach(item => target.append(techChip(item)));
}
function renderTimeline() {
  const target = document.querySelector('#timeline');
  if (!target || !experiences) return;
  target.replaceChildren();
  experiences.experiencias.forEach(item => {
    const isEducation = item.tipo === 'formacao';
    const row = node('div', isEducation ? 'timeline-row is-education' : 'timeline-row');
    const when = node('span', 'when', item.periodo);
    const kind = node('span', 'kind', isEducation
      ? profile[language].kindFormacao : profile[language].kindProjeto);
    const heading = node('h3', '', item.instituicao || item[language].cargo);
    const org = node('span', 'org', isEducation
      ? `${item[language].cargo}${item.local ? ` · ${item.local}` : ''}`
      : item.instituicao);
    if (isEducation) {
      const mark = node('span', 'row-icon');
      mark.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-cap"></use></svg>';
      row.append(mark);
    }
    row.append(when, heading, org, kind);
    target.append(row);
  });
}
function renderProject() {
  const project = projects[0];
  if (!project) return;
  const detail = project[language];
  const image = document.querySelector('#project-image') || document.querySelector('#featured-image');
  if (image) {
    image.src = new URL(project.imagem, root).href;
    image.alt = detail.alt;
  }
  const media = document.querySelector('#project-media');
  if (media) media.href = project.repositorio;
  const title = document.querySelector('#project-title') || document.querySelector('#featured-title');
  if (title) title.textContent = project.nome;
  const description = document.querySelector('#project-description') || document.querySelector('#featured-description');
  if (description) description.textContent = `${detail.descricao} ${detail.contribuicao}`;
  const kind = document.querySelector('#project-kind');
  if (kind) kind.textContent = detail.tipo;
  const tags = document.querySelector('#project-tags');
  if (tags) {
    tags.replaceChildren();
    project.tecnologias.forEach(item => tags.append(techChip(item)));
  }
  const link = document.querySelector('#project-link');
  if (link) link.href = project.repositorio;
  const date = document.querySelector('#project-date');
  if (date) {
    date.dateTime = project.publicadoEm;
    date.textContent = `${profile[language].published}: ${monthYear(project.publicadoEm)}`;
  }
}
function renderLanguage() {
  const text = profile[language];
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const translated = text[element.dataset.i18n];
    if (translated !== undefined) element.textContent = translated;
  });
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  const titleKey = { about: 'aboutTitleDocument', projects: 'projectsTitleDocument',
    experience: 'experienceTitleDocument', contact: 'contactTitleDocument' }[page];
  if (titleKey && text[titleKey]) document.title = `${text[titleKey]} · ${profile.nome}`;
  document.querySelectorAll('a[data-internal]').forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.searchParams.set('lang', language);
    link.href = url.href;
  });
  renderStack();
  renderTimeline();
  renderProject();
}
function showError(error) {
  console.error(error);
  const message = document.querySelector('#content-status');
  if (message) {
    message.hidden = false;
    message.textContent = (profile && profile[language].loadError)
      || 'Não foi possível carregar o conteúdo. Atualize a página.';
  }
}
async function init() {
  profile = await loadJSON('perfil.json');
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      language = button.dataset.language;
      try { localStorage.setItem('portfolio-language', language); } catch { /* O idioma funciona sem armazenamento. */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
      renderLanguage();
    });
  });
  if (page === 'projects' || page === 'about') projects = await loadJSON('projetos.json');
  if (page === 'experience') experiences = await loadJSON('experiencias.json');
  renderLanguage();
  const status = document.querySelector('#content-status');
  if (status) status.hidden = true;
}
init().catch(showError);
