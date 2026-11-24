import cafeteria from "../assets/cofesite.webp";
import frangonauta from "../assets/frangonalta.mp4";
import clima from "../assets/climaapi.png";
import structa from "../assets/structa.png";
import carros from "../assets/carros.webp";
import { useIdioma } from "../contex/Preferencias";

const ui = {
  pt: {
    tecnologias: "Tecnologias:",
    aprendizados: "Aprendizados:",
    demo: "Ver projeto",
    codigo: "GitHub",
    destaque: "Destaque",
    video: "Seu navegador não suporta a reprodução deste vídeo.",
  },
  en: {
    tecnologias: "Technologies:",
    aprendizados: "What I learned:",
    demo: "Live demo",
    codigo: "GitHub",
    destaque: "Featured",
    video: "Your browser does not support video playback.",
  },
};

/*
 * Para incluir um projeto, adicione um objeto aqui.
 * - midia: { tipo: "imagem" | "video", src } (opcional; sem ela o card mostra o emoji)
 * - destaque: true coloca o selo "Destaque"
 * - links: { demo, codigo } (qualquer um dos dois pode faltar)
 */
const projetos = [
  {
    id: "carros",
    emoji: "🚗",
    destaque: true,
    midia: { tipo: "imagem", src: carros },
    tecnologias: [
      "Java",
      "Spring Boot",
      "Spring Security (JWT)",
      "JPA",
      "Maven",
      "React",
      "Vite",
      "PostgreSQL (Supabase)",
    ],
    links: {
      codigo: "https://github.com/gpresot/Sistema-de-Aluguel-de-Carros",
    },
    pt: {
      titulo: "Sistema de Aluguel de Carros — 2026.2",
      imagem: "Catálogo de veículos do sistema de aluguel de carros",
      descricao:
        "Sistema web para gestão de aluguéis de automóveis clássicos, feito na disciplina de Desenvolvimento e Integração de Aplicações Web. O cliente cria e acompanha pedidos, a empresa aceita ou recusa, e o banco faz a análise financeira e concede o contrato de crédito.",
      aprendizados:
        "API REST em camadas (Controller, Service, Repository e DTOs), autenticação com JWT, permissões por perfil (cliente, empresa e banco), modelagem UML e recuperação de senha por e-mail.",
    },
    en: {
      titulo: "Car Rental System — 2026.2",
      imagem: "Vehicle catalog of the car rental system",
      descricao:
        "A web system for managing classic car rentals, built for a web development course. Customers create and track requests, the company accepts or rejects them, and the bank runs the financial analysis and grants the credit contract.",
      aprendizados:
        "Layered REST API (Controller, Service, Repository and DTOs), JWT authentication, role-based permissions (customer, company and bank), UML modeling and password recovery by email.",
    },
  },
  {
    id: "structa",
    emoji: "🏫",
    destaque: true,
    midia: { tipo: "imagem", src: structa },
    tecnologias: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "JSON Server",
      "Bootstrap",
      "jQuery",
    ],
    links: {
      demo: "https://pmg-es-2026-1-ti1-0427100-structa.onrender.com/login/login.html",
    },
    pt: {
      titulo: "Structa — 2026",
      imagem: "Tela de login da plataforma Structa",
      descricao:
        "Plataforma para gestão de demandas e problemas no ambiente escolar, centralizando solicitações, votações e acompanhamento de ocorrências em um único sistema. Promove comunicação, transparência e eficiência na resolução de demandas.",
      aprendizados:
        "Desenvolvimento web full stack, criação de uma API com Node.js e organização de um sistema com diferentes tipos de usuário.",
    },
    en: {
      titulo: "Structa — 2026",
      imagem: "Structa platform login screen",
      descricao:
        "A platform for managing requests and problems in the school environment, centralizing demands, voting and issue tracking in a single system. It promotes communication, transparency and efficiency in resolving demands.",
      aprendizados:
        "Full stack web development, building an API with Node.js and structuring a system with different user types.",
    },
  },
  {
    id: "clima",
    emoji: "🌦️",
    midia: { tipo: "imagem", src: clima },
    tecnologias: ["Java", "Spring Boot", "Maven", "RestTemplate"],
    links: { codigo: "https://github.com/gpresot/DIAW-API-Clima" },
    pt: {
      titulo: "Clima BH API — 2026.2",
      imagem: "Demonstração da API de clima",
      descricao:
        "API REST feita em dupla que consulta dados meteorológicos de Belo Horizonte, Nova Lima, Betim e Contagem por meio da Open-Meteo. Retorna dados em JSON, incluindo temperatura atual, previsão de máximas e mínimas, umidade e velocidade do vento.",
      aprendizados:
        "Criação de endpoints REST, consumo de API externa e organização em Controller e Service.",
    },
    en: {
      titulo: "Clima BH API — 2026.2",
      imagem: "Weather API demonstration",
      descricao:
        "A REST API developed with a teammate that retrieves weather data for Belo Horizonte, Nova Lima, Betim and Contagem through Open-Meteo. It returns JSON data including current temperature, forecast highs and lows, humidity and wind speed.",
      aprendizados:
        "Creating REST endpoints, consuming an external API and organizing code into Controller and Service layers.",
    },
  },
  {
    id: "frangonauta",
    emoji: "🐓",
    midia: { tipo: "video", src: frangonauta },
    tecnologias: ["Python", "Pygame"],
    links: { codigo: "https://github.com/gpresot/frangonauta" },
    pt: {
      titulo: "Frangonauta — 06/2026",
      descricao:
        "Jogo tipo Flappy Bird desenvolvido em equipe como projeto final da disciplina de Introdução a Algoritmos/Programação. O jogador controla um frango astronauta que precisa desviar de meteoros e coletar batatas assadas, chegando ao final do mapa em até 30 segundos.",
      aprendizados: "Lógica de programação, desenvolvimento de jogos e trabalho em equipe.",
    },
    en: {
      titulo: "Frangonauta — 06/2026",
      descricao:
        "A Flappy Bird-style game developed as a team project for the Introduction to Algorithms and Programming course. The player controls an astronaut chicken, dodging meteors and collecting roasted potatoes while reaching the end of the map within 30 seconds.",
      aprendizados: "Programming logic, game development and teamwork.",
    },
  },
  {
    id: "cafeteria",
    emoji: "☕",
    midia: { tipo: "imagem", src: cafeteria },
    tecnologias: ["HTML", "CSS"],
    links: { codigo: "https://github.com/gpresot/cofee-site" },
    pt: {
      titulo: "Site de cafeteria — 2026.1",
      imagem: "Página inicial do site de cafeteria",
      descricao:
        "Site básico desenvolvido para apresentar uma cafeteria, com página inicial, cardápio e informações sobre o estabelecimento.",
    },
    en: {
      titulo: "Coffee Shop Website — 2026.1",
      imagem: "Coffee shop website homepage",
      descricao:
        "A basic website created to present a coffee shop, featuring a homepage, a menu and information about the business.",
    },
  },
];

