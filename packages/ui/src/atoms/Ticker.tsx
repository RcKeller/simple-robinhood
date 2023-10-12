import classNames from 'classnames'
import React from 'react'

export interface TickerProps extends React.HTMLProps<HTMLDivElement> {
  ticker: string
}

export const Ticker: React.FC<TickerProps> = ({
  ticker,
  className,
  ...props
}) => {
  return (
    <div className={classNames('ticker', className)} {...props}>
      {ticker}
    </div>
  )
}
