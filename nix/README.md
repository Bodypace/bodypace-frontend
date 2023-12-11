# What is this directory about

I'm using [NixOS](https://i.pinimg.com/736x/46/87/2c/46872c3997a2a61626dae93e09988d72.jpg) on which playwright (`npm run test` from `@storybook/test-runner` package) is not working.

Therefore, I wrote nodejs docker image with playwright installed.

So, on a fresh NixOS machine I run this once:

```bash
cp nix/Dockerfile .
DOCKER_BUILDKIT=1 docker build -t bodypace-frontend-testing .  # it does not cache RUN commands used in Dockerfile and those take a lot of time, so I don't recommend running it again without a reason
rm Dockerfile
nix/test.sh
```

and then each time I want to run tests I run `nix/test.sh` instead of `npm run test`.

Being outside of `nix/` is important, `cd nix/; ./test.sh` will not work.
