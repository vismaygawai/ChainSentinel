
import { createAgent } from '../lib/agentFactory.ts';
import { ethers } from "ethers";
import type { TreasurySnapshot } from "../types.ts";

const RPC_URL = process.env.RPC_URL || "https://eth.llamarpc.com";

export const watcherAgent = createAgent({
  name: "watcher_agent",
  instructions: "You are a blockchain observer. Read treasury balances and return structured data."
});

export async function watchTreasury(address: string): Promise<TreasurySnapshot> {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  // Normalize address for Ethers V6 strictness
  const normalizedAddress = ethers.getAddress(address.toLowerCase());

  const TOKENS = [
    { symbol: "USDT", address: ethers.getAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7"), decimals: 6 },
    { symbol: "USDC", address: ethers.getAddress("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48"), decimals: 6 },
    { symbol: "DAI",  address: ethers.getAddress("0x6B175474E89094C44Da98b954EedeAC495271d0F"), decimals: 18 },
    { symbol: "WBTC", address: ethers.getAddress("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"), decimals: 8 }
  ];

  try {
    const balanceWei = await provider.getBalance(normalizedAddress);
    const balanceEth = Number(ethers.formatEther(balanceWei));
    const ethPrice = 2850; 
    
    let totalUsdValue = balanceEth * ethPrice;
    const positions = [
      {
        token: "ETH",
        balance: balanceEth,
        usdValue: balanceEth * ethPrice
      }
    ];

    for (const token of TOKENS) {
        try {
            const abi = ["function balanceOf(address) view returns (uint256)"];
            const contract = new ethers.Contract(token.address, abi, provider);
            const balance: bigint = await contract.balanceOf(normalizedAddress);
            const formattedBalance = Number(ethers.formatUnits(balance, token.decimals));
            if (formattedBalance > 0) {
                const usdValue = token.symbol === "WBTC" ? formattedBalance * 65000 : formattedBalance; 
                totalUsdValue += usdValue;
                positions.push({
                    token: token.symbol,
                    balance: formattedBalance,
                    usdValue: usdValue
                });
            }
        } catch (e) {
            console.warn(`[watcherAgent] Failed to fetch balance for ${token.symbol}:`, e);
        }
    }

    console.log(`[watcherAgent] Scanned ${normalizedAddress}: Total=$${totalUsdValue.toFixed(2)} (${positions.length} assets)`);

    return {
      address: normalizedAddress,
      totalUsdValue: totalUsdValue,
      positions: positions
    };
  } catch (error) {
    console.error(`[watcherAgent] Error scanning ${address}:`, error);
    return {
        address: address,
        totalUsdValue: 0,
        positions: []
    };
  }
}
