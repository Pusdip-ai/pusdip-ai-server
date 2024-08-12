import "dotenv/config";
import express from "express";
import { logger, pinoHTTPMiddleware } from "./utils/logger";
import cors from "cors";
import articlesRouter from "./routers/articles";
import bodyParser from "body-parser";
import puschatRouter from "./routers/puschat";

// import logger from "pino-http";

// Create an Express application
const app = express();
// TODO change to regular pino not pretty when not in dev for performamce
app.use(pinoHTTPMiddleware);
app.use(cors());
app.use(bodyParser.json());

// Define a port from environment variables or default to 3000
const PORT = process.env.PORT ? +process.env.PORT : 3000;
const HOST = process.env.HOST || "localhost";

// Add routers
app.use("/articles", articlesRouter);
app.use("/puschat", puschatRouter);

// Start the server
app.listen(PORT, HOST, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
