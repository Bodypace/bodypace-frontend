import React from "react";
import { type Encryption, ProvideEncryption } from "@/lib/encryption";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";

/*
NOTE: we want to mock encryption context, spy on it and make assertions with jest, and also log everything in Storybook UI.

While experimenting with Storybook, I concluded that those are the end results of setting different types of callbacks:

  const story: Story = {                    // below fn() means it's spied by jest, so we can e.g. check if it was called
    args: {                                 // below action() means it's logging in UI but isn't necessarily spied by jest

      a: fn(),                              // = fn(action('a'))
      b: fn(() => { doSomething(); }),      // = fn(action('b'))
      c: fn(action('ccc')),                 // = fn(action('c'))
      d: action('d'),                       // = fn(action('d'))
      e: action('eee'),                     // = fn(action('eee'))
      f: () => { doSomething(); },          // = () => { doSomething(); }
      x: {
        a: fn(),                                      // = fn()
        b: fn(() => { doSomething(); }),              // = fn(() => { doSomething(); }
        c: fn(action('ccc')),                         // = fn(action('ccc'))
        C: fn().mockImplementation(action('CCC')),    // = fn()
        d: action('d'),                               // = fn(action('d'))
        e: action('eee'),                             // = fn(action('eee'))
        f: () => { doSomething(); },                  // = () => { doSomething(); }
      }
    }
  }

Above should help thinking about actions, note that it may be incorrect (could change already or I made a mistake).

btw. there is something weird going on:

  // this will not log action, in fact implementation is not even called
  importPersonalKey: fn().mockImplementation((...args: any[]) => {
    action("importPersonalKey target")();
  }),

  // this will log action
  importPersonalKey: fn((...args: any[]) => {
    action("importPersonalKey target")();
  }) as any,

Why?????? (I guess it's because of how fn() is implemented, note that it's a StoryBook wrapper on jest.fn())
*/

export function ProvideEncryptionActions(
  personalKey: Encryption["personalKey"],
): Encryption {
  return {
    personalKey,
    generateNewPersonalKey: action("generateNewPersonalKey") as any,
    importPersonalKey: action("importPersonalKey") as any,
    forgetPersonalKey: action("forgetPersonalKey") as any,
    encryptData: fn(async (data: ArrayBuffer) => {
      action("encryptData")(data);
      return data;
    }),
    decryptData: fn(async (data: ArrayBuffer) => {
      action("decryptData")(data);
      return data;
    }),
  };
}

export function ProvideEncryptionConnectedToActions(Story: any, ctx: any) {
  const firstRender = React.useRef(true);
  if (firstRender.current) {
    localStorage.setItem("personalKey", ctx.args.mockedEncryption.personalKey);
    firstRender.current = false;
  }

  const encryption = ProvideEncryption();

  // we assume these are Storybook actions (e.g. come from ProvideEncryptionActions())
  const mockedEncryption: Encryption = ctx.args.mockedEncryption;
  const actions = {
    generateNewPersonalKey: mockedEncryption.generateNewPersonalKey,
    importPersonalKey: mockedEncryption.importPersonalKey,
    forgetPersonalKey: mockedEncryption.forgetPersonalKey,
    encryptData: mockedEncryption.encryptData,
    decryptData: mockedEncryption.decryptData,
  };

  ctx.args.mockedEncryption = {
    personalKey: encryption.personalKey,
    ...React.useRef({
      generateNewPersonalKey: fn(() => {
        actions.generateNewPersonalKey();
        encryption.generateNewPersonalKey();
      }),
      importPersonalKey: fn((key: string) => {
        actions.importPersonalKey(key);
        encryption.importPersonalKey(key);
      }),
      forgetPersonalKey: fn(() => {
        actions.forgetPersonalKey();
        encryption.forgetPersonalKey();
      }),
      encryptData: fn((data: ArrayBuffer) => {
        actions.encryptData(data);
        return encryption.encryptData(data);
      }),
      decryptData: fn((data: ArrayBuffer) => {
        actions.decryptData(data);
        return encryption.decryptData(data);
      }),
    }).current,
  };

  return Story();
}

export function ReopeningDialogStory(Story: any, ctx: any) {
  // we assume that args.setOpen is an jest.fn/spied and a Storybook action
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
