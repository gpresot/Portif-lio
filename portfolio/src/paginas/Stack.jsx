import { Component, lazy, Suspense, useState } from "react";
import { useIdioma } from "../contex/Preferencias";
import { stack } from "../data/stack";
import "./Stack.css";

const SkillsGlobe = lazy(() => import("../components/SkillsGlobe"));

const textos = {
  pt: {
    descricao:
      "As linguagens e ferramentas que uso nos meus estudos e projetos.",
    dica: "Arraste para girar · clique em uma tecnologia para abrir o site oficial",
    carregando: "Carregando o globo...",
    globo: "Globo",
    lista: "Lista",
    visualizacao: "Visualização das tecnologias",
  },
  en: {
    descricao:
      "The languages and tools I use in my studies and projects.",
    dica: "Drag to rotate · click a technology to open its official site",
    carregando: "Loading the globe...",
    globo: "Globe",
    lista: "List",
    visualizacao: "Technology view",
  },
};

function ListaSimples() {
  return (
    <ul className="stack-grade">
      {stack.map(({ name, icon: Icon, color, link }) => (
        <li key={name}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Icon aria-hidden="true" style={{ color }} />
            <span>{name}</span>
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
  const t = textos[idioma] ?? textos.pt;
  const [visualizacao, setVisualizacao] = useState("globo");

  return (
    <div className="stack-painel">
      <p className="stack-descricao">{t.descricao}</p>

      <div
        className="stack-alternador"
        role="group"
        aria-label={t.visualizacao}
      >
        <button
          type="button"
          aria-pressed={visualizacao === "globo"}
          onClick={() => setVisualizacao("globo")}
        >
          🌐 {t.globo}
        </button>

        <button
          type="button"
          aria-pressed={visualizacao === "lista"}
          onClick={() => setVisualizacao("lista")}
        >
          ▦ {t.lista}
        </button>
      </div>

      {visualizacao === "lista" ? (
        <ListaSimples />
      ) : (
        <GloboComFallback>
          <Suspense
            fallback={<p className="stack-descricao">{t.carregando}</p>}
          >
            <SkillsGlobe skills={stack} dica={t.dica} />
          </Suspense>
        </GloboComFallback>
      )}
    </div>
  );
}