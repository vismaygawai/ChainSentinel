"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-black text-blue-600 uppercase tracking-tighter">
              Chain Sentinel
            </h1>

          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="font-black uppercase text-xs tracking-widest hover:text-blue-600 transition"
            >
              Features
            </a>
            <a
              href="https://github.com/vismaygawai/ChainSentinel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black uppercase text-xs tracking-widest hover:text-blue-600 transition"
            >
              GitHub
            </a>
            <Link href="/dashboard">
              <button className="border-4 border-black px-5 py-2 font-black uppercase text-xs bg-blue-600 text-white hover:bg-blue-500 shadow-[4px_4px_0px_#000] transition">
                Launch App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Content */}
          <div className="space-y-10">
            <div className="inline-block border-4 border-black px-5 py-1 font-black uppercase text-xs tracking-widest bg-blue-50">
              Autonomous DeFi Protection Agent
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[1.05] tracking-tight">
              AI Risk <br /> & Rebalancing <br /> For DeFi Treasuries
            </h1>

            <p className="text-sm md:text-base font-semibold text-blue-600 max-w-xl tracking-wide">
              Real-time on-chain intelligence platform
            </p>

            <p className="text-lg font-semibold text-gray-700 max-w-xl leading-relaxed">
              Chain Sentinel continuously monitors high-value DeFi treasury wallets,
              assigns real-time risk scores, and auto-generates protection actions
              using multi-agent AI governance.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/dashboard">
                <button className="px-10 py-4 bg-blue-600 text-white hover:bg-blue-500 border-4 border-black font-black uppercase shadow-[6px_6px_0px_#000] transition">
                  → Scan Treasury
                </button>
              </Link>

              <a
                href="https://github.com/vismaygawai/ChainSentinel"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white border-4 border-black font-black uppercase shadow-[6px_6px_0px_#000] hover:bg-gray-50 transition text-center"
              >
                → View Code
              </a>
            </div>
          </div>

          {/* Visual section removed as requested */}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-black uppercase text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Feature 1: WhaleWatch */}
            <div className="border-4 border-black p-10 shadow-[8px_8px_0px_#000] bg-white space-y-5">
              <div className="text-5xl font-black text-blue-600">01</div>
              <h3 className="font-black uppercase text-xl">
                WhaleWatch Radar
              </h3>
              <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                Real-time tracking of massive on-chain fund movements. Uses AI to classify intent—from exchange dumps to strategic accumulation.
              </p>
            </div>

            {/* Feature 2: LiquidShield */}
            <div className="border-4 border-black p-10 shadow-[8px_8px_0px_#000] bg-white space-y-5">
              <div className="text-5xl font-black text-blue-600">02</div>
              <h3 className="font-black uppercase text-xl">
                LiquidShield Protection
              </h3>
              <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                Autonomous monitoring of Aave V3 positions. Rebalances collateral and repays debt instantly when health factors hit risk-tiered thresholds.
              </p>
            </div>

            {/* Feature 3: Multi-Agent Governance */}
            <div className="border-4 border-black p-10 shadow-[8px_8px_0px_#000] bg-white space-y-5">
              <div className="text-5xl font-black text-blue-600">03</div>
              <h3 className="font-black uppercase text-xl">
                Agent Governance
              </h3>
              <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                Decentralized agent consensus verifies every action. Correlates signals across pipelines to detect complex multi-stage threats.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

          <div>
            <h4 className="font-black uppercase text-lg mb-3">
              Built with ADK-TS
            </h4>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              Chain Sentinel uses IQAI’s Agent Development Kit for TypeScript to run
              decentralized risk governance and protection logic.
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase text-lg mb-3">
              ATP Ready
            </h4>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              After submission, Chain Sentinel deploys as a fully autonomous on-chain
              agent on ATP.
            </p>
          </div>
        </div>

        <div className="border-t-4 border-black" />

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-6">
          <p className="text-xs font-black uppercase text-gray-600">
            © 2026 Chain Sentinel
          </p>

          <div className="flex gap-8">
            <a
              href="https://github.com/vismaygawai/ChainSentinel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase hover:text-blue-600 transition"
            >
              GitHub
            </a>
            
          </div>
        </div>
      </footer>

    </main>
  );
}
