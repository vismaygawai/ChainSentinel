import { getRedisClient, cooldownKey } from '../redis.ts'

export async function isCooledDown(
    pipeline: string,
    address: string,
): Promise<boolean> {
    const redis = getRedisClient()
    const exists = await redis.exists(cooldownKey(pipeline, address))
    return exists === 1
}

export async function setCooldown(
    pipeline: string,
    address: string,
    ms: number,
): Promise<void> {
    const redis = getRedisClient()
    await redis.set(cooldownKey(pipeline, address), '1', 'PX', ms)
}
