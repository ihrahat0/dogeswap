import React from 'react';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import TokenSwap from './components/TokenSwap';
import logo from './components/assets/logo.png';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: React.FC = () => {
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint="https://alpha-responsive-uranium.solana-mainnet.quiknode.pro/85df3f357dba323cbe4b53c20e0ab976796a47f6/">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="App">
            <div className="fixed top-4 left-4 z-50">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>
            <TokenSwap />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;