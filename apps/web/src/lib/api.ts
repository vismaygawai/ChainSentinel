import type { TreasuryScanResult } from "@/types/index";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export async function runRiskScan(address: string): Promise<TreasuryScanResult> {
  const res = await fetch(`${API_BASE}/api/risk-scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address })
  });
  if (!res.ok) throw new Error("Risk scan failed");
  return res.json();
}

export async function registerWhaleWatcher(address: string) {
  const res = await fetch(`${API_BASE}/whale`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address })
  });
  return res.json();
}

export async function registerLiquidShield(address: string) {
  const res = await fetch(`${API_BASE}/position`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address })
  });
  return res.json();
}

export async function getHealthSnapshots(address: string) {
  const res = await fetch(`${API_BASE}/health?address=${address}`);
  return res.json();
}

export async function getWhaleAlerts(address?: string) {
  const url = address ? `${API_BASE}/alerts?address=${address}` : `${API_BASE}/alerts`;
  const res = await fetch(url);
  return res.json();
}

export async function getMonitoredWorkflows() {
  const res = await fetch(`${API_BASE}/api/monitored`);
  if (!res.ok) return [];
  return res.json();
}

export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
