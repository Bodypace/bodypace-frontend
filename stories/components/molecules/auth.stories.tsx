import { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";
import {
  Title,
  Description,
  Primary,
  Controls,
} from "@storybook/addon-docs/blocks";

import Auth, { AuthProps } from "@/components/molecules/auth";

const meta = {
  title: "Molecules/Auth",
  component: Auth,
  parameters: {
    layout: "centered",
    docs: {
      // We don't use default docs becaus those would not display correctly stories
      // which reach their target look through user interactions (executing play() function).
      // autodocs does not run play functions by default on stories it renders inside
      // Stories docblock because (AFAIK) it can only run them all simultaneously and that would
      // result in a mess. We can enable running play function with the following line:
      // `parameters: { docs: { story: { autodocs: true } } }`, but this will enable mentioned mess:
      // https://storybook.js.org/docs/api/doc-block-story#autoplay
      // Therefore, we define our own docs page here to ommit rendering those Stories... actually all stories.
      // Actually I would like to render Login story and Register story below Controls docblock,
      // but Controls changes both the <Primary /> and the <Story of={Login} /> and idk how to separate that.
      page: () => (
        <>
          <Title />
          <Description of={Login} />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Auth>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: these stories should test that onSubmit is not called when form is invalid

interface StoryDescription {
  username?: string;
  password?: string;
  expectedError?: string;

  passwordRepeat?: string;
  terms?: boolean;
  privacy?: boolean;
}

const createStory = (
  type: "login" | "register",
  description?: StoryDescription,
  onSubmit?: AuthProps["onSubmit"],
): Story => ({
  args: {
    register: type === "register",
    onSubmit: onSubmit ?? (async () => {}),
  },
  play: async ({ canvasElement }) => {
    if (description) {
      await testStory(canvasElement, type, description);
    }
  },
});

export const Login = createStory("login");
export const LoginError = createStory("login", {
  expectedError: "Username and password are required",
});
export const LoginWithUsername = createStory("login", {
  username: "santa claus",
});
export const LoginWithUsernameError = createStory("login", {
  username: "santa claus",
  expectedError: "Password is required",
});
export const LoginWithPassword = createStory("login", {
  password: "santa is real",
});
export const LoginWithPasswordError = createStory("login", {
  password: "santa is real",
  expectedError: "Username is required",
});
export const LoginWithUsernameAndPassword = createStory("login", {
  username: "santa claus",
  password: "santa is real",
});
export const LoginSubmitError = createStory(
  "login",
  {
    username: "santa claus",
    password: "santa is real",
    expectedError: "Unknown username or password and btw santa is not real",
  },
  async () => {
    return {
      username: true,
      password: true,
      message: "Unknown username or password and btw santa is not real",
    };
  },
);

export const Register = createStory("register");
export const RegisterError = createStory("register", {
  expectedError: "Username and password are required",
});
export const RegisterWithPasswordsMismatchError = createStory("register", {
  username: "santa claus",
  password: "santa is real",
  passwordRepeat: "santa is not real",
  terms: true,
  privacy: true,
  expectedError: "Passwords do not match",
});
export const RegisterWithNotConfirmedTermError = createStory("register", {
  username: "santa claus",
  password: "santa is real",
  passwordRepeat: "santa is real",
  terms: true,
  expectedError: "Agreement to below terms is required",
});
export const RegisterSubmitError = createStory(
  "register",
  {
    username: "santa claus",
    password: "santa is real",
    passwordRepeat: "santa is real",
    terms: true,
    privacy: true,
    expectedError: "Username already exists and btw santa is not real",
  },
  async () => {
    return {
      username: true,
      password: false,
      message: "Username already exists and btw santa is not real",
    };
  },
);

async function testStory(
  canvasElement: HTMLElement,
  type: "login" | "register",
  {
    username,
    password,
    passwordRepeat,
    terms,
    privacy,
    expectedError,
  }: StoryDescription,
): Promise<void> {
  const canvas = within(canvasElement);
  const usernameInput = canvas.getByPlaceholderText("username");
  const passwordInput = canvas.getByPlaceholderText("password");
  const button = canvas.getByRole("button", {
    name: type === "login" ? "Login" : "Register",
  });

  let passwordRepeatInput;
  let termsCheckbox;
  let privacyCheckbox;

  if (type === "register") {
    passwordRepeatInput = canvas.getByPlaceholderText("repeat password");
    termsCheckbox = canvas.getByRole("checkbox", {
      name: "I accept Terms and Conditions",
    });
    privacyCheckbox = canvas.getByRole("checkbox", {
      name: "I accept Privacy Policy",
    });
  }

  await expect(usernameInput).toBeInTheDocument();
  await expect(passwordInput).toBeInTheDocument();
  await expect(button).toBeInTheDocument();

  if (type === "register") {
    await expect(passwordRepeatInput).toBeInTheDocument();
    await expect(termsCheckbox).toBeInTheDocument();
    await expect(privacyCheckbox).toBeInTheDocument();

    await expect(termsCheckbox).toHaveAttribute("aria-checked", "false");
    await expect(privacyCheckbox).toHaveAttribute("aria-checked", "false");
  }

  if (expectedError) {
    await expect(canvas.queryByText(expectedError)).not.toBeInTheDocument();
  }

  const user = userEvent.setup();

  if (username) {
    await user.click(usernameInput);
    await user.keyboard(username);
  }
  if (password) {
    await user.click(passwordInput);
    await user.keyboard(password);
  }

  if (type === "register") {
    if (passwordRepeat) {
      await user.click(passwordRepeatInput);
      await user.keyboard(passwordRepeat);
    }
    if (terms) {
      await user.click(termsCheckbox);
      await expect(termsCheckbox).toHaveAttribute("aria-checked", "true");
    }
    if (privacy) {
      await user.click(privacyCheckbox);
      await expect(privacyCheckbox).toHaveAttribute("aria-checked", "true");
    }
  }

  if (expectedError) {
    await user.click(button);
    await expect(canvas.queryByText(expectedError)).toBeInTheDocument();
  }
}
