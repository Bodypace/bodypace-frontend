import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Icon from "@/components/icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["bodypace", "apple", "windows", "linux", "android"],
    },
    color: { control: "color" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bodypace: Story = {
  args: {
    name: "bodypace",
    small: false,
  },
  play: async ({ canvasElement }) => {
    await testBodypaceIcon(canvasElement, "/heart.png?w=128&q=75", 64, 64);
  },
};

export const BodypaceSmall: Story = {
  args: {
    ...Bodypace.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await testBodypaceIcon(canvasElement, "/heart.png?w=64&q=75", 32, 32);
  },
};

export const Apple: Story = {
  args: {
    ...Bodypace.args,
    name: "apple",
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "apple", 64, 64);
  },
};

export const AppleSmall: Story = {
  args: {
    ...Apple.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "apple", 32, 32);
  },
};

export const Windows: Story = {
  args: {
    ...Bodypace.args,
    name: "windows",
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "windows", 64, 64);
  },
};

export const WindowsSmall: Story = {
  args: {
    ...Windows.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "windows", 32, 32);
  },
};

export const Linux: Story = {
  args: {
    ...Bodypace.args,
    name: "linux",
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "linux", 64, 64);
  },
};

export const LinuxSmall: Story = {
  args: {
    ...Linux.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "linux", 32, 32);
  },
};

export const Android: Story = {
  args: {
    ...Bodypace.args,
    name: "android",
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "android", 64, 64);
  },
};

export const AndroidSmall: Story = {
  args: {
    ...Android.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await testIcon(canvasElement, "android", 32, 32);
  },
};

const testBodypaceIcon = async (
  canvasElement: HTMLElement,
  src: string,
  width: number,
  height: number,
) => {
  const canvas = within(canvasElement);
  const icon = canvas.getByAltText("Bodypace logo");
  await expect(icon).toBeInTheDocument();
  await expect(icon.getAttribute("src")).toBe(src);
  await expect(icon.getAttribute("width")).toBe(width.toString());
  await expect(icon.getAttribute("height")).toBe(height.toString());
  const { width: actualWidth, height: actualHeight } =
    icon.getBoundingClientRect();
  await expect(actualWidth).toBe(width);
  await expect(actualHeight).toBe(height);
};

const testIcon = async (
  canvasElement: HTMLElement,
  iconName: string,
  width: number,
  height: number,
) => {
  const canvas = within(canvasElement);
  const icon = canvas.getByRole("img", { hidden: true });
  await expect(icon).toBeInTheDocument();
  await expect(icon.getAttribute("data-icon")).toBe(iconName);
  const { width: actualWidth, height: actualHeight } =
    icon.getBoundingClientRect();
  await expect(actualWidth).toBe(width);
  await expect(actualHeight).toBe(height);
};
