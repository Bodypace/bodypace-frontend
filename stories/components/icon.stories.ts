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
      options: [
        "logo",
        "fa-circle-xmark-regular",
        "fa-key-solid",
        "fa-shield-solid",
        "fa-triangle-exclamation-solid",
        "fa-check-solid",
      ],
    },
    elevated: { control: "boolean" },
  },
  excludeStories: ["tests"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logo: Story = {
  args: {
    name: "logo",
    elevated: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testBodypaceIcon(canvasElement, 32);
  },
};

export const LogoElevated: Story = {
  args: {
    ...Logo.args,
    elevated: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testBodypaceIcon(canvasElement, 32);
  },
};

export const CircleXMark: Story = {
  args: {
    name: "fa-circle-xmark-regular",
    elevated: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "circle-xmark", 20, 20);
  },
};

export const CircleXMarkElevated: Story = {
  args: {
    name: "fa-circle-xmark-regular",
    elevated: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "circle-xmark", 20, 20);
  },
};

export const Key: Story = {
  args: {
    name: "fa-key-solid",
    elevated: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "key", 20, 20);
  },
};

export const KeyElevated: Story = {
  args: {
    name: "fa-key-solid",
    elevated: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "key", 20, 20);
  },
};

export const Shield: Story = {
  args: {
    name: "fa-shield-solid",
    elevated: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "shield", 18, 20);
  },
};

export const ShieldElevated: Story = {
  args: {
    name: "fa-shield-solid",
    elevated: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "shield", 18, 20);
  },
};

export const Triangle: Story = {
  args: {
    name: "fa-triangle-exclamation-solid",
    elevated: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "triangle-exclamation", 25, 22);
  },
};

export const TriangleElevated: Story = {
  args: {
    name: "fa-triangle-exclamation-solid",
    elevated: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "triangle-exclamation", 25, 22);
  },
};

export const Check: Story = {
  args: {
    name: "fa-check-solid",
    elevated: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "check", 18, 15);
  },
};

export const CheckElevated: Story = {
  args: {
    name: "fa-check-solid",
    elevated: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testIcon(canvasElement, "check", 18, 15);
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

  testIcon: async (
    canvasElement: HTMLElement,
    name: string,
    width: number,
    height: number,
  ) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole("img", { hidden: true });
    await expect(icon).toBeInTheDocument();
    await expect(icon.getAttribute("data-icon")).toBe(name);
    const { width: actualWidth, height: actualHeight } =
      icon.getBoundingClientRect();
    await expect(actualWidth).toBe(width);
    await expect(actualHeight).toBe(height);
  },
};
