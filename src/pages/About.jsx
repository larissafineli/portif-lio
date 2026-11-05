import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import Icon, { asset } from '../components/Icon.jsx';
import TechList from '../components/TechList.jsx';
import projetos from '../data/projetos.json';

const bio = [
  ['aboutFormation', 'aboutFormationText'],
  ['aboutArea', 'aboutAreaText'],
  ['aboutInterests', 'aboutInterestsText'],
  ['aboutGoals', 'aboutGoalsText']
];

export default function About() {
  const { t, perfil, lang } = useLanguage();
  const [first, ...rest] = perfil.nome.split(' ');
  const destaque = projetos[projetos.length - 1];

  return (
    <>
      <section className="home-intro" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="about-marker">
            <img className="section-3d section-3d--about" src={asset('3d/about-computer.webp')} width="360" height="360" alt="" aria-hidden="true" />
            <p className="eyebrow">{t.heroKicker}</p>
          </div>
          <h1 id="home-title">{first} <span>{rest.join(' ')}</span></h1>
          <p className="intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <Link className="button" to="/projetos"><span>{t.viewProjects}</span><Icon name="arrow" /></Link>
            <Link className="text-link" to="/contato"><span>{t.talk}</span><Icon name="arrow" /></Link>
          </div>
          <p className="location"><Icon name="pin" /><span>{t.location}</span></p>
        </div>
        <article className="featured-project" aria-labelledby="featured-title">
          <Link className="featured-visual" to="/projetos" aria-label={`${t.featuredLink}: ${destaque.nome}`}>
            <img src={asset(destaque.imagem)} alt={destaque[lang].alt} width="1200" height="640" loading="lazy" />
            <span className="visual-arrow"><Icon name="arrow" /></span>
          </Link>
          <div className="featured-caption">
            <p className="eyebrow">{t.featuredLabel}</p>
            <h2 id="featured-title">{destaque.nome}</h2>
            <Link className="text-link" to="/projetos"><span>{t.featuredLink}</span><Icon name="arrow" /></Link>
          </div>
        </article>
      </section>

      <section className="bio-section" aria-label={t.aboutTitleDocument}>
        <dl className="bio-grid">
          {bio.map(([title, text]) => (
            <div className="bio-item" key={title}>
              <dt>{t[title]}</dt>
              <dd>{t[text]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="stack-section" aria-labelledby="stack-title">
        <div className="stack-heading">
          <h2 className="section-heading" id="stack-title">{t.stackTitle}</h2>
          <img className="section-3d section-3d--stack" src={asset('3d/stack-cube.webp')} width="360" height="360" alt="" aria-hidden="true" />
        </div>
        <div className="stack-groups">
          {perfil.stackGrupos.map((group) => (
            <section className="stack-group" key={group.id} aria-labelledby={`stack-${group.id}`}>
              <h3 id={`stack-${group.id}`}>{group.label[lang]}</h3>
              <TechList items={group.itens} />
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
