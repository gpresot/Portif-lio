import { useState } from "react";
import { useIdioma } from "../contex/Preferencias";
import "./Chat.css";

const textos = {
  pt: {
    aviso:
      "Assistente com IA sobre meu perfil profissional. Pode cometer erros. Não envie dados sensíveis.",
    placeholder: "O que você quer saber sobre mim?",
    enviar: "Enviar",
    pensando: "Pensando...",
    limpar: "Nova conversa",
    voce: "Você",
    assistente: "Assistente",
    erro: "Não foi possível responder agora. Tente novamente.",
    limite: "Limite de uso atingido. Tente mais tarde.",
    fim: "Inicie uma nova conversa para continuar.",
    sugestoes: [
      "Quais tecnologias ele usa?",
      "Quais são os projetos dele?",
      "Ele está procurando estágio?",
    ],
  },
  en: {
    aviso:
      "AI assistant about my professional profile. It may make mistakes. Do not send sensitive data.",
    placeholder: "What would you like to know about me?",
    enviar: "Send",
    pensando: "Thinking...",
    limpar: "New conversation",
    voce: "You",
    assistente: "Assistant",
    erro: "Unable to reply right now. Please try again.",
    limite: "Usage limit reached. Please try again later.",
    fim: "Start a new conversation to continue.",
    sugestoes: [
      "What technologies does he use?",
      "What are his projects?",
      "Is he looking for an internship?",
    ],
  },
};

export default function Chat() {
  const idioma = useIdioma();
  const t = textos[idioma] ?? textos.pt;

  const [mensagens, setMensagens] = useState([]);
  const [pergunta, setPergunta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const limite = mensagens.length >= 12;

  async function enviar(texto) {
    const conteudo = texto.trim();

    if (!conteudo || enviando || limite) return;

    const historico = [
      ...mensagens,
      { role: "user", text: conteudo },
    ];

    setEnviando(true);
    setErro("");

    try {
      const resposta = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensagens: historico,
          idioma,
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!resposta.ok) {
        throw new Error(
          resposta.status === 429 ? "limite" : "erro"
        );
      }

      const dados = await resposta.json();

      if (typeof dados.resposta !== "string") {
        throw new Error("erro");
      }

      setMensagens([
        ...historico,
        { role: "model", text: dados.resposta },
      ]);

      setPergunta("");
    } catch (e) {
      setErro(e.message === "limite" ? t.limite : t.erro);
    } finally {
      setEnviando(false);
    }
  }

  function limparConversa() {
    setMensagens([]);
    setPergunta("");
    setErro("");
  }

  return (
    <div className="chat-perfil">
      <p className="chat-aviso">{t.aviso}</p>

      {mensagens.length === 0 && (
        <div className="chat-sugestoes">
          {t.sugestoes.map((texto) => (
            <button
              key={texto}
              type="button"
              disabled={enviando}
              onClick={() => enviar(texto)}
            >
              {texto}
            </button>
          ))}
        </div>
      )}

      <div
        className="chat-mensagens"
        role="log"
        aria-live="polite"
        aria-label={idioma === "en" ? "Conversation" : "Conversa"}
      >
        {mensagens.map((item, indice) => (
          <div
            key={indice}
            className={`chat-mensagem chat-${item.role}`}
          >
            <strong>
              {item.role === "user" ? t.voce : t.assistente}
            </strong>

            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {enviando && <p role="status">{t.pensando}</p>}

      {erro && (
        <p className="chat-erro" role="alert">
          {erro}
        </p>
      )}

      {limite && <p>{t.fim}</p>}

      <form
        className="chat-form"
        onSubmit={(evento) => {
          evento.preventDefault();
          enviar(pergunta);
        }}
      >
        <textarea
          value={pergunta}
          onChange={(evento) => setPergunta(evento.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          maxLength={1000}
          rows={3}
          disabled={enviando || limite}
        />

        <div className="chat-acoes">
          <button
            type="button"
            disabled={enviando}
            onClick={limparConversa}
          >
            {t.limpar}
          </button>

          <button
            type="submit"
            className="chat-enviar"
            disabled={enviando || limite || !pergunta.trim()}
          >
            {enviando ? t.pensando : t.enviar}
          </button>
        </div>
      </form>
    </div>
  );
}