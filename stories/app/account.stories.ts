import { Meta, StoryObj } from "@storybook/react";

import AccountPage from "@/app/(pages)/account/page";

const meta = {
  title: "Screens/Account",
  component: AccountPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
