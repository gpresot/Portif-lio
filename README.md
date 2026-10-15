# Portfólio · Guilherme Presot

Site de portfólio pessoal, em página única, para apresentar minha formação, meus projetos e meus meios de contato a recrutadores e professores. É bilíngue (português e inglês) e tem tema claro e escuro.

🔗 **Site:** _adicione aqui o link do site publicado_

## Sumário

1. [Descrição do projeto](#1-descrição-do-projeto)
2. [Protótipos](#2-protótipos)
3. [Tecnologias previstas](#3-tecnologias-previstas)
4. [Estrutura inicial do site](#4-estrutura-inicial-do-site)
5. [Como rodar o projeto](#5-como-rodar-o-projeto)
6. [Deploy](#6-deploy)
7. [Contato](#7-contato)

---

## 1. Descrição do projeto

### Problema e objetivo

Estudantes e iniciantes costumam ter seus trabalhos espalhados entre repositórios, redes sociais e arquivos soltos, o que dificulta que alguém veja rapidamente o que sabem fazer. Este projeto reúne tudo em um só lugar: quem eu sou, o que estudei, o que já construí e como falar comigo.

O objetivo principal é conseguir uma **oportunidade de estágio em desenvolvimento de software**, mostrando meus projetos de forma organizada e fácil de navegar.

### Público-alvo

- Recrutadores e equipes de tecnologia que avaliam candidatos a estágio.
- Professores e colegas que queiram conhecer meus trabalhos.

### Funcionalidades

- **Navegação por busca:** o visitante digita na barra de pesquisa e escolhe a seção (Sobre, Cursos, Projetos ou Contato).
- **Dois idiomas (PT/EN):** troca de todo o conteúdo em um clique.
- **Tema claro e escuro:** alternância por botão.
- **Preferências lembradas:** idioma e tema ficam salvos no navegador.
- **Projetos com mídia:** imagens e vídeo de demonstração, com tecnologias e link para o GitHub.
- **Currículo em PDF** para consulta.
- **Formulário de contato** que envia a mensagem por e-mail, com captcha anti-robô e resposta automática para quem escreveu.
- **Relógio** no rodapé.

### Conteúdo de cada seção

| Seção | O que mostra |
| ----- | ------------ |
| Sobre | Foto, apresentação, história, tecnologias que uso, currículo e interesses pessoais |
| Cursos | Cards com instituição, nome do curso, carga horária e o que foi aprendido |
| Projetos | Cards com imagem ou vídeo, descrição, tecnologias, aprendizados e link do repositório |
| Contato | Links (e-mail, Discord, LinkedIn, GitHub e Instagram) e formulário de mensagem |

---

## 2. Protótipos

Wireframes de baixa fidelidade (preto, branco e cinza) que definem a organização das telas antes do desenvolvimento. Os retângulos cinzas são espaços reservados para imagens, e as barras cinzas representam textos. As anotações em amarelo explicam os elementos da tela.

### Tela inicial (desktop)

Título, subtítulo, barra de busca com a lista de seções, botões de tema e idioma no topo e rodapé com relógio.

![Protótipo da tela inicial](docs/prototipos/01-home.png)

### Sobre

![Protótipo da seção Sobre](docs/prototipos/02-sobre.png)

### Cursos

![Protótipo da seção Cursos](docs/prototipos/03-cursos.png)

### Projetos

![Protótipo da seção Projetos](docs/prototipos/04-projetos.png)

### Contato

![Protótipo da seção Contato](docs/prototipos/05-contato.png)

### Versão para celular

O layout é centralizado e de coluna única, o que facilita a adaptação para telas pequenas.

<p align="center">
  <img src="docs/prototipos/06-mobile.png" alt="Protótipo da tela inicial no celular" width="300">
</p>

---

## 3. Tecnologias previstas

| Tecnologia | Para que serve no projeto |
| ---------- | ------------------------- |
| **HTML5** | Estrutura semântica das páginas (gerada pelo React) |
| **CSS3** | Layout com Flexbox e Grid, responsividade e variáveis CSS para os temas claro e escuro |
| **JavaScript (ES6+)** | Lógica do site: busca, troca de idioma e de tema, relógio |
| **React 19** | Construção da interface em componentes (`Sobre`, `Cursos`, `Projetos`, `Contato`), estado e Context API para o idioma |
| **Vite** | Servidor de desenvolvimento rápido e geração do build de produção |
| **Oxlint** | Análise estática do código |
| **FormSubmit** | Envio do formulário de contato por e-mail, sem precisar de servidor próprio |
| **Git e GitHub** | Controle de versão e hospedagem do código |
| **GitHub Actions + GitHub Pages** | Build e publicação automáticos a cada push na branch `main` |
| **Google Fonts** | Fontes Caprasimo e Pixelify Sans |

O projeto não depende de bibliotecas de roteamento, de estilos ou de gerenciamento de estado: só React, CSS puro e os recursos nativos do navegador (`localStorage`).

---

## 4. Estrutura inicial do site

### Mapa do site

O site é uma página única. Nenhuma seção tem URL própria: a barra de busca decide qual seção aparece abaixo do cabeçalho.

![Mapa da estrutura do site](docs/prototipos/07-estrutura.png)

### Fluxo de navegação

```
Visitante abre o site
        │
        ▼
 Tela inicial (título + busca)
        │  digita ou clica na lista
        ▼
 Escolhe uma seção ──► Sobre | Cursos | Projetos | Contato
        │
        ├─► (a qualquer momento) alterna tema claro/escuro
        └─► (a qualquer momento) alterna idioma PT/EN
```

### Estrutura de pastas

```
Portif-lio/
├── .github/workflows/deploy.yml     # build e publicação no GitHub Pages
├── docs/prototipos/                 # imagens dos protótipos deste README
├── README.md
└── portfolio/                       # projeto React
    ├── index.html                   # página base (título e fontes)
    ├── vite.config.js
    ├── package.json
    ├── public/
    │   └── curriculo.pdf
    └── src/
        ├── main.jsx                 # ponto de entrada
        ├── App.jsx                  # cabeçalho, busca, tema, idioma e seções
        ├── index.css                # estilos e variáveis dos temas
        ├── assets/                  # fotos, capturas, vídeo e textura de fundo
        ├── contex/
        │   └── Preferencias.jsx     # contexto do idioma (hook useIdioma)
        ├── hooks/
        │   └── useRelogio.js        # relógio do rodapé
        ├── data/
        │   └── projetos.js          # dados de projetos
        └── paginas/
            ├── Sobre.jsx
            ├── Cursos.jsx
            ├── Projetos.jsx
            └── Contato.jsx
```

### Como a interface se organiza

| Componente | Responsabilidade |
| ---------- | ---------------- |
| `App` | Guarda os estados de seção aberta, busca, idioma e tema; desenha cabeçalho e rodapé |
| `Sobre` | Apresentação pessoal e link do currículo |
| `Cursos` | Lista de cursos a partir de um array de dados |
| `Projetos` | Cards de projetos com mídia e links |
| `Contato` | Links sociais e formulário |
| `IdiomaContext` / `useIdioma` | Entrega o idioma atual a qualquer componente |
| `useRelogio` | Atualiza a hora a cada segundo |

---

## 5. Como rodar o projeto

Pré-requisito: [Node.js](https://nodejs.org/) 22 ou superior.

```bash
git clone https://github.com/gpresot/Portif-lio.git
cd Portif-lio/portfolio
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

| Comando | O que faz |
| ------- | --------- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist` |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Roda o Oxlint |

### Formulário de contato

O envio usa o [FormSubmit](https://formsubmit.co/). No primeiro envio, é preciso clicar no link de ativação que chega no e-mail configurado (confira também o spam). Para usar outro e-mail, altere a constante `ENDPOINT` em `portfolio/src/paginas/Contato.jsx`.

---

## 6. Deploy

A cada push na `main`, o workflow `.github/workflows/deploy.yml` instala as dependências, gera o build e publica `portfolio/dist` no GitHub Pages.

Na primeira vez, vá em **Settings → Pages** do repositório e, em **Source**, escolha **GitHub Actions**. Se o site ficar em um endereço com subpasta (como `usuario.github.io/Portif-lio`), altere `base` em `portfolio/vite.config.js` para `"/Portif-lio/"`.

---

## 7. Contato

- 📧 gui.presot@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/guilhermepresot/)
- 💻 [GitHub](https://github.com/gpresot)
- 📷 [Instagram](https://www.instagram.com/guilherme_presot/)

---

Feito por Guilherme Presot · Estudante de Engenharia de Software na PUC Minas