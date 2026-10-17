// Conteúdo do portfólio em JSON; sem backend e sem credenciais neste projeto.
const root = new URL('../', import.meta.url);
const page = 'home';
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
  use.setAttribute('href', `#icon-${name}`);
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

function renderExperience() {
  const target = document.querySelector('#exp-list');
  if (!target || !experiences) return;
  target.replaceChildren();
  experiences.experiencias.forEach(item => {
    const row = node('div', 'exp-row');
    const heading = node('h3', '', item[language].cargo);
    const org = node('span', 'org', item.instituicao);
    const period = node('time', '', item.periodo);
    row.append(heading, period, org);
    if (item[language].detalhe) row.append(node('p', 'detail', item[language].detalhe));
    target.append(row);
  });
}
function renderStack() {
  const target = document.querySelector('#stack-chips');
  if (!target) return;
  target.replaceChildren();
  profile.tecnologias.forEach(item => target.append(node('span', 'chip', item)));
}
function renderProject() {
  const project = projects[0];
  if (!project) return;
  const detail = project[language];
  const image = document.querySelector('#project-image');
  image.src = new URL(project.imagem, root).href;
  image.alt = detail.alt;
  const media = document.querySelector('#project-media');
  media.href = project.repositorio;
  document.querySelector('#project-title').textContent = project.nome;
  document.querySelector('#project-description').textContent = `${detail.descricao} ${detail.contribuicao}`;
  const tags = document.querySelector('#project-tags');
  tags.replaceChildren();
  project.tecnologias.forEach(item => tags.append(node('span', 'chip', item)));
  const link = document.querySelector('#project-link');
  link.href = project.repositorio;
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
  document.title = `${profile.nome} · Portfólio`;
  renderExperience();
  renderStack();
  renderProject();
}
function markCurrentSection() {
  const links = [...document.querySelectorAll('.navpill a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.removeAttribute('aria-current'));
      const active = links.find(link => link.getAttribute('href') === `#${entry.target.id}`);
      if (active) active.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(section => observer.observe(section));
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
  [profile, experiences, projects] = await Promise.all([
    loadJSON('perfil.json'), loadJSON('experiencias.json'), loadJSON('projetos.json')
  ]);
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
  renderLanguage();
  markCurrentSection();
  const status = document.querySelector('#content-status');
  if (status) status.hidden = true;
}
init().catch(showError);
