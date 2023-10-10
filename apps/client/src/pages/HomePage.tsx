import { Stock } from "@rckeller/robinhood-ui";
import { Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStocks } from "../context/StocksContext";
import styles from "./HomePage.module.css";
import common_styles from "./Page.module.css";

export const HomePage = () => {
  const { stocks } = useStocks();

  return (
    <div className={common_styles.container + " m-auto"}>
      <Row className={styles.title + " mx-auto mb-2 justify-content-center"}>
        SimpleHood
      </Row>
      {/* Make sure stocks have been fetched */}
      {stocks.length > 0 ? (
        stocks.map((stock) => {
          const [ticker, price, color] = stock;
          return (
            <Link
              key={ticker}
              className={common_styles.link}
              to={`/history/${ticker}`}
            >
              <Stock
                ticker={ticker}
                price={price || 0}
                color={color}
                className={styles.stock_row + " mx-auto justify-content-between"}
              />
            </Link>
          )
        })
      ) : (
        // Show spinner if stocks haven't been fetched yet
        <div className={common_styles.spinner_container}>
          <Spinner className="m-auto" animation="border" />
        </div>
      )}
    </div>
  );
};
