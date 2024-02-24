import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import AccountLayout from "@/app/(pages)/account/layout";
import NotAuthenticatedLayout from "@/app/(pages)/account/(not-authenticated)/layout";
import AccountRegisterPage from "@/app/(pages)/account/(not-authenticated)/register/page";

const meta = {
  title: "Screens/AccountRegister",
  component: AccountRegisterPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [],
} satisfies Meta<typeof AccountRegisterPage>;

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
