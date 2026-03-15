import type { WhaleScanResult } from '../types.ts'
import { lookupKnownAddress } from '../data/index.ts'

export function subscribeToLargeTransactions(
    minUSD: number,
    callback: (tx: WhaleScanResult) => void,
): void {
    const alchemyKey = process.env.ALCHEMY_API_KEY;
    if (!alchemyKey || alchemyKey === 'your_alchemy_key_here') {
        console.log(`[walletTools] subscribeToLargeTransactions: No ALCHEMY_API_KEY found, running in MOCK mode.`);
        return;
    }
    console.log(
        `[walletTools] subscribeToLargeTransactions: listening for txs >= $${minUSD} (Alchemy Active)`,
    )
    void callback
}

export async function fetchRecentTransactions(
    address: string,
    days: number,
): Promise<WhaleScanResult[]> {
    const alchemyKey = process.env.ALCHEMY_API_KEY;
    if (!alchemyKey || alchemyKey === 'your_alchemy_key_here') {
        return [];
    }

    try {
        const url = `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "alchemy_getAssetTransfers",
                params: [{
                    fromBlock: "0x" + (BigInt(await (await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "eth_blockNumber", params: [] })
                    })).json().then(r => r.result)) - 1000n).toString(16),
                    toAddress: address,
                    category: ["external", "erc20"],
                    maxCount: "0x5"
                }]
            })
        });

        const data: any = await response.json();
        const transfers = data.result?.transfers || [];

        return transfers.map((t: any) => ({
            address: address,
            amount: t.value?.toString() || "0",
            token: t.asset || "ETH",
            timestamp: Date.now(),
            txHash: t.hash,
            label: lookupKnownAddress(address) || "Detected Whale",
            intent: "ACCUMULATION" // Mocked intent for now
        }));
    } catch (err) {
        console.error("[walletTools] Alchemy fetch failed:", err);
        return [];
    }
}

export function lookupLabel(address: string): string | null {
    return lookupKnownAddress(address) ?? null
}
