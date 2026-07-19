import { createContext, useContext, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(PORTFOLIO_DATA);
  const [loading, setLoading] = useState(false);

  return (
    <PortfolioContext.Provider value={{ data, loading, setData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
