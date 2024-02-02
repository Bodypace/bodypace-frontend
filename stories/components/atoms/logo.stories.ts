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
  args: {},
  play: async ({ canvasElement }) => {
    await iconTests.testBodypaceIcon(canvasElement, 32);
    await htmlTests.testText(canvasElement, "Bodypace", {
      "font-family":
        'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      "font-weight": "300",
      "font-size": "25.008px",
      "line-height": "30.0096px", // inside firefox on my machine it is 30.0167px, idk why
      "letter-spacing": "normal",
      "text-transform": "none",
      "text-align": "start",
      color: "rgb(32, 32, 32)",
    });
  },
};
