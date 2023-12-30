import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Document from "@/components/atoms/document";

const SampleList = () => (
  <Document.List>
    <Document.List.Item text="Item 1" />
    <Document.List.Item text="Item 2" />
    <Document.List.Item text="Item 3" />
    <Document.List.Item text="Item 4" />
  </Document.List>
);

const meta = {
  title: "Atoms/Document/List",
  component: SampleList,
  tags: ["autodocs"],
} satisfies Meta<typeof SampleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list");
    await expect(list).toBeInTheDocument();

    const items = within(list).getAllByRole("listitem");
    await expect(items).toHaveLength(4);
  },
};
