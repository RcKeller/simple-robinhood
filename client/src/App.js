import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";
import Home from "./pages/Home";
import History from "./pages/History";
import axios from "axios";

function App() {
  // List of stock prices
  const [stocks, setStocks] = useState([]);
  const stocksPrev = useRef([]);
  // List of stock tickers
  const [tickers, setTickers] = useState([]);
  // On page render....
  useEffect(() => {
    // Fetch list of tickers if we haven't already
    if (!tickers.length) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}tickers`)
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
        .post(`${process.env.REACT_APP_BACKEND_URL}stocks`, {
          tickers: tickers,
        })
        .then((response) => {
          // initialize list for new stock prices
          let new_stocks = [...response.data];
          // get color for each ticker by comparing new price with old price
          new_stocks.forEach((stock, index) => {
            stock.push(
              stocksPrev.current.length === 0 ||
                stock[1] > stocksPrev.current[index][1]
                ? "green"
                : "red"
            );
          });
          setStocks(new_stocks);
          stocksPrev.current = new_stocks;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    return () => {
      // Stop fetching if page is unmounted
      clearInterval(interval);
    };
  }, [tickers]);

  return (
    <div className={styles.container}>
      <Router>
        <Switch>
          {/* Path to view a stock's history */}
          <Route
            path="/history/:ticker"
            render={(props) => <History {...props} stocks={stocks} />}
          />
          {/* Path to view home page with all stocks */}
          <Route path="/">
            <Home stocks={stocks} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
