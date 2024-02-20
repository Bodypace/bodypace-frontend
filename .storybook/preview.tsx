import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { inter, variables } from "../src/lib/fonts";
import * as React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

import { ProvideEncryption, EncryptionContext } from "../src/lib/encryption";

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
    (Story) => {
      const encryption = ProvideEncryption();

      return (
        <div className={`${inter.className} ${variables}`}>
          <EncryptionContext.Provider value={encryption}>
            <Story />
          </EncryptionContext.Provider>
        </div>
      );
    },
  ],
  loaders: [
    mswLoader,
    async () => {
      localStorage?.removeItem("accessToken");
    },
  ],
};

export default preview;
