## 🥊 Chain Sentinel — Real-time on-chain intelligence platform

Real-time on-chain intelligence platform

An AI-powered on-chain security agent for DeFi treasuries. Chain Sentinel doesn't react to loss—**it prevents loss**.

> **Built for the Electron 8.0 – AI Agent Hackathon** 🚀
> *Hosted by IQAI, OpenMind, and EwhaChain*

---

### What Makes Chain Sentinel Perfect for This Hackathon

✅ Built entirely with **ADK-TS** (Agent Development Kit – TypeScript)       
✅ Multi-agent AI system for autonomous decision-making             
✅ Deployed on **ATP** (Agent Tokenization Platform)            
✅ On-chain security agent with real-world DeFi impact           
✅ Production-ready monorepo architecture         
✅ Fully open-source and transparent

---

## 🎯 The Problem

Decentralized Finance has unlocked trillion-dollar opportunities—but it has also created one of the most dangerous financial environments ever built.

Today, DeFi users, DAOs, and treasuries face:

- ❌ Rug pulls
- ❌ Smart contract exploits
- ❌ Overexposure to a single asset
- ❌ Liquidity collapses
- ❌ Human delay in risk response
- ❌ No real-time defensive AI layer

Most security systems in DeFi are:

- **Reactive** → they respond *after* funds are lost
- **Manual** → humans must interpret dashboards
- **Slow** → attacks happen in seconds

### ⚠️ The Truth

> In DeFi, **by the time you "notice" risk, it is already too late.**

---

## ✅ The Solution

**Chain Sentinel is an AI-powered on-chain security agent that acts as a real-time defensive layer for DeFi treasuries.**

Instead of waiting for damage, Chain Sentinel:

✅ Continuously monitors treasury activity
✅ Analyzes DeFi exposure using AI agents
✅ Detects financial and protocol-level risk
✅ Predicts dangerous concentration patterns
✅ Generates real-time protective actions
✅ Acts as a **digital bodyguard for DeFi funds**

> **Chain Sentinel doesn't react to loss. It prevents loss.**

---

## 🚀 How It Works (In 3 Steps)

Users just:

1. **Enter** their treasury address
2. **Click** "Scan"
3. **Instantly get**:
   - Risk score
   - Exposure breakdown
   - AI-generated protection advice

### Example Output:

```
❗ "Your treasury is 78% exposed to one asset."
❗ "Liquidity risk detected."
✅ "Diversification recommended."
✅ "Reduce exposure to prevent cascade failure."
```

---

## 🏛️ Project Structure

Chain Sentinel is built as a **full-stack, AI-powered DeFi security system** with a **modular, scalable monorepo architecture**.

```
ChainSentinel/
├── apps/                    # User-facing applications
│   ├── api/                 # Backend API (Fastify)
│   │   ├── src/
│   │   │   ├── routes/      # API endpoints
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── services/    # Business logic
│   │   │   ├── config/      # Configuration
│   │   │   ├── middlewares/ # Error handling
│   │   │   └── types/       # TypeScript types
│   │   └── package.json
│   └── web/                 # Frontend Dashboard (Next.js)
│       ├── src/
│       │   ├── app/         # Page routes
│       │   ├── components/  # UI components
│       │   ├── hooks/       # Custom hooks
│       │   ├── lib/         # Utilities
│       │   └── types/       # Types
│       └── package.json
├── packages/                # Shared libraries
│   └── agents-core/         # AI Agent system
│       ├── src/
│       │   ├── agents/      # AI workers
│       │   ├── tools/       # External capabilities
│       │   ├── workflows/   # Agent orchestration
│       │   ├── memory/      # Historical data
│       │   ├── policies/    # Risk policies
│       │   ├── schemas/     # Data schemas
│       │   └── types.ts     # Shared types
│       └── package.json
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # System design
│   ├── DEMO-SCRIPT.md       # Video narration
│   ├── JUDGING-MAP.md       # Hackathon mapping
│   ├── ATP-DEPLOYMENT.md    # ATP integration
│   ├── API-DOCS.md          # API reference
│   └── ROADMAP.md           # Future vision
├── scripts/                 # Automation scripts
│   ├── build-all.ts         # Build entire project
│   ├── deploy-atp.ts        # Deploy agent to ATP
│   └── seed-demo-data.ts    # Add demo data
├── .github/                 # CI/CD workflows
├── tsconfig.base.json       # Global TypeScript config
├── pnpm-workspace.yaml      # Monorepo workspace
└── .env.example             # Environment template
```

---

## 📊 Architecture Overview

```
User → Web Dashboard → API → AI Agents → Risk Analysis → Protection Advice → User
```

