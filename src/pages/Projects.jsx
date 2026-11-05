import { useLanguage } from '../context/LanguageContext.jsx';
import Icon, { asset } from '../components/Icon.jsx';
import TechList from '../components/TechList.jsx';
import projetos from '../data/projetos.json';

export default function Projects() {
  const { t, lang } = useLanguage();
  // linha do tempo: do mais antigo ao mais recente
  const ordenados = [...projetos].sort((a, b) => a.publicadoEm.localeCompare(b.publicadoEm));
  const fmt = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

  return (
    <>
      <header className="page-head page-head--illustrated">
        <div className="page-head-copy">
          <p className="eyebrow">{t.projectsEyebrow}</p>
          <h1>{t.projectsTitle}</h1>
          <p className="intro">{t.projectsIntro}</p>
        </div>
        <img className="section-3d" src={asset('3d/projects-folder.webp')} width="360" height="360" alt="" aria-hidden="true" />
      </header>

      <ol className="project-timeline">
        {ordenados.map((p) => {
          const d = p[lang];
          const data = new Date(`${p.publicadoEm}T12:00:00Z`);
          return (
            <li className="project-item" key={p.id}>
              <span className="project-dot" aria-hidden="true" />
              <time className="project-date" dateTime={p.publicadoEm}>{t.published}: {fmt.format(data)}</time>
              <article className="project-layout" aria-labelledby={`p-${p.id}`}>
                <a className="project-visual" href={p.repositorio} target="_blank" rel="noopener noreferrer" aria-label={`${t.openRepo}: ${p.nome}`}>
                  <img src={asset(p.imagem)} alt={d.alt} width="1200" height="640" loading="lazy" />
                  <span className="visual-arrow"><Icon name="external" /></span>
                </a>
                <div className="project-content">
                  <p className="eyebrow">{d.tipo}</p>
                  <h2 id={`p-${p.id}`}>{p.nome}</h2>
                  <p className="project-description">{d.descricao} {d.contribuicao}</p>
                  <TechList items={p.tecnologias} />
                  <a className="text-link" href={p.repositorio} target="_blank" rel="noopener noreferrer">
                    <Icon name="github" /><span>{t.openRepo}</span><Icon name="external" />
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </>
  );
}
