import Fastify, { type FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import QRCode from "qrcode";

import { buildTonalReading } from "./buildReading.js";
import { calculateTonalpohualli } from "./tonalpohualli.js";

const SERVICE_NAME = "oraculo-tonalli-xolosarmy";
const PAYMENT_URI = "ecash:qq7qn90ev23ecastqmn8as00u8mcp4tzsspvt5dtlk?amount=5000";
const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "public");

export function buildServer(): FastifyInstance {
  const server = Fastify({
    logger: false
  });

  void server.register(fastifyStatic, {
    root: publicRoot
  });

  server.get("/health", async () => ({
    ok: true,
    service: SERVICE_NAME
  }));

  server.get("/payment-qr.svg", async (_request, reply) => {
    const svg = await QRCode.toString(PAYMENT_URI, {
      errorCorrectionLevel: "M",
      margin: 1,
      type: "svg",
      width: 256
    });

    return reply.type("image/svg+xml").send(svg);
  });

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
  const port = Number(process.env.PORT) || 3000;
  const host = process.env.HOST || "0.0.0.0";

  try {
    await server.listen({ host, port });
    console.log(`http://${host}:${port}`);
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
