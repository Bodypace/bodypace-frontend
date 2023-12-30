import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Document from "@/components/atoms/document";

const meta = {
  title: "Atoms/Document/Title",
  component: Document.Title,
  tags: ["autodocs"],
} satisfies Meta<typeof Document.Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Some title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole("heading", { name: "Some title" });
    await expect(title).toBeInTheDocument();
  },
};
