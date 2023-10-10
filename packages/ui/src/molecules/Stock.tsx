import classNames from 'classnames';
import React from 'react';

import { Price, Ticker } from '../atoms';

export interface StockProps extends React.HTMLProps<HTMLDivElement> {
  ticker: string;
  price?: number;
  color: string;
}

export const Stock: React.FC<StockProps> = ({ ticker, className, price, color, ...props }) => {
  return (
    <div className={classNames("stock", "row", className)} {...props}>
      <Ticker ticker={ticker} />
      <Price price={price} color={color} />
    </div>
  );
};

