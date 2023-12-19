import { Meta, StoryObj } from "@storybook/react";

import { tests as iconTests } from "../icon.stories";
import { htmlTests } from "../../htmlTests";

import Logo from "@/components/atoms/logo";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  tags: ["autodocs"],
  excludeStories: ["tests"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    small: false,
  },
  play: async ({ canvasElement }) => {
    await iconTests.testBodypaceIcon(canvasElement, 64);
    await htmlTests.testText(canvasElement, "Bodypace", {
      //   "font-family": "sans-serif",
      "font-weight": "300",
      "font-size": "48.832px",
      "line-height": "73.248px", // inside firefox on my machine it is 73.25px, idk why
      "letter-spacing": "normal",
      "text-transform": "none",
      "text-align": "start",
      color: "rgb(32, 32, 32)",
    });
  },
};

export const Small: Story = {
  args: {
    small: true,
  },
  play: async ({ canvasElement }) => {
    await iconTests.testBodypaceIcon(canvasElement, 32);
    await htmlTests.testText(canvasElement, "Bodypace", {
      //   "font-family": "sans-serif",
      "font-weight": "300",
      "font-size": "25.008px",
      "line-height": "37.512px", // inside firefox on my machine it is 37.5167px, idk why
      "letter-spacing": "normal",
      "text-transform": "none",
      "text-align": "start",
      color: "rgb(32, 32, 32)",
    });
  },
};
