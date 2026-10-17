# Portfólio · Larissa Fineli

Portfólio profissional desenvolvido para o **Laboratório 01 de Desenvolvimento e Integração de Aplicações Web**, do curso de Engenharia de Software da PUC Minas.

Site com quatro páginas em estilo bento grid, com identidade visual em bege e rosa, ícones SVG e conteúdo em português e inglês.

**[Acessar o portfólio](https://larissafineli.github.io/portif-lio/)** (endereço previsto para o GitHub Pages)

## Status do projeto

- Quatro páginas com menu de navegação: Sobre, Experiências, Projetos e Contato.
- Conteúdo em arquivos JSON, separado da apresentação.
- Formação acadêmica apresentada dentro de Experiências, em tabela cronológica.
- Ícones SVG locais para tecnologias, seções e contatos.
- Conferido visualmente em 1440, 980, 768, 390 e 360 px, sem rolagem horizontal e sem erro de JavaScript.
- **Pendente para a entrega:** publicar no GitHub Pages e completar os dados marcados como "a informar".
- O formulário de contato não foi implementado; o contato acontece por e-mail, LinkedIn e GitHub.

## Funcionalidades

| Página | Conteúdo |
|---|---|
| Sobre | Apresentação, stack com ícones das tecnologias e projeto em destaque. |
| Experiências | Formação acadêmica e projetos de disciplina em tabela cronológica. |
| Projetos | Receitas de Minas, com imagem, tecnologias e link do repositório. |
| Contato | E-mail, LinkedIn e GitHub, com ícones. |

A troca PT/EN traduz todos os textos da interface e dos dados. A seção ativa é destacada no menu durante a rolagem.

## Tecnologias e dependências

| Camada | Tecnologia | Papel |
|---|---|---|
| Estrutura | HTML5 | Página única e seções semânticas. |
| Apresentação | CSS3 | Grade modular responsiva e identidade visual. |
| Comportamento | JavaScript com módulos nativos | Leitura dos JSONs, idioma e destaque da seção ativa. |
| Conteúdo | JSON | Perfil, experiências e projetos. |
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
│   ├── experiencias.html
│   ├── projetos.html
│   └── contato.html
├── css/
│   └── style.css              # Grade modular, cores e responsividade
├── js/
│   └── app.js                 # Dados, idioma e troca de página
├── data/
│   ├── perfil.json            # Dados pessoais, textos PT/EN e stack
│   ├── experiencias.json      # Formação e projetos acadêmicos
│   └── projetos.json          # Projetos publicados
├── assets/
│   ├── favicon.svg
│   ├── tech/                  # Ícones SVG das tecnologias
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
| `data/perfil.json` | Nome, textos PT/EN, stack e dados de contato. |
| `data/experiencias.json` | Formação, cursos e projetos acadêmicos. |
| `data/projetos.json` | Projetos, datas, tecnologias, imagens e links. |
| `css/style.css` | Cores, grade e comportamento responsivo. |
| `js/app.js` | Renderização das seções e troca de idioma. |

## Deploy no GitHub Pages

1. Enviar os arquivos para a branch `main`.
2. Abrir **Settings → Pages** no repositório.
3. Em **Source**, escolher **Deploy from a branch**.
4. Selecionar a branch **main** e a pasta **/ (root)**.
5. Salvar e aguardar a publicação.
6. O site fica em <https://larissafineli.github.io/portif-lio/>.

Não existe etapa de build. O arquivo `.nojekyll` indica que o conteúdo deve ser servido como arquivos estáticos.

## Decisões de interface

- Grade modular com cards de larguras diferentes em cada página, em vez de seções longas.
- Ícones desenhados em SVG e embutidos no documento, sem dependência de CDN.
- Bege como base e rosa como cor de destaque, com contraste verificado nos textos.
- Formação dentro de Experiências, para não duplicar a mesma informação em dois blocos.
- Rótulos em caixa alta com marcador e tabela cronológica sem parágrafos longos, para leitura rápida.
- Texto mínimo de 12px e alvos de toque de pelo menos 44px.

## Autor

**Larissa Fineli** · Engenharia de Software, PUC Minas.

[GitHub](https://github.com/larissafineli) · [LinkedIn](https://www.linkedin.com/in/larissa-fineli-a8b413419/) · [E-mail](mailto:larissa4321ramos@gmail.com)

## Agradecimentos

Atividade orientada pelo Prof. João Paulo Carneiro Aramuni. Material acadêmico e pessoal.
