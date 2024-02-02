import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import TermsAndConditionsPage from "@/app/(pages)/terms-and-conditions/page";

const meta = {
  title: "Screens/TermsAndConditions",
  component: TermsAndConditionsPage,
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
} satisfies Meta<typeof TermsAndConditionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
