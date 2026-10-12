import cafeteria from "../assets/cofesite.png";
import frangonauta from "../assets/frangonalta.mp4";
import clima from "../assets/climaapi.png";
import { useIdioma } from "../contex/Preferencias";

const textos = {
  pt: {
    tecnologias: "Tecnologias:",
    aprendizados: "Aprendizados:",
    verProjeto: "Ver projeto",
    video: "Seu navegador não suporta a reprodução deste vídeo.",
    cafeteria: {
      titulo: "Site de cafeteria — 2026.1",
      imagem: "Página inicial do site de cafeteria",
      descricao:
        "Site básico desenvolvido para apresentar uma cafeteria, com página inicial, cardápio e informações sobre o estabelecimento.",
    },
    frangonauta: {
      titulo: "Frangonauta — 06/2026",
      descricao:
        "Jogo tipo Flappy Bird desenvolvido em equipe como projeto final da disciplina de Introdução a Algoritmos/Programação. O jogador controla um frango astronauta que precisa desviar de meteoros e coletar batatas assadas, chegando ao final do mapa em até 30 segundos.",
      aprendizados:
        "Lógica de programação, desenvolvimento de jogos e trabalho em equipe.",
    },
    clima: {
      titulo: "🌦️ Clima BH API — 2026.2",
      imagem: "Demonstração da API de clima",
      descricao:
        "API REST feita em dupla que consulta dados meteorológicos de Belo Horizonte, Nova Lima, Betim e Contagem por meio da Open-Meteo. Retorna dados em JSON, incluindo temperatura atual, previsão de máximas e mínimas, umidade e velocidade do vento.",
      aprendizados:
        "Criação de endpoints REST, consumo de API externa e organização em Controller e Service.",
    },
  },
  en: {
    tecnologias: "Technologies:",
    aprendizados: "What I learned:",
    verProjeto: "View project",
    video: "Your browser does not support video playback.",
    cafeteria: {
      titulo: "Coffee Shop Website — 2026.1",
      imagem: "Coffee shop website homepage",
      descricao:
        "A basic website created to present a coffee shop, featuring a homepage, a menu and information about the business.",
    },
    frangonauta: {
      titulo: "Frangonauta — 06/2026",
      descricao:
        "A Flappy Bird-style game developed as a team project for the Introduction to Algorithms and Programming course. The player controls an astronaut chicken, dodging meteors and collecting roasted potatoes while reaching the end of the map within 30 seconds.",
      aprendizados:
        "Programming logic, game development and teamwork.",
    },
    clima: {
      titulo: "🌦️ Clima BH API — 2026.2",
      imagem: "Weather API demonstration",
      descricao:
        "A REST API developed with a teammate that retrieves weather data for Belo Horizonte, Nova Lima, Betim and Contagem through Open-Meteo. It returns JSON data including current temperature, forecast highs and lows, humidity and wind speed.",
      aprendizados:
        "Creating REST endpoints, consuming an external API and organizing code into Controller and Service layers.",
    },
  },
};

export default function Projetos() {
  const idioma = useIdioma();
  const t = textos[idioma];

  return (
    <>
      <article className="card-projeto">
        <img src={cafeteria} alt={t.cafeteria.imagem} />

        <h3>{t.cafeteria.titulo}</h3>
        <p>{t.cafeteria.descricao}</p>

        <p>
          <strong>{t.tecnologias}</strong> HTML {idioma === "pt" ? "e" : "and"} CSS
        </p>

        <a
          href="https://github.com/gpresot/cofee-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.verProjeto}
        </a>
      </article>

      <article className="card-projeto">
        <video
          className="video-projeto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={frangonauta} type="video/mp4" />
          {t.video}
        </video>

        <h3>{t.frangonauta.titulo}</h3>
        <p>{t.frangonauta.descricao}</p>

        <p>
          <strong>{t.tecnologias}</strong> Python {idioma === "pt" ? "e" : "and"} Pygame
        </p>

        <p>
          <strong>{t.aprendizados}</strong>{" "}
          {t.frangonauta.aprendizados}
        </p>

        <a
          href="https://github.com/gpresot/frangonauta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.verProjeto}
        </a>
      </article>

      <article className="card-projeto">
        <img src={clima} alt={t.clima.imagem} />

        <h3>{t.clima.titulo}</h3>
        <p>{t.clima.descricao}</p>

        <p>
          <strong>{t.tecnologias}</strong> Java, Spring Boot,
          Maven {idioma === "pt" ? "e" : "and"} RestTemplate.
        </p>

        <p>
          <strong>{t.aprendizados}</strong> {t.clima.aprendizados}
        </p>

        <a
          href="https://github.com/gpresot/DIAW-API-Clima"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.verProjeto}
        </a>
      </article>
    </>
  );
}