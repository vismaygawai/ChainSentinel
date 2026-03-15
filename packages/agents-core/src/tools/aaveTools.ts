import type { PositionSnapshot } from '../types.ts'

export interface RepayRecommendation {
    token: string
    amount: string
    slippagePct: number
}

export async function getHealthFactor(walletAddress: string): Promise<number> {
    console.log(
        `[aaveTools] getHealthFactor: ${walletAddress} — Aave integration pending`,
    )
    return 999 
}

export async function getPositionSnapshot(
    walletAddress: string,
): Promise<PositionSnapshot> {
    console.log(
        `[aaveTools] getPositionSnapshot: ${walletAddress} — Aave integration pending`,
    )
    return {
        walletAddress,
        healthFactor: '999',
        collateral: '0',
        debt: '0',
        protocol: 'aave-v3',
    }
}

export async function calculateRepayAmount(
    snapshot: PositionSnapshot,
): Promise<RepayRecommendation> {
    const hf = parseFloat(snapshot.healthFactor)
    const debt = parseFloat(snapshot.debt)

    if (hf < 1.3 && debt > 0) {
        return {
            token: 'USDC',
            amount: (debt * 0.2).toFixed(2),
            slippagePct: 0.5,
        }
    }

    return {
        token: 'USDC',
        amount: '0',
        slippagePct: 0,
    }
}
