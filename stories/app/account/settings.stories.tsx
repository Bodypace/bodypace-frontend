import { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent, waitFor } from "@storybook/test";

// TODO: test how Settings page handles network delays and loading states ({ delay } in msw)

import {
  MockEncryptionContext,
  ProvideSpiedEncryption,
} from "@testing/mocking-encryption";
import {
  MockAccountContext,
  ProvideSpiedAccount,
} from "@testing/mocking-account";

import Page from "@/components/organisms/page";
import AuthenticatedLayout from "@/app/(pages)/account/(authenticated)/layout";
import AccountSettingsPage from "@/app/(pages)/account/(authenticated)/settings/page";

const initialPersonalKey =
  "super secret initial key value, should not be exposed";
const initialAccountInfo = {
  id: 4222244,
  accessToken: "mocked-access-token",
};

const meta = {
  title: "Screens/AccountSettings",
  component: AccountSettingsPage,
  parameters: {
    layout: "fullscreen",
    chromatic: { pauseAnimationAtEnd: true },
    accountContext: ProvideSpiedAccount(initialAccountInfo),
  },
  decorators: [
    (Story: any) => (
      <AuthenticatedLayout>
        <Story />
      </AuthenticatedLayout>
    ),
    MockAccountContext,
    MockEncryptionContext,
    (Story: any) => (
      <Page>
        <Story />
      </Page>
    ),
  ],
} satisfies Meta<typeof AccountSettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KeyAvailable: Story = {
  parameters: {
    encryptionContext: ProvideSpiedEncryption(initialPersonalKey),
  },
  play: async ({ canvasElement, parameters }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const closeSettingsButton = await waitFor(() => {
      const button = canvas.getByRole("link", {
        name: "Close Settings",
      });
      expect(button).toBeInTheDocument();
      return button;
    });

    await expect(closeSettingsButton).toHaveAttribute("href", "/account");

    const logoutButton = await waitFor(() => {
      const button = canvas.getByRole("button", {
        name: "Logout",
      });
      expect(button).toBeInTheDocument();
      return button;
    });

    await expect(parameters.accountContext.logout).toHaveBeenCalledTimes(0);
    await user.click(logoutButton);
    await expect(parameters.accountContext.logout).toHaveBeenCalledTimes(1);
    await expect(parameters.accountContext.logout).toHaveBeenNthCalledWith(1);
  },
};

export const KeyAvailableShowKeyDialog: Story = {
  parameters: {
    encryptionContext: ProvideSpiedEncryption(initialPersonalKey),
  },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const showKeyButton = await waitFor(
      () => {
        const button = canvas.getByRole("button", {
          name: "See Personal Key",
        });
        expect(button).toBeInTheDocument();
        return button;
      },
      { timeout: 10000 },
    );

    await user.click(showKeyButton);
  },
};

export const KeyAvailableRemoveKeyDialog: Story = {
  parameters: {
    encryptionContext: ProvideSpiedEncryption(initialPersonalKey),
  },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const removeKeyButton = await waitFor(() => {
      const button = canvas.getByRole("button", {
        name: "Remove Personal Key",
      });
      expect(button).toBeInTheDocument();
      return button;
    });

    await user.click(removeKeyButton);
  },
};

export const KeyNotAvailable: Story = {
  parameters: {
    encryptionContext: ProvideSpiedEncryption(null),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      const button = canvas.getByRole("button", {
        name: "Enter Personal Key",
      });
      expect(button).toBeInTheDocument();
    });
  },
};

export const KeyNotAvailableEnterKeyDialog: Story = {
  parameters: {
    encryptionContext: ProvideSpiedEncryption(null),
  },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const enterKeyButton = await waitFor(() => {
      const button = canvas.getByRole("button", {
        name: "Enter Personal Key",
      });
      expect(button).toBeInTheDocument();
      return button;
    });

    await user.click(enterKeyButton);
  },
};
