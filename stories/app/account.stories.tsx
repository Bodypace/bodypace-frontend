import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import AccountPage from "@/app/(pages)/account/page";

const meta = {
  title: "Screens/Account",
  component: AccountPage,
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
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
