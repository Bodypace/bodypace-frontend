import { Meta, StoryObj } from "@storybook/react";
import { fn, within, expect, userEvent } from "@storybook/test";

import { File } from "@/components/molecules/file";

const meta = {
  title: "Molecules/File",
  component: File,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", {
      // TODO: this label name is probably not ideal
      name: args.filename,
    });
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toHaveAttribute(
      "aria-checked",
      args.checked ? "true" : "false",
    );

    await expect(args.onChange).toHaveBeenCalledTimes(0);
    await user.click(checkbox);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenNthCalledWith(1, !args.checked);
  },
} satisfies Meta<typeof File>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DecryptedUnchecked: Story = {
  args: {
    encrypted: false,
    no: 1,
    filename: "blood_work.pdf",
    checked: false,
    onChange: fn(),
  },
};

export const DecryptedChecked: Story = {
  args: {
    ...DecryptedUnchecked.args,
    checked: true,
  },
};

export const EncryptedUnchecked: Story = {
  args: {
    ...DecryptedUnchecked.args,
    encrypted: true,
  },
};

export const EncryptedChecked: Story = {
  args: {
    ...EncryptedUnchecked.args,
    checked: true,
  },
};
