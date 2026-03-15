export type IntentClassification =
  | 'CEX_DEPOSIT'
  | 'ACCUMULATION'
  | 'DISTRIBUTION'
  | 'UNKNOWN'

export interface WhaleScanResult {
  address: string;
  amount: string;
  token: string;
  timestamp: number;
  txHash: string;
  label?: string;
  intent?: IntentClassification;
}

export interface WalletInfo {
  address: string;
  label: string | null;
  intent: IntentClassification;
  lastAlertTime?: number | null;
  historyCount?: number;
}

export type RiskTier = 'SAFE' | 'WARNING' | 'DANGER' | 'CRITICAL'

export interface PositionSnapshot {
  walletAddress: string;
  healthFactor: string;
  collateral: string;
  debt: string;
  protocol: string;
  timestamp?: number;
}

export interface LiquidShieldPosition {
  address: string;
  label?: string | null;
  snapshots: PositionSnapshot[];
}

export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface CompoundAlert {
  walletAddress: string;
  wwAlert?: WhaleScanResult;
  lsAlert?: PositionSnapshot;
  isCorrelated: boolean;
  combinedUrgency: UrgencyLevel;
}

export interface SnapshotPosition {
  token: string;
  balance: number;
  usdValue: number;
}

export interface Snapshot {
  address: string;
  totalUsdValue: number;
  positions: SnapshotPosition[];
}

export interface Risk {
  level: "LOW" | "MEDIUM" | "HIGH" | string;
  score: number;
  issues: string[];
}

export interface PlanAction {
  type: string;
  message: string;
}

export interface Plan {
  actions: PlanAction[];
}

export interface GovernanceAction {
  type: string;
  message: string;
}

export interface Governance {
  approved: boolean;
  reason: string;
  enforcedActions: GovernanceAction[];
}

export interface TreasuryScanResult {
  snapshot: Snapshot | null;
  risk: Risk;
  plan: Plan;
  governance: Governance;
}
