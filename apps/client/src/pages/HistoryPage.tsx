import { Price, Ticker } from '@rckeller/robinhood-ui';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useStocks } from '../context/StocksContext';
import { chart_options } from '../utils/constants';
import styles from './HistoryPage.module.css';
import common_styles from './Page.module.css';

export const HistoryPage = () => {
  const { stocks } = useStocks();
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
      .get(`${process.env.REACT_APP_SIMPLEHOOD_API_HOST}/stocks/history/${ticker}`)
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

  const price = stocks[index][1] || 0
  const color = stocks[index][2]

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
          <Row className={styles.ticker + ' mx-auto justify-content-center'}>
            {ticker && <Ticker ticker={ticker} />}
          </Row>
          <Row className={styles.price + ' mx-auto justify-content-center'}>
            {index !== -1 && (
              <Price price={price} color={color} />
            )}
          </Row>
          <Row className="mx-auto">
            <Chart
              options={chart_options as any}
              series={[{ name: ticker, data: history }]}
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
