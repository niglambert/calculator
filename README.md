This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Vitest

## Tests

npm install tailwind-merge

npm install clsx

https://nextjs.org/docs/app/building-your-application/testing/vitest

npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
npm i -D @vitest/ui

npx vitest run

###vitest.config.ts

```
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
```

###vitest.setup.ts

```
// Leave empty
// import '@testing-library/jest-dom'
```

###tsconfig.json

```
{
  ...
  "compilerOptions": {
    ...
    "types": ["vitest/globals"],
    ...
```

###package.json

```
{
  ...
  "scripts": {
    ...
    "test": "vitest",
    "test:ui": "vitest --ui --api 9527"
    ...
```

## Run Vitest UI

npm run test:ui

http://localhost:9527/**vitest**/#/?file=472998075

## End-to-End Button Tests

Rules
If the first operand is an operator, default the first operand to 0
Tests: -2=[-2], /9=[0]

selecting an operator shows the current total
Tests: 1+2+[3]

CE clears the current number
Tests: 1+2CE3=[4], 1+2CEx4=[4]

C resets the calculation
Tests: 1+2C3=[3]

= does not repeat last calculation
Tests: 1+2===[3]

Operation after = continues the calculation
Tests: 1+2=+3=[6]

Number after = starts new calculation
Tests: 1+2=3+4=[7]

Del deletes last entered number
Tests: 123Del[12]

max 6 decimal palace
Tests: 2/3=[0.666667]

max 8 digits including decimal place
Tests: 123456789[12345678]

Exponent used if result too large
Tests: 99999999x10[1.00e+9]

## End-to-End Input Field Tests

Empty field displays 0
Tests: 0Backspace[0]

No double 0s
Tests: 0

Cannot edit an exponent result

Fractions less than 1 have 0 prefix
Tests: .1[0.1]

Multiple 0 prefix removed
Tests: 0.01<<Del[1]

Copy & Paste number
Tests: 1.32 CTRLA CTRLC CTRLX CTRLV[1.32]

Key actions:
|---------------|-------------------|
|<- | Cursor left |
|-> | Cursor right |
|Home | Cursor to start |
|End | Cursor to end |
|SHIFT -> | Select to right |
|SHIFT <- | Select to left |
|CTRL SHIFT -> | Select word right |
|CTRL SHIFT <- | Select word left |
|Backspace | Delete left |
|Del | Delete right |
|Escape | Clear All |
|Enter | Equals |

Replace selected

3+= 6
3+== 9

3+-4= -1

3+4D5= 8

3+4+ 7

-2+3
