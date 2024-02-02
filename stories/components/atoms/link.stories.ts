import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { htmlTests } from "../../htmlTests";

import Link from "@/components/atoms/link";

const meta = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "This is a link",
    href: "some_url",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "This is a link" });
    await expect(link).toBeInTheDocument();
    await htmlTests.testElementStyles(link, {
      "text-decoration": "underline solid rgb(32, 32, 32)",
      "font-weight": "400",
      "font-size": "20px",
      "line-height": "30px",
      "letter-spacing": "normal",
      "text-transform": "none",
      "text-align": "start",
      color: "rgb(32, 32, 32)",
    });
    expect(link).toHaveAttribute("href", "some_url");
  },
};
