import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, fn, userEvent } from "@storybook/test";

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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = defineStory("button", "enabled", {
  text: "Click me",
  wide: false,
  onClick: fn(),
});

export const Disabled: Story = defineStory("button", "disabled", {
  ...Enabled.args,
  onClick: undefined,
});

export const EnabledLink: Story = defineStory("link", "enabled", {
  ...Enabled.args,
  onClick: "some_url",
});

export const DisabledLink: Story = defineStory("link", "disabled", {
  ...Enabled.args,
  onClick: "",
});

export const EnabledWide: Story = defineStory("button", "enabled", {
  ...Enabled.args,
  wide: true,
});

export const DisabledWide: Story = defineStory("button", "disabled", {
  ...EnabledWide.args,
  onClick: undefined,
});

function defineStory(
  variant: "button" | "link",
  mode: "enabled" | "disabled",
  spec: Story["args"],
): Story {
  return {
    args: {
      ...spec,
    },
    play: async ({ canvasElement, args }) => {
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
  };
}
