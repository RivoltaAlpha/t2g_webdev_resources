# TypeScript Fundamentals Guide

## Table of Contents
1. [Introduction to TypeScript](#introduction-to-typescript)
2. [Variable Declaration](#variable-declaration)
3. [Primitive Types](#primitive-types)
4. [Special Types](#special-types)
5. [Operators](#operators)
6. [Control Flow Statements](#control-flow-statements)
7. [Objects](#objects)
8. [Arrays](#arrays)
9. [Tuples](#tuples)
10. [Interfaces](#interfaces)
11. [Type Aliases](#type-aliases)

---

## Introduction to TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript. It adds static type definitions to JavaScript, allowing you to catch errors during development rather than at runtime.

### Why TypeScript?
- **Type Safety**: Catch errors before running your code
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Code Quality**: Self-documenting code with explicit types
- **Easier Maintenance**: Refactoring becomes safer and easier

### Setting Up
```bash
# Install TypeScript globally
npm install -g typescript

# Create a TypeScript file
touch app.ts

# Compile TypeScript to JavaScript
tsc app.ts
```

---

## Variable Declaration

TypeScript supports three ways to declare variables:

### `let` - Block-scoped variable
```typescript
let username: string = "John";
let age: number = 25;

// Can be reassigned
username = "Jane";
```

### `const` - Block-scoped constant
```typescript
const PI: number = 3.14159;
const APP_NAME: string = "MyApp";

// Cannot be reassigned
// PI = 3.14; // Error!
```

### `var` - Function-scoped (avoid in modern code)
```typescript
var oldStyle: string = "Not recommended";
```

### Type Annotation vs Type Inference

**Type Annotation** (explicit):
```typescript
let message: string = "Hello";
```

**Type Inference** (automatic):
```typescript
let message = "Hello"; // TypeScript infers type as string
```

---

## Primitive Types

### Number
All numbers in TypeScript are floating-point values or BigIntegers.

```typescript
let decimal: number = 10;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### String
Textual data represented as strings.

```typescript
let color: string = "blue";
let fullName: string = `Bob Smith`;
let age: number = 25;

// Template strings
let greeting: string = `Hello, my name is ${fullName} and I'm ${age} years old`;
```

### Boolean
Simple true/false values.

```typescript
let isActive: boolean = true;
let isComplete: boolean = false;
```

### Null and Undefined
```typescript
let empty: null = null;
let notDefined: undefined = undefined;
```

---

## Special Types

### Any
Disables type checking - use sparingly!

```typescript
let dynamic: any = 4;
dynamic = "string"; // OK
dynamic = false;    // OK

// Useful when working with third-party libraries
let result: any = JSON.parse('{"name": "John"}');
```

### Unknown
A type-safe alternative to `any`. Requires type checking before use.

```typescript
let value: unknown = "Hello";

// Must check type before using
if (typeof value === "string") {
    console.log(value.toUpperCase()); // OK
}
```

### Void
Used for functions that don't return a value.

```typescript
function logMessage(message: string): void {
    console.log(message);
    // No return statement
}
```

### Never
Represents values that never occur (functions that always throw errors or infinite loops).

```typescript
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // Never exits
    }
}
```

---

## Operators

### Arithmetic Operators
```typescript
let a: number = 10;
let b: number = 3;

let sum = a + b;        // 13
let difference = a - b; // 7
let product = a * b;    // 30
let quotient = a / b;   // 3.333...
let remainder = a % b;  // 1
let power = a ** b;     // 1000
```

### Comparison Operators
```typescript
let x: number = 5;
let y: number = 10;

console.log(x == y);   // false (equal to)
console.log(x != y);   // true (not equal)
console.log(x === y);  // false (strict equality)
console.log(x !== y);  // true (strict inequality)
console.log(x < y);    // true
console.log(x > y);    // false
console.log(x <= y);   // true
console.log(x >= y);   // false
```

### Logical Operators
```typescript
let isTrue: boolean = true;
let isFalse: boolean = false;

console.log(isTrue && isFalse); // false (AND)
console.log(isTrue || isFalse); // true (OR)
console.log(!isTrue);           // false (NOT)
```

### Assignment Operators
```typescript
let num: number = 10;

num += 5;  // num = num + 5
num -= 3;  // num = num - 3
num *= 2;  // num = num * 2
num /= 4;  // num = num / 4
num %= 3;  // num = num % 3
```

---

## Control Flow Statements

### if...else
```typescript
let age: number = 18;

if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}
```

### switch...case
```typescript
let day: number = 3;
let dayName: string;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    default:
        dayName = "Unknown";
}
```

### for Loop
```typescript
// Traditional for loop
for (let i: number = 0; i < 5; i++) {
    console.log(i);
}

// for...of (iterates over values)
let numbers: number[] = [1, 2, 3, 4, 5];
for (let num of numbers) {
    console.log(num);
}

// for...in (iterates over keys/indices)
for (let index in numbers) {
    console.log(index);
}
```

### while Loop
```typescript
let count: number = 0;

while (count < 5) {
    console.log(count);
    count++;
}
```

### do...while Loop
```typescript
let num: number = 0;

do {
    console.log(num);
    num++;
} while (num < 5);
```

### break and continue
```typescript
// break - exits the loop
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // Exits loop when i is 5
    }
    console.log(i);
}

// continue - skips current iteration
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue; // Skips even numbers
    }
    console.log(i); // Only prints odd numbers
}
```

---

## Objects

Objects represent non-primitive values with properties and methods.

### Object Type Annotation
```typescript
let person: {
    name: string;
    age: number;
    isStudent: boolean;
};

person = {
    name: "Alice",
    age: 22,
    isStudent: true
};
```

### Object with Optional Properties
```typescript
let employee: {
    name: string;
    age: number;
    department?: string; // Optional property
};

employee = {
    name: "Bob",
    age: 30
    // department is optional
};
```

### Object with Methods
```typescript
let calculator = {
    add: function(a: number, b: number): number {
        return a + b;
    },
    subtract(a: number, b: number): number {
        return a - b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(10, 4)); // 6
```

### Nested Objects
```typescript
let student: {
    name: string;
    address: {
        street: string;
        city: string;
        zipCode: number;
    };
};

student = {
    name: "Charlie",
    address: {
        street: "123 Main St",
        city: "Boston",
        zipCode: 12345
    }
};
```

---

## Arrays

Arrays store multiple values of the same type.

### Array Declaration
```typescript
// Method 1: Type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Method 2: Array<Type>
let scores: Array<number> = [95, 87, 92];
let cities: Array<string> = ["New York", "London", "Tokyo"];
```

### Array Operations
```typescript
let fruits: string[] = ["apple", "banana", "orange"];

// Add elements
fruits.push("grape");           // Adds to end
fruits.unshift("mango");        // Adds to beginning

// Remove elements
let lastFruit = fruits.pop();   // Removes from end
let firstFruit = fruits.shift(); // Removes from beginning

// Access elements
console.log(fruits[0]);         // First element
console.log(fruits.length);     // Array length

// Iterate over array
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

// Map array
let upperCaseFruits = fruits.map(fruit => fruit.toUpperCase());

// Filter array
let longFruits = fruits.filter(fruit => fruit.length > 5);
```

### Multi-dimensional Arrays
```typescript
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[1][2]); // 6
```

---

## Tuples

Tuples allow you to store a fixed number of elements with known types in a specific order.

### Basic Tuple
```typescript
// Declare a tuple
let person: [string, number, boolean];

// Initialize the tuple
person = ["Alice", 25, true];

// Access tuple elements
console.log(person[0]); // "Alice"
console.log(person[1]); // 25
console.log(person[2]); // true
```

### Named Tuples
```typescript
let employee: [name: string, age: number, salary: number];
employee = ["Bob", 30, 50000];
```

### Tuple with Optional Elements
```typescript
let data: [string, number?];
data = ["Hello"];     // OK
data = ["Hello", 42]; // OK
```

### Readonly Tuples
```typescript
let point: readonly [number, number] = [10, 20];
// point[0] = 5; // Error: Cannot assign to readonly property
```

### Tuple Arrays
```typescript
let employees: [string, number][] = [
    ["Alice", 25],
    ["Bob", 30],
    ["Charlie", 35]
];
```

---

## Interfaces

Interfaces define contracts for object shapes, specifying what properties and methods an object must have.

### Basic Interface
```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

let user: User = {
    name: "John",
    age: 28,
    email: "john@example.com"
};
```

### Optional Properties
```typescript
interface Product {
    id: number;
    name: string;
    description?: string; // Optional
    price: number;
}

let product: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99
    // description is optional
};
```

### Readonly Properties
```typescript
interface Config {
    readonly apiKey: string;
    readonly baseUrl: string;
}

let config: Config = {
    apiKey: "abc123",
    baseUrl: "https://api.example.com"
};

// config.apiKey = "xyz"; // Error: Cannot assign to readonly property
```

### Method Signatures
```typescript
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

let calc: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
```

### Extending Interfaces
```typescript
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    department: string;
}

let employee: Employee = {
    name: "Alice",
    age: 30,
    employeeId: 12345,
    department: "Engineering"
};
```

### Interface with Index Signature
```typescript
interface StringDictionary {
    [key: string]: string;
}

let dict: StringDictionary = {
    name: "John",
    city: "Boston",
    country: "USA"
};
```

---

## Type Aliases

Type aliases create new names for types, making complex types more readable and reusable.

### Basic Type Alias
```typescript
type ID = number | string;

let userId: ID = 123;
let productId: ID = "abc-456";
```

### Object Type Alias
```typescript
type Point = {
    x: number;
    y: number;
};

let coordinate: Point = {
    x: 10,
    y: 20
};
```

### Union Types
```typescript
type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending";
// orderStatus = "shipped"; // Error: not in the union
```

### Function Type Alias
```typescript
type MathOperation = (a: number, b: number) => number;

let add: MathOperation = (a, b) => a + b;
let multiply: MathOperation = (a, b) => a * b;
```

### Complex Type Alias
```typescript
type User = {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user" | "guest";
    preferences?: {
        theme: "light" | "dark";
        notifications: boolean;
    };
};

let currentUser: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    preferences: {
        theme: "dark",
        notifications: true
    }
};
```

### Type Alias vs Interface

**Similarities:**
- Both define object shapes
- Both can be extended

**Differences:**
```typescript
// Type alias can represent primitives, unions, and tuples
type Score = number;
type Result = "pass" | "fail";
type Coordinates = [number, number];

// Interfaces are better for object-oriented programming
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Type aliases use intersections
type Pet = Animal & {
    owner: string;
};
```

---

## Practice Exercises

### Exercise 1: Create a Student Management System
Create interfaces for `Student` and `Course`, then create an array of students with their enrolled courses.

### Exercise 2: Type-Safe Calculator
Build a calculator using type aliases for operations and create functions that use these types.

### Exercise 3: Product Inventory
Design a product inventory system using tuples for product data and interfaces for product details.

---

## Additional Resources

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

## Summary

TypeScript enhances JavaScript by adding:
- **Static typing** for catching errors early
- **Type inference** for less verbose code
- **Interfaces and type aliases** for defining contracts
- **Advanced types** for complex data structures

Practice these concepts regularly to become proficient in TypeScript development!

---

*Last Updated: September 2025*