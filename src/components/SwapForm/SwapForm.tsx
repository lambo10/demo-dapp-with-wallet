import React, { useState, useCallback } from 'react';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import { toNano } from 'ton-core';
import { TokenList } from '../TokenList/TokenList';
import './SwapForm.scss';

interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI?: string;
}

export function SwapForm() {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTokenModal, setShowTokenModal] = useState<'from' | 'to' | null>(null);
  const [slippage, setSlippage] = useState<number>(1);
  const [estimatedOutput, setEstimatedOutput] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const handleSwap = async () => {
    if (!wallet || !fromToken || !toToken || !amount) return;

    try {
      setIsLoading(true);
      // TODO: Implement Dudust SDK integration once available
      // For now, we'll just show a placeholder message
      console.log('Swap functionality will be implemented with Dudust SDK');
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSelect = (token: Token, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
  };

  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (fromToken && toToken && value) {
      try {
        // TODO: Implement price quote functionality once Dudust SDK is available
        // For now, we'll just show a placeholder value
        setEstimatedOutput((Number(value) * 0.95).toFixed(6));
      } catch (error) {
        console.error('Failed to get quote:', error);
      }
    }
  };

  return (
    <div className="swap-form">
      <div className="swap-input-container">
        <div className="token-select" onClick={() => setShowTokenModal('from')}>
          {fromToken ? (
            <div className="selected-token">
              {fromToken.logoURI && (
                <img src={fromToken.logoURI} alt={fromToken.symbol} className="token-logo" />
              )}
              <span>{fromToken.symbol}</span>
            </div>
          ) : (
            <div className="select-token">Select Token</div>
          )}
        </div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.0"
          className="amount-input"
        />
      </div>

      <div className="swap-arrow">↓</div>

      <div className="swap-input-container">
        <div className="token-select" onClick={() => setShowTokenModal('to')}>
          {toToken ? (
            <div className="selected-token">
              {toToken.logoURI && (
                <img src={toToken.logoURI} alt={toToken.symbol} className="token-logo" />
              )}
              <span>{toToken.symbol}</span>
            </div>
          ) : (
            <div className="select-token">Select Token</div>
          )}
        </div>
        <div className="estimated-output">
          {estimatedOutput} {toToken?.symbol}
        </div>
      </div>

      <div className="slippage-container">
        <label>Slippage Tolerance:</label>
        <input
          type="number"
          value={slippage}
          onChange={(e) => setSlippage(Number(e.target.value))}
          min="0.1"
          max="5"
          step="0.1"
        />
      </div>

      {wallet ? (
        <button
          onClick={handleSwap}
          disabled={isLoading || !fromToken || !toToken || !amount}
          className="swap-button"
        >
          {isLoading ? 'Processing...' : 'Swap'}
        </button>
      ) : (
        <button onClick={() => tonConnectUI.openModal()} className="connect-button">
          Connect Wallet
        </button>
      )}

      {showTokenModal && (
        <div className="token-modal">
          <div className="modal-content">
            <input
              type="text"
              placeholder="Search by token name or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <TokenList
              searchQuery={searchQuery}
              onSelect={(token) => handleTokenSelect(token, showTokenModal)}
            />
            <button onClick={() => {
              setShowTokenModal(null);
              setSearchQuery('');
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 