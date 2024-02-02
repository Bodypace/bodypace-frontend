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
    wide: { control: "boolean" },
  },
  excludeStories: ["tests"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Click me",
    wide: false,
    onClick: () => alert("Clicked button!"),
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement, "button");
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement, null);
  },
};

export const Linkish: Story = {
  args: {
    ...Default.args,
    onClick: "some_url",
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement, "link");
  },
};

export const Wide: Story = {
  args: {
    ...Default.args,
    wide: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement, "button");
  },
};

export const WideDisabled: Story = {
  args: {
    ...Wide.args,
    onClick: undefined,
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement, null);
  },
};

export const WideLinkish: Story = {
  args: {
    ...Wide.args,
    onClick: "some_url",
  },
  play: async ({ canvasElement }) => {
    await tests.testButtonRole(canvasElement, "link");
  },
};

const tests = {
  testButtonRole: async (
    canvasElement: HTMLElement,
    role: "button" | "link" | null,
  ) => {
    const canvas = within(canvasElement);
    const button = role
      ? canvas.getByRole(role, { name: "Click me" })
      : canvas.getByText("Click me");
    await expect(button).toBeInTheDocument();

    if (role === "link") {
      await expect(button).toHaveAttribute("href", "some_url");
    }
    if (role === null) {
      await expect(button.getAttribute("role")).toBe(null);
    }
  },
};
