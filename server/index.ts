import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { analyzeListing } from "./analyze";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API route to analyze a Barcelona rental listing (using URL or raw text).
  // En Vercel la misma lógica se sirve desde api/analyze.ts.
  app.post("/api/analyze", async (req, res) => {
    const { text, url } = req.body;
    if (!text && !url) {
      return res.status(400).json({ error: "Debe proporcionar un texto o URL de la oferta." });
    }

    res.json(await analyzeListing({ text, url }));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
