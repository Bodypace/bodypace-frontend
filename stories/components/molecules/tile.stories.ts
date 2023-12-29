import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Tile from "@/components/molecules/tile";

const meta = {
  title: "Molecules/Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: "category",
    title: "title",
    paragrap_1: "lorem ipsum dolar sit amet",
    paragrap_2: "lorem ipsum dolar sit amet",
    paragrap_3: "lorem ipsum dolor sit amet",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tile = canvas.getByRole("article");
    await expect(tile).toBeInTheDocument();

    const category = within(tile).getByRole("heading");
    await expect(category).toBeInTheDocument();
    await expect(category).toHaveTextContent("category");

    // does not work probably because of the same reason as paragraphs testing below
    // const title = within(tile).getByRole("strong");
    // await expect(title).toBeInTheDocument();
    // await expect(title).toHaveTextContent("title");

    // TODO test paragraphs role?
    // https://github.com/testing-library/dom-testing-library/issues/1234
    // (testing-library/dom-testing-library ...ByRole with paragraph not working #1234 )
  },
};
