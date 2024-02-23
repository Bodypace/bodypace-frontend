import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { within, expect, fn, waitFor, userEvent } from "@storybook/test";

import {
  addEncryptionMocking,
  ProvideEncryptionActions,
  ProvideEncryptionConnectedToActions,
  ReopeningDialogStory,
} from "./utils";

import EnterKeyDialog from "@/components/molecules/dialogs/enter-key-dialog";

const MockedEnterKeyDialog = addEncryptionMocking(EnterKeyDialog);
const initialKey = "super secret initial key value, should not be exposed";

const meta = {
  title: "Molecules/Dialogs/EnterKeyDialog",
  component: MockedEnterKeyDialog,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  args: {
    mockedEncryption: ProvideEncryptionActions(initialKey),
  },
  decorators: [
    (Story: any) => (
      <div className="flex flex-col min-h-screen w-full bg-color-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MockedEnterKeyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Opened: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const _ = await helpers.grabControlElements(canvas);

    await expect(args.setOpen).toHaveBeenCalledTimes(0);
  },
};

export const InputCleared: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const [saveButton, closeButton, input] =
      await helpers.grabControlElements(canvas);

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await expect(args.setOpen).toHaveBeenCalledTimes(0);
    await user.click(closeButton);
    await expect(args.setOpen).toHaveBeenCalledTimes(1);
    await expect(args.setOpen).toHaveBeenNthCalledWith(1, false);

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    const key = "some key";
    await user.type(input, key);

    await expect(saveButton).not.toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await user.tripleClick(input);
    await user.keyboard("{backspace}");

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await user.type(input, key);

    await expect(saveButton).not.toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    for (let i = 0; i < key.length - 1; i++) {
      await user.type(input, "{backspace}");
    }

    await expect(saveButton).not.toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await user.type(input, "{backspace}");

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");
  },
};

export const InputFilled: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const [saveButton, closeButton, input] =
      await helpers.grabControlElements(canvas);

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await expect(args.setOpen).toHaveBeenCalledTimes(0);

    const key = "some key";
    await user.type(input, key);

    await expect(saveButton).not.toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");
  },
};

export const InputFilledReopened: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  decorators: [ProvideEncryptionConnectedToActions, ReopeningDialogStory],
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    let canvas = within(canvasElement);
    let [saveButton, closeButton, input] =
      await helpers.grabControlElements(canvas);

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await expect(args.setOpen).toHaveBeenCalledTimes(0);

    const key = "some key";
    await expect(canvas.queryByDisplayValue(key)).not.toBeInTheDocument();
    await expect(localStorage.getItem("personalKey")).toBe(initialKey);
    await waitFor(() =>
      // waiting for this key is required because ProvideEncryptionConnectedToActions decorator renders twice:
      // first time giving the MockableEnterKeyDialog undefined as key, and then the second time with the correct key
      // NOTE: this will be gone probably after fixing double rendering in @/lib/encryption
      expect(args.mockedEncryption!.personalKey).toBe(initialKey),
    );

    await user.type(input, key);
    await expect(canvas.getByDisplayValue(key)).toBeInTheDocument();
    await expect(localStorage.getItem("personalKey")).toBe(initialKey);
    await expect(args.mockedEncryption!.personalKey).toBe(initialKey);
    await expect(
      args.mockedEncryption!.importPersonalKey,
    ).toHaveBeenCalledTimes(0);

    await expect(saveButton).not.toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await user.click(closeButton);
    await expect(args.setOpen).toHaveBeenCalledTimes(1);
    await expect(args.setOpen).toHaveBeenNthCalledWith(1, false);

    // NOTE: we need to do this but idk why, otherwise all later assertions pass blindly no matter what
    canvas = within(canvasElement);

    [saveButton, closeButton, input] = await helpers.grabControlElements(
      canvas,
      { timeout: 2000 },
    );

    await expect(canvas.queryByDisplayValue(key)).not.toBeInTheDocument();

    await expect(localStorage.getItem("personalKey")).toBe(initialKey);
    await expect(args.mockedEncryption!.personalKey).toBe(initialKey);
    await expect(
      args.mockedEncryption!.importPersonalKey,
    ).toHaveBeenCalledTimes(0);

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");
  },
};

export const InputFilledSaved: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  decorators: [ProvideEncryptionConnectedToActions],
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const [saveButton, closeButton, input] =
      await helpers.grabControlElements(canvas);

    await expect(saveButton).toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await user.click(saveButton);
    await expect(
      args.mockedEncryption!.importPersonalKey,
    ).toHaveBeenCalledTimes(0);
    await expect(args.setOpen).toHaveBeenCalledTimes(0);

    const key = "some key";
    await user.type(input, key);

    await expect(saveButton).not.toHaveAttribute("disabled");
    await expect(closeButton).not.toHaveAttribute("disabled");

    await expect(localStorage.getItem("personalKey")).toBe(initialKey);
    await expect(args.mockedEncryption!.personalKey).toBe(initialKey);

    await user.click(saveButton);
    await expect(
      args.mockedEncryption!.importPersonalKey,
    ).toHaveBeenCalledTimes(1);
    await expect(
      args.mockedEncryption!.importPersonalKey,
    ).toHaveBeenNthCalledWith(1, key);
    await expect(args.setOpen).toHaveBeenCalledTimes(1);
    await expect(args.setOpen).toHaveBeenNthCalledWith(1, false);

    await expect(localStorage.getItem("personalKey")).toBe(key);
    await expect(args.mockedEncryption!.personalKey).toBe(key);
  },
};

export const Closed: Story = {
  args: {
    open: false,
    setOpen: fn(),
  },
};

const helpers = {
  grabControlElements: async (
    canvas: any,
    { timeout }: { timeout?: number } = {},
  ) => {
    return await waitFor(
      () => {
        const saveButton = canvas.getByRole("button", {
          name: "Save",
        });
        expect(saveButton).toBeInTheDocument();

        const closeButton = canvas.getByRole("button", { name: "Close" });
        expect(closeButton).toBeInTheDocument();

        const input = canvas.getByPlaceholderText("enter your key here");
        expect(input).toBeInTheDocument();

        return [saveButton, closeButton, input] as const;
      },
      { timeout },
    );
  },
};
