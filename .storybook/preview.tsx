import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { inter } from "../src/lib/fonts";
import * as React from "react";

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
      <div className={`${inter.className}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;