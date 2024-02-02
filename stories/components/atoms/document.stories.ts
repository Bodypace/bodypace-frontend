import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Document, {
  DocumentPart,
  DocumentPartType,
} from "@/components/atoms/document";

//prettier-ignore
const sampleDocument: DocumentPart[] = [
  [ DocumentPartType.Paragraph, "Sampe paragraph"],
  [ DocumentPartType.Title,     "Sample title"],
  [ DocumentPartType.Paragraph, "Sampe paragraph"],
  [ DocumentPartType.Paragraph, "Sampe paragraph"],
  [ DocumentPartType.Header,    "Sample header"],
  [ DocumentPartType.Header,    "Sample header"],
  [ DocumentPartType.Paragraph, "Sampe paragraph"],
];

const meta = {
  title: "Atoms/Document",
  component: Document,
  tags: ["autodocs"],
} satisfies Meta<typeof Document>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    document: sampleDocument,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole("heading", { name: "Sample title" });
    await expect(title).toBeInTheDocument();

    const headers = canvas.getAllByRole("heading", { name: "Sample header" });
    await expect(headers).toHaveLength(2);
    await expect(headers[0]).toBeInTheDocument();
    await expect(headers[1]).toBeInTheDocument();

    // TODO: Implement this test when below issue gets fixed
    //       https://github.com/testing-library/dom-testing-library/issues/1234
    //       (testing-library/dom-testing-library ...ByRole with paragraph not working #1234 )
    // const paragraphs = canvas.getAllByRole("paragraph", { name: "Some paragraph" });
    // await expect(paragraphs).toHaveLength(4);
  },
};