function Midia({ projeto, texto, rotulos }) {
  const { midia, emoji } = projeto;

  if (midia?.tipo === "video") {
    return (
      <video
        className="projeto-midia"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={midia.src} type="video/mp4" />
        {rotulos.video}
      </video>
    );
  }

  if (midia?.tipo === "imagem") {
    return (
      <img
        className="projeto-midia"
        src={midia.src}
        alt={texto.imagem ?? texto.titulo}
        loading="lazy"
      />
    );
  }

  return (
    <div className="projeto-midia projeto-sem-midia" aria-hidden="true">
      {emoji}
    </div>
  );
}

export default function Projetos() {
  const idioma = useIdioma();
  const rotulos = ui[idioma];

  return (
    <div className="projetos-grade">
      {projetos.map((projeto) => {
        const texto = projeto[idioma];

        return (
          <article className="card-projeto" key={projeto.id}>
            <Midia projeto={projeto} texto={texto} rotulos={rotulos} />

            <div className="projeto-corpo">
              {projeto.destaque && (
                <span className="selo-destaque">★ {rotulos.destaque}</span>
              )}
              <h3>{texto.titulo}</h3>
              <p>{texto.descricao}</p>

              <ul className="tags" aria-label={rotulos.tecnologias}>
                {projeto.tecnologias.map((tec) => (
                  <li key={tec}>{tec}</li>
                ))}
              </ul>

              {texto.aprendizados && (
                <p className="projeto-aprendizados">
                  <strong>{rotulos.aprendizados}</strong> {texto.aprendizados}
                </p>
              )}

              <div className="projeto-links">
                {projeto.links.demo && (
                  <a
                    className="btn-link"
                    href={projeto.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rotulos.demo}
                  </a>
                )}
                {projeto.links.codigo && (
                  <a
                    className="btn-link btn-link-sec"
                    href={projeto.links.codigo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rotulos.codigo}
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
