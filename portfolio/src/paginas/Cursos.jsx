import { useIdioma } from "../contex/Preferencias";

const cursos = {
  
  pt: [
    {
      instituicao: "FGV Online",
      nome: "Desenvolvimento de Sistemas Web: CSS e HTML",
      periodo: "15 horas · Concluído em 2026",
      descricao:
        "Criação de páginas web com HTML e CSS, Flexbox, Grid e responsividade.",
    },
    {
      instituicao: "Inatel",
      nome: "Start Engenharia – Computação e Software",
      periodo: "Participação nas edições de 2024 e 2025",
      descricao:
        "Lógica de programação e resolução de desafios em equipe.",
    },
    {
      instituicao: "FGV Online",
      nome: "Introdução ao Git e GitHub",
      periodo: "15 horas · Concluído em 2026",
      descricao:
        "Controle de versão e gerenciamento de repositórios.",
    },
    {
      instituicao: "Curso em Vídeo",
      nome: "Algoritmos e Lógica de Programação",
      periodo: "40 horas · Concluído em 2024",
      descricao:
        "Lógica de programação e resolução de exercícios.",
    },
  ],
  en: [
    {
      instituicao: "FGV Online",
      nome: "Web Systems Development: CSS and HTML",
      periodo: "15 hours · Completed in 2026",
      descricao:
        "Building web pages with HTML and CSS, Flexbox, Grid and responsive design.",
    },
    {
      instituicao: "Inatel",
      nome: "Start Engenharia – Computing and Software",
      periodo: "Participated in the 2024 and 2025 editions",
      descricao:
        "Programming logic and collaborative problem-solving challenges.",
    },
    {
      instituicao: "FGV Online",
      nome: "Introduction to Git and GitHub",
      periodo: "15 hours · Completed in 2026",
      descricao:
        "Version control and repository management.",
    },
    {
      instituicao: "Curso em Vídeo",
      nome: "Algorithms and Programming Logic",
      periodo: "40 hours · Completed in 2024",
      descricao:
        "Programming logic and practice exercises.",
    },
  ],
};

export default function Cursos() {
  const idioma = useIdioma();

  return (
  <div className="cursos">
    {cursos[idioma].map((curso, indice) => (
      <article className="card-curso" key={indice}>
        <span className="instituicao">{curso.instituicao}</span>
        <h3>{curso.nome}</h3>
        <p>{curso.periodo}</p>
        <p>{curso.descricao}</p>
      </article>
    ))}
  </div>
);}