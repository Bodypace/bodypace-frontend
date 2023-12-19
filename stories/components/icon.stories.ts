import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Icon from "@/components/icon";

const meta = {
  title: "Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["bodypace", "apple", "windows", "linux", "android"],
    },
    color: { control: "color" },
  },
  excludeStories: ["tests"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bodypace: Story = {
  args: {
    name: "bodypace",
    small: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testBodypaceIcon(canvasElement, 64);
  },
};

export const BodypaceSmall: Story = {
  args: {
    ...Bodypace.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testBodypaceIcon(canvasElement, 32);
  },
};

export const Apple: Story = {
  args: {
    ...Bodypace.args,
    name: "apple",
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "apple", 64);
  },
};

export const AppleSmall: Story = {
  args: {
    ...Apple.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "apple", 32);
  },
};

export const Windows: Story = {
  args: {
    ...Bodypace.args,
    name: "windows",
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "windows", 64);
  },
};

export const WindowsSmall: Story = {
  args: {
    ...Windows.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "windows", 32);
  },
};

export const Linux: Story = {
  args: {
    ...Bodypace.args,
    name: "linux",
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "linux", 64);
  },
};

export const LinuxSmall: Story = {
  args: {
    ...Linux.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "linux", 32);
  },
};

export const Android: Story = {
  args: {
    ...Bodypace.args,
    name: "android",
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "android", 64);
  },
};

export const AndroidSmall: Story = {
  args: {
    ...Android.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "android", 32);
  },
};

export const tests = {
  testBodypaceIcon: async (canvasElement: HTMLElement, size: number) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByAltText("Bodypace logo");
    await expect(icon).toBeInTheDocument();
    await expect(icon.getAttribute("src")).toBe(
      `/heart.png?w=${size * 2}&q=75`,
    );
    await expect(icon.getAttribute("width")).toBe(size.toString());
    await expect(icon.getAttribute("height")).toBe(size.toString());
    const { width, height } = icon.getBoundingClientRect();
    await expect(width).toBe(size);
    await expect(height).toBe(size);
  },

  testIcon: async (canvasElement: HTMLElement, name: string, size: number) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole("img", { hidden: true });
    await expect(icon).toBeInTheDocument();
    await expect(icon.getAttribute("data-icon")).toBe(name);
    const { width, height } = icon.getBoundingClientRect();
    await expect(width).toBe(size);
    await expect(height).toBe(size);
  },
};
