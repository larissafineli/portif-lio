# Portfólio · Larissa Fineli

Portfólio profissional desenvolvido para o **Laboratório 01 de Desenvolvimento e Integração de Aplicações Web**, do curso de Engenharia de Software da PUC Minas.

O site apresenta minha trajetória, meus projetos publicados e meus canais de contato, com conteúdo em português e inglês. A identidade visual usa bege e rosa.

**[Acessar o portfólio](https://larissafineli.github.io/portif-lio/)** (endereço previsto para o GitHub Pages)

## Status do projeto

- Interface estática em HTML, CSS e JavaScript, com pastas separadas.
- Conteúdo de perfil, projetos e experiências em arquivos JSON.
- Um projeto apresentado: Receitas de Minas.
- Conferido visualmente no desktop e no celular; sem suíte de testes automatizados.
- **Etapas pendentes para a entrega:** publicar no GitHub Pages e completar os dados pessoais marcados como “a informar” (período da graduação e atividades complementares).
- O formulário de contato não foi implementado nesta versão; o contato acontece por e-mail institucional e GitHub.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias e dependências](#tecnologias-e-dependências)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Instalação e execução](#instalação-e-execução)
- [Deploy no GitHub Pages](#deploy-no-github-pages)
- [Autor](#autor)

## Sobre o projeto

O site reúne minha apresentação, o projeto Receitas de Minas e minha formação. Funciona como site estático em hospedagem gratuita, sem servidor de aplicação.

O conteúdo fica em arquivos JSON, então dá para atualizar textos e projetos sem mexer no layout.

## Funcionalidades

| Página | Conteúdo |
|---|---|
| Sobre mim | Apresentação, formação e tecnologias. |
| Projetos | Linha do tempo gerada a partir do JSON, com tecnologias, imagem e link do repositório. |
| Experiências | Formação acadêmica e atividades. |
| Contato | E-mail, LinkedIn e GitHub. |

A troca PT/EN traduz a interface e os dados.

## Tecnologias e dependências

| Camada | Tecnologia | Papel |
|---|---|---|
| Estrutura | HTML5 | Páginas e navegação. |
| Apresentação | CSS3 | Layout responsivo e identidade visual. |
| Comportamento | JavaScript com módulos nativos | Leitura dos JSONs, idioma e menu. |
| Conteúdo | JSON | Perfil, traduções e projetos. |
| Ícones | SVG local | Ícones e marca sem dependências externas. |
| Hospedagem | GitHub Pages | Publicação dos arquivos estáticos. |

**Bibliotecas de terceiros:** nenhuma. Não há `npm install`, compilação, banco de dados ou chave secreta.

**Para executar localmente:** navegador atualizado e Python 3 para servir os arquivos por HTTP.

## Estrutura de pastas

```text
portif-lio/
├── index.html                 # Ponto de entrada da hospedagem
├── html/
│   ├── sobre.html
│   ├── projetos.html
│   ├── experiencias.html
│   └── contato.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── entrada.js
├── data/
│   ├── perfil.json
│   ├── projetos.json
│   └── experiencias.json
├── assets/
│   ├── favicon.svg
│   └── projects/              # Imagem do projeto
├── .nojekyll
└── README.md
```

## Instalação e execução

```bash
git clone https://github.com/larissafineli/portif-lio.git
cd portif-lio
python3 -m http.server 8000
```

Acesse <http://localhost:8000/> e encerre com `Ctrl+C`.

Os arquivos JSON são carregados com `fetch`, por isso é preciso um servidor HTTP local. Abrir o arquivo com duplo clique (`file://`) não carrega os dados.

### Atualização do conteúdo

| Arquivo | O que editar |
|---|---|
| `data/perfil.json` | Dados do perfil, tecnologias e textos PT/EN. |
| `data/projetos.json` | Projetos, datas, tecnologias, imagens e links. |
| `data/experiencias.json` | Formação e atividades. |
| `css/style.css` | Cores, tamanhos e comportamento responsivo. |
| `html/*.html` | Estrutura de cada página. |
| `js/app.js` | Carregamento dos dados, idioma e interações. |

## Deploy no GitHub Pages

1. Enviar os arquivos para a branch `main`.
2. Abrir **Settings → Pages** no repositório.
3. Em **Source**, escolher **Deploy from a branch**.
4. Selecionar a branch **main** e a pasta **/ (root)**.
5. Salvar e aguardar a publicação.
6. O site fica em <https://larissafineli.github.io/portif-lio/>.

Não existe etapa de build. O arquivo `.nojekyll` indica que o conteúdo deve ser servido como arquivos estáticos.

## Autor

**Larissa Fineli** · Engenharia de Software, PUC Minas.

[GitHub](https://github.com/larissafineli) · [LinkedIn](https://www.linkedin.com/in/larissa-fineli-a8b413419/) · [E-mail](mailto:larissa4321ramos@gmail.com)

## Agradecimentos

Atividade orientada pelo Prof. João Paulo Carneiro Aramuni. Material acadêmico e pessoal.
