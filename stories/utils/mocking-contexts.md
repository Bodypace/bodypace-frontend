# Note about how Actions work in Storybook

This note may be useful while reading or writing something related to `fn()` or `action()` from `@storybook/test`

We want to mock encryption context (and account):

- spy on it and make assertions with jestd
- also log everything in Storybook UI, in Actions addon tab

While experimenting with Storybook, I concluded that those are the end results of setting different types of callbacks:

```javascript
const story: Story = {                              // below fn() means it's spied by jest, so we can e.g. check if it was called
  args: {                                           // below action() means it's logging in UI but isn't necessarily spied by jest
    a: fn(),                                        // = fn(action('a'))
    b: fn(() => { doSomething(); }),                // = fn(action('b'))
    c: fn(action('ccc')),                           // = fn(action('c'))
    d: action('d'),                                 // = fn(action('d'))
    e: action('eee'),                               // = fn(action('eee'))
    f: () => { doSomething(); },                    // = () => { doSomething(); }
    x: {
      a: fn(),                                      // = fn()
      b: fn(() => { doSomething(); }),              // = fn(() => { doSomething(); }
      c: fn(action('ccc')),                         // = fn(action('ccc'))
      C: fn().mockImplementation(action('CCC')),    // = fn()
      d: action('d'),                               // = fn(action('d'))
      e: action('eee'),                             // = fn(action('eee'))
      f: () => { doSomething(); },                  // = () => { doSomething(); }
    }
  },
  parameters: {
    a: action('a'),                                 // = action('a')
    b: fn(action('b')),                             // = fn(action('b'))
  }
}
```

Above should help thinking about actions, note that it may be incorrect (could change already or I made a mistake).

btw. there is something weird going on:

```javascript
// this will not log action, in fact implementation is not even called
importPersonalKey: fn().mockImplementation((...args: any[]) => {
action("importPersonalKey target")();
}),
```

```javascript
// this will log action
importPersonalKey: fn((...args: any[]) => {
action("importPersonalKey target")();
}) as any,
```

Why?????? (I guess it's because of how fn() is implemented, note that it's a StoryBook wrapper on jest.fn())
