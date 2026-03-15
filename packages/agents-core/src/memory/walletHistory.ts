import { getRedisClient, historyKey } from '../redis.ts'
import type { WhaleScanResult } from '../types.ts'

const PIPELINE = 'ww'

export async function append(
    address: string,
    tx: WhaleScanResult,
): Promise<void> {
    const redis = getRedisClient()
    const key = historyKey(PIPELINE, address)

    await (redis as any).pipeline()
        .lpush(key, JSON.stringify(tx))
        .ltrim(key, 0, 99)
        .exec()
}

export async function getHistory(address: string, count = 100): Promise<WhaleScanResult[]> {
    const redis = getRedisClient()
    const entries = await redis.lrange(historyKey(PIPELINE, address), 0, count - 1)
    return entries.map((entry: string) => JSON.parse(entry) as WhaleScanResult)
}

export async function backfill(address: string): Promise<void> {
    console.log(
        `[walletHistory] backfill requested for ${address} — Alchemy integration pending`,
    )
}
