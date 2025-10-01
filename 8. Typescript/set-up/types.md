# TypeScript Types Guide

## What is a Type?

In TypeScript:

- A **type** is a label that describes the different properties and methods that a value has
- **Every value has a type**

TypeScript inherits the built-in types from JavaScript. TypeScript types are categorized into:

- **Primitive types**
- **Object types**

## Primitive Types

The following table illustrates the primitive types in TypeScript:

| Name | Description |
|------|-------------|
| `string` | Represent text data |
| `number` | Represent numeric values |
| `boolean` | Have true and false values |
| `null` | Have one value: `null` |
| `undefined` | Have one value: `undefined`. It is the default value of an uninitialized variable |
| `symbol` | Represent a unique constant value |

## Object Types

Object types include functions, arrays, classes, and more. You'll learn how to create custom object types in later sections.

## Purposes of Types in TypeScript

There are two main purposes of types in TypeScript:

1. **Error Detection**: Types are used by the TypeScript compiler to analyze your code for errors
2. **Code Understanding**: Types allow you to understand what values are associated with variables

## Key Takeaways

- In TypeScript, every value is associated with a type
- A type is a label that describes the properties and methods that a value has
- TypeScript compiler uses types to analyze your code for hunting bugs and errors

---

# Type Annotations

## Variables and Constants Syntax

The following syntax shows how to specify type annotations for variables and constants:

```javascript
let variableName: type;
let variableName: type = value;
const constantName: type = value;
```

In this syntax, the type annotation comes after the variable or constant name and is preceded by a colon (`:`).

### Basic Example

The following example uses `number` annotation for a variable:

```typescript
let counter: number;
```

You can both use a type annotation for a variable and initialize it in a single statement:

```typescript
let counter: number = 1;
```

## Type Annotation Examples

### Arrays

To annotate an array type, use a specific type followed by a square bracket: `type[]`

```javascript
let arrayName: type[];
```

**Example**: Declaring an array of strings:

```javascript
let names: string[] = ['John', 'Jane', 'Peter', 'David', 'Mary'];
```

### Objects

To specify a type for an object, you use the object type annotation:

```javascript
let person: {
  name: string;
  age: number;
};

person = {
  name: 'John',
  age: 25,
}; // valid
```

In this example, the `person` object only accepts an object that has two properties: `name` with the `string` type and `age` with the `number` type.

### Function Arguments & Return Types

The following shows a function annotation with parameter type annotation and return type annotation:

```javascript
let greeting : (name: string) => string;
```

In this example, you can assign any function that accepts a string and returns a string to the `greeting` variable:

```javascript
greeting = function (name: string) {
    return `Hi ${name}`;
};
```

**Invalid Example**: The following causes an error because the function assigned to the `greeting` variable doesn't match its function type:

```typescript
greeting = function () {
    console.log('Hello');
};
```