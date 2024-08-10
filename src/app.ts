// ESM
import Fastify from "fastify";
import cors from "@fastify/cors";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const environment =
  (process.env.NODE_ENV as keyof typeof envToLogger) ?? "development";
const fastify = Fastify({
  logger: envToLogger[environment] ?? true,
});

await fastify.register(cors, {
  // put your options here
});

const port = process.env.PORT ? +process.env.PORT : 3000;
const host = process.env.HOST || "localhost";

fastify.get("/", async (request) => {
  request.log.info("Some info about the current request");
  return { hello: "world" };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port, host });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

await start();
