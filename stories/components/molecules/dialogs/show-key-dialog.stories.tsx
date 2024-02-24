import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent, fn, waitFor } from "@storybook/test";

import { ReopeningDialogStory } from "@testing/reopening-dialog";
import { addEncryptionMocking } from "@testing/mocking-encryption";

import ShowKeyDialog from "@/components/molecules/dialogs/show-key-dialog";

const MockedShowKeyDialog = addEncryptionMocking(ShowKeyDialog);

const meta = {
  title: "Molecules/Dialogs/ShowKeyDialog",
  component: MockedShowKeyDialog,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  args: {
    mockedEncryption: {
      personalKey: "mocked-personal-key-42",
    },
  },
  decorators: [
    (Story: any) => (
      <div className="flex flex-col min-h-screen w-full bg-color-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MockedShowKeyDialog>;

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

    await helpers.expectKeyInvisible(
      canvas,
      args.mockedEncryption!.personalKey,
    );

    await expect(args.setOpen).toHaveBeenCalledTimes(0);
  },
};

export const KeyVisible: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const [checkbox, _] = await helpers.grabControlElements(canvas);

    await helpers.expectKeyInvisible(
      canvas,
      args.mockedEncryption!.personalKey,
    );

    await helpers.turnOnCheckbox(user, checkbox);
    await helpers.expectKeyVisible(canvas, args.mockedEncryption!.personalKey);

    await expect(args.setOpen).toHaveBeenCalledTimes(0);
  },
};

export const KeyVisibleReopened: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  decorators: [ReopeningDialogStory],
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    let canvas = within(canvasElement);
    let [checkbox, closeButton] = await helpers.grabControlElements(canvas);

    await helpers.expectKeyInvisible(
      canvas,
      args.mockedEncryption!.personalKey,
    );

    await helpers.turnOnCheckbox(user, checkbox);
    await helpers.expectKeyVisible(canvas, args.mockedEncryption!.personalKey);

    await expect(args.setOpen).toHaveBeenCalledTimes(0);

    await user.click(closeButton);

    await expect(args.setOpen).toHaveBeenCalledTimes(1);
    await expect(args.setOpen).toHaveBeenNthCalledWith(1, false);

    // NOTE: we need to do this but idk why, otherwise all later assertions pass blindly no matter what
    canvas = within(canvasElement);

    [checkbox, closeButton] = await helpers.grabControlElements(canvas, {
      timeout: 2000, // default timeout is 1000ms but it's too soon and fails in our case
    });

    await helpers.expectKeyInvisible(
      canvas,
      args.mockedEncryption!.personalKey,
    );
  },
};

export const KeyHidden: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const [checkbox, _closeButton] = await helpers.grabControlElements(canvas);

    await helpers.expectKeyInvisible(
      canvas,
      args.mockedEncryption!.personalKey,
    );

    await helpers.turnOnCheckbox(user, checkbox);
    await helpers.expectKeyVisible(canvas, args.mockedEncryption!.personalKey);

    await helpers.turnOffCheckbox(user, checkbox);
    await helpers.expectKeyInvisible(
      canvas,
      args.mockedEncryption!.personalKey,
    );

    await expect(args.setOpen).toHaveBeenCalledTimes(0);
  },
};

export const Closed: Story = {
  args: {
    open: false,
    setOpen: () => {},
  },
};

const helpers = {
  grabControlElements: async (
    canvas: any,
    { timeout }: { timeout?: number } = {},
  ) => {
    return await waitFor(
      () => {
        const checkbox = canvas.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute("aria-checked", "false");

        const closeButton = canvas.getByRole("button", { name: "Close" });
        expect(closeButton).toBeInTheDocument();

        return [checkbox, closeButton] as const;
      },
      { timeout },
    );
  },

  turnOnCheckbox: async (user: any, checkbox: any) => {
    await user.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
  },

  turnOffCheckbox: async (user: any, checkbox: any) => {
    await user.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  },

  expectKeyInvisible: async (canvas: any, key: any) => {
    await waitFor(() => {
      const keyElement = canvas.queryByText(key);
      expect(keyElement).not.toBeInTheDocument();
    });
  },

  expectKeyVisible: async (canvas: any, key: any) => {
    await waitFor(() => {
      const keyElement = canvas.getByText(key);
      expect(keyElement).toBeInTheDocument();
    });
  },
};
