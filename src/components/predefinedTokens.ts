


// Since the Token interface is not in a separate types file, we'll define it here
interface Token {
    symbol: string;
    address: string;
    logo?: string;
    name: string;
    price: number;
    priceChange24h: number;
  }
  
  export const predefinedTokens: Token[] = [
    { symbol: 'SOL', address: 'So11111111111111111111111111111111111111112', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', name: 'Wrapped SOL', price: 0, priceChange24h: 0 },
    { symbol: 'DOGE', address: '9TY6DUg1VSssYH5tFE95qoq5hnAGFak4w3cn72sJNCoV', logo: 'https://node1.irys.xyz/qsWfDN2W0JUZENTEeNp-xNHjtVMMizc7LSHmh3RMuPo', name: 'Department of Gov Efficiency', price: 0, priceChange24h: 0 },
    { symbol: 'USDC', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', name: 'USD Coin', price: 0, priceChange24h: 0 },
    { symbol: 'RAY', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png', name: 'Raydium', price: 0, priceChange24h: 0 },
    { symbol: 'SRM', address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png', name: 'Serum', price: 0, priceChange24h: 0 },
    { symbol: 'ETH', address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png', name: 'Wrapped Ethereum (Wormhole)', price: 0, priceChange24h: 0 },
    { symbol: 'GENE', address: 'GENEtH5amGSi8kHAtQoezp1XEXwZJ8vcuePYnXdKrMYz', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GENEtH5amGSi8kHAtQoezp1XEXwZJ8vcuePYnXdKrMYz/logo.png', name: 'Genopets', price: 0, priceChange24h: 0 },
    { symbol: 'COPE', address: '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh/logo.png', name: 'COPE', price: 0, priceChange24h: 0 },
    { symbol: 'STEP', address: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png', name: 'Step', price: 0, priceChange24h: 0 },
    { symbol: 'SLND', address: 'SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp/logo.png', name: 'Solend', price: 0, priceChange24h: 0 },
    { symbol: 'MEDIA', address: 'ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs/logo.png', name: 'Media Network', price: 0, priceChange24h: 0 },
    { symbol: 'MER', address: 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K/logo.png', name: 'Mercurial', price: 0, priceChange24h: 0 },
    { symbol: 'SLIM', address: 'xxxxa1sKNGwFtw2kFn8XauW9xq8hBZ5kVtcSesTT9fW', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/xxxxa1sKNGwFtw2kFn8XauW9xq8hBZ5kVtcSesTT9fW/logo.png', name: 'Solanium', price: 0, priceChange24h: 0 },
    { symbol: 'ATLAS', address: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx/logo.png', name: 'Star Atlas', price: 0, priceChange24h: 0 },
    { symbol: 'POLIS', address: 'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk/logo.png', name: 'Star Atlas DAO', price: 0, priceChange24h: 0 },
    { symbol: 'BOP', address: 'BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3/logo.png', name: 'Boring Protocol', price: 0, priceChange24h: 0 },
    { symbol: 'SAMO', address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png', name: 'Samoyedcoin', price: 0, priceChange24h: 0 },
    { symbol: 'ORCA', address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png', name: 'Orca', price: 0, priceChange24h: 0 },
    { symbol: 'FTT', address: 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3/logo.png', name: 'FTX Token (Wormhole)', price: 0, priceChange24h: 0 },
    { symbol:  'MSOL', address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png', name: 'Marinade staked SOL (mSOL)', price: 0, priceChange24h: 0 },
    { symbol: 'SUSHI', address: 'AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy/logo.png', name: 'Sushi Token (Wormhole)', price: 0, priceChange24h: 0 },
    { symbol: 'MNDE', address: 'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey/logo.png', name: 'Marinade', price: 0, priceChange24h: 0 },
    { symbol: 'LIQ', address: '4wjPQJ6PrkC4dHhYghwJzGBVP78DkBzA2U3kHoFNBuhj', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4wjPQJ6PrkC4dHhYghwJzGBVP78DkBzA2U3kHoFNBuhj/logo.png', name: 'LIQ Protocol', price: 0, priceChange24h: 0 },
    { symbol: 'SNY', address: '4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png', name: 'Synthetify', price: 0, priceChange24h: 0 },
    { symbol: 'GOFX', address: 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD/logo.png', name: 'GooseFX', price: 0, priceChange24h: 0 },
    { symbol: 'WOOF', address: '9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE/logo.png', name: 'WOOF', price: 0, priceChange24h: 0 },
    { symbol: 'XTAG', address: '5gs8nf4wojB5EXgDUWNLwXpknzgV2YWDhveAeBZpVLbp', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5gs8nf4wojB5EXgDUWNLwXpknzgV2YWDhveAeBZpVLbp/logo.png', name: 'xHashtag', price: 0, priceChange24h: 0 },
    { symbol: 'ALEPH', address: 'CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K/logo.png', name: 'Aleph.im (Wormhole v1)', price: 0, priceChange24h: 0 },
    { symbol: 'SBR', address: 'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1/logo.png', name: 'Saber Protocol Token', price: 0, priceChange24h: 0 },
    { symbol: 'SLRS', address: 'SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr/logo.png', name: 'Solrise Finance', price: 0, priceChange24h: 0 },
    { symbol: 'WOO', address: 'E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy/logo.png', name: 'Wootrade Network', price: 0, priceChange24h: 0 },
    { symbol: 'APEX', address: '51tMb3zBKDiQhNwGqpgwbavaGH54mk8fXFzxTc1xnasg', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/51tMb3zBKDiQhNwGqpgwbavaGH54mk8fXFzxTc1xnasg/logo.png', name: 'APEX', price: 0, priceChange24h: 0 },
    { symbol: 'USDT', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', logo: 'https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png', name: 'USDT', price: 0, priceChange24h: 0 },
    { symbol: 'USH', address: '9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6/logo.png', name: 'Hubble', price: 0, priceChange24h: 0 },
    { symbol: 'SHDW', address: 'SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y/logo.png', name: 'Shadow Token', price: 0, priceChange24h: 0 },
    { symbol: 'BASIS', address: 'Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa/logo.png', name: 'basis', price: 0, priceChange24h: 0 },
    { symbol: 'GST', address: 'AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB/logo.png', name: 'GST', price: 0, priceChange24h: 0 },
    { symbol: 'GMT', address: '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx/logo.png', name: 'STEPN', price: 0, priceChange24h: 0 },
    { symbol: 'BONK', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png', name: 'Bonk', price: 0, priceChange24h: 0 },
];
