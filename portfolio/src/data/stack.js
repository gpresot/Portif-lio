import { FaJava, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
  SiC,
  SiPython,
  SiJavascript,
  SiReact,
  SiVite,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiFigma,
  SiSpring,
  SiBootstrap,
  SiApachenetbeanside,
} from "react-icons/si";

const item = (name, icon, color, link) => ({ name, icon, color, link });

// Para incluir uma tecnologia, adicione uma linha aqui.
// A cor de cada ícone é a da marca; o GitHub usa a cor do globo (preto/branco)
// porque o logo dele é preto e sumiria no tema escuro.
export const stack = [
  item("C", SiC, "#6f8fb5", "https://en.wikipedia.org/wiki/C_(programming_language)"),
  item("Python", SiPython, "#3776AB", "https://www.python.org/"),
  item("Java", FaJava, "#ED8B00", "https://www.java.com/"),
  item("HTML", FaHtml5, "#E34F26", "https://developer.mozilla.org/docs/Web/HTML"),
  item("CSS", FaCss3Alt, "#1572B6", "https://developer.mozilla.org/docs/Web/CSS"),
  item("JavaScript", SiJavascript, "#d4b800", "https://developer.mozilla.org/docs/Web/JavaScript"),
  item("React", SiReact, "#2fa8c9", "https://react.dev/"),
  item("Vite", SiVite, "#646CFF", "https://vite.dev/"),
  item("Git", SiGit, "#F05032", "https://git-scm.com/"),
  item("GitHub", SiGithub, "var(--globo)", "https://github.com/gpresot"),
  item("VS Code", VscVscode, "#007ACC", "https://code.visualstudio.com/"),
  item("NetBeans", SiApachenetbeanside, "#1B6AC6", "https://netbeans.apache.org/"),
  item("Figma", SiFigma, "#F24E1E", "https://www.figma.com/"),
  item("Spring", SiSpring, "#6DB33F", "https://spring.io/"),
  item("Bootstrap", SiBootstrap, "#7952B3", "https://getbootstrap.com/"),
  item("GitHub Actions", SiGithubactions, "#2088FF", "https://github.com/features/actions"),
];