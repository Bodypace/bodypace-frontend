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
    async (ctx: any) => {
      localStorage?.removeItem("personalKey");
      localStorage?.removeItem("accessToken");
      if (ctx.parameters.localStorage) {
        for (const [key, value] of ctx.parameters.localStorage) {
          localStorage.setItem(key, value);
        }
      }
    },
  ],
};

export default preview;
