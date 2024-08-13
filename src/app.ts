import "dotenv/config";
import express from "express";
import { logger, pinoHTTPMiddleware } from "./utils/logger";
import cors from "cors";
import articlesRouter from "./routers/articles";
import bodyParser from "body-parser";
import puschatRouter from "./routers/puschat";

const PORT = process.env.PORT;
const HOST = process.env.HOST;

if (!PORT) {
  console.error("No port specified");
  process.exit(1);
}

if (!HOST) {
  console.error("No host specified");
  process.exit(1);
}

console.log(PORT, HOST);

// Create an Express application
const app = express();
// TODO change to regular pino not pretty when not in dev for performamce
app.use(pinoHTTPMiddleware);
app.use(cors());
app.use(bodyParser.json());

// Add routers
app.use("/articles", articlesRouter);
app.use("/puschat", puschatRouter);

// Start the server
app.listen(+PORT, HOST, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
