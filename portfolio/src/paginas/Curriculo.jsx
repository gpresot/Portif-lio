import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "./Curriculo.css";
import { useIdioma } from "../contex/Preferencias";

// O PDF.js precisa de um "worker" (arquivo à parte). Ele sai do próprio build.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ARQUIVO = `${import.meta.env.BASE_URL}curriculo.pdf`;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2;
const ZOOM_PASSO = 0.25;

const textos = {
  pt: {
    baixar: "⬇ Baixar PDF",
    abrir: "↗ Abrir em outra aba",
    menos: "Diminuir zoom",
    mais: "Aumentar zoom",
    ajustar: "Ajustar à largura",
    carregando: "Carregando currículo...",
    erro: "Não foi possível mostrar o currículo aqui. Use os botões acima para baixar ou abrir o PDF.",
    nomeArquivo: "Curriculo-Guilherme-Presot.pdf",
  },
  en: {
    baixar: "⬇ Download PDF",
    abrir: "↗ Open in new tab",
    menos: "Zoom out",
    mais: "Zoom in",
    ajustar: "Fit to width",
    carregando: "Loading resume...",
    erro: "The resume could not be displayed here. Use the buttons above to download or open the PDF.",
    nomeArquivo: "Resume-Guilherme-Presot.pdf",
  },
};

export default function Curriculo() {
  const idioma = useIdioma();
  const t = textos[idioma];
  const areaRef = useRef(null);
  const [largura, setLargura] = useState(null);
  const [paginas, setPaginas] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [erro, setErro] = useState(false);

  // Com zoom 100%, a página ocupa a largura da área (acompanha a janela)
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const observer = new ResizeObserver(([entry]) =>
      setLargura(Math.max(200, Math.floor(entry.contentRect.width)))
    );
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  const mudarZoom = (delta) =>
    setZoom((atual) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, atual + delta)));

  const larguraDaPagina = largura ? Math.round(largura * zoom) : undefined;

  return (
    <div className="cv">
      <div className="cv-barra">
        <div className="cv-zoom" role="group">
          <button
            type="button"
            onClick={() => mudarZoom(-ZOOM_PASSO)}
            disabled={zoom <= ZOOM_MIN}
            aria-label={t.menos}
            title={t.menos}
          >
            −
          </button>
          <span className="cv-zoom-valor" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => mudarZoom(ZOOM_PASSO)}
            disabled={zoom >= ZOOM_MAX}
            aria-label={t.mais}
            title={t.mais}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            disabled={zoom === 1}
            title={t.ajustar}
          >
            ⤢
          </button>
        </div>

        <div className="cv-acoes">
          <a className="cv-botao principal" href={ARQUIVO} download={t.nomeArquivo}>
            {t.baixar}
          </a>
          <a className="cv-botao" href={ARQUIVO} target="_blank" rel="noopener noreferrer">
            {t.abrir}
          </a>
        </div>
      </div>

      <div className="cv-area" ref={areaRef}>
        {erro ? (
          <p className="cv-aviso">{t.erro}</p>
        ) : (
          <>
            {paginas === 0 && (
              <p className="cv-aviso" role="status">
                {t.carregando}
              </p>
            )}
            <Document
              file={ARQUIVO}
              onLoadSuccess={({ numPages }) => setPaginas(numPages)}
              onLoadError={(e) => {
                console.error("Currículo: falha ao abrir o PDF", e);
                setErro(true);
              }}
              loading={null}
              error={null}
              externalLinkTarget="_blank"
              externalLinkRel="noopener noreferrer"
            >
              {larguraDaPagina &&
                Array.from({ length: paginas }, (_, i) => (
                  <div key={i} className="cv-pagina">
                   <Page
  pageNumber={i + 1}
  width={larguraDaPagina}
  loading={null}
  renderTextLayer={false}
  renderAnnotationLayer={false}
/>
                  </div>
                ))}
            </Document>
          </>
        )}
      </div>
    </div>
  );
}