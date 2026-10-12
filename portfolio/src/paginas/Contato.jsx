import { useIdioma } from "../contex/Preferencias";

const textos = {
  pt: {
    titulo: "Vamos conversar?",
    descricao:
      "Entre em contato comigo para conversar sobre tecnologia, projetos e oportunidades.",
    nome: "Nome",
    email: "E-mail",
    mensagem: "Mensagem",
    enviar: "Enviar mensagem",
    assunto: "Novo contato pelo portfólio",
  },
  en: {
    titulo: "Let's talk!",
    descricao:
      "Get in touch to talk about technology, projects and opportunities.",
    nome: "Name",
    email: "Email",
    mensagem: "Message",
    enviar: "Send message",
    assunto: "New message from my portfolio",
  },
};

export default function Contato() {
  const idioma = useIdioma();
  const t = textos[idioma];

  return (
    <>
      <h3>{t.titulo}</h3>
      <p>{t.descricao}</p>

      
      <div className="links-contato">
        <a href="mailto:gui.presot@gmail.com">📧 {t.email}</a>
          <a href="presot_" target="_blank" rel="noopener noreferrer">
            🎮 Discord
          </a>

        <a
          href="https://www.linkedin.com/in/guilhermepresot/"
          target="_blank"
          rel="noopener noreferrer"
        >
          💼 LinkedIn
        </a>

        <a
          href="https://github.com/gpresot"
          target="_blank"
          rel="noopener noreferrer"
        >
          💻 GitHub
        </a>

        <a
          href="https://www.instagram.com/guilherme_presot/"
          target="_blank"
          rel="noopener noreferrer"
        >
          📷 Instagram
        </a>
        <form
        id="form-contato"
        action="https://formsubmit.co/gui.presot@gmail.com"
        method="POST"
      >
        <input type="hidden" name="_subject" value={t.assunto} />

        <label htmlFor="nome">{t.nome}</label>
        <input
          type="text"
          id="nome"
          name="nome"
          autoComplete="name"
          required
        />

        <label htmlFor="email">{t.email}</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />

        <label htmlFor="mensagem">{t.mensagem}</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          required
        />

        <button type="submit">{t.enviar}</button>
      </form>

      </div>
    </>
  );
}