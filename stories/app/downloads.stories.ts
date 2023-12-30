import { Meta, StoryObj } from "@storybook/react";

import DownloadsPage from "@/app/(pages)/downloads/page";

const meta = {
  title: "Screens/Downloads",
  component: DownloadsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DownloadsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
