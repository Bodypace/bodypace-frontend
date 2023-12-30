import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Document from "@/components/atoms/document";

const meta = {
  title: "Atoms/Document/Header",
  component: Document.Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Document.Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Some header",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole("heading", { name: "Some header" });
    await expect(title).toBeInTheDocument();
  },
};
