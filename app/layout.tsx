import type { Metadata } from 'next';
import { Providers } from './providers';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Drainer Demo - Educational',
  description: 'Learn how crypto drainers work (testnet only)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
