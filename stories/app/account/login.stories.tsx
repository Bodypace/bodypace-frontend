import { Meta, StoryObj } from "@storybook/react";

import WithEncryption from "@/contexts/with-encryption";
import Page from "@/components/organisms/page";
import AccountLayout from "@/app/(pages)/account/layout";
import NotAuthenticatedLayout from "@/app/(pages)/account/(not-authenticated)/layout";
import AccountLoginPage from "@/app/(pages)/account/(not-authenticated)/login/page";

const meta = {
  title: "Screens/AccountLogin",
  component: AccountLoginPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/account/login",
      },
    },
  },
} satisfies Meta<typeof AccountLoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story: any) => (
      <WithEncryption>
        <Page>
          <AccountLayout>
            <NotAuthenticatedLayout>
              <Story />
            </NotAuthenticatedLayout>
          </AccountLayout>
        </Page>
      </WithEncryption>
    ),
  ],
};
