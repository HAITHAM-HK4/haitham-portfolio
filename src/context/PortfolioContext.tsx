import { createContext, useContext, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { PortfolioData } from '../types/portfolio';

interface PortfolioContextValue {
  data: PortfolioData;
  loading: boolean;
  setData: (data: PortfolioData) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [data, setData] = useState<PortfolioData>(PORTFOLIO_DATA);
  const [loading, setLoading] = useState(false);

  return (
    <PortfolioContext.Provider value={{ data, loading, setData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
