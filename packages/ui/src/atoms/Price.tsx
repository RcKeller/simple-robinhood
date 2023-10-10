import classNames from 'classnames';
import React from 'react';

export interface PriceProps extends React.HTMLProps<HTMLDivElement> {
  color: string;
  price?: number;
}

export const Price: React.FC<PriceProps> = ({ price, color, className, ...props }) => {
  return (
    <div className={classNames("price", className)} style={{ color }} {...props}>
      {price !== undefined && price.toFixed(2)}
    </div>
  );
};
