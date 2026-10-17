export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const token = process.env.WAKATIME_TOKEN;

  if (!token) {
    return res.status(503).json({ erro: "Integração não configurada" });
  }

  try {
    const date = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const resposta = await fetch(
      `https://wakatime.com/api/v1/users/current/heartbeats?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!resposta.ok) {
      return res.status(502).json({
        erro: "Não foi possível consultar o WakaTime",
      });
    }

    const resultado = await resposta.json();

    if (!Array.isArray(resultado.data)) {
      return res.status(502).json({ erro: "Resposta inválida do WakaTime" });
    }

    const agora = Date.now() / 1000;

    const ultimo = resultado.data.reduce((atual, item) => {
      if (
        typeof item.time !== "number" ||
        !Number.isFinite(item.time) ||
        item.time > agora
      ) {
        return atual;
      }

      return !atual || item.time > atual.time ? item : atual;
    }, null);

    const ativo = Boolean(ultimo && agora - ultimo.time <= 300);

    // Retorna somente o status. Nenhum nome de projeto ou arquivo é enviado.
    return res.status(200).json({ ativo });
  } catch {
    return res.status(502).json({
      erro: "Não foi possível consultar o WakaTime",
    });
  }
}