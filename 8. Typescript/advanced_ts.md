# TypeScript Advanced Concepts - Student Guide

A comprehensive guide covering advanced TypeScript concepts including types, interfaces, generics, and modules.

---

## Section 1: Union and Intersection Types

### Union Types
Union types allow a variable to hold values of multiple types using the `|` operator.

```typescript
// Basic union type
let id: string | number;
id = "ABC123"; // ✓ valid
id = 123;      // ✓ valid

// Union with type narrowing
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

**Key Points:**
- Use unions when a value can be one of several types
- Type narrowing (type guards) is often needed to work with union types safely
- Common pattern: `string | null` for optional values

### Intersection Types
Intersection types combine multiple types into one using the `&` operator.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

// Combining both interfaces
type Staff = Person & Employee;

const employee: Staff = {
  name: "John",
  age: 30,
  employeeId: "E001",
  department: "Engineering"
};
```

**Key Points:**
- Creates a new type with ALL properties from combined types
- Useful for composing complex types from simpler ones
- Different from unions - intersection requires all properties, union accepts any

---

## Section 2: Function Types

### Basic Function Types

```typescript
// Function type annotation
let greet: (name: string) => string;

greet = function(name: string): string {
  return `Hello, ${name}`;
};

// Arrow function with types
const add = (a: number, b: number): number => a + b;
```

### Parameters

```typescript
// Optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// Default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

### Callback Functions

```typescript
// Callback type definition
type Callback = (result: string) => void;

function fetchData(callback: Callback): void {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

// Using the callback
fetchData((result) => {
  console.log(result);
});

// Generic callback example
function processArray<T>(
  arr: T[], 
  callback: (item: T) => void
): void {
  arr.forEach(callback);
}
```

### Promises

```typescript
// Promise with explicit type
function fetchUser(): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Alice" });
    }, 1000);
  });
}

// Chaining promises
fetchUser()
  .then(user => console.log(user.name))
  .catch(error => console.error(error));
```

### Async/Await

```typescript
// Async function returns Promise automatically
async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}

