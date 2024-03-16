import { Meta, StoryObj } from "@storybook/react";

import WithEncryption from "@/components/contexts/encryption";
import Page from "@/components/organisms/page";
import HomePage from "@/app/(pages)/(home)/page";

const meta = {
  title: "Screens/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
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
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
