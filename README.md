This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Packages

```bash
# Removes conflicting class names
npm install tailwind-merge

# Conditionally add classes
npm install clsx

```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Vitest

Refer to: [Setting up Vitest with Next.js](https://nextjs.org/docs/app/building-your-application/testing/vitest)

### Packages

```bash
# Vite packages with typescript
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths

# Vite UI package
npm i -D @vitest/ui

# Run tests
npx vitest run

# Launch testing UI
npm run test:ui
```

### vitest.config.ts

```bash
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

### vitest.setup.ts

Create this file but leave empty

```bash
// Leave this file empty
// import '@testing-library/jest-dom'
```

### tsconfig.json

Add the following

```bash
{
  ...
  "compilerOptions": {
    ...
    "types": ["vitest/globals"],
    ...
```

### package.json

Update scripts

```bash
{
  ...
  "scripts": {
    ...
    "test": "vitest",
    "test:ui": "vitest --ui --api 9527"
    ...
```

## Icons

```bash
https://heroicons.com/solid
```

## End-to-End Tests

### Button Tests

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

### Input Field Tests

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
