import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { StocksProvider } from '../context/StocksContext';
import { HistoryPage } from '../pages/HistoryPage';
import { HomePage } from '../pages/HomePage';
import styles from './AppTemplate.module.css';

export const AppTemplate = () => {
  return (
    <StocksProvider>
      <div className={styles.container}>
        <Router>
          <Routes>
            {/* Path to view a stock's history */}
            <Route path="/history/:ticker" element={<HistoryPage />} />
            {/* Path to view home page with all stocks */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </StocksProvider>
  );
}
