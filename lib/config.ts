import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Drainer Demo - Educational Only',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string || 'YOUR_PROJECT_ID', // Fallback for dev
  chains: [sepolia],
  ssr: true,
});
