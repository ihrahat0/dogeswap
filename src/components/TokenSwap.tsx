import React, { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { SolanaTracker } from "../SolanaTracker";
import "../App.css";
import {
  // FaExchangeAlt,
  // FaCog,
  // FaChevronDown,
  FaSearch,
  FaTimes,
  // FaSun,
  // FaMoon,
  // FaBars,
  // FaGlobe,
  // FaTwitter,
  FaTelegram,
  // FaInstagram,
  // FaTiktok,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { predefinedTokens } from "./predefinedTokens";
import { socialLinks, partnerLogos, partnerLogosBottom } from "./partners";
import { Settings, ChevronDown, ArrowDown, CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react'
import ethereumLogo from './assets/ethereum.webp';
import bscLogo from './assets/bnb.webp';
import baseLogo from './assets/base.png';
import polygonLogo from './assets/polygon.webp';
import arbitrumLogo from './assets/arbitrum.webp';
import lineaLogo from './assets/linea.png';
import solanaLogo from './assets/solana.png';
import { motion, AnimatePresence } from 'framer-motion';
import poweredByLogo from './assets/poweredby.png';
// import avalancheLogo from './assets/avalanche-avax-logo.svg';
// import celoLogo from './assets/celo-celo-logo.png';

interface Token {
  symbol: string;
  address: string;
  logo?: string;
  name: string;
  price: number;
  priceChange24h: number;
  balance?: number;
}

const CustomToast = ({ type, message, title }: { type: string, message: string, title?: string }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="toast-icon text-green-500" />;
      case 'error':
        return <AlertCircle className="toast-icon text-red-500" />;
      case 'loading':
        return <Loader2 className="toast-icon text-[#ba9f32] animate-spin" />;
      default:
        return <Info className="toast-icon text-[#ba9f32]" />;
    }
  };

  return (
    <div className="toast-content">
      {getIcon()}
      <div className="toast-message">
        {title && <div className="toast-title">{title}</div>}
        <div className="toast-description">{message}</div>
      </div>
    </div>
  );
};

const showSuccessToast = (message: string, title?: string) => {
  toast.success(
    <CustomToast type="success" message={message} title={title} />,
    {
      className: 'custom-toast',
      progressClassName: 'custom-toast-progress',
      autoClose: 5000,
    }
  );
};

const showErrorToast = (message: string, title?: string) => {
  toast.error(
    <CustomToast type="error" message={message} title={title} />,
    {
      className: 'custom-toast',
      progressClassName: 'custom-toast-progress',
      autoClose: 5000,
    }
  );
};

const showLoadingToast = (message: string, title?: string) => {
  return toast.loading(
    <CustomToast type="loading" message={message} title={title} />,
    {
      className: 'custom-toast',
      progressClassName: 'custom-toast-progress',
    }
  );
};

// Add type for chain options
type ChainOption = {
  name: string;
  logo: string;
};

type ChainOptions = {
  solana: ChainOption;
  ethereum: ChainOption;
  bsc: ChainOption;
  // polygon: ChainOption;
  // arbitrum: ChainOption;
  base: ChainOption;
  // linea: ChainOption;
  // opbnb: ChainOption;
  // avalanche: ChainOption;
  // celo: ChainOption;
};

type ChainType = keyof ChainOptions;

// Add a type for chain URLs
type ChainUrls = {
  [key in ChainType]: string;
};

export default function Component() {
  const { publicKey, sendTransaction } = useWallet();
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("1");
  const [customSlippage, setCustomSlippage] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState<
    "from" | "to" | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tokens, setTokens] = useState<Token[]>(predefinedTokens);
  const [customToken, setCustomToken] = useState<Token | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownWalletConnectedToast, setHasShownWalletConnectedToast] =
    useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<ChainType>('solana');
  const [isChainMenuOpen, setIsChainMenuOpen] = useState(false);
  const [fromUsdValue, setFromUsdValue] = useState<string>('');
  const [toUsdValue, setToUsdValue] = useState<string>('');
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  // Define chainOptions with proper typing
  const chainOptions: ChainOptions = {
    solana: { name: 'Solana', logo: solanaLogo },
    ethereum: { name: 'Ethereum', logo: ethereumLogo },
    bsc: { name: 'BSC', logo: bscLogo },
    // polygon: { name: 'Polygon', logo: polygonLogo },
    // arbitrum: { name: 'Arbitrum', logo: arbitrumLogo },
    base: { name: 'Base', logo: baseLogo },
    // linea: { name: 'Linea', logo: lineaLogo },
    // opbnb: { name: 'Linea', logo: bscLogo },
    // avalanche: { name: 'Avalanche', logo: avalancheLogo },
    // celo: { name: 'Celo', logo: celoLogo }
  };

  // Define the URLs for each chain
  const chainUrls: ChainUrls = {
    solana: '', // empty string means stay on current page
    ethereum: 'dogeswap.co',
    bsc: 'dogeswap.co',
    // polygon: 'dogeswap.co/?chain=polygonZkEVM',
    // arbitrum: 'dogeswap.co/?chain=arb',
    base: 'dogeswap.co',
    // linea: 'dogeswap.co/?chain=linea',
    // opbnb: 'dogeswap.co/?chain=opBNB'
    // avalanche: 'dogeswap.co',
    // celo: 'dogeswap.co'
  };

  // Update the handleChainSwitch function
  const handleChainSwitch = (chain: ChainType) => {
    const targetUrl = chainUrls[chain];
    
    if (chain === 'solana') {
      // Stay on current page for Solana
      setSelectedChain(chain);
      setIsChainMenuOpen(false);
      toast.success(`Switched to ${chainOptions[chain].name} Network`);
    } else {
      // Redirect to appropriate URL for other chains
      const protocol = window.location.protocol;
      const fullUrl = `${protocol}//${targetUrl}`;
      window.location.href = fullUrl;
    }
  };

  const fetchTokenData = useCallback(async (tokensToFetch: Token[]) => {
    try {
      const updatedTokens = await Promise.all(
        tokensToFetch.map(async (token) => {
          try {
            const response = await fetch(
              `https://api.dexscreener.com/latest/dex/tokens/${token.address}`,
              {
                method: 'GET',
                headers: {},
              }
            );
            const data = await response.json();

            if (data.pairs && data.pairs.length > 0) {
              const sortedPairs = data.pairs.sort((a: any, b: any) => 
                (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0)
              );
              
              const bestPair = sortedPairs[0];
              
              const priceUsd = bestPair.priceUsd ? parseFloat(bestPair.priceUsd.replace(/[,$]/g, '')) : 0;
              const priceChange24h = bestPair.priceChange?.h24 ? parseFloat(bestPair.priceChange.h24) : 0;

              // Only use DexScreener's logo for tokens that don't have a predefined logo
              const logo = predefinedTokens.find(t => t.address === token.address)?.logo || 
                          token.logo || 
                          bestPair.info?.imageUrl;

              return {
                ...token,
                price: priceUsd,
                priceChange24h: priceChange24h,
                logo: logo,
              };
            }
            
            return {
              ...token,
              price: 0,
              priceChange24h: 0,
            };
          } catch (error) {
            console.error(`Error fetching price for ${token.symbol}:`, error);
            return {
              ...token,
              price: 0,
              priceChange24h: 0,
            };
          }
        })
      );

      return updatedTokens;
    } catch (error) {
      console.error("Error fetching token data:", error);
      return tokensToFetch;
    }
  }, []);

  useEffect(() => {
    const updatePrices = async () => {
      if (tokens.length > 0) {
        const updatedTokens = await fetchTokenData(tokens);
        setTokens(updatedTokens);
      }
    };

    updatePrices();
    const interval = setInterval(updatePrices, 30000);

    return () => clearInterval(interval);
  }, [fetchTokenData, tokens.length]);

  const fetchTokenBalance = useCallback(
    async (token: Token, walletPublicKey: web3.PublicKey): Promise<number> => {
      const solana = new web3.Connection(
        "https://alpha-responsive-uranium.solana-mainnet.quiknode.pro/85df3f357dba323cbe4b53c20e0ab976796a47f6/"
      );

      try {
        if (token.symbol === "SOL") {
          const balance = await solana.getBalance(walletPublicKey);
          return balance / web3.LAMPORTS_PER_SOL;
        } else {
          const tokenMintAddress = new web3.PublicKey(token.address);
          const associatedTokenAddress = await getAssociatedTokenAddress(
            tokenMintAddress,
            walletPublicKey
          );

          try {
            // First check if the token account exists
            const accountInfo = await solana.getAccountInfo(associatedTokenAddress);
            
            // If account doesn't exist, try to get token accounts by owner and filter
            if (!accountInfo) {
              const tokenAccounts = await solana.getParsedTokenAccountsByOwner(walletPublicKey, {
                mint: tokenMintAddress
              });
              
              // If we found any token accounts for this mint
              if (tokenAccounts.value.length > 0) {
                // Use the first account's balance
                const amount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
                return parseFloat(amount.uiAmount?.toString() || "0");
              }
              return 0;
            }

            const tokenAmount = await solana.getTokenAccountBalance(
              associatedTokenAddress
            );
            return parseFloat(tokenAmount.value.uiAmount?.toString() || "0");
          } catch (tokenError) {
            console.error(
              `Error fetching token balance for ${token.symbol}:`,
              tokenError
            );
            // Try alternative method to get token accounts
            try {
              const tokenAccounts = await solana.getParsedTokenAccountsByOwner(walletPublicKey, {
                mint: tokenMintAddress
              });
              
              if (tokenAccounts.value.length > 0) {
                const amount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
                return parseFloat(amount.uiAmount?.toString() || "0");
              }
            } catch (err) {
              console.error("Error in alternative balance fetch:", err);
            }
            return 0;
          }
        }
      } catch (error) {
        console.error("Error fetching token balance:", error);
        return 0;
      }
    },
    []
  );

  const fetchBalances = useCallback(
    async (tokensToFetch: Token[]) => {
      if (!publicKey) return tokensToFetch;

      const updatedTokens = await Promise.all(
        tokensToFetch.map(async (token) => {
          const balance = await fetchTokenBalance(token, publicKey);
          return { ...token, balance };
        })
      );

      return updatedTokens;
    },
    [publicKey, fetchTokenBalance]
  );

  const updateTokens = useCallback(
    async (tokensToUpdate: Token[]) => {
      const tokensWithPrices = await fetchTokenData(tokensToUpdate);
      const tokensWithBalances = await fetchBalances(tokensWithPrices);
      setTokens((prevTokens) => {
        const updatedTokens = prevTokens.map((token) => {
          const updatedToken = tokensWithBalances.find(
            (t) => t.address === token.address
          );
          return updatedToken || token;
        });
        return updatedTokens;
      });
      return tokensWithBalances;
    },
    [fetchTokenData, fetchBalances]
  );

  useEffect(() => {
    const initializeTokens = async () => {
      const solToken = tokens.find((t) => t.symbol === "SOL");
      const DogeToken = tokens.find((t) => t.symbol === "DOGE");
      const rayToken = tokens.find((t) => t.symbol === "RAY");
      const usdcToken = tokens.find((t) => t.symbol === "USDC");

      if (solToken && DogeToken && rayToken && usdcToken) {
        const tokensToUpdate = [solToken, DogeToken, rayToken, usdcToken];
        const updatedTokens = await updateTokens(tokensToUpdate);

        if (!fromToken) {
          setFromToken(updatedTokens.find((t) => t.symbol === "SOL") || null);
        }
        if (!toToken) {
          setToToken(updatedTokens.find((t) => t.symbol === "DOGE") || null);
        }
      }
    };

    initializeTokens();
  }, [updateTokens]);

  useEffect(() => {
    if (amount && fromToken && toToken) {
      const fromValue = parseFloat(amount) * fromToken.price;
      const toValue = fromValue / toToken.price;
      setToAmount(toValue.toFixed(6));
    } else if (!amount) {
      setToAmount("");
    }
  }, [amount, fromToken, toToken]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    if (publicKey && !hasShownWalletConnectedToast) {
      showSuccessToast(
        `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`,
        'Wallet Connected'
      );
      setHasShownWalletConnectedToast(true);
    }
  }, [publicKey, hasShownWalletConnectedToast]);

  const setPercentageAmount = (percentage: number, isFromToken: boolean) => {
    const token = isFromToken ? fromToken : toToken;
    if (token && token.balance !== undefined) {
      if (isFromToken) {
        // If it's MAX (percentage === 1) and it's SOL token, deduct 0.002
        const deduction = (percentage === 1 && token.symbol === "SOL") ? 0.002 : 0;
        const calculatedAmount = (token.balance * percentage - deduction).toFixed(9);
        setAmount(calculatedAmount);
        if (toToken) {
          const toValue = (parseFloat(calculatedAmount) * token.price) / toToken.price;
          setToAmount(toValue.toFixed(6));
        }
      } else {
        const calculatedToAmount = (token.balance * percentage).toFixed(9);
        setToAmount(calculatedToAmount);
        if (fromToken) {
          const fromValue = (parseFloat(calculatedToAmount) * token.price) / fromToken.price;
          setAmount(fromValue.toFixed(6));
        }
      }
    }
  };

  const handleSwap = async () => {
    if (!publicKey || !fromToken || !toToken) return;

    const loadingToastId = showLoadingToast(
      'Please confirm the transaction in your wallet',
      'Initiating Swap'
    );

    try {
      const solana = new web3.Connection(
        "https://alpha-responsive-uranium.solana-mainnet.quiknode.pro/85df3f357dba323cbe4b53c20e0ab976796a47f6" //ENTER Quicknode Solana Mainnet RPC LINK HERE
      );
      const solanaTracker = new SolanaTracker(
        solana,
        "ea16df74-238e-4588-9631-a8745d97a7c8" //ENTER Quicknode Solana Mainnet API HERE
      );

      // Get swap instructions
      const swapResponse = await solanaTracker.getSwapInstructions(
        fromToken.address,
        toToken.address,
        parseFloat(amount),
        parseFloat(slippage),
        publicKey.toBase58(),
        0.0005 // Priority fee
      );

      // Decode the swap transaction
      const transactionData = Uint8Array.from(atob(swapResponse.txn), (c) =>
        c.charCodeAt(0)
      );
      const swapTransaction = web3.Transaction.from(transactionData);

      // Create a new transaction to add 0.001 SOL fee to the specified address
      const feeTransaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new web3.PublicKey(
            "4UQKZFjLthLVNsaF58JwLwyVKTBySveygdJVhgHg2NTF"
          ),
          lamports: web3.LAMPORTS_PER_SOL * 0.001, // 0.001 SOL in lamports
        })
      );

      // Combine both transactions (swap and fee) into one
      const combinedTransaction = new web3.Transaction();
      combinedTransaction.add(swapTransaction); // Add swap transaction
      combinedTransaction.add(feeTransaction); // Add fee transfer transaction

      // Send the combined transaction
      const signature = await sendTransaction(combinedTransaction, solana);
      toast.dismiss(loadingToastId);
      showSuccessToast(
        `Swapped ${amount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
        'Swap Successful'
      );
    } catch (error) {
      toast.dismiss(loadingToastId);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to complete the swap';
      
      showErrorToast(
        errorMessage,
        'Swap Failed'
      );
    }
  };

  const handleTokenSelection = async (token: Token, isFromToken: boolean) => {
    const updatedTokens = await updateTokens([token]);
    const updatedToken = updatedTokens[0];

    // Update URL parameters
    const params = new URLSearchParams(window.location.search);
    if (isFromToken) {
      setFromToken(updatedToken);
      params.set('from', updatedToken.address);
      if (amount && toToken) {
        const newToAmount = ((parseFloat(amount) * updatedToken.price) / toToken.price).toFixed(6);
        setToAmount(newToAmount);
      }
    } else {
      setToToken(updatedToken);
      params.set('to', updatedToken.address);
      if (amount && fromToken) {
        const newToAmount = ((parseFloat(amount) * fromToken.price) / updatedToken.price).toFixed(6);
        setToAmount(newToAmount);
      }
    }

    // Update URL without refreshing the page
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    setShowTokenSelector(null);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length === 44) {
      await fetchCustomToken(value);
    }
  };

  const fetchCustomToken = async (address: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${address}`
      );
      const data = await response.json();

      if (data.pairs && data.pairs.length > 0) {
        const pairData = data.pairs[0];
        const newToken: Token = {
          symbol: pairData.baseToken.symbol,
          address: pairData.baseToken.address,
          logo: pairData.info?.imageUrl,
          name: pairData.baseToken.name,
          price: parseFloat(pairData.priceUsd),
          priceChange24h: parseFloat(pairData.priceChange.h24),
        };

        const updatedToken = await updateTokens([newToken]);
        const finalToken = updatedToken[0];

        setCustomToken(finalToken);
        setTokens((prevTokens) => [finalToken, ...prevTokens]);

        if (showTokenSelector === "from") {
          setFromToken(finalToken);
        } else if (showTokenSelector === "to") {
          setToToken(finalToken);
        }

        setSearchTerm("");
      }
    } catch (error) {
      console.error("Error fetching custom token:", error);
      toast.error("Failed to fetch custom token");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.address.toLowerCase() === searchTerm.toLowerCase()
  );

  const formatPrice = (price: number) => {
    if (price === 0) return "0";
    if (price < 0.000001) {
      return price.toFixed(9).replace(/\.?0+$/, "");
    }
    const priceString = price.toString();
    const [integerPart, decimalPart] = priceString.split(".");
    if (!decimalPart) return integerPart;
    const significantPart = decimalPart.match(/[1-9]/);
    if (!significantPart) return integerPart;
    const significantIndex = significantPart.index!;
    return `${integerPart}.${decimalPart.slice(
      0,
      Math.max(significantIndex + 4, 8)
    )}`;
  };

  const TokenSelector: React.FC<{
    token: Token | null;
    onClick: () => void;
  }> = ({ token, onClick }) => (
    <button
      onClick={onClick}
      className="token-selector-button flex items-center space-x-2 bg-[#1a1a1a] border border-[#ff4400]/20 text-white px-4 py-2 rounded-xl hover:bg-[#ff4400]/10 transition-all duration-200"
    >
      {token ? (
        <>
          {token.logo ? (
            <img src={token.logo} alt={token.symbol} className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 bg-[#ff4400] rounded-full flex items-center justify-center text-white text-xs font-bold">
              {token.name.charAt(0)}
            </div>
          )}
          <span>{token.symbol}</span>
          <ChevronDown className="w-4 h-4" />
        </>
      ) : (
        <>
          <span>Select</span>
          <ChevronDown className="w-4 h-4" />
        </>
      )}
    </button>
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSwitchTokens = async () => {
    const newFromToken = toToken;
    const newToToken = fromToken;
    setFromToken(newFromToken);
    setToToken(newToToken);
    setAmount(toAmount);
    setToAmount(amount);

    if (newFromToken && newToToken) {
      const params = new URLSearchParams(window.location.search);
      params.set('from', newFromToken.address);
      params.set('to', newToToken.address);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

      const updatedTokens = await updateTokens([newFromToken, newToToken]);
      setFromToken(updatedTokens.find((t) => t.address === newFromToken.address) || newFromToken);
      setToToken(updatedTokens.find((t) => t.address === newToToken.address) || newToToken);
    }
  };

  const handleSetCustomSlippage = () => {
    if (customSlippage) {
      const value = parseFloat(customSlippage);
      if (value > 0 && value <= 100) {
        setSlippage(customSlippage);
      } else {
        toast.warning("Slippage must be between 0 and 100");
        setCustomSlippage("");
      }
    }
  };

  const handlePumpFunClick = () => {
    setShowComingSoon(true);
    setTimeout(
      () => setShowComingSoon(false),

      3000
    );
  };

  // Add this new function to fetch token data for an address
  const fetchTokenDataFromAddress = async (address: string): Promise<Token | null> => {
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${address}`
      );
      const data = await response.json();

      if (data.pairs && data.pairs.length > 0) {
        const pairData = data.pairs[0];
        const newToken: Token = {
          symbol: pairData.baseToken.symbol,
          address: pairData.baseToken.address,
          logo: pairData.info?.imageUrl,
          name: pairData.baseToken.name,
          price: parseFloat(pairData.priceUsd),
          priceChange24h: parseFloat(pairData.priceChange.h24),
        };

        // Update the tokens list with the new token
        setTokens(prevTokens => {
          if (!prevTokens.some(t => t.address.toLowerCase() === address.toLowerCase())) {
            return [newToken, ...prevTokens];
          }
          return prevTokens;
        });

        return newToken;
      }
      return null;
    } catch (error) {
      console.error("Error fetching token data:", error);
      return null;
    }
  };

  // Remove the second URL parameter handling useEffect and modify the first one
  useEffect(() => {
    const initializeFromUrl = async () => {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get('from');
      const toParam = params.get('to');

      // Helper function to find or fetch token
      const findOrFetchToken = async (param: string | null) => {
        if (!param) return null;
        
        // First check in existing tokens
        const existingToken = tokens.find(t => 
          t.address.toLowerCase() === param.toLowerCase() || 
          t.symbol.toLowerCase() === param.toLowerCase()
        );

        if (existingToken) {
          // Fetch balance for existing token if wallet is connected
          if (publicKey) {
            const balance = await fetchTokenBalance(existingToken, publicKey);
            return { ...existingToken, balance };
          }
          return existingToken;
        }

        // If not found and param looks like an address (length check is basic validation)
        if (param.length === 44) {
          const fetchedToken = await fetchTokenDataFromAddress(param);
          if (fetchedToken && publicKey) {
            // Fetch balance for new token if wallet is connected
            const balance = await fetchTokenBalance(fetchedToken, publicKey);
            const tokenWithBalance = { ...fetchedToken, balance };
            // Update tokens list with the new token
            setTokens(prevTokens => {
              if (!prevTokens.some(t => t.address.toLowerCase() === param.toLowerCase())) {
                return [tokenWithBalance, ...prevTokens];
              }
              return prevTokens;
            });
            return tokenWithBalance;
          }
          return fetchedToken;
        }

        return null;
      };

      // Process both tokens in parallel
      const [fromTokenResult, toTokenResult] = await Promise.all([
        fromParam ? findOrFetchToken(fromParam) : null,
        toParam ? findOrFetchToken(toParam) : null
      ]);

      // Set the tokens only if they were found or fetched
      if (fromParam && fromTokenResult) {
        setFromToken(fromTokenResult);
      } else if (!fromToken && !fromParam) {
        // Only set default if no URL parameter and no token selected
        const defaultFromToken = tokens.find(t => t.symbol === "SOL");
        if (defaultFromToken && publicKey) {
          const balance = await fetchTokenBalance(defaultFromToken, publicKey);
          setFromToken({ ...defaultFromToken, balance });
        } else {
          setFromToken(defaultFromToken || null);
        }
      }

      if (toParam && toTokenResult) {
        setToToken(toTokenResult);
      } else if (!toToken && !toParam) {
        // Only set default if no URL parameter and no token selected
        const defaultToToken = tokens.find(t => t.symbol === "DOGE");
        if (defaultToToken && publicKey) {
          const balance = await fetchTokenBalance(defaultToToken, publicKey);
          setToToken({ ...defaultToToken, balance });
        } else {
          setToToken(defaultToToken || null);
        }
      }
    };

    initializeFromUrl();
  }, [tokens, publicKey]); // Dependencies array includes tokens and publicKey

  useEffect(() => {
    // Update From USD Value
    if (fromToken && amount) {
      const fromUsd = fromToken.price * parseFloat(amount || '0');
      setFromUsdValue(fromUsd ? `$${fromUsd.toFixed(2)}` : '');
    } else {
      setFromUsdValue('');
    }

    // Update To USD Value
    if (toToken && toAmount) {
      const toUsd = toToken.price * parseFloat(toAmount || '0');
      setToUsdValue(toUsd ? `$${toUsd.toFixed(2)}` : '');
    } else {
      setToUsdValue('');
    }
  }, [amount, toAmount, fromToken, toToken]);

  const TelegramPopup = () => (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowTelegramPopup(false)}
    >
      <div 
        className="bg-[#1E1E1E] rounded-xl p-6 w-[300px] transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Join Our Telegram
        </h3>
        <div className="space-y-3">
          <a
            href="https://t.me/DogeSwap_Ann"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#ff4400] hover:bg-[#ff4400]/80 text-white p-3 rounded-lg w-full transition-colors"
          >
            <FaTelegram className="w-5 h-5" />
            <span>Announcement Channel</span>
          </a>
          <a
            href="https://t.me/DogeSwap_Chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#ff4400] hover:bg-[#ff4400]/80 text-white p-3 rounded-lg w-full transition-colors"
          >
            <FaTelegram className="w-5 h-5" />
            <span>Community Chat</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Video background */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://dogecoin.com/assets/images/Header_Video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Add back the Menu and Connect Wallet buttons */}
      <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
        <div className="relative">
          <motion.button
            onClick={() => setIsChainMenuOpen(!isChainMenuOpen)}
            className="chain-switcher-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={chainOptions[selectedChain].logo}
              alt={chainOptions[selectedChain].name}
              className="w-6 h-6 rounded-full"
            />
            <ChevronDown className="w-4 h-4 ml-1 text-white" />
          </motion.button>
          
          <AnimatePresence>
            {isChainMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="chain-switcher-menu"
              >
                {[
                  { key: 'ethereum', name: 'Ethereum', logo: ethereumLogo },
                  { key: 'bsc', name: 'BSC', logo: bscLogo },
                  { key: 'base', name: 'Base', logo: baseLogo },
                  // { key: 'polygon', name: 'Polygon', logo: polygonLogo },
                  // { key: 'arbitrum', name: 'Arbitrum', logo: arbitrumLogo },
                  // { key: 'linea', name: 'Linea', logo: lineaLogo },
                  // { key: 'opbnb', name: 'opBNB', logo: bscLogo },
                  // { key: 'avalanche', name: 'Avalanche', logo: avalancheLogo },
                  // { key: 'celo', name: 'Celo', logo: celoLogo },
                  { key: 'solana', name: 'Solana', logo: solanaLogo },
                ].map((chain) => (
                  <motion.button
                    key={chain.key}
                    onClick={() => handleChainSwitch(chain.key as ChainType)}
                    className="chain-switcher-option"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <img
                      src={chain.logo}
                      alt={chain.name}
                      className="chain-logo"
                    />
                    <span className="chain-name">{chain.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <WalletMultiButton className="wallet-button" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          {/* <img src={logo} alt="Logo" className="w-24 h-24" /> */}
        </div>
        
        {/* Swap Card */}
        <div className="glass-effect border-2 border-[#ff4400] p-6 rounded-2xl shadow-[0_0_15px_rgba(255,68,0,0.3)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white text-2xl font-bold">Swap Responsibly</h1>
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="text-white hover:bg-white/10 p-2 rounded-lg"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {showSettings && (
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-[#ba9f32]/20">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Slippage Tolerance</span>
                  <div className="flex items-center space-x-2">
                    <div className="slippage-buttons-group">
                      {['0.1', '0.5', '1.0', '3.0'].map((value) => (
                        <button
                          key={value}
                          onClick={() => setSlippage(value)}
                          className={`slippage-preset-button ${slippage === value ? 'active' : ''}`}
                        >
                          {value}%
                        </button>
                      ))}
                    </div>
                    <div className="custom-slippage-input">
                      <input
                        type="number"
                        value={customSlippage}
                        onChange={(e) => setCustomSlippage(e.target.value)}
                        onBlur={handleSetCustomSlippage}
                        placeholder="Custom"
                        className="w-20 bg-transparent text-white text-right outline-none border-b border-[#ba9f32]/30 focus:border-[#ba9f32] transition-colors"
                      />
                      <span className="text-[#ba9f32]">%</span>
                    </div>
                  </div>
                </div>
                {parseFloat(slippage) > 3 && (
                  <div className="text-yellow-500 text-sm">
                    ⚠️ High slippage increases the risk of price impact
                  </div>
                )}
              </div>
            </div>
          )}

          {/* First token input */}
          <div className="bg-white/5 rounded-xl p-4 mb-2">
            <div className="flex justify-between items-center">
              <div className="flex flex-col w-full">
                <input
                  type="number"
                  className="w-full bg-transparent text-white text-3xl font-bold outline-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {fromUsdValue && (
                  <span className="text-sm text-gray-400 mt-1 text-left">
                    ≈ {fromUsdValue}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowTokenSelector("from")}
                className="token-selector-button"
              >
                {fromToken ? (
                  <>
                    <img src={fromToken.logo} alt={fromToken.symbol} className="w-6 h-6 rounded-full" />
                    <span className="text-white font-medium">{fromToken.symbol}</span>
                  </>
                ) : (
                  <span className="text-white">Select token</span>
                )}
                <ChevronDown className="w-5 h-5 text-white opacity-60" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-400">
                {fromToken && fromToken.balance !== undefined && (
                  <span>Available: {fromToken.balance.toFixed(6)} {fromToken.symbol}</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPercentageAmount(0.5, true)}
                  className="percentage-button"
                >
                  50%
                </button>
                <button
                  onClick={() => setPercentageAmount(1, true)}
                  className="percentage-button"
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          {/* Swap arrow */}
          <div className="relative z-10 -my-2">
            <button
              onClick={handleSwitchTokens}
              className="swap-arrow-container"
            >
              <ArrowDown className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Second token input */}
          <div className="bg-white/5 rounded-xl p-4 mt-2 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col w-full">
                <input
                  type="number"
                  className="w-full bg-transparent text-white text-3xl font-bold outline-none"
                  placeholder="0.00"
                  value={toAmount}
                  onChange={(e) => {
                    setToAmount(e.target.value);
                    if (fromToken && toToken) {
                      const newFromAmount = ((parseFloat(e.target.value) * toToken.price) / fromToken.price).toFixed(6);
                      setAmount(newFromAmount);
                    }
                  }}
                />
                {toUsdValue && (
                  <span className="text-sm text-gray-400 mt-1 text-left">
                    ≈ {toUsdValue}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowTokenSelector("to")}
                className="token-selector-button"
              >
                {toToken ? (
                  <>
                    <img src={toToken.logo} alt={toToken.symbol} className="w-6 h-6 rounded-full" />
                    <span className="text-white font-medium">{toToken.symbol}</span>
                  </>
                ) : (
                  <span className="text-white">Select token</span>
                )}
                <ChevronDown className="w-5 h-5 text-white opacity-60" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-400">
                {toToken && toToken.balance !== undefined && (
                  <span>Available: {toToken.balance.toFixed(6)} {toToken.symbol}</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPercentageAmount(0.5, false)}
                  className="percentage-button"
                >
                  50%
                </button>
                <button
                  onClick={() => setPercentageAmount(1, false)}
                  className="percentage-button"
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          {!publicKey ? (
            <WalletMultiButton className="wallet-button-dark w-full py-4 mt-4" />
          ) : (
            <button
              onClick={handleSwap}
              className="swap-button w-full py-4 mt-4"
              disabled={!amount || !fromToken || !toToken}
            >
              Swap
            </button>
          )}

          {/* <div className="text-center mt-4 text-gray-500">
            Powered by Doge Coin
          </div> */}
        </div>
      </div>

      {/* Social Links and Chain Logos */}
      <div className="mt-4 flex flex-col items-center relative z-10">
        <div className="flex items-center justify-center space-x-8 mb-4">
          <div className="flex space-x-4 glass-effect p-3 rounded-xl">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                onClick={(e) => {
                  if (link.label === 'Telegram') {
                    e.preventDefault();
                    setShowTelegramPopup(true);
                  }
                }}
                href={link.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#ff4400] transition-colors cursor-pointer"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Powered by image */}
          <motion.img
            src={poweredByLogo}
            alt="Powered by Dogechain"
            className="powered-by-image h-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Add Supported by text */}
        <div className="supported-by-text mb-1 typewriter">
          SUPPORTED BY
        </div>

        {/* Chain logos */}
        <div className="chain-logos-container pt-0">
          <div className="chain-logos-wrapper horizontal">
            {[
              { src: ethereumLogo, alt: 'Ethereum' },
              { src: bscLogo, alt: 'BSC' },
              { src: baseLogo, alt: 'Base' },
              { src: polygonLogo, alt: 'Polygon' },
              { src: arbitrumLogo, alt: 'Arbitrum' },
              { src: lineaLogo, alt: 'Linea' },
              // { src: avalancheLogo, alt: 'Avalanche' },
              // { src: celoLogo, alt: 'Celo' },
              { src: solanaLogo, alt: 'Solana' },
            ].map((chain, index) => (
              <div 
                key={chain.alt}
                className="chain-logo-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={chain.src}
                  alt={chain.alt}
                  className="chain-logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTokenSelector && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="token-selector-gradient absolute inset-0" />
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="token-selector-modal bg-[#1a1a1a]/90 border border-[#ff4400]/20 relative z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                Select a token
              </h3>
              <button 
                onClick={() => setShowTokenSelector(null)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <FaTimes className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search by name, symbol or address"
                className="token-search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="text-center text-white py-4">
                  Loading...
                </div>
              ) : (
                filteredTokens.map((token) => (
                  <motion.button
                    key={token.address}
                    className="token-list-item relative w-full flex justify-between items-center p-4 rounded-xl transition-all duration-200 overflow-hidden"
                    onClick={() => handleTokenSelection(token, showTokenSelector === "from")}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Animated background */}
                    <div className="token-list-background absolute inset-0" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3">
                      {token.logo ? (
                        <img src={token.logo} alt={token.symbol} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 bg-[#ba9f32] rounded-full flex items-center justify-center text-white text-lg font-bold">
                          {token.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span className="text-lg font-semibold text-white">{token.symbol}</span>
                        <span className="text-sm text-gray-400">{token.name}</span>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-end">
                      <span className="text-white font-medium">
                        ${token.price > 0 ? formatPrice(token.price) : '0.00'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm ${
                          token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {token.priceChange24h >= 0 ? "+" : ""}
                          {token.priceChange24h.toFixed(2)}%
                        </span>
                        {token.balance !== undefined && (
                          <span className="text-sm text-gray-400">
                            ({token.balance.toFixed(6)})
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="settings-modal">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                Settings
              </h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <FaTimes className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="mb-4">
                <label className="text-white text-lg mb-2 block">Slippage Tolerance</label>
                <div className="slippage-buttons-container">
                  {['0.1', '0.5', '1.0', '3.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`slippage-button ${slippage === value ? 'active' : ''}`}
                    >
                      {value}%
                    </button>
                  ))}
                  <div className="custom-slippage-input">
                    <input
                      type="number"
                      value={customSlippage}
                      onChange={(e) => setCustomSlippage(e.target.value)}
                      onBlur={handleSetCustomSlippage}
                      placeholder="Custom"
                    />
                    <span>%</span>
                  </div>
                </div>
                {parseFloat(slippage) > 3 && (
                  <div className="text-yellow-500 text-sm mt-2">
                    ⚠️ High slippage increases the risk of price impact
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showTelegramPopup && <TelegramPopup />}

      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        closeButton={true}
        autoClose={5000}
        style={{ zIndex: 9999 }}
        toastClassName="custom-toast"
        progressClassName="custom-toast-progress"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

