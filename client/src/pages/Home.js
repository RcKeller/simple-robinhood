import React from "react";
import { Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import common_styles from "./common.module.css";

const Home = ({ stocks }) => {
  return (
    <div className={common_styles.container + " m-auto"}>
      <Row className={styles.title + " mx-auto mb-2 justify-content-center"}>
        SimpleHood
      </Row>

      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <Link
            key={stock[0]}
            className={common_styles.link}
            to={`/history/${stock[0]}`}
          >
            <Row
              className={styles.stock_row + " mx-auto justify-content-between"}
            >
              <div className={styles.ticker}>{stock[0]}</div>
              <div
                className={styles.price}
                style={{
                  color: stock[2],
                }}
              >
                {stock[1] && stock[1].toFixed(2)}
              </div>
            </Row>
          </Link>
        ))
      ) : (
        <div className={common_styles.spinner_container}>
          <Spinner className="m-auto" animation="border" />
        </div>
      )}
    </div>
  );
};

export default Home;
