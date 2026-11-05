# 🌸 Portfólio · Larissa Fineli 👩‍💻

> [!NOTE]
> Portfólio profissional bilíngue (PT/EN) de Larissa Fineli, estudante de Engenharia de Software da PUC Minas. Desenvolvido em **React + Vite** para o **Laboratório 01 de Desenvolvimento e Integração de Aplicações Web (DIAW)**.

---

## 🚧 Status do Projeto

![Versão](https://img.shields.io/badge/Versão-v1.0.0-a83e63?style=for-the-badge) ![React](https://img.shields.io/badge/React-19-a83e63?style=for-the-badge&logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-8-a83e63?style=for-the-badge&logo=vite&logoColor=white) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-a83e63?style=for-the-badge&logo=github&logoColor=white)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Dependências](#-dependências)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como atualizar o conteúdo](#-como-atualizar-o-conteúdo)
- [Autora](#-autora)
- [Licença](#-licença)

---

## 🔗 Links Úteis
* 🌐 **Site publicado:** <https://larissafineli.github.io/portif-lio/>
* 💻 **Repositório:** <https://github.com/larissafineli/portif-lio>
* 🎨 **Wireframes (Figma):** _adicione aqui o link do arquivo no Figma_

---

## 📝 Sobre o Projeto
Site de portfólio para apresentar minha trajetória, habilidades, projetos e formas de contato de maneira moderna e acessível. Foi construído como atividade da disciplina DIAW, seguindo os requisitos do Product Owner: navegação por menu, quatro seções, design responsivo, hospedagem gratuita na nuvem e documentação completa.

---

## ✨ Funcionalidades Principais

- 🧭 **Menu de navegação** com quatro páginas (React Router) e cabeçalho/rodapé compartilhados.
- 🌐 **Sobre mim em português e inglês**: formação, área de atuação, interesses e objetivos. O idioma é trocado em PT/EN e lembrado entre visitas.
- 🕒 **Projetos em linha do tempo**, do mais antigo ao mais recente, com nome, descrição, tecnologias, link do GitHub e imagem do projeto em funcionamento.
- 💼 **Experiências** organizadas por instituição, atividade, período e descrição.
- ✉️ **Contato** com ícones clicáveis (e-mail, LinkedIn, GitHub e WhatsApp) e **formulário** com envio por e-mail via Web3Forms.
- ✅ **Validações** no formulário com React Hook Form: nome (mín. 2 caracteres), e-mail válido e mensagem (mín. 10 caracteres), com mensagens de erro acessíveis.
- 📱 **Design responsivo** e identidade visual em bege, branco e rosa.

### Projetos exibidos
| Projeto | Tecnologias | Repositório |
|---|---|---|
| Receitas de Minas (mar/2026) | HTML5, CSS3 | [receitas-de-minas](https://github.com/larissafineli/receitas-de-minas) |
| Votação A Fazenda 2026 (out/2026) | React, Vite, JavaScript, CSS3 | [VotacaoFazenda](https://github.com/larissafineli/VotacaoFazenda) |

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
* **Biblioteca:** React 19
* **Build tool:** Vite 8
* **Linguagem:** JavaScript (ES modules) + JSX
* **Roteamento:** React Router (`HashRouter`, compatível com GitHub Pages)
* **Formulário:** React Hook Form
* **Envio de e-mail:** Web3Forms (API chamada direto do front-end, sem back-end próprio)
* **Estilização:** CSS próprio com variáveis (tokens) e layouts responsivos
* **Tipografia e ícones:** Manrope (local, licença OFL), sprite SVG, logos de tecnologias e ícones 3D (3dicons, CC0)

### ☁️ Infraestrutura
* **Hospedagem:** GitHub Pages (gratuito), publicado por GitHub Actions
* **Versionamento:** Git e GitHub

> Não há back-end próprio: o conteúdo vem de arquivos JSON no projeto e o e-mail é enviado pelo Web3Forms.

---

## 📦 Dependências

| Pacote | Versão | Uso |
|---|---|---|
| `react` / `react-dom` | ^19.3 | Interface |
| `react-router-dom` | ^7.18 | Navegação entre páginas |
| `react-hook-form` | ^7.91 | Formulário e validações |
| `vite` (dev) | ^8.3 | Servidor de desenvolvimento e build |
| `@vitejs/plugin-react` (dev) | ^6.2 | Suporte a React no Vite |

---

## 🏗 Arquitetura

```text
JSON (src/data) ──► páginas React ──► LanguageContext (PT/EN) ──► UI
                                  └─► Contato ──► React Hook Form ──► Web3Forms ──► caixa de entrada
```

- **Dados separados da interface:** perfil, textos PT/EN, projetos e experiências ficam em `src/data/*.json`; as páginas apenas renderizam.
- **Idioma por contexto:** `LanguageContext` guarda PT/EN, atualiza o `lang` do documento e persiste a escolha em `localStorage`.
- **Rotas com `HashRouter`:** evita erro 404 ao recarregar páginas no GitHub Pages.
- **Base relativa (`base: './'`):** o mesmo build funciona em subpasta (GitHub Pages) ou na raiz (Vercel).

---

## 🚀 Instalação e Execução

### Pré-requisitos
* [Node.js](https://nodejs.org/) 20 ou superior
* npm

### Variáveis de ambiente (formulário de contato)
O envio de e-mail usa o [Web3Forms](https://web3forms.com/) (gratuito, sem back-end próprio):

1. No site do Web3Forms, informe o e-mail que vai receber as mensagens e clique em **Create Access Key**. A chave chega por e-mail.
2. Copie `.env.example` para `.env` e preencha:

```bash
VITE_WEB3FORMS_KEY=sua-chave-aqui
```

> A chave do Web3Forms é feita para ficar no front-end. Sem ela, o formulário valida os campos e avisa que o envio não está configurado.

### Como executar

```bash
git clone https://github.com/larissafineli/portif-lio.git
cd portif-lio
npm install
npm run dev
```

Abra o endereço exibido no terminal (por padrão <http://localhost:5173/>).

### Outros comandos

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a pasta dist/ localmente
```

---

## ☁️ Deploy

O deploy é automático no **GitHub Pages** a cada push na `main`, pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Configuração única no repositório:
1. **Settings → Pages → Source:** selecione **GitHub Actions**.
2. **Settings → Secrets and variables → Actions:** crie `VITE_WEB3FORMS_KEY`.
3. Faça um push na `main` (ou rode o workflow manualmente em **Actions**).

Endereço: <https://larissafineli.github.io/portif-lio/>

---

## 📁 Estrutura de Pastas

```text
portif-lio/
├── .github/workflows/deploy.yml   # Build e deploy no GitHub Pages
├── public/
│   └── assets/
│       ├── 3d/                    # Ícones 3D (CC0)
│       ├── fonts/                 # Manrope (OFL)
│       ├── projetos/              # Imagens dos projetos em funcionamento
│       ├── tech/                  # Logos das tecnologias
│       ├── icons.svg              # Sprite de ícones
│       └── favicon.svg
├── src/
│   ├── components/                # Layout, Icon, TechList
│   ├── context/LanguageContext.jsx
│   ├── data/                      # perfil.json, projetos.json, experiencias.json
│   ├── pages/                     # About, Projects, Experience, Contact
│   ├── styles/style.css
│   ├── App.jsx                    # Rotas
│   └── main.jsx                   # Entrada da aplicação
├── .env.example                   # Modelo das variável do Web3Forms
├── index.html
├── package.json
└── vite.config.js
```

---

## ✏️ Como atualizar o conteúdo

* **Novo projeto:** adicione um objeto em `src/data/projetos.json` (com `publicadoEm`, `tecnologias`, `repositorio`, `imagem` e textos `pt`/`en`) e coloque a imagem em `public/assets/projetos/`. A linha do tempo ordena sozinha pela data.
* **Nova experiência:** edite `src/data/experiencias.json`.
* **WhatsApp:** preencha `whatsapp` em `src/data/perfil.json` (por exemplo `"+55 31 99999-9999"`) e o ícone aparece em Contato.

---

## 👩‍💻 Autora

**Larissa Fineli**: estudante de Engenharia de Software na PUC Minas.
[GitHub](https://github.com/larissafineli) · [LinkedIn](https://www.linkedin.com/in/larissa-fineli-a8b413419/)

---

## 📄 Licença

Distribuído sob a licença do arquivo [LICENSE](LICENSE). Os ícones 3D (3dicons, CC0), a fonte Manrope (OFL) e os logos de tecnologia mantêm suas licenças em `public/assets`.
