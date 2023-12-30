import { Meta, StoryObj } from "@storybook/react";

import Document from "@/components/atoms/document";

const meta = {
  title: "Atoms/Document/Paragraph",
  component: Document.Paragraph,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    warning: { control: "boolean" },
  },
} satisfies Meta<typeof Document.Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Some paragraph",
    warning: false,
  },
  // TODO: Implement this test when issue mentioned in Tile stories gets fixed
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   const title = canvas.getByRole("paragraph", { name: "Some paragraph" });
  //   await expect(title).toBeInTheDocument();
  // },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    warning: true,
  },
};
