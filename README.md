PathCoin — UI/UX Demo (Next.js + PWA)

🚀 Demo UI/UX for the PathCoin game

Built with Next.js (App Router) + Tailwind

PWA-ready (iOS/Android installable on Home Screen)

Neon / glassmorphism design, AI-friendly, responsive (mobile-first)

Implemented screens:

Onboarding (3 slides)

Home (map, Featured route, Start Run)

Run (demo grid gameplay)

Routes (list of routes + start buttons)

Wallet (PATH balance, demo claim + confetti, tx list)

Profile (avatar + name editable)

Settings (haptics/sounds toggle, legal, replay onboarding)

404 custom page

⚠️ Important:
This is a UI/UX demo only. Game logic, blockchain contracts (ERC-20/1155), wallet integration (WalletConnect / Coinbase / Rainbow), and anti-cheat are not included — those are to be integrated by the client.

📦 Setup
cd web
npm install
npm run dev          # run locally
npm run dev:lan      # run locally, exposed on LAN for iPhone testing
npm run build        # production build
npm run start -H 0.0.0.0


Open http://localhost:3000
 in browser

On iPhone: use LAN address (ex: http://192.168.x.x:3000)

📱 PWA on iOS

Open the app in Safari on iPhone (LAN URL).

Tap Share → Add to Home Screen.

The app installs with the PathCoin icon and runs fullscreen.

🔗 Integration points for client

ConnectWalletButton → replace mock with Web3Modal / WalletConnect.

Wallet → Claim Rewards → hook into on-chain contract call.

RunPage (GridGame) → replace with real gameplay engine.

API /api/claim → connect to backend / smart contract.

📄 License (Demo)

This demo is provided for evaluation purposes only.
All rights reserved © 2025 ZancanuDumitrita.
No reproduction, redistribution, or production use without written consent.