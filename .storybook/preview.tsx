import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { inter, variables } from "../src/lib/fonts";
import * as React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

import { mockServerEndpoint } from "../stories/utils/mocking-server-endpoints";

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
    (ctx) => {
      if (!ctx.parameters.serverResponses) {
        return;
      }

      const account = ctx.parameters.serverResponses.account;
      let documents = ctx.parameters.serverResponses.documents;

      if (account === undefined && documents === undefined) {
        return;
      }

      if (account !== undefined) {
        if (account !== null && typeof account.sub !== "number") {
          throw new Error(
            "Mocking server responses failed: story specified parameters.serverResponses.account which is neither null nor a valid object",
          );
        }
      }

      if (documents !== undefined) {
        if (documents !== null) {
          if (!Array.isArray(documents)) {
            throw new Error(
              "Mocking server responses failed: story specified parameters.serverResponses.documents which is neither null nor an array",
            );
          } else {
            // NOTE: we do this so that we can remount stories in Storybook UI
            documents = [...documents];
          }
        }
      }

      ctx.parameters.serverData = {};
      ctx.parameters.msw = {
        handlers: [],
      };

      if (account !== undefined) {
        ctx.parameters.serverData.account = account;
        ctx.parameters.msw.handlers.push(
          mockServerEndpoint.accounts.get(account),
        );
      }

      if (documents !== undefined) {
        ctx.parameters.serverData.documents = documents;
        ctx.parameters.msw.handlers.push(
          mockServerEndpoint.documents.get(documents),
        );
        ctx.parameters.msw.handlers.push(
          mockServerEndpoint.documents.delete(documents),
        );
      }
    },
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
