// 1. Pegar os elementos da página
const busca = document.getElementById("busca");
const lista = document.getElementById("lista");
const itens = document.querySelectorAll("#lista li");

// 2. Ao clicar na barra, mostrar a lista
busca.addEventListener("click", function () {
  lista.classList.remove("escondido");
});

// 3. Ao digitar, mostrar só os itens que combinam
busca.addEventListener("input", function () {
  lista.classList.remove("escondido");

  const texto = busca.value.toLowerCase();

  for (let i = 0; i < itens.length; i++) {
    const nome = itens[i].textContent.toLowerCase();

    if (nome.includes(texto)) {
      itens[i].classList.remove("escondido");
    } else {
      itens[i].classList.add("escondido");
    }
  }
});

// 4. Ao clicar em um item, mostrar o texto dele
const infos = {
"sobre": `
  <img src="../portfolio/src/assets/perfil.jpg" alt="Foto de Guilherme Presot" class="foto-sobre">

  <p>Olá! Eu sou o Presot, tenho 19 anos e moro em Belo Horizonte. Programo desde os 16 anos e hoje estou no 2º período de Engenharia de Software na PUC Minas.</p>

  <h3>Minha história</h3>
  <p>Estudei no <a href="https://cmbh.eb.mil.br/" target="_blank" rel="noopener noreferrer">
        Colégio Militar de Belo Horizonte
    </a> (CMBH) de 2021 até 2025. Foi lá que, incentivado pelos meus amigos, comecei a frequentar as aulas de programação oferecidas à tarde. Até então, meu objetivo era passar em um concurso militar, mas essa experiência despertou meu interesse pela tecnologia e me fez enxergar novas possibilidades para o futuro. Com o <strong>Cel. Arnalberto</strong>, um professor excepcional, aprendi não só a programar em linguagem C, mas também a desenvolver minha lógica de programação. Essas aulas foram fundamentais para minha decisão de seguir na área de software.</p>

  <h3>Tecnologias</h3>
  <p>  Tenho experiência com <strong>C, Python e Java, além de HTML, CSS e JavaScript</strong>.
  Utilizo <strong>Git</strong> para controle de versão e <strong>GitHub</strong> para hospedar meus
  repositórios e colaborar em projetos. Atualmente, estou aprendendo
  React e tenho interesse em cibersegurança.</p>

  <h3>Currículo</h3>
  <p>Veja meu currículo para conhecer minha formação e meus conhecimentos.</p>

    <a href="../portfolio/public/curriculo.pdf"
    target="_blank"
    rel="noopener noreferrer"
    class="btn-curriculo">
    📄 Ver currículo
    </a>

  <h3>Mais sobre mim</h3>
  
    <p>⚽ Gosto de jogar bola e praticar esportes</p>
    <p>🐓 Sou galo doido!</p>
    <p>✈️ Curto viajar e conhecer lugares novos</p>
    <p>☕ Um café sempre vai bem</p>
    <p>🎯 Sempre disposto a aprender algo novo.</p>
 
`,

  "curso": `
  <br>
  <div class="cursos">
    <article class="card-curso">
      <span class="instituicao">FGV Online</span>
      <h3>Desenvolvimento de Sistemas Web: CSS e HTML</h3>
      <p>15 horas · Concluído em 2026</p>
      <p>Criação de páginas web com HTML e CSS, Flexbox, Grid e responsividade.</p>
    </article>

    <article class="card-curso">
      <span class="instituicao">Inatel</span>
      <h3>Start Engenharia – Computação e Software</h3>
      <p>Participação nas edições de 2024 e 2025</p>
      <p>Lógica de programação e resolução de desafios em equipe.</p>
    </article>

    <article class="card-curso">
      <span class="instituicao">FGV Online</span>
      <h3>Introdução ao Git e GitHub</h3>
      <p>15 horas · Concluído em 2026</p>
      <p>Controle de versão e gerenciamento de repositórios.</p>
    </article>

    <article class="card-curso">
      <span class="instituicao">Curso em Vídeo</span>
      <h3>Algoritmos e Lógica de Programação</h3>
      <p>40 horas · Concluído em 2024</p>
      <p>Lógica de programação e resolução de exercícios.</p>
    </article>
  </div>
`,

    "projetos": `
  <br>
  <article class="card-projeto">
  <img src="../portfolio/src/assets/cofesite.png" alt="Página inicial do site de cafeteria">

  <h3>Site de cafeteria - 2026.1</h3>
  <p>
    Site básico desenvolvido para apresentar uma cafeteria, com página
    inicial, cardápio e informações sobre o estabelecimento.
  </p>

  <p><strong>Tecnologias:</strong> HTML e CSS</p>

  <a href="https://github.com/gpresot/cofee-site.git" target="_blank" rel="noopener noreferrer">
    Ver projeto
  </a>
</article>

  <article class="card-projeto">
  <br>
  <video class="video-projeto" autoplay loop muted playsinline>
  <source src="../portfolio/src/assets/frangonalta.mp4" type="video/mp4">
</video>

  <h3>Frangonauta - 06/2026</h3>
  <p>
    Jogo tipo Flappy Bird desenvolvido em equipe como projeto final da disciplina de
    Introdução a Algoritmos/Programação. O jogador controla um frango
    astronauta que precisa desviar de meteoros e coletar batatas assadas,
    chegando ao final do mapa em até 30 segundos.
  </p>

  <p><strong>Tecnologias:</strong> Python e Pygame</p>
  <p><strong>Aprendizados:</strong> Lógica de programação, desenvolvimento de jogos e trabalho em equipe.</p>

  <a href="https://github.com/gpresot/frangonauta"
     target="_blank"
     rel="noopener noreferrer">
    Ver projeto
  </a>
</article>

<article class="card-projeto">
<br>
<img src="../portfolio/src/assets/climaapi.png" alt="Página inicial do site de cafeteria">
  <h3>🌦️ Clima BH API - 2026.2</h3>

  <p>
    API REST feita em dupla que consulta dados meteorológicos de Belo Horizonte,
    Nova Lima, Betim e Contagem por meio da Open-Meteo.
    Retorna dados em JSON, incluindo temperatura atual, previsão
    de máximas e mínimas, umidade e velocidade do vento.
  </p>

  <p><strong>Tecnologias:</strong> Java, Spring Boot, Maven e RestTemplate.</p>

  <p>
    <strong>Aprendizados:</strong> Criação de endpoints REST,
    consumo de API externa e organização em Controller e Service.
  </p>

  <a href="https://github.com/gpresot/DIAW-API-Clima.git"
     target="_blank"
     rel="noopener noreferrer">
    Ver projeto
  </a>
</article>
`,

    "contato": `
  <br>
  <h3>Vamos conversar?</h3>
<p>
  Entre em contato comigo para conversar sobre tecnologia,
  projetos e oportunidades.
</p>

<div class="links-contato">
  <a href="mailto:gui.presot@gmail.com">📧 E-mail</a>

  <a href="presot_" target="_blank" rel="noopener noreferrer">
    🎮 Discord
  </a>

  <a href="https://www.linkedin.com/in/guilhermepresot/" target="_blank" rel="noopener noreferrer">
    💼 LinkedIn
  </a>

  <a href="https://github.com/gpresot" target="_blank" rel="noopener noreferrer">
    💻 GitHub
  </a>

  <a href="https://www.instagram.com/guilherme_presot/"
     target="_blank" rel="noopener noreferrer">
    📷 Instagram
  </a>
</div>
`};


for (let i = 0; i < itens.length; i++) {
  itens[i].addEventListener("click", function () {
    const destino = itens[i].dataset.destino;

    document.getElementById("detalhes-titulo").innerHTML = itens[i].innerHTML;
    document.getElementById("detalhes-texto").innerHTML = infos[destino];
    document.getElementById("detalhes").classList.remove("escondido");

    busca.value = "";
    lista.classList.add("escondido");
    mostrarTodos();
  });
}

// 5. Esc fecha a lista
busca.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    lista.classList.add("escondido");
  }
});

// 6. Clicar fora fecha a lista
document.addEventListener("click", function (evento) {
  const caixa = document.querySelector(".busca-caixa");

  if (!caixa.contains(evento.target)) {
    lista.classList.add("escondido");
  }
});

// Função auxiliar: faz todos os itens voltarem a aparecer
function mostrarTodos() {
  for (let i = 0; i < itens.length; i++) {
    itens[i].classList.remove("escondido");
  }
}




