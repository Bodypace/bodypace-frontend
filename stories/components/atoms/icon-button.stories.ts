import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { IconButton } from "@/components/atoms/icon-button";

// TODO: test hover state

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "click me",
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "click me" });

    await expect(button).toBeInTheDocument();

    await expect(args.onClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(args.onClick).toHaveBeenNthCalledWith(1);
  },
};
