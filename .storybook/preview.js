import { addDecorator } from "@storybook/react"
import StoryRouter from "storybook-react-router"

addDecorator(StoryRouter())

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}