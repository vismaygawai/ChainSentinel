import type {
    WhaleScanResult,
    PositionSnapshot,
    CompoundAlert,
} from '../types.ts'

const CORRELATION_WINDOW_MS = 60_000

interface WindowEntry<T> {
    data: T
    receivedAt: number
}

const whaleWindow = new Map<string, WindowEntry<WhaleScanResult>>()
const liquidationWindow = new Map<string, WindowEntry<PositionSnapshot>>()

type CompoundAlertHandler = (alert: CompoundAlert) => void
const handlers: CompoundAlertHandler[] = []

export function onCompoundAlert(handler: CompoundAlertHandler): void {
    handlers.push(handler)
}

function emit(alert: CompoundAlert): void {
    for (const handler of handlers) {
        handler(alert)
    }
}

function purgeStale(): void {
    const cutoff = Date.now() - CORRELATION_WINDOW_MS
    for (const [addr, entry] of whaleWindow) {
        if (entry.receivedAt < cutoff) whaleWindow.delete(addr)
    }
    for (const [addr, entry] of liquidationWindow) {
        if (entry.receivedAt < cutoff) liquidationWindow.delete(addr)
    }
}

function determineUrgency(
    isCorrelated: boolean,
    snapshot?: PositionSnapshot,
): CompoundAlert['combinedUrgency'] {
    if (isCorrelated) return 'CRITICAL'
    if (snapshot) {
        const hf = parseFloat(snapshot.healthFactor)
        if (hf < 1.1) return 'CRITICAL'
        if (hf < 1.3) return 'HIGH'
        if (hf < 2.0) return 'MEDIUM'
    }
    return 'LOW'
}

export function ingestWhaleAlert(scan: WhaleScanResult): CompoundAlert {
    purgeStale()
    const addr = scan.address.toLowerCase()
    const now = Date.now()
    whaleWindow.set(addr, { data: scan, receivedAt: now })
    const lsEntry = liquidationWindow.get(addr)
    const isCorrelated = !!lsEntry && (now - lsEntry.receivedAt) <= CORRELATION_WINDOW_MS
    const alert: CompoundAlert = {
        walletAddress: addr,
        wwAlert: scan,
        lsAlert: isCorrelated ? lsEntry.data : undefined,
        isCorrelated,
        combinedUrgency: determineUrgency(isCorrelated, lsEntry?.data),
    }
    emit(alert)
    return alert
}

export function ingestLiquidationAlert(snapshot: PositionSnapshot): CompoundAlert {
    purgeStale()
    const addr = snapshot.walletAddress.toLowerCase()
    const now = Date.now()
    liquidationWindow.set(addr, { data: snapshot, receivedAt: now })
    const wwEntry = whaleWindow.get(addr)
    const isCorrelated = !!wwEntry && (now - wwEntry.receivedAt) <= CORRELATION_WINDOW_MS
    const alert: CompoundAlert = {
        walletAddress: addr,
        wwAlert: isCorrelated ? wwEntry.data : undefined,
        lsAlert: snapshot,
        isCorrelated,
        combinedUrgency: determineUrgency(isCorrelated, snapshot),
    }
    emit(alert)
    return alert
}

export function windowStats(): { whaleCount: number; liquidationCount: number } {
    purgeStale()
    return {
        whaleCount: whaleWindow.size,
        liquidationCount: liquidationWindow.size,
    }
}

export function reset(): void {
    whaleWindow.clear()
    liquidationWindow.clear()
    handlers.length = 0
}
