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
    const resposta = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!resposta.ok) {
      throw new Error("Falha na consulta");
    }

    const { data } = await resposta.json();

    if (!data || !Array.isArray(data.languages)) {
      throw new Error("Resposta inválida");
    }

    // Envia somente as estatísticas escolhidas, sem projetos ou arquivos.
    const dados = {
      total: data.total_seconds ?? 0,
      media: data.daily_average ?? 0,
      atualizado: data.is_up_to_date !== false,
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