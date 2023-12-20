import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { htmlTests } from "../../htmlTests";

import Link from "@/components/atoms/link";

const meta = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  excludeStories: ["tests"],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "click me",
    target: "some_url",
    small: false,
  },
  play: async ({ canvasElement }) => {
    await tests.testLink(canvasElement, {
      name: "click me",
      role: "link",
      href: "some_url",
    });
  },
};

export const DefaultSmall: Story = {
  args: {
    ...Default.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testLink(canvasElement, {
      name: "click me",
      role: "link",
      href: "some_url",
      styles: {
        "font-size": "16px",
        "line-height": "24px",
      },
    });
  },
};

export const Buttonish: Story = {
  args: {
    ...Default.args,
    target: () => alert("clicked"),
  },
  play: async ({ canvasElement }) => {
    await tests.testLink(canvasElement, {
      name: "click me",
      role: "button",
    });
  },
};

export const ButtonishSmall: Story = {
  args: {
    ...Buttonish.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testLink(canvasElement, {
      name: "click me",
      role: "button",
      styles: {
        "font-size": "16px",
        "line-height": "24px",
      },
    });
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    target: undefined,
  },
  play: async ({ canvasElement }) => {
    await tests.testLink(canvasElement, {
      name: "click me",
      role: null,
      styles: {
        color: "rgb(124, 124, 124)",
      },
    });
  },
};

export const DisabledSmall: Story = {
  args: {
    ...Disabled.args,
    small: true,
  },
  play: async ({ canvasElement }) => {
    await tests.testLink(canvasElement, {
      name: "click me",
      role: null,
      styles: {
        "font-size": "16px",
        "line-height": "24px",
        color: "rgb(124, 124, 124)",
      },
    });
  },
};

const tests = {
  testLink: async (
    canvasElement: HTMLElement,
    {
      name,
      role,
      href,
      styles = {},
    }: {
      name: string;
      role: string | null;
      href?: string;
      styles?: { [key: string]: string };
    },
  ) => {
    const canvas = within(canvasElement);
    const link = role
      ? canvas.getByRole(role, { name })
      : canvas.getByText(name);
    await expect(link).toBeInTheDocument();
    await htmlTests.testElementStyles(link, {
      "text-decoration": `underline solid ${styles.color ?? "rgb(32, 32, 32)"}`,
      "font-weight": "400",
      "font-size": "20px",
      "line-height": "30px",
      "letter-spacing": "normal",
      "text-transform": "none",
      "text-align": "start",
      color: "rgb(32, 32, 32)",
      ...styles,
    });
    if (role === "link") {
      expect(link).toHaveAttribute("href", href);
    } else if (role === "button") {
      expect(link).not.toHaveAttribute("href");
      // userEvent.click(link); // there is no simple way to test this AFAIK (can't use storybook actions or jest.fn())
    } else if (role === null) {
      expect(link).not.toHaveAttribute("href");
      expect(link.getAttribute("role")).toBe(null);
    }
  },
};
