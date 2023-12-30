import { Meta, StoryObj } from "@storybook/react";

import TermsAndConditionsPage from "@/app/(pages)/terms-and-conditions/page";

const meta = {
  title: "Screens/TermsAndConditions",
  component: TermsAndConditionsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TermsAndConditionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
