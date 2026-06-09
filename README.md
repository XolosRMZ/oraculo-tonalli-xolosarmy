# Oráculo Tonalli xolosArmy

Oráculo Tonalli xolosArmy is a TypeScript and Fastify application for generating Tonalpohualli-based date readings. It serves a static frontend from `src/public`, exposes JSON API endpoints, and includes CLI scripts for local readings and validation.

## Local Development

Install dependencies:

```sh
npm install
```

Run the API and static frontend locally:

```sh
npm run dev:api
```

The development server defaults to `http://0.0.0.0:3000`. Open `http://localhost:3000` in a browser.

Run tests and type checks:

```sh
npm test
npm run typecheck
```

## CLI Usage

Generate a Tonalli reading from the command line:

```sh
npm run read:tonalli -- YYYY-MM-DD
```

Run the Tonalpohualli CLI test script:

```sh
npm run test:tonalpohualli
```

## API Endpoints

`GET /health`

Returns a simple health check response for deployment and monitoring.

`GET /api/tonalli/:date`

Returns the Tonalpohualli calculation and reading for an ISO date such as `2026-06-09`.

`GET /payment-qr.svg`

Returns the current payment QR code as SVG.

## Payment MVP Note

Payments are currently an MVP flow based on a static eCash payment URI and QR code. Automated payment verification, Chronik integration, fulfillment gating, and ledger reconciliation are intentionally not implemented yet.

## Cultural Disclaimer

This project is a contemporary educational and interpretive tool inspired by the Tonalpohualli. It is not a replacement for community knowledge, ceremonial guidance, or lineage-based teaching. Use the readings respectfully and avoid presenting generated output as authoritative Indigenous spiritual instruction.

## Deployment

Build the project:

```sh
npm run build
```

The build compiles TypeScript into `dist` and copies `src/public` into `dist/public` for production static serving.

Start the production server:

```sh
npm start
```

Production entry point:

```sh
node dist/server.js
```

## Environment Variables

`PORT`

Server port. Defaults to `3000`.

`HOST`

Server bind host. Defaults to `0.0.0.0`.

## Health Check

Use this endpoint for platform health checks:

```sh
GET /health
```