### Core Components:

| Component      | Technology      | Role                          |
| -------------- | --------------- | ----------------------------- |
| **Web**        | Next.js + React | User interface & dashboard    |
| **API**        | Fastify + TS    | Backend server & orchestrator |
| **Agents**     | ADK-TS          | AI decision-making engine     |
| **Tools**      | RPC/DeFi APIs   | Blockchain & protocol access  |
| **Policies**   | Config files    | Risk management rules         |

---

## 🤖 AI Agent System

Chain Sentinel runs a **multi-agent AI system** where each agent is specialized and autonomous:

| AI Agent             | Role                              |
| -------------------- | --------------------------------- |
| **Watcher Agent**    | Reads treasury & asset balances   |
| **Risk Agent**       | Calculates exposure & danger      |
| **Planner Agent**    | Generates safety actions          |
| **Governance Agent** | Enforces policy constraints       |

### How They Work Together:

1. **Watcher** → Fetches treasury data from blockchain
2. **Risk Agent** → Analyzes exposure & detects patterns
3. **Planner** → Generates protection recommendations
4. **Governance** → Validates against user policies

---

## 🧠 Built with ADK-TS

Chain Sentinel is **fully implemented using IQAI's Agent Development Kit for TypeScript (ADK-TS)**, the industry standard for building autonomous AI agents on blockchain.

### ADK-TS Implementation

Our four specialized agents are built using `AgentBuilder` pattern:

```typescript
// Example: Risk Analysis Agent using ADK-TS
import { AgentBuilder } from "@iqai/adk";

export async function initRiskAgent() {
  return await AgentBuilder.create("risk_analysis_agent")
    .withModel("qwen2.5")
    .withInstruction("Analyze treasury concentration and financial risk...")
    .build();
}
```

### Agent Architecture

Each agent follows the ADK-TS pattern:

**1. Watcher Agent** – Real-time Treasury Monitor
```typescript
import { AgentBuilder } from "@iqai/adk";
// Fetches on-chain data using RPC calls
// Validates treasury balances and positions
// Returns structured TreasurySnapshot
```

**2. Risk Agent** – Autonomous Risk Analyzer
```typescript
// Uses ADK-TS AgentBuilder for LLM decision-making
// Analyzes concentration, diversification, and size risk
// Generates risk scores with deterministic fallbacks
// Returns RiskResult with level (LOW/MEDIUM/HIGH)
```

**3. Planner Agent** – Protection Strategy Generator
```typescript
// Generates mitigation actions based on risk assessment
// Returns structured ProtectionPlan with action types:
// - ALERT: Notify operators
// - REDUCE: Lower exposure
// - DIVERSIFY: Add assets
```

**4. Governance Agent** – Policy Enforcer
```typescript
// Final safety decision-maker
// Enforces hard rules: HIGH risk + large treasury = BLOCKED
// Uses ADK-TS LLM with deterministic fallbacks
// Returns GovernanceDecision with approval/block reasoning
```

### LLM Integration with ADK-TS

Chain Sentinel uses a **LLM + Deterministic Fallback Pattern**:

```typescript
// ADK Agent calls LLM (Qwen model)
const llmResponse = await callQwenLLM(prompt);

// Robust JSON extraction from LLM response
const parsed = extractJSON<RiskResult>(llmResponse);

// Validates structure and types
if (validated) {
  return llmResult;
}

// Falls back to deterministic logic if LLM response malformed
return treasuryTools.generateBaseRisk(snapshot);
```

### Tools & Capabilities

ADK-TS agents leverage custom tools:

```typescript
export const treasuryTools = {
  analyzeConcentration: (snapshot) => {...},
  analyzeSizeExposure: (totalValue) => {...},
  generateBaseRisk: (snapshot) => {...}
};
```

### Multi-Agent Orchestration Workflow

All agents are orchestrated in a **sequential decision pipeline** using ADK-TS:

```typescript
export async function runTreasuryWorkflow(address: string) {
  // 1. Initialize all ADK agents
  await initRiskAgent();
  await initPlannerAgent();
  await initGovernanceAgent();

  // 2. Run sequential pipeline
  const snapshot = await watchTreasury(address);        // Watcher
  const risk = await analyzeRisk(snapshot);             // Risk Agent (ADK)
  const plan = await generateProtectionPlan(risk);      // Planner Agent (ADK)
  const governance = await enforceGovernance({...});    // Governance Agent (ADK)

  return { snapshot, risk, plan, governance };
}
```

### Why ADK-TS?

