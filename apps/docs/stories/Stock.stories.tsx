import { Stock, StockProps } from '@rckeller/robinhood-ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Stock> = {
  title: 'Molecules/Stock',
  component: Stock,
  argTypes: {
    ticker: { type: 'string' },
    price: { type: 'number' },
    color: { control: 'color' },
  },
}
export default meta

type Story = StoryObj<typeof Stock>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props: StockProps) => (
    <Stock
      {...props}
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert('Hello from Turborepo!')
      }}
    />
  ),
  name: 'Stock',
  args: {
    ticker: 'AAPL',
    price: 123.45,
    color: 'green',
  },
}
