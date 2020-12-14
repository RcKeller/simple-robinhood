import React, { useMemo, useState, useEffect, useCallback } from "react";
import styles from "./History.module.css";
import common_styles from "./common.module.css";

import { Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import { chart_options } from "../Constants";

const History = ({ stocks }) => {
  // Get ticker from url
  const { ticker } = useParams();
  // List of historical prices
  const [history, setHistory] = useState([]);
  // Get the index of the current ticker in the stocks list
  const index = useMemo(() => {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i][0] === ticker) return i;
    }
    return -1;
  }, [stocks, ticker]);

  // Function to fetch historical data from api
  const getHistory = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}stocks/history/${ticker}`)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ticker]);

  // On component mount...
  useEffect(() => {
    // Fetch historical data initially
    getHistory();
    // Repeatedly fetch every minute
    const interval = setInterval(getHistory, 60000);

    return () => {
      // Stop fetching on component unmount
      clearInterval(interval);
    };
  }, [ticker, getHistory]);

  return (
    <div className={common_styles.container}>
      <Link className={common_styles.link} to="/">
        <span className={styles.back_btn}>← Back</span>
      </Link>
      <hr className="m-0" />
      {!stocks.length ? (
        // Stocks haven't been fetched yet. User must have refreshed on this page
        // So render spinner
        <div className={common_styles.spinner_container}>
          <Spinner className="m-auto" animation="border" />
        </div>
      ) : index >= 0 ? (
        // Valid ticker
        <>
          {/* Stock Ticker */}
          <Row className={styles.ticker + " mx-auto justify-content-center"}>
            {ticker}
          </Row>
          {/* Stock Price */}
          <Row
            className={styles.price + " mx-auto justify-content-center"}
            style={{
              color: stocks[index][2],
            }}
          >
            {index !== -1 ? stocks[index][1].toFixed(2) : ""}
          </Row>
          {/* Stock History */}
          <Row className="mx-auto">
            <Chart
              options={chart_options}
              series={[
                {
                  name: ticker,
                  data: history,
                },
              ]}
              type="line"
              height={350}
              width={600}
            />
          </Row>
        </>
      ) : (
        // User entered an invalid ticker into url
        <div>Invalid Ticker</div>
      )}
    </div>
  );
};

export default History;
