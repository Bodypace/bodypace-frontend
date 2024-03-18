import { Meta, StoryObj } from "@storybook/react";

// TODO: test redirects

import { type FileMetadata } from "@/lib/files";

import { SpyFilesContext, MockFilesContext } from "@testing/mocking-files";
import mockedKey from "@fixtures/personal-key";
import { storyFiles, storyAccount, getStoryFile } from "@fixtures/files";

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
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/account",
      },
    },
    localStorage: [
      [
        "accessToken",
        "@lib/auth checks for token and if nothing is there, it will not attempt to fetch account info.",
      ],
    ],
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
    SpyEncryptionContext,
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

    const keyEntry = (parameters.localStorage as [string, string][]).find(
      (entry) => entry[0] === "personalKey",
    );
    const key = keyEntry ? keyEntry[1] : null;
    await waitFor(() => {
      expect(parameters.encryptionContext.personalKey).toBe(key);
    });

    const uploadFileButton = canvas.getByRole("button", {
      name: "Upload new file",
    });
    await expect(uploadFileButton).toBeInTheDocument();
    if (key) {
      await expect(uploadFileButton).toBeEnabled();
    } else {
      await expect(uploadFileButton).toBeDisabled();
    }

    let filesOnServer: number | null = null;
    if (parameters.serverData.documents) {
      filesOnServer = parameters.serverData.documents.length;
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
    serverResponses: {
      account: storyAccount,
    },
  },
  decorators: [MockFilesContext],
};

export const NetworkError: Story = {
  parameters: {
    serverResponses: {
      account: storyAccount,
      documents: null,
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
    serverResponses: {
      account: storyAccount,
      documents: [],
    },
  },
  decorators: [SpyFilesContext],
};

export const FewFilesEncrypted: Story = {
  parameters: {
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 3),
    },
  },
  decorators: [SpyFilesContext],
};

export const ManyFilesEncrypted: Story = {
  parameters: {
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
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
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 3),
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
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
  },
  decorators: [SpyFilesContext],
};

