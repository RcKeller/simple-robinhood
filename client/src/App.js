import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";
import Home from "./pages/Home";
import History from "./pages/History";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);
  const [tickers, setTickers] = useState([]);
  useEffect(() => {
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
    const interval = setInterval(() => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}stocks`, {
          tickers: tickers,
        })
        .then((response) => {
          // console.log(response.data);
          let new_stocks = [...response.data];
          new_stocks.forEach((stock, index) => {
            stock.push(
              stocks.length === 0 || stock[1] > stocks[index][1]
                ? "green"
                : "red"
            );
          });
          setStocks(new_stocks);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [tickers, stocks]);
  return (
    <div className={styles.container}>
      <Router>
        <Switch>
          <Route
            path="/history/:ticker"
            render={(props) => <History {...props} stocks={stocks} />}
          />

          <Route path="/">
            <Home stocks={stocks} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
