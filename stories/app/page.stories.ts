import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Home from "@/app/page";

const meta = {
  title: "Screens/Home",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByAltText("Next.js Logo");
    await expect(icon).toBeInTheDocument();
    await expect(icon.getAttribute("src")).toBe("/next.svg?w=384&q=75");
    await expect(icon.getAttribute("width")).toBe("180");
    await expect(icon.getAttribute("height")).toBe("37");
  },
};
