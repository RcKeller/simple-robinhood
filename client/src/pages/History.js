import React, { useMemo, useState, useEffect, useCallback } from "react";
import styles from "./History.module.css";
import common_styles from "./common.module.css";

import { Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import { chart_options } from "../Constants";

const History = ({ stocks }) => {
  const { ticker } = useParams();
  const [history, setHistory] = useState([]);
  const index = useMemo(() => {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i][0] === ticker) return i;
    }
    return -1;
  }, [stocks, ticker]);

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

  useEffect(() => {
    getHistory();
    const interval = setInterval(getHistory, 60000);

    return () => {
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
        <div className={common_styles.spinner_container}>
          <Spinner className="m-auto" animation="border" />
        </div>
      ) : index >= 0 ? (
        <>
          <Row className={styles.ticker + " mx-auto justify-content-center"}>
            {ticker}
          </Row>

          <Row
            className={styles.price + " mx-auto justify-content-center"}
            style={{
              color: stocks[index][2],
            }}
          >
            {index !== -1 ? stocks[index][1] : ""}
          </Row>
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
        <div>Invalid Ticker</div>
      )}
    </div>
  );
};

export default History;
