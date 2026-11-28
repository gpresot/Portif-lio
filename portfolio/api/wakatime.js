// Lê o JSON de uma resposta do WakaTime; devolve null se a consulta falhou.
async function lerDados(resultado) {
  if (resultado.status !== "fulfilled" || !resultado.value.ok) return null;

  try {
    const { data } = await resultado.value.json();
    return data ?? null;
  } catch {
    return null;
  }
}

function mapearLinguagens(lista) {
  return lista.map((item) => ({
    nome: item.name,
    segundos: item.total_seconds,
    porcentagem: item.percent,
  }));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const token = process.env.WAKATIME_TOKEN;

  if (!token) {
    return res.status(503).json({ erro: "Integração não configurada" });
  }

  try {
    const base = "https://wakatime.com/api/v1/users/current";
    const opcoes = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(10000),
    };

    // Semana e geral em paralelo; se o geral falhar, a semana continua funcionando.
    const [semana, geral, geralLinguagens] = await Promise.allSettled([
      fetch(`${base}/stats/last_7_days`, opcoes),
      fetch(`${base}/all_time_since_today`, opcoes),
      fetch(`${base}/stats/all_time`, opcoes),
    ]);

    const dadosSemana = await lerDados(semana);

    if (!dadosSemana || !Array.isArray(dadosSemana.languages)) {
      throw new Error("Falha na consulta");
    }

    const dadosGeral = await lerDados(geral);
    const statsGeral = await lerDados(geralLinguagens);

    // Enquanto o WakaTime calcula o geral, ele responde 202 com dados parciais: não usa.
    const totalGeralPronto =
      dadosGeral?.is_up_to_date !== false &&
      typeof dadosGeral?.total_seconds === "number";

    const linguagensGeralPronto =
      statsGeral?.is_up_to_date !== false &&
      Array.isArray(statsGeral?.languages);

    const geralPendente =
      dadosGeral?.is_up_to_date === false ||
      statsGeral?.is_up_to_date === false;

    // Envia somente as estatísticas escolhidas, sem projetos ou arquivos.
    const dados = {
      total: dadosSemana.total_seconds ?? 0,
      totalGeral: totalGeralPronto ? dadosGeral.total_seconds : null,
      media: dadosSemana.daily_average ?? 0,
      atualizado: dadosSemana.is_up_to_date !== false && !geralPendente,
      linguagens: mapearLinguagens(dadosSemana.languages),
      linguagensGeral: linguagensGeralPronto
        ? mapearLinguagens(statsGeral.languages)
        : null,
    };

    res.setHeader(
      "Cache-Control",
      dados.atualizado
        ? "public, max-age=0, s-maxage=300"
        : "no-store"
    );

    return res.status(200).json(dados);
  } catch {
    return res.status(502).json({
      erro: "Não foi possível consultar as estatísticas",
    });
  }
}