// Error handling with async/await
async function safeGetUser(id: number): Promise<User | null> {
  try {
    const user = await getUser(id);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

// Using async/await
async function main() {
  const user = await getUser(1);
  console.log(user);
}
```

---

## Section 3: Type Casting (Type Assertions)

Type assertions tell the compiler to treat a value as a specific type.

```typescript
// Angle-bracket syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// As-syntax (preferred in JSX)
let strLength2: number = (someValue as string).length;

// Practical example with DOM
const input = document.getElementById("username") as HTMLInputElement;
input.value = "John"; // TypeScript knows this is an input element

// Non-null assertion operator
function getValue(key: string): string | null {
  return localStorage.getItem(key);
}

const value = getValue("token")!; // Tells TS: "I know this won't be null"
```

**When to Use:**
- When you know more about a type than TypeScript does
- Working with DOM elements
- Narrowing down `any` or `unknown` types
- Be careful: incorrect assertions can cause runtime errors

---

## Section 4: Omit Utility Type

`Omit` creates a new type by removing specific properties from an existing type.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Omit sensitive fields for API response
type PublicUser = Omit<User, "password">;

const publicUser: PublicUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
  // password is not allowed here
};

// Omit multiple properties
type UserPreview = Omit<User, "password" | "email" | "createdAt">;

// Combining with other types
type UpdateUser = Partial<Omit<User, "id" | "createdAt">>;
```

**Other Related Utility Types:**
- `Pick<T, K>`: Select specific properties
- `Partial<T>`: Make all properties optional
- `Required<T>`: Make all properties required
- `Readonly<T>`: Make all properties readonly

---

## Section 5: Generics

### Introduction to Generics
Generics allow you to write reusable code that works with multiple types while maintaining type safety.

```typescript
// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

// Using the generic function
let output1 = identity<string>("hello"); // output1: string
let output2 = identity<number>(42);      // output2: number
let output3 = identity("auto");          // type inferred: string

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirstElement([1, 2, 3]);     // number | undefined
const firstStr = getFirstElement(["a", "b"]);    // string | undefined
```

### Generic Constraints
Constraints limit what types can be used with generics.

```typescript
// Constraint: type must have length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");        // ✓ strings have length
logLength([1, 2, 3]);      // ✓ arrays have length
logLength({ length: 10 }); // ✓ object with length
// logLength(123);         // ✗ numbers don't have length

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // ✓ "Alice"
// getProperty(person, "invalid");        // ✗ Error: invalid key
```

### Generic Classes

```typescript
// Generic class for data storage
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    this.data = this.data.filter(i => i !== item);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

// Usage
const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);

// Generic class with constraints
class Repository<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}
```

### Generic Interfaces

```typescript
// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(val: T): void;
}

// Implementation
class Box<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(val: T): void {
    this.value = val;
  }
}

// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success"
};

const usersResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
  status: 200,
  message: "Success"
};
```

---

## Section 6: Interfaces

### Introduction to Interfaces
Interfaces define contracts in your code by specifying the structure of objects.

```typescript
// Basic interface
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

// Using the interface
const john: Person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// Optional properties
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// Readonly properties
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Error: cannot modify readonly property

// Method signatures
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

### Extending Interfaces
Interfaces can extend other interfaces to create combinations.

```typescript
// Base interface
interface Animal {
  name: string;
  age: number;
}

// Extended interface
interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark() {
    console.log("Woof!");
  }
};

// Multiple inheritance
interface Swimmer {
  swim(): void;
}

interface Flyer {
  fly(): void;
}

interface Duck extends Animal, Swimmer, Flyer {
  quack(): void;
}

// Extending and modifying
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

interface ColoredSquare extends Square {
  color: "red" | "blue" | "green"; // narrowing the type
}
```

### Interfaces vs Abstract Classes

**Interfaces:**
```typescript
interface Vehicle {
  start(): void;
  stop(): void;
  speed: number;
}

class Car implements Vehicle {
  speed: number = 0;
  
  start() {
    console.log("Car starting");
  }
  
  stop() {
    console.log("Car stopping");
  }
}
```

**Abstract Classes:**
```typescript
abstract class AbstractVehicle {
  speed: number = 0;
  
  // Abstract method (must be implemented)
  abstract start(): void;
  
  // Concrete method (inherited as-is)
  stop(): void {
    console.log("Vehicle stopping");
    this.speed = 0;
  }
  
  // Protected method (available to subclasses)
  protected log(message: string): void {
    console.log(message);
  }
}

class Motorcycle extends AbstractVehicle {
  start() {
    this.log("Motorcycle starting");
    this.speed = 10;
  }
}
```

**Key Differences:**

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Implementation | Cannot contain implementation | Can contain implementation |
| Multiple inheritance | A class can implement multiple interfaces | A class can extend only one abstract class |
| Access modifiers | Not applicable | Can use public, protected, private |
| Constructor | Cannot have constructors | Can have constructors |
| When to use | Define contract/shape | Share common behavior |

**When to Use What:**
- Use **interfaces** when you need to define a contract that multiple unrelated classes should follow
- Use **abstract classes** when you want to provide common functionality to related classes
- Use **interfaces** for better flexibility (multiple implementation)
- Use **abstract classes** when you need to share code between related classes

---

## Section 7: Advanced Types

### Type Guards
Type guards narrow down the type of a variable within a conditional block.

```typescript
// typeof type guard (for primitives)
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

// instanceof type guard (for classes)
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// in operator type guard (for properties)
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Custom type guard (user-defined)
interface Car {
  drive(): void;
}

interface Boat {
  sail(): void;
}

// Type predicate function
function isCar(vehicle: Car | Boat): vehicle is Car {
  return (vehicle as Car).drive !== undefined;
}

function operate(vehicle: Car | Boat) {
  if (isCar(vehicle)) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}
```

---

## Section 8: Modules

TypeScript modules help organize code into reusable pieces and manage dependencies.

### Exporting from a Module

```typescript
// user.ts - Named exports
export interface User {
  id: number;
  name: string;
}

export function createUser(name: string): User {
  return {
    id: Math.random(),
    name
  };
}

export class UserService {
  getUser(id: number): User {
    // implementation
  }
}

// constants.ts - Default export
const API_URL = "https://api.example.com";
export default API_URL;

// utils.ts - Mix of exports
export const version = "1.0.0";
export default function logger(message: string) {
  console.log(message);
}
```

### Importing Modules

```typescript
// Import named exports
import { User, createUser, UserService } from './user';

// Import with alias
import { User as UserType } from './user';

// Import everything as namespace
import * as UserModule from './user';
const user: UserModule.User = UserModule.createUser("Alice");

// Import default export
import API_URL from './constants';
import logger from './utils';

// Import both default and named
import logger, { version } from './utils';

// Import for side effects only
import './polyfills';
```

### Module Organization Best Practices

```typescript
// models/index.ts - Barrel export pattern
export * from './user';
export * from './product';
export * from './order';

// Using barrel exports
import { User, Product, Order } from './models';

// Re-exporting with modifications
export { User as UserModel } from './user';
export { default as logger } from './utils';
```

### Module Resolution

TypeScript uses two main strategies for module resolution:

1. **Classic** (legacy, rarely used)
2. **Node** (recommended, default)

**tsconfig.json configuration:**
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

**Using path aliases:**
```typescript
// Instead of: import { User } from '../../../models/user';
import { User } from '@models/user';
```

---

## Practice Exercises

### Exercise 1: Union Types and Type Guards
Create a function that accepts either a single value or an array and returns an array.

### Exercise 2: Generics
Build a generic `Queue<T>` class with `enqueue`, `dequeue`, and `peek` methods.

### Exercise 3: Interfaces
Design an interface hierarchy for different types of employees (Manager, Developer, Designer) with shared and unique properties.

### Exercise 4: Advanced Types
Create a type-safe API client using generics, promises, and type guards.

### Exercise 5: Modules
Organize a small application into modules with proper imports/exports and barrel files.

---

## Additional Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Practice online
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - Free online book

---

## Common Pitfalls and Tips

1. **Don't overuse `any`** - It defeats the purpose of TypeScript
2. **Use strict mode** - Enable `"strict": true` in tsconfig.json
3. **Prefer interfaces over type aliases for objects** - Better error messages
4. **Use type inference** - Don't annotate when TypeScript can infer
5. **Keep generic constraints simple** - Complex constraints reduce reusability

---