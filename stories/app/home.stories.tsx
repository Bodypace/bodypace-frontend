import { Meta, StoryObj } from "@storybook/react";

import Page from "@/components/organisms/page";
import HomePage from "@/app/(pages)/(home)/page";

const meta = {
  title: "Screens/Home",
  component: HomePage,
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
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
