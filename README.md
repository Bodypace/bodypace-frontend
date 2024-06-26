<p align="center">
  <a href="https://bodypace.org" target="_blank">
    <img src="https://bodypace.github.io/favicon.ico" width="75"/>
  </a>
</p>

<p align="center">
  Source code of <a href="https://bodypace.org">bodypace.org</a> website.
</p>

<p align="center">
  Webapp that encrypts and decrypts everything locally (in browser). Unencrypted data never leaves your device.
</p>

<p align="center">
  <a href="https://github.com/Bodypace/bodypace-frontend/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/bodypace/bodypace-frontend" alt="Package License" /></a>
  <img alt="GitHub commit activity (branch)" src="https://img.shields.io/github/commit-activity/t/bodypace/bodypace-frontend">
  <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/bodypace/bodypace-frontend/master">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/bodypace/bodypace-frontend/chromatic.yml?label=tests">
  <img alt="" src="https://img.shields.io/badge/status-not%20ready%20yet%20(under%20development)-yellow" />
</p>

# Bodypace frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Note about downgrade from Next 14 to Next 13

this project was created with:

    "next": "14.0.1",
    "msw-storybook-addon": "^2.0.0-beta.1",

but it was downgraded to

    "next": "13.2.4",
    "msw-storybook-addon": "2.0.0-beta.2", (yea, here it is higher)

NextJS was downgraded because at 2024-04-01 NextJS 14 did not work on raspberry pi linux/arm/v7 architecture (from what I tried).
Next 14 has a dependency on SWC which does not provide prebuild binary for armv7l and I failed to run npm in such a way
that it will build that for me, thus I downgraded (simpler than wasting 4 days to learn how cross-compilation works on npm or wait
each time few hours for a build to finish on emulated armv7l on my host amd64/x86_64 architecture).

in `tsconfig.js` such changes were made:

from:

    "module": "esnext",
    "moduleResolution": "bundler",

to:

    "module": "nodenext",
    "moduleResolution": "nodenext",
    "forceConsistentCasingInFileNames": true  (new key-value pair)

everything else is in this commmit, check git history.

Those 2 lines added to vscode setting:

    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true

were added by `npm run lint` after downgrading to NextJS 13. Idk exactly why, get rid of it after upgrading back to latest NextJS version.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
