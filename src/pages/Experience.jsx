import { useLanguage } from '../context/LanguageContext.jsx';
import Icon, { asset } from '../components/Icon.jsx';
import experiencias from '../data/experiencias.json';

export default function Experience() {
  const { t, lang } = useLanguage();
  const itens = experiencias.experiencias;

  return (
    <>
      <header className="page-head page-head--illustrated">
        <div className="page-head-copy">
          <p className="eyebrow">{t.experienceEyebrow}</p>
          <h1>{t.experienceTitle}</h1>
          <p className="intro">{t.experienceIntro}</p>
        </div>
        <img className="section-3d" src={asset('3d/experience-notebook.webp')} width="360" height="360" alt="" aria-hidden="true" />
      </header>
      <div className="timeline">
        {itens.length === 0 && <p className="content-status">{t.noExperiences}</p>}
        {itens.map((item) => {
          const d = item[lang];
                    const kind = { formacao: t.kindFormacao, freelancer: t.kindFreelancer }[item.tipo] || t.kindProjeto;
          const icon = { formacao: 'cap', freelancer: 'briefcase' }[item.tipo] || 'code';
          const inst = d.instituicao || item.instituicao;
          return (
            <article className="timeline-row" key={`${item.instituicao}-${item.inicio}`}>
              <span className="timeline-mark"><Icon name={icon} /></span>
              <h2>{d.cargo}</h2>
              <p className="organization">{item.local ? `${inst} · ${item.local}` : inst}</p>
              <p className="kind">{kind}</p>
              {d.descricao && <p className="description">{d.descricao}</p>}
              <span className="period">{d.periodo || item.periodo}</span>
            </article>
          );
        })}
      </div>
    </>
  );
}
