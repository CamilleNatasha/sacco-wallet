import { useState } from "react";
import { ethers } from "ethers";

const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const SACCO_POOL_ADDRESS = "YOUR_DEPLOYED_POOL_ADDRESS";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [userShares, setUserShares] = useState(0);

  async function connectWallet() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  }

  async function deposit() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usdc = new ethers.Contract(
      USDC_ADDRESS,
      ["function approve(address, uint256)"],
      signer
    );
    await usdc.approve(SACCO_POOL_ADDRESS, ethers.utils.parseUnits(amount, 6));
    
    const pool = new ethers.Contract(
      SACCO_POOL_ADDRESS,
      ["function deposit(uint256)"],
      signer
    );
    await pool.deposit(ethers.utils.parseUnits(amount, 6));
  }

  return (
    <div>
      <h1>Sacco Wallet on Base</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="USDC Amount"
      />
      <button onClick={deposit}>Deposit</button>
      <p>Your Shares: {userShares}</p>
    </div>
  );
}