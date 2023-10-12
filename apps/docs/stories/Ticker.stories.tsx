import { Ticker, TickerProps } from '@rckeller/robinhood-ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Ticker> = {
  title: 'Atoms/Ticker',
  component: Ticker,
  argTypes: {
    ticker: { type: 'string' },
  },
}
export default meta

type Story = StoryObj<typeof Ticker>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props: TickerProps) => (
    <Ticker
      {...props}
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert('Hello from Turborepo!')
      }}
    />
  ),
  name: 'Ticker',
  args: {
    ticker: 'AAPL',
  },
}
