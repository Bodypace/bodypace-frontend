import { Meta, StoryObj } from "@storybook/react";

import PrivacyPolicyPage from "@/app/(pages)/privacy-policy/page";

const meta = {
  title: "Screens/PrivacyPolicy",
  component: PrivacyPolicyPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PrivacyPolicyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
