import { Meta, StoryObj } from "@storybook/react";

// TODO: test redirects

import { SpyFilesContext, MockFilesContext } from "@testing/mocking-files";
import mockedKey from "@fixtures/personal-key";
import { storyFiles, getStoryFile } from "@fixtures/files";
import responses from "@fixtures/server-responses";

import Page from "@/components/organisms/page";
import AccountLayout from "@/app/(pages)/account/layout";
import AuthenticatedLayout from "@/app/(pages)/account/(authenticated)/layout";
import AccountPage from "@/app/(pages)/account/(authenticated)/(dashboard)/page";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { SpyEncryptionContext } from "@testing/mocking-encryption";

const meta = {
  title: "Screens/Account",
  component: AccountPage,
  parameters: {
    layout: "fullscreen",
    localStorage: [
      [
        "accessToken",
        "@lib/auth checks for token and if nothing is there, it will not attempt to fetch account info.",
      ],
    ],
    msw: {
      handlers: [responses.account.exists],
    },
  },
  decorators: [
    (Story: any) => (
      <Page>
        <AccountLayout>
          <AuthenticatedLayout>
            <Story />
          </AuthenticatedLayout>
        </AccountLayout>
      </Page>
    ),
  ],
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(
      () => {
        const settingsButton = canvas.getByRole("link", { name: "Settings" });
        expect(settingsButton).toBeInTheDocument();
        expect(settingsButton).toHaveAttribute("href", "/account/settings");
      },
      { timeout: 2000 },
    );

    const uploadFileButton = canvas.getByRole("button", {
      name: "Upload new file",
    });
    await expect(uploadFileButton).toBeInTheDocument();

    let filesOnServer: number | null = null;
    if (parameters.msw.handlers.length > 1) {
      switch (parameters.msw.handlers[1]) {
        case responses.documents.empty:
          filesOnServer = 0;
          break;
        case responses.documents.few:
          filesOnServer = 3;
          break;
        case responses.documents.many:
          filesOnServer = storyFiles.length;
          break;
      }
    }

    if (filesOnServer) {
      await waitFor(() => {
        const files = canvas.getAllByRole("checkbox");
        expect(files.length).toBe(filesOnServer);
      });
    }

    const selectedFilesText = canvas.queryByText("Selected 0 files");
    const downloadButton = canvas.queryByRole("button", { name: "Download" });
    const removeButton = canvas.queryByRole("button", { name: "Remove" });
    if (filesOnServer) {
      await expect(selectedFilesText).toBeInTheDocument();

      await expect(downloadButton).toBeInTheDocument();
      await expect(downloadButton).toBeDisabled();

      await expect(removeButton).toBeInTheDocument();
      await expect(downloadButton).toBeDisabled();
    } else {
      await expect(selectedFilesText).not.toBeInTheDocument();
      await expect(downloadButton).not.toBeInTheDocument();
      await expect(removeButton).not.toBeInTheDocument();
    }
  },
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  parameters: {
    filesContext: {
      files: undefined,
    },
  },
  decorators: [MockFilesContext],
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
        responses.documents.networkError,
      ],
    },
  },
  decorators: [SpyFilesContext],
};

export const Empty: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.empty],
    },
  },
  decorators: [SpyFilesContext],
};

export const FewFilesEncrypted: Story = {
  parameters: {
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.few],
    },
  },
  decorators: [SpyFilesContext],
};

export const ManyFilesEncrypted: Story = {
  parameters: {
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.many],
    },
  },
  decorators: [SpyFilesContext],
};

export const FewFilesDecrypted: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.few],
    },
  },
  decorators: [SpyFilesContext],
};

export const ManyFilesDecrypted: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.many],
    },
  },
  decorators: [SpyFilesContext],
};

