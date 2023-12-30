import { Meta, StoryObj } from "@storybook/react";

import HomePage from "@/app/(pages)/(home)/page";

const meta = {
  title: "Screens/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