- ✅ **Native TypeScript support** – Full type safety across agent ecosystem
- ✅ **AgentBuilder pattern** – Declarative, composable agent definitions
- ✅ **LLM flexibility** – Supports Gemini, GPT-4, Claude, custom models
- ✅ **Production-ready** – Error handling, timeouts, retries built-in
- ✅ **ATP compatible** – Agents launch directly on IQAI's ATP platform
- ✅ **Deterministic fallbacks** – Never fails completely, always returns valid decisions
- ✅ **Tool integration** – Seamless blockchain and external API access

### Deployment Ready

Chain Sentinel's ADK-TS agents are ready for **ATP (Agent Tokenization Platform)** deployment, where they will operate as autonomous, tokenized agents on IQAI's infrastructure.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

### Backend
- **Fastify** - HTTP server
- **TypeScript** - Type safety
- **Node.js** - Runtime

### AI/Agents
- **ADK-TS** - Agent framework
- **Vector Store** - Memory & learning
- **JSON Schemas** - Data validation

### Blockchain
- **Web3.js / ethers.js** - RPC calls
- **Multi-chain** - Support for major chains
- **Real-time indexing** - Live data feeds

### DevOps
- **pnpm** - Package manager
- **Monorepo** - Workspace structure
- **TypeScript** - Global type safety
- **GitHub Actions** - CI/CD

---

## 📋 Features

### ✅ Current (MVP)

- [x] Treasury scanning via contract address
- [x] Real-time risk assessment
- [x] Asset exposure analysis
- [x] Protection recommendation engine
- [x] Web dashboard interface
- [x] REST API endpoints
- [x] Multi-chain support
- [x] Risk policy configurations

### 🚀 Roadmap

- [ ] Automated on-chain execution
- [ ] Advanced vector memory system
- [ ] Cross-chain risk aggregation
- [ ] Real-time notifications
- [ ] DAO governance integration
- [ ] ATP protocol deployment
- [ ] Autonomous defense layer
- [ ] Global security network

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- An Ethereum RPC endpoint
- An API key (for price feeds if needed)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vismaygawai/ChainSentinel.git
   cd ChainSentinel
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your RPC URLs and API keys
   ```

4. **Build the project**
   ```bash
   pnpm run build
   ```

### Running Locally

#### Start the Backend API

```bash
cd apps/api
pnpm run dev
```

The API will start on `http://localhost:3001`

#### Start the Frontend

```bash
cd apps/web
pnpm run dev
```

The dashboard will be available at `http://localhost:3000`

### Using the API

**Scan a treasury for risk:**

```bash
curl -X POST http://localhost:3001/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "treasuryAddress": "0x1234...",
    "chainId": 1,
    "riskPolicy": "balanced"
  }'
```

**Response:**

```json
{
  "riskScore": 7.2,
  "exposure": {
    "ETH": 45,
    "USDC": 30,
    "USDT": 25
  },
  "alerts": [
    "High concentration in single stablecoin",
    "Potential liquidity risk detected"
  ],
  "recommendations": [
    "Diversify stablecoin holdings",
    "Consider rebalancing to reduce concentration"
  ],
  "protectionActions": [
    {
      "action": "REDUCE_EXPOSURE",
      "token": "USDC",
      "targetPercentage": 15
    }
  ]
}
```

---

## 📚 API Documentation

See [`docs/API-DOCS.md`](docs/API-DOCS.md) for detailed endpoint documentation.

---

## 🔗 Hackathon Resources & Support

### Communication & Support

- 💬 **GitHub Discussion:** https://github.com/vismaygawai/ChainSentinel/discussions/
- 🐦 **Discord Channel:** https://discord.gg/UbQaZkznwr
- 📺 **YouTube Channel:** https://www.youtube.com/@iqtoken

### ADK-TS (Agent Development Kit for TypeScript)

- 📚 **ADK-TS GitHub Repo:** https://github.com/IQAIcom/adk-ts
- 📖 **ADK-TS Docs:** https://adk.iqai.com/
- 🔧 **ADK-TS Project Samples:** https://github.com/IQAIcom/adk-ts-samples
- 🚀 **ADK-TS Starter Templates:** https://github.com/IQAIcom/adk-ts/tree/main/apps/starter-templates
- 🎬 **ADK-TS Intro Playlist:** https://www.youtube.com/playlist?list=PLAohU1RSbOGWsYlQAiQKUQ9AktdlPbfp7
- 📹 **Previous Workshops:** https://youtube.com/playlist?list=PLAohU1RSbOGXm4aoA7XNkXN9JDHDT_nqP

### ATP (Agent Tokenization Platform)

- 🌐 **Official Website:** https://iqai.com/
- 📘 **ATP Launch Guide:** https://learn.iq.wiki/iq/iq/agent-tokenization-platform-atp/launching-tokenized-agent-on-atp

