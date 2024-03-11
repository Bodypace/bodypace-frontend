import { Meta, StoryObj } from "@storybook/react";
import { fn, expect, userEvent, within, waitFor } from "@storybook/test";

import {
  MockEncryptionContext,
  SpyEncryptionContext,
} from "@testing/mocking-encryption";
import { SpyAccountContext } from "@testing/mocking-account";
import { MockFilesContext, SpyFilesContext } from "@testing/mocking-files";
import { getStoryFile, storyAccount, storyFiles } from "@fixtures/files";
import mockedKey from "@fixtures/personal-key";

import { Files } from "@/components/organisms/files";

const meta = {
  title: "Organisms/Files",
  component: Files,
  args: {
    onSelected: fn(),
    onClearSelection: fn(),
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "bodypace",
      values: [{ name: "bodypace", value: "#f7f7f7" }],
    },
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof Files>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: test long decryption state, where Files component should display "decrypting..."

// TODO: test files that are not encrypted or otherwise fail to decrypt their name
// (e.g. someone manually uploaded to bodypace-personal-data-server unencrypted data,
//  while this frontend tries to decrypt it)

export const Loading: Story = {
  parameters: {
    filesContext: {
      files: undefined,
    },
  },
  decorators: [MockFilesContext],
};

export const UnknownAccount: Story = {
  parameters: {
    localStorage: [
      ["personalKey", mockedKey.base64],
      ["accessToken", "files-story-mocked-access-token"],
    ],
    serverResponses: {
      account: null,
      documents: storyFiles.slice(0, 3),
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
};

export const NetworkError: Story = {
  parameters: {
    localStorage: [
      ["personalKey", mockedKey.base64],
      ["accessToken", "files-story-mocked-access-token"],
    ],
    serverResponses: {
      account: storyAccount,
      documents: null,
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
};

export const Empty: Story = {
  parameters: {
    localStorage: [
      ["personalKey", mockedKey.base64],
      ["accessToken", "files-story-mocked-access-token"],
    ],
    serverResponses: {
      account: storyAccount,
      documents: [],
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
};

export const FewItemsWithoutPersonalKey: Story = {
  parameters: {
    localStorage: [["accessToken", "files-story-mocked-access-token"]],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 3),
    },
    encryptionContext: {
      personalKey: null,
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, MockEncryptionContext],
};

export const FewItemsWithoutPersonalKeyDelayed: Story = {
  parameters: {
    localStorage: [
      ["personalKey", mockedKey.base64],
      ["accessToken", "files-story-mocked-access-token"],
    ],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 3),
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    const file = getStoryFile(1);

    await waitFor(
      () => {
        const checkbox = canvas.getByRole("checkbox", {
          name: file.nameDecrypted,
        });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute("aria-checked", "false");
      },
      { timeout: 2500 },
    );

    await expect(
      parameters.encryptionContext.forgetPersonalKey,
    ).toHaveBeenCalledTimes(0);

    await parameters.encryptionContext.forgetPersonalKey();

    await waitFor(() => {
      const checkbox = canvas.queryByRole("checkbox", {
        name: file.name,
      });
      expect(checkbox).not.toBeInTheDocument();
      expect(checkbox).toBeNull();
    });

    await expect(
      parameters.encryptionContext.forgetPersonalKey,
    ).toHaveBeenCalledTimes(1);
    await expect(
      parameters.encryptionContext.forgetPersonalKey,
    ).toHaveBeenNthCalledWith(1);
  },
};

export const ManyItemsWithoutPersonalKey: Story = {
  parameters: {
    localStorage: [["accessToken", "files-story-mocked-access-token"]],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
    encryptionContext: {
      personalKey: null,
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, MockEncryptionContext],
};

export const ManyItemsWithoutPersonalKeyAndSelection: Story = {
  ...ManyItemsWithoutPersonalKey,
  args: {
    selected: new Set([1, 3, 5, 14]),
  },
};

export const FewItemsWithPersonalKey: Story = {
  parameters: {
    localStorage: [
      ["personalKey", mockedKey.base64],
      ["accessToken", "files-story-mocked-access-token"],
    ],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 3),
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
};

export const FewItemsWithPersonalKeyDelayed: Story = {
  parameters: {
    localStorage: [["accessToken", "files-story-mocked-access-token"]],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles.slice(0, 3),
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    const file = getStoryFile(1);

    await waitFor(
      () => {
        const checkboxes = canvas.getAllByRole("checkbox", {
          name: "cant-decrypt-file-name",
        });
        expect(checkboxes).toHaveLength(3);
        for (const checkbox of checkboxes) {
          expect(checkbox).toBeInTheDocument();
          expect(checkbox).toHaveAttribute("aria-checked", "false");
        }
      },
      { timeout: 2500 },
    );

    await expect(
      parameters.encryptionContext.importPersonalKey,
    ).toHaveBeenCalledTimes(0);

    await waitFor(
      () => {
        expect(parameters.encryptionContext.personalKey).toBeNull();
      },
      { timeout: 2000 },
    );

    await parameters.encryptionContext.importPersonalKey(mockedKey.base64);

    await waitFor(
      () => {
        const checkbox = canvas.getByRole("checkbox", {
          name: file.nameDecrypted,
        });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute("aria-checked", "false");
      },
      { timeout: 2000 },
    );

    await expect(
      parameters.encryptionContext.importPersonalKey,
    ).toHaveBeenCalledTimes(1);
    await expect(
      parameters.encryptionContext.importPersonalKey,
    ).toHaveBeenNthCalledWith(1, mockedKey.base64);
  },
};

export const ManyItemsWithPersonalKey: Story = {
  parameters: {
    localStorage: [
      ["personalKey", mockedKey.base64],
      ["accessToken", "files-story-mocked-access-token"],
    ],
    serverResponses: {
      account: storyAccount,
      documents: storyFiles,
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext, SpyEncryptionContext],
};

export const ManyItemsWithPersonalKeyAndSelection: Story = {
  ...ManyItemsWithPersonalKey,
  args: {
    selected: new Set([1, 3, 5, 14]),
  },
  play: async ({ args, canvasElement }) => {
    // NOTE: this test is very slow and should be optimized
    const user = userEvent.setup();

    const canvas = within(canvasElement);
    const clearSelectionButton = await waitFor(
      () => {
        const button = canvas.getByRole("button", {
          name: "clear selection",
        });
        expect(button).toBeInTheDocument();
        return button;
      },
      { timeout: 2500 },
    );

    await expect(args.onClearSelection).toHaveBeenCalledTimes(0);
    await user.click(clearSelectionButton);
    await expect(args.onClearSelection).toHaveBeenCalledTimes(1);
    await expect(args.onClearSelection).toHaveBeenNthCalledWith(1);

    const files = [1, 2, 3, 4, 5, 6, 13, 14].map((id) => ({
      file: getStoryFile(id),
      selected: args.selected!.has(id),
    }));

    let callsCount = 0;
    let checkbox;
    for (const { file, selected } of files) {
      checkbox = await waitFor(() => {
        const checkbox = canvas.getByRole("checkbox", {
          name: file.nameDecrypted,
        });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute(
          "aria-checked",
          selected ? "true" : "false",
        );
        return checkbox;
      });

      await expect(args.onSelected).toHaveBeenCalledTimes(callsCount);
      await user.click(checkbox);

      ++callsCount;
      await expect(args.onSelected).toHaveBeenCalledTimes(callsCount);
      await expect(args.onSelected).toHaveBeenNthCalledWith(
        callsCount,
        file.id,
        !selected,
      );

      await expect(checkbox).toHaveAttribute(
        "aria-checked",
        selected ? "true" : "false",
      );
    }
  },
};
