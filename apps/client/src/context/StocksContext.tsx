import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export interface StocksState {
  stocks: Array<[string, number | null, string]>;
  tickers: string[];
}

const initialContext: StocksState = {
  stocks: [],
  tickers: [],
};

const StocksContext = createContext<StocksState>(initialContext);

export function StocksProvider({ children }: { children?: React.ReactNode }) {
  const [stocks, setStocks] = useState<StocksState["stocks"]>([]);
  const [tickers, setTickers] = useState<StocksState["tickers"]>([]);

  // On page render....
  useEffect(() => {
    // Fetch list of tickers if we haven't already
    if (!tickers.length) {
      axios
        .get(`${process.env.REACT_APP_SIMPLEHOOD_API_HOST}/tickers`)
        .then((response) => {
          setTickers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tickers]);

  useEffect(() => {
    // Fetch stock prices every second
    const interval = setInterval(() => {
      if (!tickers.length) return;
      axios
        .post(`${process.env.REACT_APP_SIMPLEHOOD_API_HOST}/stocks`, {
          tickers: tickers,
        })
        .then((response) => {
          // initialize list for new stock prices
          let new_stocks = [...response.data];
          // get color for each ticker by comparing new price with old price
          new_stocks.forEach((stock, index) => {
            stock.push(
              stocks.length === 0 ||
                stock[1] > (stocks as any)[index][1]
                ? 'green'
                : 'red'
            );
          });
          setStocks(new_stocks);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    return () => {
      // Stop fetching if page is unmounted
      clearInterval(interval);
    };
  }, [tickers, stocks, setStocks]);

  return (
    <StocksContext.Provider value={{ stocks, tickers }}>
      {children}
    </StocksContext.Provider>
  );
}

export function useStocks() {
  const context = useContext(StocksContext);
  if (!context) {
    throw new Error('useStocks must be used within a ProvideStocks');
  }
  return context;
}
