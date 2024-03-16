import { Meta, StoryObj } from "@storybook/react";

import WithEncryption from "@/components/contexts/encryption";
import Page from "@/components/organisms/page";
import PrivacyPolicyPage from "@/app/(pages)/privacy-policy/page";

const meta = {
  title: "Screens/PrivacyPolicy",
  component: PrivacyPolicyPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/privacy-policy",
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
} satisfies Meta<typeof PrivacyPolicyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
