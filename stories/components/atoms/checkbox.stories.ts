import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Checkbox from "@/components/atoms/checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    small: { control: "boolean" },
    checked: { control: "boolean" },
  },
  excludeStories: ["tests"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
    small: false,
    onChange: (newValue) => alert(`change to: ${newValue}`),
  },
  play: async ({ canvasElement }) => {
    await tests.testCheckboxRole(canvasElement, true);
  },
};

export const Unchecked: Story = {
  args: {
    ...Checked.args,
    checked: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testCheckboxRole(canvasElement, false);
  },
};

export const CheckedSmall: Story = {
  args: {
    ...Checked.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testCheckboxRole(canvasElement, true);
  },
};

export const UncheckedSmall: Story = {
  args: {
    ...CheckedSmall.args,
    checked: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testCheckboxRole(canvasElement, false);
  },
};

const tests = {
  async testCheckboxRole(canvasElement: HTMLElement, checked: boolean) {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toHaveAttribute(
      "aria-checked",
      checked ? "true" : "false",
    );
  },
};
