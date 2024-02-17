import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import PrivacyPolicyPage from "@/app/(pages)/privacy-policy/page";

const meta = {
  title: "Screens/PrivacyPolicy",
  component: PrivacyPolicyPage,
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
} satisfies Meta<typeof PrivacyPolicyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
