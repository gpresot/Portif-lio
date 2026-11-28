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

    // Semana e total geral em paralelo; se o total geral falhar, a semana continua funcionando.
    const [semana, geral] = await Promise.allSettled([
      fetch(`${base}/stats/last_7_days`, opcoes),
      fetch(`${base}/all_time_since_today`, opcoes),
    ]);

    if (semana.status !== "fulfilled" || !semana.value.ok) {
      throw new Error("Falha na consulta");
    }

    const { data } = await semana.value.json();

    if (!data || !Array.isArray(data.languages)) {
      throw new Error("Resposta inválida");
    }

    // Total geral: só vale se o WakaTime terminou de calcular (senão volta 202 com dados parciais).
    let totalGeral = null;
    let geralAtualizado = true;

    if (geral.status === "fulfilled" && geral.value.ok) {
      try {
        const { data: dadosGeral } = await geral.value.json();
        geralAtualizado = dadosGeral?.is_up_to_date !== false;

        if (geralAtualizado && typeof dadosGeral?.total_seconds === "number") {
          totalGeral = dadosGeral.total_seconds;
        }
      } catch {
        totalGeral = null;
      }
    }

    // Envia somente as estatísticas escolhidas, sem projetos ou arquivos.
    const dados = {
      total: data.total_seconds ?? 0,
      totalGeral,
      media: data.daily_average ?? 0,
      atualizado: data.is_up_to_date !== false && geralAtualizado,
      linguagens: data.languages.map((item) => ({
        nome: item.name,
        segundos: item.total_seconds,
        porcentagem: item.percent,
      })),
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
