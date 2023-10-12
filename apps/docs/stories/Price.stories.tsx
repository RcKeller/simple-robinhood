import { Price, PriceProps } from '@rckeller/robinhood-ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Price> = {
  title: 'Atoms/Price',
  component: Price,
  argTypes: {
    color: { control: { type: 'string' } },
  },
}
export default meta

type Story = StoryObj<typeof Price>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props: PriceProps) => (
    <Price
      {...props}
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert('Hello from Turborepo!')
      }}
    />
  ),
  name: 'Price',
  args: {
    price: 123.45,
    color: 'green',
  },
}
