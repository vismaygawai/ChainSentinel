import { createAgent } from '../lib/agentFactory.ts'
import type { PositionSnapshot } from '../types.ts'
import * as aaveTools from '../tools/aaveTools.ts'

export interface ActionRecommendation {
    suggestedAction: 'REPAY' | 'DEPOSIT'
    token: string
    amount: string
    slippagePct: number
}

export async function recommendAction(
    snapshot: PositionSnapshot,
): Promise<ActionRecommendation> {
    const repay = await aaveTools.calculateRepayAmount(snapshot)
    const debt = parseFloat(snapshot.debt)
    const repayAmount = parseFloat(repay.amount)
    const suggestedAction: 'REPAY' | 'DEPOSIT' =
        (debt > 0 && repayAmount > (debt * 0.01)) ? 'REPAY' : 'DEPOSIT'

    return {
        suggestedAction,
        token: repay.token,
        amount: repay.amount,
        slippagePct: repay.slippagePct,
    }
}

export const actionAgent = createAgent({
    name: 'ls_action',
    instructions: 'You are the LiquidShield Action Agent. Calculate the optimal repay or deposit action for at-risk DeFi positions. Use aaveTools.calculateRepayAmount() to determine token, amount, and slippage. Return a structured ActionRecommendation with suggestedAction: REPAY or DEPOSIT.',
    tools: [aaveTools.calculateRepayAmount],
})
