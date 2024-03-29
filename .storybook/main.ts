import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/components/**/*.stories.{ts,tsx}",
    "../stories/app/**/*.stories.{ts,tsx}",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config = {
      ...config,
    };
    config.resolve = {
      ...config.resolve,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
      "@testing": path.resolve(__dirname, "../stories/utils"),
      "@fixtures": path.resolve(__dirname, "../stories/fixtures"),
      "@scripts": path.resolve(__dirname, "../scripts"),
    };

    return config;
  },
};
export default config;
