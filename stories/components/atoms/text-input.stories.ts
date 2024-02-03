import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

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
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    type: "text",
    placeholder: "Some placeholder text",
    value: "Some value",
    onChange: (newValue) => alert(`change to: ${newValue}`),
    error: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: true,
      hasRole: true,
    });
  },
};

export const FilledPassword: Story = {
  args: {
    ...Filled.args,
    type: "password",
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: true,
      hasRole: false,
    });
  },
};

export const FilledEmail: Story = {
  args: {
    ...Filled.args,
    type: "email",
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: true,
      hasRole: true,
    });
  },
};

export const Placeholder: Story = {
  args: {
    ...Filled.args,
    value: undefined,
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: true,
      hasRole: true,
    });
  },
};

export const Empty: Story = {
  args: {
    ...Placeholder.args,
    placeholder: undefined,
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: false,
      hasRole: true,
    });
  },
};

export const FilledError: Story = {
  args: {
    ...Filled.args,
    error: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: true,
      hasRole: true,
    });
  },
};

export const PlaceholderError: Story = {
  args: {
    ...Placeholder.args,
    error: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: true,
      hasRole: true,
    });
  },
};

export const EmptyError: Story = {
  args: {
    ...Empty.args,
    error: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testInput(canvasElement, {
      hasPlaceholder: false,
      hasRole: true,
    });
  },
};

const tests = {
  testInput: async (
    canvasElement: HTMLElement,
    { hasPlaceholder, hasRole }: { hasPlaceholder: boolean; hasRole: boolean },
  ) => {
    const canvas = within(canvasElement);
    if (hasPlaceholder) {
      const textInputByPlaceholder = canvas.getByPlaceholderText(
        "Some placeholder text",
      );
      await expect(textInputByPlaceholder).toBeInTheDocument();
    }
    if (hasRole) {
      const textInputByRole = canvas.getByRole("textbox");
      await expect(textInputByRole).toBeInTheDocument();
    }
  },
};
