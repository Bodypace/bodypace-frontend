import { Meta, StoryObj } from "@storybook/react";
import { fn, expect, userEvent, within, waitFor } from "@storybook/test";
import { http, HttpResponse } from "msw";

import { type File } from "@/lib/files";

import { MockEncryptionContext } from "@testing/mocking-encryption";
import { SpyAccountContext } from "@testing/mocking-account";
import { MockFilesContext, SpyFilesContext } from "@testing/mocking-files";

import { Files } from "@/components/organisms/files";

const meta = {
  title: "Organisms/Files",
  component: Files,
  args: {
    onSelected: fn(),
    onClearSelection: fn(),
  },
  parameters: {
    localStorage: [["accessToken", "files-story-mocked-access-token"]],
    layout: "centered",
    backgrounds: {
      default: "bodypace",
      values: [{ name: "bodypace", value: "#f7f7f7" }],
    },
    encryptionContext: {
      personalKey: "mocked-personal-key",
    },
  },
  decorators: [MockEncryptionContext],
  // tags: ["autodocs"],
} satisfies Meta<typeof Files>;

export default meta;
type Story = StoryObj<typeof meta>;

const responses = {
  account: {
    exists: http.get("http://localhost:8080/accounts", () => {
      return HttpResponse.json({
        sub: 12,
      });
    }),
    unknown: http.get("http://localhost:8080/accounts", () => {
      return HttpResponse.json(
        {
          message: "Unauthorized",
          statusCode: 401,
        },
        {
          status: 401,
        },
      );
    }),
  },
  documents: {
    networkError: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.error();
    }),
    empty: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.json([]);
    }),
    few: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.json([storyFiles[0], storyFiles[1], storyFiles[2]]);
    }),
    many: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.json(storyFiles);
    }),
  },
};

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
    msw: {
      handlers: [responses.account.unknown, responses.documents.few],
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [responses.account.exists, responses.documents.networkError],
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [responses.account.exists, responses.documents.empty],
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
};

export const FewItemsWithoutPersonalKey: Story = {
  parameters: {
    msw: {
      handlers: [responses.account.exists, responses.documents.few],
    },
    encryptionContext: {
      personalKey: null,
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
};

export const ManyItemsWithoutPersonalKey: Story = {
  parameters: {
    msw: {
      handlers: [responses.account.exists, responses.documents.many],
    },
    encryptionContext: {
      personalKey: null,
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
};

export const ManyItemsWithoutPersonalKeyAndSelection: Story = {
  ...ManyItemsWithoutPersonalKey,
  args: {
    selected: new Set([1, 3, 5, 14]),
  },
};

export const FewItemsWithPersonalKey: Story = {
  parameters: {
    msw: {
      handlers: [responses.account.exists, responses.documents.few],
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
};

export const ManyItemsWithPersonalKey: Story = {
  parameters: {
    msw: {
      handlers: [responses.account.exists, responses.documents.many],
    },
  },
  decorators: [SpyFilesContext, SpyAccountContext],
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
    const clearSelectionButton = await waitFor(() => {
      const button = canvas.getByRole("button", {
        name: "clear selection",
      });
      expect(button).toBeInTheDocument();
      return button;
    });

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
          name: file.name,
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

function getStoryFile(id: number): File {
  const file = storyFiles.find((file) => file.id === id);
  if (!file) {
    throw new Error(`File with id ${id} not found`);
  }
  return file;
}

const storyFiles: File[] = [
  {
    id: 1,
    name: "blood_work.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 2,
    name: "xray.jpg",
    keys: "keys",
    userId: 1,
  },
  {
    id: 3,
    name: "mri.jpg",
    keys: "keys",
    userId: 1,
  },
  {
    id: 4,
    name: "prescription.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 5,
    name: "blood_work_2.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 6,
    name: "cbct.jpg",
    keys: "keys",
    userId: 1,
  },
  {
    id: 7,
    name: "PET.dicom",
    keys: "keys",
    userId: 1,
  },
  {
    id: 8,
    name: "xray_interpretation.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 9,
    name: "diet_plan.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 10,
    name: "allergies_cheatsheet.jpg",
    keys: "keys",
    userId: 1,
  },
  {
    id: 11,
    name: "xray_lower_spine.jpg",
    keys: "keys",
    userId: 1,
  },
  {
    id: 12,
    name: "xray_pelvis.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 13,
    name: "allergies_test_result.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 14,
    name: "xray_knee.jpg",
    keys: "keys",
    userId: 1,
  },
  {
    id: 15,
    name: "urine_test_result.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 16,
    name: "medical_bill_1.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 17,
    name: "medical_bill_2.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 18,
    name: "medical_bill_3.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 19,
    name: "medical_bill_4.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 20,
    name: "medical_bill_5.pdf",
    keys: "keys",
    userId: 1,
  },
  {
    id: 21,
    name: "medical_bill_6.pdf",
    keys: "keys",
    userId: 1,
  },
];

const allFileNames = new Set(storyFiles.map((file) => file.name));
if (allFileNames.size !== storyFiles.length) {
  // We need to assert that because checkboxes are labelled by file names.
  // (btw. don't worry, actual backend also does not allow duplicate file names)
  throw new Error("File names are not unique");
}
