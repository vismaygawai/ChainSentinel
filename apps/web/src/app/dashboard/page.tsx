
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  runRiskScan, 
  registerWhaleWatcher, 
  registerLiquidShield,
  getHealthSnapshots,
  getWhaleAlerts
} from "@/lib/api";
import { 
  TreasuryScanResult, 
  WalletInfo, 
  LiquidShieldPosition 
} from "@/types/index";
import AdvancedDashboard from "@/components/AdvancedDashboard";
import AlertPanel from "@/components/AlertPanel";
import WalletCard from "@/components/WalletCard";
import PositionCard from "@/components/PositionCard";
import { useLiveFeed } from "@/hooks/useLiveFeed";

export default function DashboardPage() {
  const [currentResult, setCurrentResult] = useState<TreasuryScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  
  // EH States
  const [watchedWallets, setWatchedWallets] = useState<WalletInfo[]>([]);
  const [watchedPositions, setWatchedPositions] = useState<LiquidShieldPosition[]>([]);
  const { alerts, isConnected } = useLiveFeed();

  const performScan = async (scanAddress: string) => {
    setError(null);
    setLoading(true);
    try {
      // Step 1: Run traditional treasury scan
      const result = await runRiskScan(scanAddress);
      setCurrentResult(result);

      // Step 2: Auto-register for WhaleWatch & LiquidShield
      await registerWhaleWatcher(scanAddress);
      await registerLiquidShield(scanAddress);

      // Refresh monitoring lists
      fetchMonitoringData();
    } catch (e: any) {
      setError(e.message || "Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMonitoringData = async () => {
    try {
      const { getMonitoredWorkflows } = await import("@/lib/api");
      const monitored = await getMonitoredWorkflows();
      
      const ww = monitored
        .filter((m: any) => m.ww?.active)
        .map((m: any) => ({
          address: m.address,
          label: m.ww?.lastAlert?.label || null,
          intent: m.ww?.lastAlert?.intent || "UNKNOWN",
          lastAlertTime: m.ww?.lastAlert?.timestamp || null,
          historyCount: m.ww?.lastAlert ? 5 : 0 // Mocked for now to show outside of baseline
        }));

      const ls = monitored
        .filter((m: any) => m.ls?.active)
        .map((m: any) => ({
          address: m.address,
          label: null,
          snapshots: m.ls?.lastSnapshot || []
        }));

      setWatchedWallets(ww);
      setWatchedPositions(ls);
    } catch (e) {
      console.error("Failed to fetch monitoring data:", e);
    }
  };

  useEffect(() => {
    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError("Please enter a valid treasury address");
      return;
    }
    await performScan(address);
    setAddress("");
  };

  return (
    <main className="min-h-screen bg-white text-black relative">
      <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-black uppercase tracking-wide hover:text-blue-600 transition flex items-center gap-2">
            <span className="text-blue-600">←</span> CHAIN SENTINEL
          </Link>
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 border-2 border-black ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              LIVENODE: {isConnected ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input & Alerts (4 units) */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6">
              <h2 className="text-lg font-black uppercase mb-4 tracking-tight">Register Wallet</h2>
              <form onSubmit={handleScan} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Paste Ethereum Address..."
                  className="w-full border-4 border-black px-4 py-3 text-xs font-mono bg-white outline-none focus:bg-blue-50 transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white hover:bg-blue-500 border-4 border-black font-black uppercase text-xs tracking-wider transition shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {loading ? "INITIALIZING..." : "START MONITORING"}
                </button>
              </form>
              {error && <p className="mt-3 text-[10px] font-black text-red-600 uppercase italic">❌ {error}</p>}
            </section>

            <div className="h-[calc(100vh-380px)] sticky top-[100px]">
              <AlertPanel alerts={alerts} />
            </div>
          </div>

          {/* RIGHT COLUMN: Dashboard & Monitoring (8 units) */}
          <div className="lg:col-span-8 space-y-8">
            {currentResult ? (
              <AdvancedDashboard result={currentResult} onScan={performScan} loading={loading} />
            ) : (
              <div className="bg-blue-50 border-4 border-black border-dashed p-16 text-center">
                <div className="text-6xl mb-6">🛡️</div>
                <h3 className="text-2xl font-black uppercase mb-2">SYSTEM STANDBY</h3>
                <p className="text-sm font-bold text-blue-900/60 max-w-md mx-auto">
                    Enter a treasury address to initialize the multi-agent risk engine. 
                    WhaleWatch and LiquidShield will activate automatically.
                </p>
              </div>
            )}

            {/* MONITORING GRIDS (Mocked for now as we don't have persistence fetch yet) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest border-b-4 border-black pb-2 flex justify-between items-center">
                   WHALEWATCH <span>{watchedWallets.length} ACTIVE</span>
                </h3>
                <div className="grid gap-4">
                  {watchedWallets.map(w => <WalletCard key={w.address} wallet={w} />)}
                  {watchedWallets.length === 0 && (
                    <div className="bg-gray-50 border-2 border-black border-dashed p-8 text-center text-[10px] font-black text-gray-400 uppercase">
                      No Wallets Registered
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest border-b-4 border-black pb-2 flex justify-between items-center">
                  LIQUIDSHIELD <span>{watchedPositions.length} ACTIVE</span>
                </h3>
                <div className="grid gap-4">
                  {watchedPositions.map(p => <PositionCard key={p.address} position={p} />)}
                  {watchedPositions.length === 0 && (
                    <div className="bg-gray-50 border-2 border-black border-dashed p-8 text-center text-[10px] font-black text-gray-400 uppercase">
                      No Positions Tracked
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
