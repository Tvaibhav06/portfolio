import express, { type Express } from "express";
import pinoHttp from "pino-http";
import path from "node:path";
import { existsSync } from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found." }));

// A production build can serve the portfolio and API from one origin.
const publicDir = path.resolve(import.meta.dirname, "../../vaibhav-portfolio/dist/public");
if (existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*path}", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));
}

export default app;
