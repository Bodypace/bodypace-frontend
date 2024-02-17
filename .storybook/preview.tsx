import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { inter, variables } from "../src/lib/fonts";
import * as React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${inter.className} ${variables}`}>
        <Story />
      </div>
    ),
  ],
  loaders: [
    mswLoader,
    async () => { localStorage?.removeItem('accessToken'); }
  ],
};

export default preview;
