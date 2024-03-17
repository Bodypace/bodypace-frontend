import { Meta, StoryObj } from "@storybook/react";

import WithEncryption from "@/contexts/with-encryption";
import Page from "@/components/organisms/page";
import AccountLayout from "@/app/(pages)/account/layout";
import NotAuthenticatedLayout from "@/app/(pages)/account/(not-authenticated)/layout";
import AccountRegisterPage from "@/app/(pages)/account/(not-authenticated)/register/page";

const meta = {
  title: "Screens/AccountRegister",
  component: AccountRegisterPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/account/register",
      },
    },
  },
  decorators: [],
} satisfies Meta<typeof AccountRegisterPage>;

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
