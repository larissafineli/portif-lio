# Portfólio · Larissa Fineli

Portfólio desenvolvido para o **Laboratório 01 de Desenvolvimento e Integração de Aplicações Web**, do curso de Engenharia de Software da PUC Minas.

Quatro páginas independentes, com navegação compartilhada, conteúdo em português e inglês e identidade em bege, branco e rosa.

**Endereço previsto:** <https://larissafineli.github.io/portif-lio/>. A publicação depende do merge da contribuição e da ativação do GitHub Pages pela proprietária do repositório.

## Páginas

| Página | Conteúdo |
|---|---|
| Sobre | Apresentação, projeto em destaque e stack agrupada por área. |
| Projetos | Receitas de Minas, com ícone de chef, descrição, tecnologias e repositório. |
| Experiências | Engenharia de Software na PUC Minas e prática nos projetos acadêmicos. |
| Contato | E-mail, LinkedIn e GitHub. Não há formulário ou envio pelo site. |

O idioma é escolhido nos botões PT/EN, preservado entre as páginas e registrado no parâmetro `lang` da URL. A página atual fica sublinhada no menu.

## Tecnologias

| Camada | Implementação |
|---|---|
| Estrutura | HTML5, em quatro documentos semânticos. |
| Estilo | CSS próprio, com tokens compartilhados e layouts responsivos. |
| Comportamento | JavaScript com módulos nativos e leitura dos JSONs. |
| Conteúdo | JSON para perfil, stack, projetos, experiências e traduções. |
| Tipografia | Manrope variável, hospedada localmente, com licença OFL. |
| Ícones | Sprite SVG, logos da stack na paleta e ilustrações 3D locais em WebP. |
| Hospedagem | Arquivos estáticos compatíveis com GitHub Pages. |

Não há Bootstrap, framework JavaScript, etapa de build, banco de dados ou chave secreta. Fontes e ícones não dependem de CDN.

A stack exibida no perfil inclui **HTML5, CSS3, JavaScript, Java, Python, Spring Boot, Git e GitHub**. Essa lista descreve os estudos da autora; não significa que todas essas tecnologias foram usadas neste site ou no Receitas de Minas. O projeto em destaque permanece identificado como HTML e CSS.

## Executar localmente

```bash
git clone https://github.com/larissafineli/portif-lio.git
cd portif-lio
python3 -m http.server 8000
```

Abra <http://localhost:8000/>. Encerre o servidor com `Ctrl+C`.

Os JSONs são carregados com `fetch`, então é necessário servir os arquivos por HTTP. Abrir o HTML com duplo clique (`file://`) não carrega os dados atualizados.

## Estrutura

```text
portif-lio/
├── index.html                 # Entrada e redirecionamento para Sobre
├── html/                      # Sobre, Projetos, Experiências e Contato
├── css/style.css              # Tokens, composição e responsividade
├── js/app.js                  # Renderização, idioma e leitura dos dados
├── data/
│   ├── perfil.json            # Identidade, contatos, stack e traduções
│   ├── experiencias.json      # Formação e prática acadêmica
│   └── projetos.json          # Projeto e tecnologias realmente utilizadas
├── assets/
│   ├── favicon.svg
│   ├── icons.svg              # Ícones de interface compartilhados
│   ├── fonts/                 # Manrope e licença OFL
│   ├── 3d/                    # Ilustrações 3D rosas e licença CC0
│   └── tech/                  # Ícones de tecnologia e créditos
├── .nojekyll
└── README.md
```

## Atualizar o conteúdo

- **Perfil, contatos e traduções:** `data/perfil.json`.
- **Tecnologias por área:** `stackGrupos` em `data/perfil.json`.
- **Experiências e formação:** `data/experiencias.json`, com textos PT/EN por item.
- **Projeto, contribuição e tecnologias:** `data/projetos.json`.
- **Cores, fontes e layout:** `css/style.css`.

Os documentos HTML têm conteúdo inicial para evitar uma tela vazia durante o carregamento. Ao alterar os dados, mantenha esse conteúdo inicial coerente. O JavaScript preenche a versão atualizada e permite alternar o idioma.

## Interface e acessibilidade

- Composição aberta, com divisórias em vez de cartões repetidos.
- Manrope para títulos e textos, sem mistura de famílias tipográficas.
- Escala única definida em `:root`: títulos de 48px (36px no celular), subtítulos de 24px, textos e ações de 16px e detalhes de 13px. Sem tamanhos individuais por card.
- Pesos compartilhados: 400 para leitura, 600 para interface e 700 para títulos.
- Todos os logos da stack no mesmo rosa, com fundos arredondados em rosa-claro. Nenhuma tecnologia recebe uma cor de destaque isolada.
- Ícones 3D rosas maiores: computador no Sobre, cubo abaixo de Stack, pasta em Projetos, caderno em Experiências e envelope em Contato. São imagens locais leves, sem biblioteca 3D em execução.
- Contato com título e introdução curta aos canais, sem mensagem de disponibilidade ou convite para estágio. Canais distribuídos em três colunas no desktop e empilhados no celular.
- Rosa nas ações, na navegação ativa e no destaque do projeto.
- Foco visível, link para pular ao conteúdo e botões de idioma com estado acessível.
- Tecnologias agrupadas por proximidade, sem aparência de botões clicáveis.
- Rótulos e nomes acessíveis em links que usam somente ícones.
- Textos a partir de 13px, rodapé com o mesmo corpo de leitura (16px) e alvos principais de pelo menos 44px.
- Animações de interação desativadas quando o navegador solicita movimento reduzido.

A revisão local incluiu as quatro rotas em 1440, 980, 800, 768, 760, 520, 390 e 360px, troca real de idioma e navegação. Não foi adicionada suíte de testes ou dependência de desenvolvimento ao projeto.

## GitHub Pages

Após mesclar a contribuição na `main`, a proprietária deve abrir **Settings → Pages**, escolher **Deploy from a branch**, selecionar **main** e **/ (root)** e salvar.

Não há etapa de build. `.nojekyll` mantém a publicação como arquivos estáticos.

## Autora

**Larissa Fineli** · Engenharia de Software, PUC Minas.

[GitHub](https://github.com/larissafineli) · [LinkedIn](https://www.linkedin.com/in/larissa-fineli-a8b413419/) · [E-mail](mailto:larissa4321ramos@gmail.com)

Atividade orientada pelo Prof. João Paulo Carneiro Aramuni.
