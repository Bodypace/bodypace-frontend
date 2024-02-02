import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Footer from "@/components/molecules/footer";

const meta = {
  title: "Molecules/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();

    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    const termsLink = links[0];
    await expect(termsLink).toBeInTheDocument();
    await expect(termsLink).toHaveTextContent("Terms and Conditions");
    await expect(termsLink).toHaveAttribute("href", "terms-and-conditions");

    const privacyLink = links[1];
    await expect(privacyLink).toBeInTheDocument();
    await expect(privacyLink).toHaveTextContent("Privacy Policy");
    await expect(privacyLink).toHaveAttribute("href", "privacy-policy");

    const githubLink = links[2];
    await expect(githubLink).toBeInTheDocument();
    await expect(githubLink).toHaveTextContent("Source Code");
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/Bodypace",
    );
  },
};
