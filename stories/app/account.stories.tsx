import { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

// TODO: test redirects

import Page from "@/components/organisms/page";
import AccountLayout from "@/app/(pages)/account/layout";
import AuthenticatedLayout from "@/app/(pages)/account/(authenticated)/layout";
import AccountPage from "@/app/(pages)/account/(authenticated)/page";

const meta = {
  title: "Screens/Account",
  component: AccountPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8080/accounts", () => {
          return HttpResponse.json({
            sub: 3222332,
          });
        }),
      ],
    },
  },
  decorators: [
    (Story: any) => (
      localStorage.setItem(
        "accessToken",
        "@lib/auth checks for token and if nothing is there, it will not attempt to fetch account info.",
      ),
      (
        <Page>
          <AccountLayout>
            <AuthenticatedLayout>
              <Story />
            </AuthenticatedLayout>
          </AccountLayout>
        </Page>
      )
    ),
  ],
};
