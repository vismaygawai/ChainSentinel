import { createAgent } from '../lib/agentFactory.ts'
import * as aaveTools from '../tools/aaveTools.ts'
import * as scanQueue from '../queues/scanQueue.ts'
import * as healthHistory from '../memory/healthHistory.ts'

export async function runMonitorCycle(): Promise<void> {
    const entry = scanQueue.dequeueNext()
    if (!entry) return
    const { address } = entry
    const snapshot = await aaveTools.getPositionSnapshot(address)
    const hf = parseFloat(snapshot.healthFactor)
    await healthHistory.append(address, snapshot)
    scanQueue.updateTier(address, hf)
    console.log(`[monitorAgent] ${address} → HF: ${hf}, tier: ${scanQueue.classifyTier(hf)}`)
}

export const monitorAgent = createAgent({
    name: 'ls_monitor',
    instructions: 'You are the LiquidShield Monitor Agent. Read from the risk-tiered scan queue via dequeueNext(). Fetch the current health factor from Aave for each due wallet. Append the position snapshot to health history. Update the wallet tier in the scan queue based on the new health factor.',
    tools: [aaveTools.getHealthFactor, aaveTools.getPositionSnapshot],
})
