import type { VercelRequest, VercelResponse } from "@vercel/node";
import { analyzeListing } from "../server/analyze";

/**
 * Equivalente serverless de la ruta POST /api/analyze del Express local.
 * En Vercel no corre `server/index.ts`, así que sin este archivo el
 * analizador de ofertas devolvería 404 en producción.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  const { text, url } = (req.body ?? {}) as { text?: string; url?: string };
  if (!text && !url) {
    return res.status(400).json({ error: "Debe proporcionar un texto o URL de la oferta." });
  }

  return res.json(await analyzeListing({ text, url }));
}
