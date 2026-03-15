const { ethers } = require('ethers');
const RPC_URL = "https://ethereum.publicnode.com";

async function test() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const address = "0x28c6c06290cc3f951796d21d003cc0c003e93ccc";
  
  const TOKENS = [
    { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
    { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48", decimals: 6 },
    { symbol: "DAI",  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 }
  ];

  try {
    const balanceWei = await provider.getBalance(address);
    const balanceEth = Number(ethers.formatEther(balanceWei));
    console.log(`ETH Balance: ${balanceEth}`);

    for (const token of TOKENS) {
      const abi = ["function balanceOf(address) view returns (uint256)"];
      const contract = new ethers.Contract(token.address, abi, provider);
      const balance = await contract.balanceOf(address);
      console.log(`${token.symbol} Balance: ${ethers.formatUnits(balance, token.decimals)}`);
    }
  } catch (e) {
    console.error(e);
  }
}

test();
