import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AirdropSimulator } from '@/components/AirdropSimulator';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center w-full max-w-2xl border border-red-500/30 bg-red-500/10 p-8 rounded-2xl shadow-2xl shadow-red-500/10 mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Educational Drainer Simulator
        </h1>
        <p className="mb-8 text-zinc-400 text-lg">
          ⚠️ <strong>Simulation only.</strong> Never connect a wallet containing real funds. Use Testnet (Sepolia) only to explore how malicious approvals work.
        </p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </div>

      <AirdropSimulator />

      <footer className="mt-12 text-zinc-500 text-xs text-center max-w-md">
        This tool is part of a series on crypto safety. 
        Built with Next.js, Wagmi, and RainbowKit. 
        Follow <a href="https://x.com/benson_sharks" className="text-blue-500 hover:underline">@benson_sharks</a> for more Web3 safety tips.
      </footer>
    </main>
  );
}
