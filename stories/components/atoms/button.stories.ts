import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, fn, userEvent } from "@storybook/test";

import Button from "@/components/atoms/button";

// TODO: test hover state

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
  play: async ({ canvasElement, args }) => {
    const variant = typeof args.onClick === "string" ? "link" : "button";
    const mode = !!args.onClick ? "enabled" : "disabled";
    const role = variant === "link" && mode === "disabled" ? null : variant;

    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const element = role
      ? canvas.getByRole(role, { name: "Click me" })
      : canvas.getByText("Click me");

    await expect(element).toBeInTheDocument();

    if (role === "link") {
      await expect(element).toHaveAttribute("href", "some_url");
    }

    if (role === null) {
      await expect(element.getAttribute("role")).toBe(null);
    }

    if (role === "button") {
      if (mode === "enabled") {
        await expect(element).not.toHaveAttribute("disabled");
        await expect(args.onClick).toHaveBeenCalledTimes(0);
        await user.click(element);
        await expect(args.onClick).toHaveBeenCalledTimes(1);
      } else {
        await expect(element).toHaveAttribute("disabled");
      }
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    text: "Click me",
    wide: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Enabled.args,
    onClick: undefined,
  },
};

export const EnabledLink: Story = {
  args: {
    ...Enabled.args,
    onClick: "some_url",
  },
};

export const DisabledLink: Story = {
  args: {
    ...Enabled.args,
    onClick: "",
  },
};

export const EnabledWide: Story = {
  args: {
    ...Enabled.args,
    wide: true,
  },
};

export const DisabledWide: Story = {
  args: {
    ...EnabledWide.args,
    onClick: undefined,
  },
};