export const ManyFilesDecryptedDeleyedAndSelected: Story = {
  parameters: {
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.many],
    },
  },
  decorators: [SpyFilesContext, SpyEncryptionContext],
  play: async ({ canvasElement, parameters }) => {
    const user = userEvent.setup();

    const canvas = within(canvasElement);

    await waitFor(
      () => {
        const checkboxes = canvas.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(storyFiles.length);
      },
      { timeout: 3000 },
    );

    await expect(
      parameters.encryptionContext.importPersonalKey,
    ).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      parameters.encryptionContext.importPersonalKey(mockedKey.base64);
    }, 1000);

    await waitFor(
      () => {
        const firstFileCheckbox = canvas.getByRole("checkbox", {
          name: getStoryFile(storyFiles[0].id).nameDecrypted,
        });
        expect(firstFileCheckbox).toBeInTheDocument();

        const lastFileCheckbox = canvas.getByRole("checkbox", {
          name: getStoryFile(storyFiles[storyFiles.length - 1].id)
            .nameDecrypted,
        });
        expect(lastFileCheckbox).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    await expect(
      parameters.encryptionContext.importPersonalKey,
    ).toHaveBeenCalledTimes(1);
    await expect(
      parameters.encryptionContext.importPersonalKey,
    ).toHaveBeenNthCalledWith(1, mockedKey.base64);

    const downloadButton = canvas.getByRole("button", { name: "Download" });
    await expect(downloadButton).toBeInTheDocument();
    await expect(downloadButton).toBeDisabled();

    const removeButton = canvas.getByRole("button", { name: "Remove" });
    await expect(removeButton).toBeInTheDocument();
    await expect(removeButton).toBeDisabled();

    const files = [1, 2, 3, 9, 16, 19].map((id) => getStoryFile(id));

    let selected = 0;
    for (const file of files) {
      const checkbox = canvas.getByRole("checkbox", {
        name: file.nameDecrypted,
      });
      await expect(checkbox).toBeInTheDocument();
      await expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      selected++;

      await expect(checkbox).toHaveAttribute("aria-checked", "true");

      const selectedFilesText = canvas.getByText(
        `Selected ${selected} ${selected === 1 ? "file" : "files"}`,
      );
      await expect(selectedFilesText).toBeInTheDocument();
    }

    await expect(downloadButton).toBeEnabled();
    await expect(removeButton).toBeEnabled();
  },
};

export const ManyFilesDecryptedAndSelected: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    msw: {
      handlers: [...meta.parameters.msw.handlers, responses.documents.many],
    },
  },
  decorators: [SpyFilesContext],
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    await testManyFilesDecryptedAndSelected({
      canvas,
      user,
    });
  },
};

export const ManyFilesDecryptedAndSelectedThenCleared: Story = {
  ...ManyFilesDecryptedAndSelected,
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const clearSelectionButton = await testManyFilesDecryptedAndSelected({
      canvas,
      user,
    });

    const checkboxesBefore = canvas.getAllByRole("checkbox", {
      checked: false,
    });
    await expect(checkboxesBefore).toHaveLength(storyFiles.length - 7);

    await user.click(clearSelectionButton);

    const selectedFilesText = canvas.getByText("Selected 0 files");
    await expect(selectedFilesText).toBeInTheDocument();

    const downloadButton = canvas.getByRole("button", { name: "Download" });
    await expect(downloadButton).toBeInTheDocument();
    await expect(downloadButton).toBeDisabled();

    const removeButton = canvas.getByRole("button", { name: "Remove" });
    await expect(removeButton).toBeInTheDocument();
    await expect(removeButton).toBeDisabled();

    const checkboxesAfter = canvas.getAllByRole("checkbox", {
      checked: false,
    });
    await expect(checkboxesAfter).toHaveLength(storyFiles.length);

    await expect(clearSelectionButton).not.toBeInTheDocument();
  },
};

async function testManyFilesDecryptedAndSelected({
  canvas,
  user,
}: {
  canvas: any;
  user: any;
}) {
  const checkboxes = await waitFor(
    () => {
      const checkboxes = canvas.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(storyFiles.length);
      return checkboxes;
    },
    { timeout: 3000 },
  );

  for (const checkbox of checkboxes) {
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  }

  await waitFor(() => {
    const clearSelectionButton = canvas.queryByRole("button", {
      name: "clear selection",
    });
    expect(clearSelectionButton).not.toBeInTheDocument();
  });

  const files = [1, 2, 3, 9, 15, 16, 19].map((id) => getStoryFile(id));

  for (const file of files) {
    const checkbox = canvas.getByRole("checkbox", {
      name: file.nameDecrypted,
    });
    await expect(checkbox).toBeInTheDocument();
    await user.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
  }

  const selectedFilesText = canvas.getByText("Selected 7 files");
  await expect(selectedFilesText).toBeInTheDocument();

  const clearSelectionButton = canvas.queryByRole("button", {
    name: "clear selection",
  });
  await expect(clearSelectionButton).toBeInTheDocument();

  return clearSelectionButton;
}
