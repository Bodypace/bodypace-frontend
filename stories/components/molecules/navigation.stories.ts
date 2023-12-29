import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Navigation from "@/components/molecules/navigation";

const meta = {
  title: "Molecules/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.getByRole("navigation");
    await expect(navigation).toBeInTheDocument();

    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(2);

    const homeLink = links[0];
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveTextContent("Bodypace");
    await expect(homeLink).toHaveAttribute("href", "/");

    const logo = within(homeLink).getByRole("img");
    await expect(logo).toBeInTheDocument();
    await expect(logo).toHaveAttribute("alt", "Bodypace logo");

    const accountLink = links[1];
    await expect(accountLink).toBeInTheDocument();
    await expect(accountLink).toHaveTextContent("Online Account");
    await expect(accountLink).toHaveAttribute("href", "account");
  },
};
