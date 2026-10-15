import { useIdioma } from "../contex/Preferencias";

const ENDPOINT = "https://formsubmit.co/gui.presot@gmail.com";

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
    autoresposta:
      "Olá! Recebi sua mensagem e responderei o mais breve possível. Obrigado pelo contato! - Guilherme Presot",
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
    autoresposta:
      "Hi! I received your message and will reply as soon as possible. Thanks for reaching out! - Guilherme Presot",
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

        {/* Discord não tem link direto para usuário sem o ID numérico.
            Troque pelo seu link de convite ou ID, ou remova este item. */}
        <span>🎮 Discord: presot_</span>

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
      </div>

      <form id="form-contato" action={ENDPOINT} method="POST">
        <input type="hidden" name="_subject" value={t.assunto} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value={t.autoresposta} />
        {/* captcha do FormSubmit (aparece numa página deles ao enviar) */}
        <input type="hidden" name="_captcha" value="true" />
        {/* depois do captcha, volta para o seu site */}
        <input type="hidden" name="_next" value={window.location.origin} />
        {/* honeypot anti-spam: bots preenchem, humanos não veem */}
        <input
          type="text"
          name="_honey"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <label htmlFor="nome">{t.nome}</label>
        <input type="text" id="nome" name="name" autoComplete="name" required />

        <label htmlFor="email">{t.email}</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />

        <label htmlFor="mensagem">{t.mensagem}</label>
        <textarea id="mensagem" name="message" rows={5} required />

        <button type="submit">{t.enviar}</button>
      </form>
    </>
  );
}