export const ManyFilesDecryptedDeleyedAndSelected: Story = {
  parameters: {
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
  },
  decorators: [SpyFilesContext],
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

    const uploadFileButton = canvas.getByRole("button", {
      name: "Upload new file",
    });
    await expect(uploadFileButton).toBeInTheDocument();
    await expect(uploadFileButton).toBeDisabled();

    setTimeout(() => {
      parameters.encryptionContext.importPersonalKey(mockedKey.base64);
    }, 1000);

    await waitFor(
      () => {
        expect(uploadFileButton).toBeEnabled();
      },
      { timeout: 2000 },
    );

    await waitFor(() => {
      const firstFileCheckbox = canvas.getByRole("checkbox", {
        name: getStoryFile(storyFiles[0].id).nameDecrypted,
      });
      expect(firstFileCheckbox).toBeInTheDocument();

      const lastFileCheckbox = canvas.getByRole("checkbox", {
        name: getStoryFile(storyFiles[storyFiles.length - 1].id).nameDecrypted,
      });
      expect(lastFileCheckbox).toBeInTheDocument();
    });

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
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
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
    const [clearSelectionButton, _] = await testManyFilesDecryptedAndSelected({
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

export const ManyFilesDecryptedAndSelectedThenDeleted: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
  },
  decorators: [SpyFilesContext],
  play: async ({ canvasElement, step }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const [_, selectedFiles] = await testManyFilesDecryptedAndSelected({
      canvas,
      user,
    });

    const removeButton = canvas.getByRole("button", { name: "Remove" });
    await expect(removeButton).toBeInTheDocument();
    await expect(removeButton).toBeEnabled();

    await expect(selectedFiles).toHaveLength(7);

    await user.click(removeButton);

    await waitFor(
      () => {
        const selectedFilesText = canvas.getByText("Selected 0 files");
        expect(selectedFilesText).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    const downloadButton = canvas.queryByRole("button", { name: "Download" });
    await expect(downloadButton).toBeInTheDocument();
    await expect(downloadButton).toBeDisabled();
    await expect(removeButton).toBeDisabled();

    const keptFiles = storyFiles
      .map((file) => getStoryFile(file.id))
      .filter(
        (file) =>
          !selectedFiles.some((selectedFile) => file.id === selectedFile.id),
      );

    await expect(keptFiles).toHaveLength(storyFiles.length - 7);

    await waitFor(() => {
      const checkboxes = canvas.queryAllByRole("checkbox");
      expect(checkboxes).toHaveLength(storyFiles.length - 7);
    });

    await waitFor(() => {
      for (const keptFile of keptFiles) {
        const checkbox = canvas.getByRole("checkbox", {
          name: keptFile.nameDecrypted,
        });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute("aria-checked", "false");
      }
    });

    await step("ensure deleted files are not being displayed anymore", () => {
      for (const file of selectedFiles) {
        const checkbox = canvas.queryByRole("checkbox", {
          name: file.nameDecrypted,
        });
        expect(checkbox).not.toBeInTheDocument();
      }
    });

    const secondDeletionRound = [2, 11];

    await step("select more files to delete", async () => {
      const checkboxes = secondDeletionRound.map((fileNo) =>
        canvas.queryByRole("checkbox", {
          name: keptFiles[fileNo].nameDecrypted,
        }),
      );

      await expect(checkboxes).toHaveLength(secondDeletionRound.length);
      for (const checkbox of checkboxes) {
        await expect(checkbox).toBeInTheDocument();
        await user.click(checkbox);
        await expect(checkbox).toHaveAttribute("aria-checked", "true");
      }
    });

    await step('ensure buttons are enabled and click "Remove"', async () => {
      await expect(downloadButton).toBeEnabled();
      await expect(removeButton).toBeEnabled();

      await user.click(removeButton);
    });

    await waitFor(
      () => {
        const selectedFilesText = canvas.getByText("Selected 0 files");
        expect(selectedFilesText).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    await waitFor(() => {
      const checkboxes = canvas.queryAllByRole("checkbox");
      expect(checkboxes).toHaveLength(storyFiles.length - 9);
    });
  },
};

export const OneFileDownloadedWithPersonalKey: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
  },
  decorators: [SpyFilesContext],
  play: async ({ canvasElement, parameters }) => {
    await testDownload(canvasElement, parameters, {
      decrypted: true,
      many: false,
    });
  },
};

export const ManyFilesDownloadedWithPersonalKey: Story = {
  ...OneFileDownloadedWithPersonalKey,
  play: async ({ canvasElement, parameters }) => {
    await testDownload(canvasElement, parameters, {
      decrypted: true,
      many: true,
    });
  },
};

export const OneFileDownloadedWithoutPersonalKey: Story = {
  parameters: {
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
  },
  decorators: [SpyFilesContext],
  play: async ({ canvasElement, parameters }) => {
    await testDownload(canvasElement, parameters, {
      decrypted: false,
      many: false,
    });
  },
};

export const ManyFilesDownloadedWithoutPersonalKey: Story = {
  ...OneFileDownloadedWithoutPersonalKey,
  play: async ({ canvasElement, parameters }) => {
    await testDownload(canvasElement, parameters, {
      decrypted: false,
      many: true,
    });
  },
};

export const OneFileUploaded: Story = {
  parameters: {
    localStorage: [
      ...meta.parameters.localStorage,
      ["personalKey", mockedKey.base64],
    ],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 4),
    },
  },
  decorators: [SpyFilesContext],
  play: async ({ canvasElement, parameters }) => {
    await testUpload(canvasElement, parameters, { many: false });
  },
};

export const ManyFilesUploaded: Story = {
  ...OneFileUploaded,
  play: async ({ canvasElement, parameters }) => {
    await testUpload(canvasElement, parameters, { many: true });
  },
};

async function testManyFilesDecryptedAndSelected({
  canvas,
  user,
}: {
  canvas: any;
  user: any;
}): Promise<[HTMLElement, FileMetadata[]]> {
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

  return [clearSelectionButton, files];
}

// TODO: simulate and test upload and download:
// - errors
// - slow computer/network (maybe progress bar should be added to the UI)

async function testDownload(
  canvasElement: HTMLElement,
  parameters: any,
  { decrypted, many }: { decrypted: boolean; many: boolean },
) {
  const user = userEvent.setup();
  const canvas = within(canvasElement);

  await waitFor(
    () => {
      const text = canvas.getByText("Selected 0 files");
      expect(text).toBeInTheDocument();
    },
    { timeout: 5000 },
  );

  const downloadButton = canvas.getByRole("button", { name: "Download" });
  await expect(downloadButton).toBeInTheDocument();
  await expect(downloadButton).toBeDisabled();

  const removeButton = canvas.getByRole("button", { name: "Remove" });
  await expect(removeButton).toBeInTheDocument();
  await expect(removeButton).toBeDisabled();

  // We are choosing id 2 and 6 because in fixtuers those are JPGs by extension name ("xray.jpg", "cbct.jpg").
  // Firefox does not automatically open downloaded JPG files, but it does open pdf's, thus why we select JPG.
  const files = [getStoryFile(2)];
  if (many) {
    files.push(getStoryFile(6));
  }

  if (decrypted) {
    for (const file of files) {
      const checkbox = canvas.getByRole("checkbox", {
        name: file.nameDecrypted,
      });
      await expect(checkbox).toBeInTheDocument();
      await user.click(checkbox);
      await expect(checkbox).toHaveAttribute("aria-checked", "true");
    }
  } else {
    const checkboxes = canvas.getAllByRole("checkbox");
    for (const file of files) {
      const checkbox = checkboxes[file.id - 1];
      await expect(checkbox).toBeInTheDocument();
      await user.click(checkbox);
      await expect(checkbox).toHaveAttribute("aria-checked", "true");
    }
  }

  const selectedFilesText = canvas.getByText(
    many ? "Selected 2 files" : "Selected 1 file",
  );
  await expect(selectedFilesText).toBeInTheDocument();

  await expect(downloadButton).toBeEnabled();
  await expect(removeButton).toBeEnabled();

  await user.click(downloadButton);

  await waitFor(
    () => {
      expect(parameters.filesContext.downloadFiles).toHaveBeenCalledTimes(1);
      expect(parameters.filesContext.downloadFiles).toHaveBeenCalledWith(
        many ? [2, 6] : [2],
      );
    },
    { timeout: 2000 },
  );

  await waitFor(
    () => {
      expect(downloadButton).toBeDisabled();
      expect(removeButton).toBeDisabled();
    },
    { timeout: 2000 },
  );
}

async function testUpload(
  canvasElement: HTMLElement,
  parameters: any,
  { many }: { many: boolean },
) {
  const canvas = within(canvasElement);

  await waitFor(
    () => {
      const checkboxes = canvas.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(4);

      expect(parameters.filesContext.uploadFiles).toHaveBeenCalledTimes(0);
    },
    { timeout: 2000 },
  );

  const newFiles: File[] = many
    ? [
        new File(
          [new TextEncoder().encode("name file content 1")],
          "new-file-no-1.txt",
        ),
        new File(
          [new TextEncoder().encode("name file content 22")],
          "new-file-no-22.jpg",
        ),
        new File(
          [new TextEncoder().encode("name file content X")],
          "new-file-no-X.html",
        ),
      ]
    : [
        new File(
          [new TextEncoder().encode("name file content")],
          "new-file.txt",
        ),
      ];

  await parameters.filesContext.uploadFiles(newFiles);

  await waitFor(
    () => {
      expect(parameters.filesContext.uploadFiles).toHaveBeenCalledTimes(1);
      expect(parameters.filesContext.uploadFiles).toHaveBeenNthCalledWith(
        1,
        newFiles,
      );

      const checkboxes = canvas.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(many ? 7 : 5);
    },
    { timeout: 2000 },
  );

  const newFileCheckbox = canvas.getByRole("checkbox", {
    name: many ? "new-file-no-X.html" : "new-file.txt",
  });

  await expect(newFileCheckbox).toBeInTheDocument();
  await expect(newFileCheckbox).toHaveAttribute("aria-checked", "false");
}
