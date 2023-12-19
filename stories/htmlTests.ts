import { within, expect } from "@storybook/test";

const testElementStyles = async (
  element: HTMLElement,
  styles: { [key: string]: string },
) => {
  const elementStyles = window.getComputedStyle(element);
  for (const key in styles) {
    await expect(elementStyles.getPropertyValue(key)).toBe(styles[key]);
  }
};

const testText = async (
  element: HTMLElement,
  text: string,
  styles: { [key: string]: string },
) => {
  const canvas = within(element);
  const textElement = canvas.getByText(text);
  await expect(textElement).toBeInTheDocument();
  await testElementStyles(textElement, styles);
};

export const htmlTests = {
  testElementStyles,
  testText,
};
