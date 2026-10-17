import { useEffect, useState } from "react";
import { useIdioma } from "../contex/Preferencias";

export default function CodandoAgora() {
  const idioma = useIdioma();
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    let encerrado = false;
    let timer;
    const controller = new AbortController();

    async function atualizar() {
      try {
        const resposta = await fetch("/api/codando", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!resposta.ok) throw new Error("Falha na consulta");

        const dados = await resposta.json();

        if (!encerrado) setAtivo(dados.ativo === true);
      } catch {
        if (!encerrado) setAtivo(false);
      } finally {
        if (!encerrado) {
          timer = setTimeout(atualizar, 60000);
        }
      }
    }

    atualizar();

    return () => {
      encerrado = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (!ativo) return null;

  return (
    <p className="codando-agora" role="status">
      <span aria-hidden="true">🟢 </span>
      {idioma === "en"
        ? "Coding now · Private project"
        : "Codando agora · Projeto privado"}
    </p>
  );
}