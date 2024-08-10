import pinoHTTP from "pino-http";

export const pinoHTTPMiddleware = pinoHTTP({
  transport: {
    target: "pino-pretty",
  },
});

export const logger = pinoHTTPMiddleware.logger;
