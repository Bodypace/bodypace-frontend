import React from "react";
import { fn } from "@storybook/test";

export function ReopeningDialogStory(Story: any, ctx: any) {
  // we assume that args.setOpen is jest.fn/spied and a Storybook action
  const initiallyOpen = ctx.args.open;
  const setOpenAction = ctx.args.setOpen;

  const [open, setOpen] = React.useState(initiallyOpen);

  ctx.args.open = open;
  ctx.args.setOpen = React.useRef(
    fn((value: boolean) => {
      setOpenAction(value);
      setOpen(value);
      if (!value) {
        setTimeout(() => setOpen(true), 1000);
      }
    }),
  ).current;

  return Story();
}
