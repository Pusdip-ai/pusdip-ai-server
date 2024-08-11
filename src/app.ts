import express from "express";
import dotenv from "dotenv";
import { logger, pinoHTTPMiddleware } from "./utils/logger";
import cors from "cors";
import articlesRouter from "./routers/articles";
// import logger from "pino-http";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(pinoHTTPMiddleware);
app.use(cors());

// Define a port from environment variables or default to 3000
const PORT = process.env.PORT ? +process.env.PORT : 3000;
const HOST = process.env.HOST || "localhost";

// Add routers
app.use("/articles", articlesRouter);

// Start the server
app.listen(PORT, HOST, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
