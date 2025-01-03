import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/testing/mocks/handlers';


import { setupIonicReact } from "@ionic/react";
//ionic フレームワークをstorybookに適応
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../src/theme/variables.css';

setupIonicReact();


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
    mswDecorator
  ],
};

export default preview;
