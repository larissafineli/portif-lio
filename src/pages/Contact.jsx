import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext.jsx';
import Icon, { asset } from '../components/Icon.jsx';

const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

export default function Contact() {
  const { t, perfil } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | missing
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onTouched' });

  const github = `@${new URL(perfil.github).pathname.split('/').filter(Boolean).pop()}`;
  const phone = perfil.whatsapp.replace(/\D/g, '');
  const canais = [
    { icon: 'mail', label: t.contactEmail, value: perfil.email, href: `mailto:${perfil.email}`, ext: false },
    ...(phone ? [{ icon: 'whatsapp', label: t.contactWhatsapp, value: perfil.whatsapp, href: `https://wa.me/${phone}`, ext: true }] : []),
    { icon: 'linkedin', label: t.contactLinkedin, value: perfil.nome, href: perfil.linkedin, ext: true },
    { icon: 'github', label: t.contactGithub, value: github, href: perfil.github, ext: true }
  ];

  async function onSubmit(data) {
    if (!EMAILJS.service || !EMAILJS.template || !EMAILJS.key) {
      setStatus('missing');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        { from_name: data.nome, reply_to: data.email, message: data.mensagem, to_email: perfil.email },
        { publicKey: EMAILJS.key }
      );
      setStatus('success');
      reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const msg = { success: t.formSuccess, error: t.formError, missing: t.formNotConfigured }[status];

  return (
    <section className="contact-layout" aria-labelledby="contact-title">
      <header className="page-head contact-head">
        <div className="contact-copy">
          <h1 id="contact-title">{t.contactTitle}</h1>
          <p className="intro">{t.contactIntro}</p>
        </div>
        <img className="section-3d section-3d--contact" src={asset('3d/contact-mail.webp')} width="360" height="360" alt="" aria-hidden="true" />
      </header>

      <ul className="contact-list">
        {canais.map((c) => (
          <li key={c.label}>
            <a className="contact-link" href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <Icon name={c.icon} />
              <span><span className="contact-label">{c.label}</span><span className="contact-value">{c.value}</span></span>
              <Icon name={c.ext ? 'external' : 'arrow'} className="link-arrow" />
            </a>
          </li>
        ))}
      </ul>

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="form-title">
        <h2 id="form-title">{t.formTitle}</h2>

        <div className="field">
          <label htmlFor="nome">{t.formName}</label>
          <input
            id="nome" type="text" autoComplete="name" aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? 'nome-erro' : undefined}
            {...register('nome', { required: true, minLength: 2, setValueAs: (v) => v.trim() })}
          />
          {errors.nome && <p className="field-error" id="nome-erro" role="alert">{t.vName}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">{t.formEmail}</label>
          <input
            id="email" type="email" autoComplete="email" aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-erro' : undefined}
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            })}
          />
          {errors.email && (
            <p className="field-error" id="email-erro" role="alert">
              {errors.email.type === 'required' ? t.vEmailRequired : t.vEmailInvalid}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="mensagem">{t.formMessage}</label>
          <textarea
            id="mensagem" rows="6" aria-invalid={!!errors.mensagem}
            aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
            {...register('mensagem', { required: true, minLength: 10, setValueAs: (v) => v.trim() })}
          />
          {errors.mensagem && <p className="field-error" id="mensagem-erro" role="alert">{t.vMessage}</p>}
        </div>

        <div className="form-actions">
          <button className="button" type="submit" disabled={status === 'sending'}>
            <span>{status === 'sending' ? t.formSending : t.formSend}</span><Icon name="arrow" />
          </button>
          {msg && <p className={`form-status is-${status}`} role="status">{msg}</p>}
        </div>
      </form>
    </section>
  );
}
