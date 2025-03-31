import React, { useState, useEffect } from 'react';
import './TokenList.scss';

interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI?: string;
}

interface TokenListProps {
  onSelect: (token: Token) => void;
  searchQuery: string;
}

const defaultTokens: Token[] = [
  {
    address: '0:0000000000000000000000000000000000000000000000000000000000000000',
    symbol: 'TON',
    decimals: 9,
    name: 'TON',
    logoURI: 'https://ton.org/download/ton_symbol.png'
  },
  {
    address: '0:0b5d7afd8d8b82d286a6d8d48cf42c3d4df1aee6bdd8a2028742a5a0e8f16d9',
    symbol: 'USDT',
    decimals: 6,
    name: 'Tether USD',
    logoURI: 'https://ton.org/download/usdt_symbol.png'
  },
  {
    address: '0:2ba32b75870d572e255809b7b423f303f7b2f85336d236b8edf5fcba59fea404',
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
    logoURI: 'https://ton.org/download/usdc_symbol.png'
  }
];

export function TokenList({ onSelect, searchQuery }: TokenListProps) {
  const [tokens, setTokens] = useState<Token[]>(defaultTokens);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(defaultTokens);

  useEffect(() => {
    // Filter tokens based on search query
    const filtered = tokens.filter(token => {
      const searchLower = searchQuery.toLowerCase();
      return (
        token.symbol.toLowerCase().includes(searchLower) ||
        token.name.toLowerCase().includes(searchLower) ||
        token.address.toLowerCase().includes(searchLower)
      );
    });
    setFilteredTokens(filtered);
  }, [searchQuery, tokens]);

  const handleTokenClick = (token: Token) => {
    onSelect(token);
  };

  return (
    <div className="token-list">
      {filteredTokens.map((token) => (
        <div
          key={token.address}
          className="token-item"
          onClick={() => handleTokenClick(token)}
        >
          <div className="token-info">
            {token.logoURI && (
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="token-logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
            <div className="token-details">
              <span className="token-symbol">{token.symbol}</span>
              <span className="token-name">{token.name}</span>
            </div>
          </div>
          <span className="token-address">
            {token.address.slice(0, 6)}...{token.address.slice(-4)}
          </span>
        </div>
      ))}
    </div>
  );
} 