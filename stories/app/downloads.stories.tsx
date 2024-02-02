import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import DownloadsPage from "@/app/(pages)/downloads/page";

const meta = {
  title: "Screens/Downloads",
  component: DownloadsPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: any) => (
      <Page>
        <Story />
      </Page>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DownloadsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
