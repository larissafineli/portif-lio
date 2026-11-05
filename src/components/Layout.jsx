import { useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Layout() {
  const { lang, setLang, t, perfil } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const links = [
    ['/', t.navAbout, true],
    ['/projetos', t.navProjects],
    ['/experiencias', t.navExperience],
    ['/contato', t.navContact]
  ];

  return (
    <>
      <a
        className="skip"
        href="#conteudo"
        onClick={(e) => { e.preventDefault(); document.getElementById('conteudo')?.focus(); }}
      >
        {t.skip}
      </a>
      <div className="shell">
        <header className="topbar">
          <Link className="brand" to="/">{perfil.nome}</Link>
          <nav className="site-nav" aria-label={t.nav}>
            {links.map(([to, label, end]) => (
              <NavLink key={to} to={to} end={end}>{label}</NavLink>
            ))}
          </nav>
          <div className="language-switch" role="group" aria-label={`${t.langLabel} / Language`}>
            <button type="button" lang="pt-BR" aria-label="Português" aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>PT</button>
            <button type="button" lang="en" aria-label="English" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
        </header>
        <main id="conteudo" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="footer">
          <span>{t.footerLeft}</span>
          <span>{t.footerRight}</span>
        </footer>
      </div>
    </>
  );
}
