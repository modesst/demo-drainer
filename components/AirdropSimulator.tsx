'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useSignTypedData } from 'wagmi';
import { parseUnits, parseAbiItem, maxUint256 } from 'viem';

// Mock ERC-20 token address for Sepolia (e.g. a common test token)
const MOCK_TOKEN = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // USDC on Sepolia
const MALICIOUS_SPENDER = '0x1234567890123456789012345678901234567890'; // Dummy address

export function AirdropSimulator() {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { signTypedDataAsync } = useSignTypedData();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: string; data: any } | null>(null);

  const handleApproveTrap = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Step 3: The Trap (Approval)
      const tx = await writeContractAsync({
        address: MOCK_TOKEN,
        abi: [parseAbiItem('function approve(address spender, uint256 amount) public returns (bool)')],
        functionName: 'approve',
        args: [MALICIOUS_SPENDER, maxUint256],
      });
      
      setResult({
        type: 'On-Chain Approval',
        data: {
          txHash: tx,
          explanation: `You just sent a transaction calling 'approve(${MALICIOUS_SPENDER}, MAX_UINT256)'. This grants the spender PERMANENT permission to withdraw ALL your tokens.`,
        },
      });
    } catch (e: any) {
      console.error(e);
      setResult({ type: 'Error', data: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePermitTrap = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Step 3: The Trap (Permit - EIP-2612)
      // This is an off-chain signature
      const signature = await signTypedDataAsync({
        domain: {
          name: 'USDC',
          version: '2',
          chainId: 11155111, // Sepolia
          verifyingContract: MOCK_TOKEN,
        },
        types: {
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
          ],
        },
        primaryType: 'Permit',
        message: {
          owner: address!,
          spender: MALICIOUS_SPENDER,
          value: maxUint256,
          nonce: 0n, // Dummy
          deadline: 2000000000n, // Future
        },
      });

      setResult({
        type: 'Off-Chain Permit',
        data: {
          signature,
          explanation: 'You just signed an off-chain Permit message. An attacker can submit this signature to the blockchain to drain your tokens WITHOUT YOU PAYING GAS.',
        },
      });
    } catch (e: any) {
      console.error(e);
      setResult({ type: 'Error', data: e.message });
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="mt-12 w-full max-w-lg space-y-6">
      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl font-semibold mb-4 text-orange-400">Step 2: The "Bait"</h2>
        <p className="text-zinc-400 mb-6">
          Pretend you found a site offering a free airdrop. Click one of the buttons below to see how a drainer would trick you into giving up control of your tokens.
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleApproveTrap}
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 transition-colors rounded-lg font-bold"
          >
            {loading ? 'Processing...' : 'Claim via Approval (On-Chain)'}
          </button>
          
          <button
            onClick={handlePermitTrap}
            disabled={loading}
            className="w-full py-3 border border-red-600/50 hover:bg-red-600/10 disabled:opacity-50 transition-colors rounded-lg font-bold"
          >
            {loading ? 'Processing...' : 'Claim via Permit (Off-Chain Signature)'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 animate-in fade-in duration-500">
          <h2 className="text-xl font-semibold mb-2 text-blue-400">Step 4: The Reveal</h2>
          <div className="text-sm space-y-4">
            <p className="font-mono text-xs bg-black/50 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(result.data, null, 2)}
            </p>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3">
              <p className="text-yellow-200">{result.data.explanation}</p>
            </div>
            <button
              onClick={() => setResult(null)}
              className="text-zinc-500 hover:text-zinc-300 underline"
            >
              Clear Simulation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
