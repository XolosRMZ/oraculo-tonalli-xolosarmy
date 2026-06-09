import Fastify, { type FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { buildTonalReading } from "./buildReading.js";
import { calculateTonalpohualli } from "./tonalpohualli.js";

const DEFAULT_PORT = 3000;
const SERVICE_NAME = "oraculo-tonalli-xolosarmy";

export function buildServer(): FastifyInstance {
  const server = Fastify({
    logger: false
  });

  void server.register(fastifyStatic, {
    root: join(process.cwd(), "src", "public")
  });

  server.get("/health", async () => ({
    ok: true,
    service: SERVICE_NAME
  }));

  server.get<{ Params: { date: string } }>("/api/tonalli/:date", async (request, reply) => {
    try {
      const result = calculateTonalpohualli(request.params.date);
      const reading = buildTonalReading(result);

      return {
        ok: true,
        result,
        reading
      };
    } catch (error) {
      return reply.status(400).send({
        ok: false,
        error: error instanceof Error ? error.message : "Invalid date."
      });
    }
  });

  return server;
}

async function start(): Promise<void> {
  const server = buildServer();

  try {
    await server.listen({ host: "0.0.0.0", port: DEFAULT_PORT });
    console.log(`http://localhost:${DEFAULT_PORT}`);
  } catch (error) {
    server.log.error(error);
    process.exitCode = 1;
  }
}

const isDirectRun =
  typeof process.argv[1] === "string" && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  void start();
}
