import { Meta, StoryObj } from "@storybook/react";

import WithEncryption from "@/components/contexts/encryption";
import Page from "@/components/organisms/page";
import TermsAndConditionsPage from "@/app/(pages)/terms-and-conditions/page";

const meta = {
  title: "Screens/TermsAndConditions",
  component: TermsAndConditionsPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/terms-and-conditions",
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
} satisfies Meta<typeof TermsAndConditionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
