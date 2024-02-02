import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import ReceiveSharePage from "@/app/(pages)/receive-share/page";

const meta = {
  title: "Screens/ReceiveShare",
  component: ReceiveSharePage,
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
} satisfies Meta<typeof ReceiveSharePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
