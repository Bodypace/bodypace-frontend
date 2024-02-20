import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { within, expect, fn, userEvent } from "@storybook/test";

import TextInput from "@/components/atoms/text-input";

const meta = {
  title: "Atoms/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email"],
    },
    placeholder: { control: "text" },
    value: { control: "text" },
    error: { control: "boolean" },
  },
  play: async ({ canvasElement, args }) => {
    await expect(true).toBeTruthy();
    const canvas = within(canvasElement);
    if (args.placeholder) {
      const textInputByPlaceholder = canvas.getByPlaceholderText(
        args.placeholder,
      );
      await expect(textInputByPlaceholder).toBeInTheDocument();
    }
    if (args.type !== "password") {
      const textInputByRole = canvas.getByRole("textbox");
      await expect(textInputByRole).toBeInTheDocument();
    }
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  args: {
    type: "text",
    placeholder: "Some placeholder text",
    onChange: fn(),
    error: false,
    value: "",
  },
};

export const PlaceholderError: Story = {
  args: {
    ...Placeholder.args,
    error: true,
  },
};

export const PlaceholderNarrow: Story = {
  args: {
    ...Placeholder.args,
    narrow: true,
  },
};

export const PlaceholderNarrowFocused: Story = {
  args: {
    ...Placeholder.args,
    narrow: true,
  },
  decorators: [
    (Story: any, ctx) => {
      const [value, setValue] = React.useState("");
      ctx.args.value = value;
      ctx.args.onChange = setValue;
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    await expect(input).toBeInTheDocument();

    user.click(input);
  },
};

export const Empty: Story = {
  args: {
    ...Placeholder.args,
    placeholder: undefined,
  },
};

export const EmptyError: Story = {
  args: {
    ...Empty.args,
    error: true,
  },
};

export const EmptyNarrow: Story = {
  args: {
    ...Empty.args,
    narrow: true,
  },
};

export const Filled: Story = {
  args: {
    ...Placeholder.args,
    value: "Some value",
  },
};

export const FilledPassword: Story = {
  args: {
    ...Filled.args,
    type: "password",
  },
};

export const FilledError: Story = {
  args: {
    ...Filled.args,
    error: true,
  },
};

export const FilledNarrow: Story = {
  args: {
    ...Filled.args,
    narrow: true,
  },
};
