import perfil from "../assets/perfil.jpg";
import { useIdioma } from "../contex/Preferencias";

const textos = {
  pt: {
    foto: "Foto de Guilherme Presot",
    apresentacao:
      "Olá! Eu sou o Presot, tenho 19 anos e moro em Belo Horizonte. Programo desde os 16 anos e atualmente estou no 2º período de Engenharia de Software na PUC Minas. Busco uma oportunidade de estágio em desenvolvimento de software para aplicar meus conhecimentos, aprender com profissionais da área e contribuir com projetos.",
    historia: "Minha história",
    inicio: "Estudei no",
    colegio: "Colégio Militar de Belo Horizonte",
    trajetória:
      "(CMBH) de 2021 até 2025. Foi lá que, incentivado pelos meus amigos, comecei a frequentar as aulas de programação oferecidas à tarde. Até então, meu objetivo era passar em um concurso militar, mas essa experiência despertou meu interesse pela tecnologia e me fez enxergar novas possibilidades para o futuro.",
    professorInicio: "Com o",
    professor:
      ", um professor excepcional, aprendi não só a programar em linguagem C, mas também a desenvolver minha lógica de programação. Essas aulas foram fundamentais para minha decisão de seguir na área de software.",
    tecnologias: "Tecnologias",
    experiencia: "Tenho experiência com",
    linguagens: "C, Python e Java, além de HTML, CSS e JavaScript",
    utilizo: "Utilizo",
    git: "para controle de versão e",
    github:
      "para hospedar meus repositórios e colaborar em projetos. Atualmente, estou aprendendo React e tenho interesse em cibersegurança.",
    curriculo: "Currículo",
    descricaoCurriculo:
      "Veja meu currículo para conhecer minha formação e meus conhecimentos.",
    verCurriculo: "📄 Ver currículo",
    mais: "Mais sobre mim",
    interesses: [
      "⚽ Gosto de jogar bola e praticar esportes",
      "🐓 Sou galo doido!",
      "✈️ Curto viajar e conhecer lugares novos",
      "☕ Um café sempre vai bem",
      "🎯 Sempre disposto a aprender algo novo.",
    ],
  },
  en: {
    foto: "Photo of Guilherme Presot",
    apresentacao:
      "Hi! I'm Presot, I'm 19 years old and I live in Belo Horizonte, Brazil. I've been programming since I was 16, and I'm currently in my second semester of Software Engineering at PUC Minas. I'm looking for a software development internship where I can apply my skills, learn from experienced professionals and contribute to projects.",
    historia: "My story",
    inicio: "I attended",
    colegio: "Colégio Militar de Belo Horizonte",
    trajetória:
      "(CMBH) from 2021 to 2025. Encouraged by my friends, I started attending the afternoon programming classes there. At the time, my goal was to pass a military entrance exam, but this experience sparked my interest in technology and opened up new possibilities for my future.",
    professorInicio: "With",
    professor:
      ", an exceptional teacher, I learned not only to program in C but also to develop my programming logic. Those classes played a key role in my decision to pursue a career in software.",
    tecnologias: "Technologies",
    experiencia: "I have experience with",
    linguagens: "C, Python and Java, as well as HTML, CSS and JavaScript",
    utilizo: "I use",
    git: "for version control and",
    github:
      "to host my repositories and collaborate on projects. I'm currently learning React and I'm also interested in cybersecurity.",
    curriculo: "Resume",
    descricaoCurriculo:
      "View my resume to learn more about my education and skills.",
    verCurriculo: "📄 View resume",
    mais: "More about me",
    interesses: [
      "⚽ I enjoy playing football and other sports",
      "🐓 I'm an Atlético Mineiro fan!",
      "✈️ I enjoy traveling and discovering new places",
      "☕ Coffee is always welcome",
      "🎯 Always ready to learn something new.",
    ],
  },
};

export default function Sobre({ aoVerCurriculo }) {
  const idioma = useIdioma();
  const t = textos[idioma];

  return (
    <>
      <img
        src={perfil}
        alt={t.foto}
        className="foto-sobre"
      />

      <p>{t.apresentacao}</p>

      <h3>{t.historia}</h3>
      <p>
        {t.inicio}{" "}
        <a
          href="https://cmbh.eb.mil.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.colegio}
        </a>{" "}
        {t.trajetória} {t.professorInicio}{" "}
        <strong>Cel. Arnalberto</strong>
        {t.professor}
      </p>

      <h3>{t.tecnologias}</h3>
      <p>
        {t.experiencia} <strong>{t.linguagens}</strong>.
        {" "}{t.utilizo} <strong>Git</strong> {t.git}{" "}
        <strong>GitHub</strong> {t.github}
      </p>

      <h3>{t.curriculo}</h3>
      <p>{t.descricaoCurriculo}</p>

            <button type="button" className="btn-curriculo" onClick={aoVerCurriculo}>
        {t.verCurriculo}
      </button>

      <h3>{t.mais}</h3>
      {t.interesses.map((interesse) => (
        <p key={interesse}>{interesse}</p>
      ))}
    </>
  );
}