### OpenMind

- 🔗 **GitHub (OM1):** https://openmind.org
- 📚 **Documentation:** https://docs.openmind.org/api-reference/introduction
- 🎓 **Tutorials:** https://docs.openmind.org/examples/overview

---

## 📚 API Documentation

See [`docs/API-DOCS.md`](docs/API-DOCS.md) for detailed endpoint documentation.

---

## 🏗️ System Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for detailed system design and data flow diagrams.

---

## 🎬 Demo & Testing

### Run Demo Script

```bash
pnpm run seed-demo
```

This loads example treasuries and their risk profiles.

### Watch the Demo Video Script

See [`docs/DEMO-SCRIPT.md`](docs/DEMO-SCRIPT.md) for the narration of how to present Chain Sentinel.

---

## 🏆 What Makes Chain Sentinel Unique

| Aspect              | Traditional Tools    | Chain Sentinel              |
| ------------------- | -------------------- | -------------------- |
| **Approach**        | Static dashboards    | Live AI monitoring   |
| **Decision-Making** | Manual               | Automated            |
| **Response Time**   | Reactive (too slow)  | Preventive (real-time)|
| **User Interaction**| Complex dashboards   | One-click scanning   |
| **Scalability**     | Limited              | Autonomous network   |

> Chain Sentinel is not just a dashboard. **It is a combat-ready AI defense system for DeFi.**

---

## 💼 Use Cases

- 🔐 **DAOs** - Protect treasury assets
- 🔐 **Crypto Funds** - Manage fund risk
- 🔐 **DeFi Startups** - Monitor protocol safety
- 🔐 **Treasury Managers** - Real-time oversight
- 🔐 **Web3 Security Teams** - Automated monitoring
- 🔐 **Hackathon Projects** - Prize vault protection

---

## 🔮 Vision for the Future

Chain Sentinel is designed to evolve into:

✅ A **fully autonomous DeFi firewall**
✅ A **global network of security agents**
✅ A **DAO-governed on-chain defense protocol**
✅ A **real-time AI risk intelligence layer for Web3**

Long-term, Chain Sentinel can:

- Block malicious treasury flows automatically
- Execute defensive transactions on-chain
- Coordinate security across multiple chains
- Protect billions in DeFi capital

---

## 📖 Documentation

Complete documentation available in the [`docs/`](docs/) folder:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design & data flow
- **[API-DOCS.md](docs/API-DOCS.md)** - REST API reference
- **[DEMO-SCRIPT.md](docs/DEMO-SCRIPT.md)** - Video presentation script
- **[ATP-DEPLOYMENT.md](docs/ATP-DEPLOYMENT.md)** - How to deploy to ATP
- **[JUDGING-MAP.md](docs/JUDGING-MAP.md)** - Hackathon evaluation mapping
- **[ROADMAP.md](docs/ROADMAP.md)** - Future development plan

---

## 🧪 Testing

Run tests:

```bash
pnpm run test
```

Run linting:

```bash
pnpm run lint
```

Build all packages:

```bash
pnpm run build
```

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

This project is licensed under the MIT License - see LICENSE file for details.

---

Chain Sentinel is built with ❤️ for DeFi security.

### Hackathon Organizers

**IQAI** - Integrates artificial intelligence with decentralized finance through the Agent Tokenization Platform (ATP). Enables developers to create, deploy, and manage tokenized AI agents that operate autonomously within blockchain ecosystems.

**OpenMind** - Creating the universal operating system for intelligent machines. The OM1 platform allows robots and intelligent systems to perceive, adapt, and act in human environments, powered by FABRIC, a decentralized coordination layer. Based in San Francisco and founded by a Stanford-led team.

**EwhaChain** - The blockchain academic society at Ewha Womans University, empowering students to become active contributors to Korea's blockchain ecosystem through structured learning and hands-on project experience.

### Prize Sponsors

- 🌾 **Frax Finance** - Leader in stablecoin technology
- 🇰🇷 **KRWQ** - First digital Korean Won

---

## 🚨 Security Disclaimer

Chain Sentinel provides risk assessment and recommendations. Always conduct your own due diligence. AI predictions are not financial advice. Use at your own risk.

---


## 🥊 Final Tagline

> **Chain Sentinel — Real-time on-chain intelligence platform**

DeFi is powerful.
DeFi is open.
But DeFi is also dangerous.

**Chain Sentinel exists for one reason:**

🥊 *To fight risk before it destroys your protocol.*

---

**Built with AI. Secured by Intelligence. Protected by Chain Sentinel.** 🚀
