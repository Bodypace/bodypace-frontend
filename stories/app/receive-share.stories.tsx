import { Meta, StoryObj } from "@storybook/react";

import WithEncryption from "@/components/contexts/encryption";
import Page from "@/components/organisms/page";
import ReceiveSharePage from "@/app/(pages)/receive-share/page";

const meta = {
  title: "Screens/ReceiveShare",
  component: ReceiveSharePage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/receive-share",
      },
    },
  },
  decorators: [
    (Story: any) => (
      <WithEncryption>
        <Page>
          <Story />
        </Page>
      </WithEncryption>
    ),
  ],
} satisfies Meta<typeof ReceiveSharePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
