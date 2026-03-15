import { getRedisClient, historyKey } from '../redis.ts'
import type { PositionSnapshot } from '../types.ts'

const PIPELINE = 'ls'

export async function append(
    address: string,
    snapshot: PositionSnapshot,
): Promise<void> {
    const redis = getRedisClient()
    await redis.lpush(historyKey(PIPELINE, address), JSON.stringify(snapshot))
}

export async function getHistory(address: string): Promise<PositionSnapshot[]> {
    const redis = getRedisClient()
    const entries = await redis.lrange(historyKey(PIPELINE, address), 0, -1)
    return entries.map((entry: string) => JSON.parse(entry) as PositionSnapshot)
}
