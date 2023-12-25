import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Button from "@/components/atoms/button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: [undefined, "bodypace", "apple", "windows", "linux", "android"],
    },
    iconColor: { control: "color" },
    center: { control: "boolean" },
    border: { control: "boolean" },
    small: { control: "boolean" },
    accent: { control: "boolean" },
  },
  excludeStories: ["tests"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Download",
    target: () => alert("Clicked download!"),
    center: false,
    border: true,
    small: false,
    accent: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: "apple",
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

export const WithIconColored: Story = {
  args: {
    ...Default.args,
    icon: "apple",
    iconColor: "goldenrod",
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    target: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText("Download");
    await expect(button).toBeInTheDocument();
    await expect(button.getAttribute("role")).toBe(null);
  },
};

export const Linkish: Story = {
  args: {
    ...Default.args,
    target: "some_url",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("link", { name: "Download" });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("href", "some_url");
  },
};

export const Centered: Story = {
  args: {
    ...Default.args,
    center: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

export const WithoutBorder: Story = {
  args: {
    ...Default.args,
    border: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

export const Accent: Story = {
  args: {
    ...Default.args,
    accent: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement);
  },
};

const tests = {
  testButtonRole: async (canvasElement: HTMLElement) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Download" });
    await expect(button).toBeInTheDocument();
  },
};
