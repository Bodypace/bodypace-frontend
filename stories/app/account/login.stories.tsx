import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import AccountLayout from "@/app/(pages)/account/layout";
import NotAuthenticatedLayout from "@/app/(pages)/account/(not-authenticated)/layout";
import AccountLoginPage from "@/app/(pages)/account/(not-authenticated)/login/page";

const meta = {
  title: "Screens/AccountLogin",
  component: AccountLoginPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AccountLoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story: any) => (
      <Page>
        <AccountLayout>
          <NotAuthenticatedLayout>
            <Story />
          </NotAuthenticatedLayout>
        </AccountLayout>
      </Page>
    ),
  ],
};
