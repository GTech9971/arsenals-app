import type { Preview } from "@storybook/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/testing/mocks/handlers';


initialize({
  // onUnhandledRequest: 'warn'
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers
    }
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
    mswDecorator
  ],
};

export default preview;
