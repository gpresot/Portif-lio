import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Sobre from "./paginas/Sobre";
import Cursos from "./paginas/Cursos";
import Projetos from "./paginas/Projetos";
import Stack from "./paginas/Stack";
import Contato from "./paginas/Contato";
import { IdiomaContext } from "./contex/Preferencias";
import useRelogio from "./hooks/useRelogio";
import CodandoAgora from "./components/CodandoAgora";
import WakaTime from "./paginas/WakaTime";
import Chat from "./paginas/Chat";
// O visualizador de PDF só é baixado quando a seção é aberta
const Curriculo = lazy(() => import("./paginas/Curriculo"));


const textos = {
  pt: {
    subtitulo: "Estudante de Engenharia de Software",
    pesquisar: "Pesquisar...",
    sobre: "Sobre",
    cursos: "Cursos",
    projetos: "Projetos",
    stack: "Stack",
    curriculo: "Currículo",
    contato: "Contato",
    temaEscuro: "🌙 Tema escuro",
    temaClaro: "☀️ Tema claro",
    semResultados: "Nenhuma seção encontrada.",
    carregando: "Carregando...",
  },
  en: {
    subtitulo: "Software Engineering Student",
    pesquisar: "Search...",
    sobre: "About",
    cursos: "Courses",
    projetos: "Projects",
    stack: "Stack",
    curriculo: "Resume",
    contato: "Contact",
    temaEscuro: "🌙 Dark theme",
    temaClaro: "☀️ Light theme",
    semResultados: "No sections found.",
    carregando: "Loading...",
  },
};

export default function App() {
  const [busca, setBusca] = useState("");
  const [listaAberta, setListaAberta] = useState(false);
  const [secao, setSecao] = useState(null);
  const buscaRef = useRef(null);
  const [chatAberto, setChatAberto] = useState(false);
  const [idioma, setIdioma] = useState(() =>
    localStorage.getItem("idioma") === "en" ? "en" : "pt"
  );

  const [tema, setTema] = useState(() =>
    localStorage.getItem("tema") === "escuro" ? "escuro" : "claro"
  );

  const hora = useRelogio();

  useEffect(() => {
    function fecharAoTocarFora(evento) {
      if (
        buscaRef.current &&
        !buscaRef.current.contains(evento.target)
      ) {
        setListaAberta(false);
      }
    }

    document.addEventListener("pointerdown", fecharAoTocarFora);

    return () => {
      document.removeEventListener("pointerdown", fecharAoTocarFora);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("idioma", idioma);
    document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";
  }, [idioma]);

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  const t = textos[idioma];

  const secoes = [
    { id: "sobre", nome: t.sobre },
    { id: "stack", nome: t.stack },
    { id: "curriculo", nome: t.curriculo },
    { id: "curso", nome: t.cursos },
    { id: "projetos", nome: t.projetos },
    { id: "wakatime", nome: "WakaTime" },
    { id: "contato", nome: t.contato },
    
  ];

  const resultados = secoes.filter((item) =>
    item.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );

  function abrirSecao(item) {
    setSecao(item.id);
    setBusca("");
    setListaAberta(false);
  }

  function alternarTema() {
    setTema((atual) => (atual === "claro" ? "escuro" : "claro"));
  }

  function alternarIdioma() {
    setIdioma((atual) => (atual === "pt" ? "en" : "pt"));
    setBusca("");
  }

  return (
    <IdiomaContext.Provider value={idioma}>
      <div className="preferencias">
        <button type="button" onClick={alternarTema}>
          {tema === "claro" ? t.temaEscuro : t.temaClaro}
        </button>

        <button
          type="button"
          onClick={alternarIdioma}
          aria-label={
            idioma === "pt"
              ? "Switch to English"
              : "Mudar para português"
          }
        >
          {idioma === "pt" ? "EN" : "PT"}
        </button>
      </div>

      <main className="centro">
        <h1>Guilherme Presot</h1>
        <p className="subtitulo">{t.subtitulo}</p>
        <CodandoAgora/>
        <div
          className="busca-caixa"
          ref={buscaRef}
          onBlur={(evento) => {
            if (
              evento.relatedTarget &&
              !evento.currentTarget.contains(evento.relatedTarget)
            ) {
              setListaAberta(false);
            }
          }}
        >
          <input
            type="search"
            id="busca"
            placeholder={t.pesquisar}
            aria-label={t.pesquisar}
            aria-expanded={listaAberta}
            aria-controls="lista"
            autoComplete="off"
            value={busca}
            onFocus={() => setListaAberta(true)}
            onClick={() => setListaAberta(true)}
            onChange={(evento) => {
              setBusca(evento.target.value);
              setListaAberta(true);
            }}
            onKeyDown={(evento) => {
              if (evento.key === "Escape") {
                setListaAberta(false);
              }
            }}
          />

          {listaAberta && (
            <ul id="lista" className="lista">
              {resultados.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => abrirSecao(item)}
                  >
                    {item.nome}
                  </button>
                </li>
              ))}

              {resultados.length === 0 && (
                <li>{t.semResultados}</li>
              )}
            </ul>
          )}
        </div>

        {secao && (
          <section id="detalhes">
            <h2 id="detalhes-titulo">
              {secoes.find((item) => item.id === secao)?.nome}
            </h2>

            <div id="detalhes-texto">
              {secao === "sobre" && (
                <Sobre aoVerCurriculo={() => setSecao("curriculo")} />
              )}
              {secao === "curso" && <Cursos />}
              {secao === "wakatime" && <WakaTime />}
              {secao === "projetos" && <Projetos />}
              {secao === "stack" && <Stack />}
              {secao === "curriculo" && (
                <Suspense fallback={<p>{t.carregando}</p>}>
                  <Curriculo />
                </Suspense>
              )}
              {secao === "contato" && <Contato />}
            </div>
          </section>
        )}
      </main>
        {!chatAberto && (
  <button
    type="button"
    className="chat-flutuante"
    onClick={() => setChatAberto(true)}
    aria-haspopup="dialog"
    aria-controls="chat-popup"
  >
    💬 {idioma === "pt" ? "Pergunte sobre mim" : "Ask about me"}
  </button>
)}

{chatAberto && (
  <div
    id="chat-popup"
    className="chat-popup"
    role="dialog"
    aria-labelledby="chat-popup-titulo"
    onKeyDown={(evento) => {
      if (evento.key === "Escape") {
        setChatAberto(false);
      }
    }}
  >
    <div className="chat-popup-cabecalho">
      <strong id="chat-popup-titulo">
        {idioma === "pt" ? "Pergunte sobre mim" : "Ask about me"}
      </strong>

      <button
        type="button"
        autoFocus
        onClick={() => setChatAberto(false)}
        aria-label={idioma === "pt" ? "Fechar chat" : "Close chat"}
      >
        ✕
      </button>
    </div>

    <div className="chat-popup-corpo">
      <Chat />
    </div>
  </div>
)}
      <footer className="status">
        <span>© 2026 Presot</span>
        <span>{hora}</span>
      </footer>
    </IdiomaContext.Provider>
  );
}