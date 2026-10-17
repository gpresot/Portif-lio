import { Component, lazy, Suspense } from "react";
import { useIdioma } from "../contex/Preferencias";
import { stack } from "../data/stack";

// O globo (e o three.js) só é baixado quando esta seção é aberta
const SkillsGlobe = lazy(() => import("../components/SkillsGlobe"));

const textos = {
  pt: {
    descricao:
      "As linguagens e ferramentas que uso nos meus estudos e projetos.",
    dica: "Arraste para girar · clique em uma tecnologia para abrir o site oficial",
    carregando: "Carregando o globo...",
  },
  en: {
    descricao:
      "The languages and tools I use in my studies and projects.",
    dica: "Drag to rotate · click a technology to open its official site",
    carregando: "Loading the globe...",
  },
};

// Lista simples, usada se o navegador não tiver WebGL ou o globo falhar
function ListaSimples() {
  return (
    <ul className="skills-lista">
      {stack.map(({ name, icon: Icon, color, link }) => (
        <li key={name}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Icon aria-hidden="true" style={{ color }} />
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}

class GloboComFallback extends Component {
  state = { falhou: false };

  static getDerivedStateFromError() {
    return { falhou: true };
  }

  componentDidCatch(erro) {
    console.error("Globo da stack:", erro);
  }

  render() {
    return this.state.falhou ? <ListaSimples /> : this.props.children;
  }
}

export default function Stack() {
  const idioma = useIdioma();
  const t = textos[idioma];

  return (
    <>
      <p style={{ textAlign: "center" }}>{t.descricao}</p>

      <GloboComFallback>
        <Suspense fallback={<p style={{ textAlign: "center" }}>{t.carregando}</p>}>
          <SkillsGlobe skills={stack} dica={t.dica} />
        </Suspense>
      </GloboComFallback>
    </>
  );
}