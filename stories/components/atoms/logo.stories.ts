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
        // TODO: use commented out line after upgrading to Next.js 14
        // 'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        'Poppins, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // because of downgrade to Next 13 from Next 14
      "font-weight": "300",
      "font-size": "25.008px",
      "line-height": "31.0099px", // inside firefox on my machine it a different, idk why
      "letter-spacing": "normal",
      "text-transform": "none",
      "text-align": "start",
      color: "rgb(32, 32, 32)",
    });
  },
};
