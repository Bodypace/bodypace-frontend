import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent, fn, waitFor } from "@storybook/test";

import { ProvideEncryption } from "@/lib/encryption";

import { addEncryptionMocking } from "@testing/mocking-encryption";

import RemoveKeyDialog from "@/components/molecules/dialogs/remove-key-dialog";

const MockedRemoveKeyDialog = addEncryptionMocking(RemoveKeyDialog);

const meta = {
  title: "Molecules/Dialogs/RemoveKeyDialog",
  component: MockedRemoveKeyDialog,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  decorators: [
    (Story: any, ctx) => {
      return (
        <div className="flex flex-col min-h-screen w-full bg-color-background">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof MockedRemoveKeyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Opened: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  decorators: [
    (Story: any, ctx) => {
      localStorage.setItem("personalKey", "random-key-from-storage-42");
      ctx.args.mockedEncryption = ProvideEncryption();
      ctx.args.mockedEncryption.forgetPersonalKey = React.useRef(
        fn(ctx.args.mockedEncryption.forgetPersonalKey!),
      ).current;
      return Story();
    },
  ],
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);

    let cancelButton;
    let confirmButton;

    await waitFor(() => {
      cancelButton = canvas.getByRole("button", { name: "Cancel" });
      expect(cancelButton).toBeInTheDocument();

      confirmButton = canvas.getByRole("button", { name: "Yes" });
      expect(confirmButton).toBeInTheDocument();
    });

    await expect(args.setOpen).toHaveBeenCalledTimes(0);
    await expect(
      args.mockedEncryption!.forgetPersonalKey,
    ).toHaveBeenCalledTimes(0);

    await user.click(cancelButton);
    await expect(args.setOpen).toHaveBeenCalledTimes(1);
    await expect(args.setOpen).toHaveBeenNthCalledWith(1, false);
    await expect(
      args.mockedEncryption!.forgetPersonalKey,
    ).toHaveBeenCalledTimes(0);

    await expect(localStorage.getItem("personalKey")).toBe(
      "random-key-from-storage-42",
    );

    await user.click(confirmButton);
    await expect(args.setOpen).toHaveBeenCalledTimes(2);
    await expect(args.setOpen).toHaveBeenNthCalledWith(1, false);
    await expect(args.setOpen).toHaveBeenNthCalledWith(2, false);
    await expect(
      args.mockedEncryption!.forgetPersonalKey,
    ).toHaveBeenCalledTimes(1);

    await expect(localStorage.getItem("personalKey")).toBe(null);
  },
};

export const Closed: Story = {
  args: {
    open: false,
    setOpen: () => {},
  },
};
