import { useEffect, useState } from "react";
import { useIdioma } from "../contex/Preferencias";
import "./WakaTime.css";

const textos = {
  pt: {
    titulo: "Minha atividade de programação",
    periodo: "Últimos 7 dias",
    total: "Tempo total",
    media: "Média diária",
    carregando: "Carregando estatísticas...",
    erro: "Não foi possível carregar as estatísticas.",
    vazio: "Nenhuma atividade registrada neste período.",
    atualizando: "O WakaTime está atualizando as estatísticas.",
    perfil: "Ver perfil no WakaTime",
  },
  en: {
    titulo: "My coding activity",
    periodo: "Last 7 days",
    total: "Total time",
    media: "Daily average",
    carregando: "Loading statistics...",
    erro: "Unable to load statistics.",
    vazio: "No activity recorded during this period.",
    atualizando: "WakaTime is updating the statistics.",
    perfil: "View WakaTime profile",
  },
};

function formatarTempo(segundos) {
  const minutos = Math.floor(Math.max(0, segundos) / 60);
  const horas = Math.floor(minutos / 60);

  return horas > 0
    ? `${horas}h ${minutos % 60}min`
    : `${minutos}min`;
}

export default function WakaTime() {
  const idioma = useIdioma();
  const t = textos[idioma] ?? textos.pt;
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let encerrado = false;
    let timer;

    async function carregar() {
      try {
        const resposta = await fetch("/api/wakatime", {
          signal: controller.signal,
        });

        if (!resposta.ok) throw new Error("Falha na consulta");

        const resultado = await resposta.json();

        if (!Array.isArray(resultado.linguagens)) {
          throw new Error("Resposta inválida");
        }

        if (encerrado) return;

        setDados(resultado);
        setErro(false);

        if (!resultado.atualizado) {
          timer = setTimeout(carregar, 60000);
        }
      } catch {
        if (!encerrado) setErro(true);
      }
    }

    carregar();

    return () => {
      encerrado = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (erro && !dados) return <p role="status">{t.erro}</p>;
  if (!dados) return <p role="status">{t.carregando}</p>;

  return (
    <div className="waka">
      <h3>{t.titulo}</h3>
      <p className="waka-periodo">{t.periodo}</p>

      <div className="waka-resumo">
        <div className="waka-card">
          <span>{t.total}</span>
          <strong>{formatarTempo(dados.total)}</strong>
        </div>

        <div className="waka-card">
          <span>{t.media}</span>
          <strong>{formatarTempo(dados.media)}</strong>
        </div>
      </div>

      {!dados.atualizado && (
        <p role="status">{t.atualizando}</p>
      )}

      {dados.linguagens.length === 0 ? (
        <p>{t.vazio}</p>
      ) : (
        <ul className="waka-linguagens">
          {dados.linguagens.map((item) => (
            <li key={item.nome}>
              <div className="waka-linha">
                <strong>{item.nome}</strong>
                <span>{formatarTempo(item.segundos)}</span>
              </div>

              <progress
                max="100"
                value={item.porcentagem}
                aria-label={item.nome}
              />

              <span className="waka-porcentagem">
                {new Intl.NumberFormat(
                  idioma === "en" ? "en-US" : "pt-BR",
                  { maximumFractionDigits: 1 }
                ).format(item.porcentagem)}
                %
              </span>
            </li>
          ))}
        </ul>
      )}

      <a
        href="https://wakatime.com/@460e147e-39dc-4f95-b687-80ad4df91a1d"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.perfil}
      </a>
    </div>
  );
}