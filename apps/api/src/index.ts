import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import websocket from "@fastify/websocket";
import * as dotenv from "dotenv";
import { isAddress } from "ethers";

import { 
  runTreasuryWorkflow,
  watchWalletWorkflow,
  scanPositionWorkflow,
  alertCorrelator,
  prisma
} from "../../../packages/agents-core/src/index.ts";
import { registerLiveFeed, getClientCount, getReplayBufferSize } from "./websocket/liveFeed.ts";

dotenv.config();

const server = Fastify({ logger: true });

await server.register(cors, {
  origin: "*"
});

await server.register(websocket);

await server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

// ─── Metrics ────────────────────────────────────────────────────────────────
let whaleAlertsTotal = 0;
let liquidationAlertsTotal = 0;

alertCorrelator.onCompoundAlert((alert: any) => {
  if (alert.wwAlert) whaleAlertsTotal++;
  if (alert.lsAlert) liquidationAlertsTotal++;
});

// ✅ REGISTER LIVE FEED
await registerLiveFeed(server);

// ✅ EXISTING TREASURY API
server.post("/api/risk-scan", async (request, reply) => {
  try {
    const { address } = request.body as any;
    if (!address) return reply.status(400).send({ error: "Treasury address is required" });
    const result = await runTreasuryWorkflow(address);
    return reply.send(result);
  } catch (err) {
    console.error("API Error:", err);
    return reply.status(500).send({ error: "Internal server error", details: String(err) });
  }
});

// ✅ WHALEWATCH ROUTES
server.post("/whale", async (request, reply) => {
  const { address } = request.body as { address?: string };
  if (!address || !isAddress(address)) return reply.status(400).send({ error: "Invalid Ethereum address" });
  await watchWalletWorkflow.registerWallet(address);
  return { status: "registered", address, message: "Wallet registered for WhaleWatch." };
});

server.get("/alerts", async (request) => {
  const { address } = request.query as { address?: string };
  if (address && isAddress(address)) {
    const profile = watchWalletWorkflow.getWalletProfile(address);
    return { alerts: profile?.lastWWSnapshot ? [profile.lastWWSnapshot] : [] };
  }
  return { totalWhaleAlerts: whaleAlertsTotal, windowStats: alertCorrelator.windowStats() };
});

// ✅ LIQUIDSHIELD ROUTES
server.post("/position", async (request, reply) => {
  const { address } = request.body as { address?: string };
  if (!address || !isAddress(address)) return reply.status(400).send({ error: "Invalid Ethereum address" });
  await scanPositionWorkflow.registerPosition(address);
  return { status: "registered", address, message: "Position registered for LiquidShield." };
});

server.get("/health", async (request, reply) => {
  const { address } = request.query as { address?: string };
  if (!address || !isAddress(address)) return reply.status(400).send({ error: "Invalid Ethereum address" });
  const profile = scanPositionWorkflow.getWalletProfile(address);
  if (!profile || !profile.lastLSSnapshot) return reply.status(404).send({ error: "No position data found." });
  return { address, snapshots: profile.lastLSSnapshot };
});

// ✅ MONITORED WORKFLOWS
server.get("/api/monitored", async () => {
  const wallets = await prisma.wallet.findMany();
  const results = wallets.map((w: any) => {
    const wwProfile = watchWalletWorkflow.getWalletProfile(w.address);
    const lsProfile = scanPositionWorkflow.getWalletProfile(w.address);
    return {
      address: w.address,
      type: w.type,
      ww: wwProfile ? { active: true, lastAlert: wwProfile.lastWWSnapshot } : { active: false },
      ls: lsProfile ? { active: true, lastSnapshot: lsProfile.lastLSSnapshot } : { active: false }
    };
  });
  return results;
});

// ✅ METRICS
server.get("/metrics", async () => {
  return {
    uptime: process.uptime(),
    alerts: { whaleTotal: whaleAlertsTotal, liquidationTotal: liquidationAlertsTotal },
    correlator: alertCorrelator.windowStats(),
    websocket: { connectedClients: getClientCount(), replayBufferSize: getReplayBufferSize() }
  };
});

// ✅ LIVENESS CHECK
server.get("/healthz", async () => {
  try {
    await prisma.user.count();
    return { status: "ok", database: "connected" };
  } catch (err) {
    return { status: "error", database: "disconnected" };
  }
});

const PORT = Number(process.env.PORT || 3002);

const start = async () => {
  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`✅ API running on http://localhost:${PORT}`);

    // Start Workflows
    watchWalletWorkflow.startWorkflow();
    scanPositionWorkflow.startWorkflow();

    // Sync from local persistence shim
    const dbWallets = await prisma.wallet.findMany();
    for (const wallet of dbWallets) {
      if (isAddress(wallet.address)) {
        await watchWalletWorkflow.registerWallet(wallet.address);
        await scanPositionWorkflow.registerPosition(wallet.address);
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();