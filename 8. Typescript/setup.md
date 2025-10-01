# TypeScript Installation and Setup Guide

## Installing TypeScript Compiler

To install the TypeScript compiler, launch the Terminal on macOS/Linux or Command Prompt on Windows and run:

```bash
pnpm install -g typescript
```

After installation, verify the TypeScript compiler version:

```bash
tsc --v
```

## Installing tsx Module

If you want to run TypeScript code directly on Node.js without precompiling, you can use the `tsx` module.

To install the `tsx` module globally:

```bash
pnpm install -g tsx
```

## Key Concepts

- **TypeScript Compiler**: Compiles TypeScript into JavaScript
- **`tsc` Command**: Compiles a TypeScript file to a JavaScript file
- **`tsx` Module**: Runs TypeScript directly on Node.js without precompiling

## Compiling TypeScript

To compile a TypeScript file:

```css
tsc app.ts
```

This generates a JavaScript file (`app.js`) from your TypeScript source.

## Running Compiled JavaScript

To run the compiled JavaScript file in Node.js:

```bash
node app.js
```

## Why Use TypeScript?

There are two main reasons to use TypeScript:

1. **Type System**: TypeScript adds a type system to help you avoid many problems with dynamic types in JavaScript
2. **Future JavaScript Features**: TypeScript implements ES Next features, allowing you to use them today

## Understanding JavaScript's Dynamic Typing

JavaScript is dynamically typed. Unlike statically typed languages such as Java or C#, **values have types instead of variables**. You don't need to explicitly declare types—JavaScript automatically infers them from values.

While dynamic types offer flexibility, they also lead to problems.

### Problems with Dynamic Types

Dynamic typing can cause runtime errors when:
- Referencing properties that don't exist on objects
- Passing incorrect types to functions
- Misspelling property names

## How TypeScript Solves Dynamic Type Problems

TypeScript provides compile-time type checking to catch errors before runtime.

### Solution Steps

**Step 1**: Define the "shape" of an object using an interface:

```typescript
interface Product {
    id: number,
    name: string,
    price: number
}
```

**Step 2**: Explicitly use the type as the return type:

```javascript
function getProduct(id): Product {
  return {
    id: id,
    name: `Awesome Gadget ${id}`,
    price: 99.5
  }
}
```

When you reference a property that doesn't exist, your code editor will immediately alert you, preventing runtime errors.