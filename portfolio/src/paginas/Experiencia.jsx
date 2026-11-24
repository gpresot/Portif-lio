import { useIdioma } from "../contex/Preferencias";
import mirgom from "../assets/mirgom.webp";

const SITE = "https://mirgomlocacaomotos.com";

const textos = {
  pt: {
    cargo: "Desenvolvedor Web Freelancer",
    empresa: "Mirgom Locação de Motos",
    local: "Ribeirão das Neves, MG",
    periodo: "2026",
    atividades: [
      "Desenvolvi do zero o site institucional de uma locadora de motos, com React, TypeScript e Vite, publicado na Vercel.",
      "Criei as páginas de plano de fidelidade, avaliações de clientes e contato, com botão de WhatsApp e mensagem pré-preenchida para captar clientes.",
      "Implementei o status “aberto agora” da loja, calculado pelo horário de Brasília.",
      "Apliquei SEO técnico (meta tags, Open Graph, sitemap e robots) para a loja aparecer nas buscas locais.",
      "Construí um painel interno para o cliente controlar a frota e o fluxo de caixa.",
    ],
    tecnologias: "Tecnologias:",
    ver: "Ver site no ar",
    imagem: "Página inicial do site da Mirgom Locação de Motos",
  },
  en: {
    cargo: "Freelance Web Developer",
    empresa: "Mirgom Motorcycle Rental",
    local: "Ribeirão das Neves, Brazil",
    periodo: "2026",
    atividades: [
      "Built from scratch the website of a motorcycle rental shop using React, TypeScript and Vite, deployed on Vercel.",
      "Created the loyalty plan, customer reviews and contact pages, with a WhatsApp button and a pre-filled message to capture leads.",
      "Implemented the “open now” store status, calculated from Brasília time.",
      "Applied technical SEO (meta tags, Open Graph, sitemap and robots) so the shop shows up in local searches.",
      "Built an internal dashboard so the client can manage the fleet and cash flow.",
    ],
    tecnologias: "Technologies:",
    ver: "Visit live site",
    imagem: "Homepage of the Mirgom Motorcycle Rental website",
  },
};

export default function Experiencia() {
  const idioma = useIdioma();
  const t = textos[idioma];

  return (
    <article className="card-projeto card-experiencia">
      <img className="projeto-midia exp-imagem" src={mirgom} alt={t.imagem} loading="lazy" />
      <div className="exp-corpo">
      <header className="exp-cabecalho">
        <div>
          <h3>{t.cargo}</h3>
          <p className="exp-empresa">{t.empresa}</p>
        </div>
        <p className="exp-meta">
          {t.periodo}
          <br />
          {t.local}
        </p>
      </header>

      <ul className="exp-lista">
        {t.atividades.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p>
        <strong>{t.tecnologias}</strong> React, TypeScript, Vite, React Router,
        Vercel
      </p>

      <div className="projeto-links">
        <a
          className="btn-link"
          href={SITE}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.ver}
        </a>
      </div>
      </div>
    </article>
  );
}
