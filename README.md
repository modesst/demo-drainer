# Drainer Demo - Educational Web3 Simulator

**⚠️ FOR EDUCATIONAL PURPOSES ONLY ⚠️**

This is a modern Web3 application built with **Next.js (App Router)** + **RainbowKit** + **Wagmi v2** + **Viem** to demonstrate how crypto drainers exploit **token approvals** and **permit signatures** (ERC-20/EIP-2612).

## Educational Flow
1. **The Connect Step:** Connect your wallet (RESTRICTED TO SEPOLIA TESTNET).
2. **The Bait:** Experience a deceptive "Claim Airdrop" UI.
3. **The Trap:** 
   - **Classic Approval:** Prompts an on-chain `approve(MAX_UINT256)` call.
   - **Permit Signature:** Prompts an off-chain EIP-2612 signature request.
4. **The Reveal:** A modal explaining how the transaction or signature would be used by an attacker to drain your funds.

## Safety First
- **Testnet Only:** Hardcoded to Sepolia.
- **No Private Keys:** Never ask for or store private keys.
- **Educational Labels:** Clear warnings throughout the app.

## Quick Start
```bash
# Clone and enter directory
cd drainer-demo

# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add:
# NEXT_PUBLIC_WC_PROJECT_ID=your_project_id

# Run the development server
npm run dev
```

## Stack
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS
- **Web3:** Wagmi v2, Viem, RainbowKit
- **Network:** Sepolia Testnet

Built for @benson_sharks content. Stay safe in Web3! 🛡️
