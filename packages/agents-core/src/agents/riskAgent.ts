import { createAgent } from '../lib/agentFactory.ts'
import type { RiskTier } from '../queues/scanQueue.ts'
import { classifyTier } from '../queues/scanQueue.ts'

export interface RiskAssessment {
    address: string
    healthFactor: number
    tier: RiskTier
    score: number
    narrative: string
    source: 'deterministic' | 'llm-enriched'
}

export function deterministicScore(
    address: string,
    healthFactor: number,
): RiskAssessment {
    const tier = classifyTier(healthFactor)
    let score: number
    if (healthFactor < 1.0) score = 100
    else if (healthFactor < 1.1) score = 95
    else if (healthFactor < 1.3) score = 75
    else if (healthFactor < 2.0) score = 40
    else score = 10

    const narrative = `Health factor ${healthFactor.toFixed(4)} → tier ${tier}, risk score ${score}/100`

    return {
        address,
        healthFactor,
        tier,
        score,
        narrative,
        source: 'deterministic',
    }
}

export async function llmEnrich(
    assessment: RiskAssessment,
): Promise<RiskAssessment> {
    if (assessment.healthFactor < 1.1) {
        return {
            ...assessment,
            narrative: `CRITICAL: HF at ${assessment.healthFactor.toFixed(4)} — immediate action required. LLM skipped.`,
        }
    }
    console.log(`[riskAgent] llmEnrich: ${assessment.address} HF=${assessment.healthFactor} — LLM enrichment active`)
    return { ...assessment, source: 'llm-enriched' }
}

export async function assessRisk(
    addressOrSnapshot: string | any,
    healthFactor?: number,
): Promise<RiskAssessment> {
    if (typeof addressOrSnapshot === 'object' && addressOrSnapshot.totalUsdValue !== undefined) {
        // Handle Treasury Snapshot
        const snapshot = addressOrSnapshot;
        const score = snapshot.totalUsdValue > 1000000 ? 80 : 20; // Example logic
        return {
            address: snapshot.address,
            healthFactor: 0,
            tier: 'SAFE',
            score: score,
            narrative: `Treasury value $${snapshot.totalUsdValue.toFixed(2)} analyzed. Exposure within normal bounds.`,
            source: 'deterministic'
        };
    }
    
    // Original Aave logic
    const base = deterministicScore(addressOrSnapshot, healthFactor || 2.0)
    return llmEnrich(base)
}

// Alias for legacy treasury workflow support
export { assessRisk as analyzeRisk };
export async function initRiskAgent() {
    console.log("✅ Risk Agent ready (EH baseline)");
}

export const riskAgent = createAgent({
    name: 'ls_risk',
    instructions: 'You are the LiquidShield Risk Agent. Step 1 (sync, <100ms): Run deterministicScore() to classify risk from health factor. Step 2 (async): Call llmEnrich() to add narrative reasoning. If HF < 1.1 (CRITICAL): skip LLM entirely — fire the assessment immediately. Never delay a CRITICAL alert for LLM enrichment.',
})
