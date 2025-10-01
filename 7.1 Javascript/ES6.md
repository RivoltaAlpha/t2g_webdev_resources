# ES6 Features - Complete Guide

A comprehensive guide to ECMAScript 6 (ES6) features with simple, practical examples.

---

## Section 1: New ES6 Syntax

### let – Block-Scoped Variables

The `let` keyword declares variables that are limited to the scope of a block statement.

```javascript
// let is block-scoped
if (true) {
  let x = 10;
  console.log(x); // 10
}
// console.log(x); // ReferenceError: x is not defined

// Works in loops
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
// console.log(i); // ReferenceError: i is not defined
```

### let vs. var – Key Differences

`var` is function-scoped, while `let` is block-scoped. `var` also has hoisting behavior.

```javascript
// var is function-scoped
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - accessible outside block
}

// let is block-scoped
function letExample() {
  if (true) {
    let y = 10;
  }
  // console.log(y); // ReferenceError
}

// var hoisting
console.log(a); // undefined (hoisted)
var a = 5;

// let doesn't hoist the same way
// console.log(b); // ReferenceError (temporal dead zone)
let b = 5;
```

### const – Constants

`const` declares constants that cannot be reassigned (though objects/arrays can be mutated).

```javascript
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable

// Object properties can be changed
const person = { name: 'Alice' };
person.name = 'Bob'; // This works
person.age = 30; // This works
// person = {}; // TypeError: Assignment to constant variable

// Array elements can be changed
const numbers = [1, 2, 3];
numbers.push(4); // This works
// numbers = []; // TypeError: Assignment to constant variable
```

### Default Function Parameters

Set default values for function parameters when no value is provided.

```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('Alice')); // "Hello, Alice!"
console.log(greet('Bob', 'Hi')); // "Hi, Bob!"

// Default can reference other parameters
function createURL(domain, path = '/home', protocol = 'https') {
  return `${protocol}://${domain}${path}`;
}

console.log(createURL('example.com')); // "https://example.com/home"
```

### Rest Parameter

Collect all remaining arguments into an array using `...` syntax.

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest parameter must be last
function logInfo(first, second, ...others) {
  console.log('First:', first);
  console.log('Second:', second);
  console.log('Others:', others);
}

logInfo('a', 'b', 'c', 'd', 'e');
// First: a
// Second: b
// Others: ['c', 'd', 'e']
```

### Spread Operator

Expand an array or object into individual elements using `...` syntax.

```javascript
// Spread in arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy arrays
const original = [1, 2, 3];
const copy = [...original];

// Spread in function calls
const numbers = [5, 10, 15];
console.log(Math.max(...numbers)); // 15

// Spread in objects
const person = { name: 'Alice', age: 25 };
const employee = { ...person, role: 'Developer' };
console.log(employee); // { name: 'Alice', age: 25, role: 'Developer' }
```

### Object Literal Syntax Extensions

Enhanced object literal syntax for cleaner code.

```javascript
const name = 'Alice';
const age = 25;

// Property shorthand
const person = { name, age };
console.log(person); // { name: 'Alice', age: 25 }

// Method shorthand
const calculator = {
  add(a, b) {
    return a + b;
  },
  multiply(a, b) {
    return a * b;
  }
};

console.log(calculator.add(2, 3)); // 5

// Computed property names
const propName = 'score';
const game = {
  [propName]: 100,
  ['level' + '1']: 'easy'
};
console.log(game); // { score: 100, level1: 'easy' }
```

### for...of – Iterate Over Iterables

Loop through iterable objects like arrays, strings, maps, and sets.

```javascript
// Array iteration
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}
// red, green, blue

// String iteration
const str = 'Hello';
for (const char of str) {
  console.log(char);
}
// H, e, l, l, o

// With entries
const fruits = ['apple', 'banana', 'cherry'];
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
// 0: apple, 1: banana, 2: cherry
```

### Octal and Binary Literals

New syntax for representing octal and binary numbers.

```javascript
// Binary literals (prefix: 0b or 0B)
const binary = 0b1010;
console.log(binary); // 10

// Octal literals (prefix: 0o or 0O)
const octal = 0o755;
console.log(octal); // 493

// Convert to different bases
const num = 255;
console.log(num.toString(2)); // "11111111" (binary)
console.log(num.toString(8)); // "377" (octal)
console.log(num.toString(16)); // "ff" (hexadecimal)
```

### Template Literals

String literals with embedded expressions using backticks.

```javascript
// Basic template literal
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, Alice!"

// Multi-line strings
const message = `This is line 1
This is line 2
This is line 3`;

// Expressions in templates
const a = 5;
const b = 10;
console.log(`Sum: ${a + b}`); // "Sum: 15"

// Function calls in templates
function getPrice() {
  return 99.99;
}
console.log(`Price: $${getPrice()}`); // "Price: $99.99"

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
  }, '');
}

const product = 'laptop';
const price = 999;
console.log(highlight`Product: ${product}, Price: ${price}`);
// "Product: <strong>laptop</strong>, Price: <strong>999</strong>"
```

---

## Section 2: Destructuring

### Array Destructuring

Extract values from arrays and assign them to variables.

```javascript
// Basic array destructuring
const [a, b, c] = [1, 2, 3];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// Skip elements
const [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [5];
console.log(x); // 5
console.log(y); // 20

// Swapping variables
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2, 1
```

### Object Destructuring

Extract properties from objects and assign them to variables.

```javascript
// Basic object destructuring
const person = { name: 'Alice', age: 25, city: 'NYC' };
const { name, age } = person;
console.log(name); // "Alice"
console.log(age); // 25

// Different variable names
const { name: fullName, age: years } = person;
console.log(fullName); // "Alice"
console.log(years); // 25

// Default values
const { name: n, country = 'USA' } = person;
console.log(country); // "USA"

// Nested destructuring
const user = {
  id: 1,
  profile: {
    username: 'alice123',
    email: 'alice@example.com'
  }
};

const { profile: { username, email } } = user;
console.log(username); // "alice123"
console.log(email); // "alice@example.com"

// Function parameters
function displayPerson({ name, age, city = 'Unknown' }) {
  console.log(`${name}, ${age}, from ${city}`);
}

displayPerson(person); // "Alice, 25, from NYC"
```

---

## Section 3: ES6 Modules

### ES6 Modules

Organize code into reusable modules with `import` and `export`.

```javascript
// math.js - Named exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// main.js - Import named exports
import { add, subtract, PI } from './math.js';
console.log(add(5, 3)); // 8
console.log(PI); // 3.14159

// Import with alias
import { add as sum } from './math.js';
console.log(sum(5, 3)); // 8

// Import all as namespace
import * as MathUtils from './math.js';
console.log(MathUtils.add(5, 3)); // 8

// calculator.js - Default export
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}

// main.js - Import default export
import Calculator from './calculator.js';
const calc = new Calculator();
console.log(calc.add(5, 3)); // 8

// Mixing default and named exports
// utils.js
export default function log(message) {
  console.log(message);
}

export const version = '1.0.0';

// main.js
import log, { version } from './utils.js';
log(`Version: ${version}`);
```

---

## Section 4: ES6 Classes

### Class – Basic Syntax

Define classes using the `class` keyword.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name}`;
  }

  getAge() {
    return this.age;
  }
}

const alice = new Person('Alice', 25);
console.log(alice.greet()); // "Hello, my name is Alice"
console.log(alice.getAge()); // 25
```

### Getters and Setters

Define accessors using `get` and `set` keywords.

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    if (value > 0) {
      this._width = value;
    }
  }

  get area() {
    return this._width * this._height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.width); // 10
console.log(rect.area); // 50

rect.width = 15;
console.log(rect.area); // 75
```

### Class Expression

Define classes using expressions.

```javascript
// Anonymous class expression
const Person = class {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
};

const alice = new Person('Alice');
console.log(alice.greet()); // "Hello, Alice"

// Named class expression
const Employee = class EmployeeClass {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
};

const bob = new Employee('Bob', 'Developer');
console.log(bob.role); // "Developer"
```

### Static Methods

Define methods that belong to the class itself, not instances.

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static PI = 3.14159;
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 2)); // 8

// Cannot call on instance
const util = new MathUtils();
// util.add(5, 3); // TypeError: util.add is not a function
```

### Static Properties

Define properties shared by all instances of a class.

```javascript
class Counter {
  static count = 0;

  constructor() {
    Counter.count++;
  }

  static getCount() {
    return Counter.count;
  }
}

new Counter();
new Counter();
new Counter();

console.log(Counter.getCount()); // 3
console.log(Counter.count); // 3
```

### Computed Property

Use expressions as property names in classes.

```javascript
const methodName = 'sayHello';
const propName = 'fullName';

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  [methodName]() {
    return `Hello from ${this.firstName}`;
  }

  get [propName]() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const person = new Person('Alice', 'Smith');
console.log(person.sayHello()); // "Hello from Alice"
console.log(person.fullName); // "Alice Smith"
```

### Inheritance

Extend classes using `extends` and call parent methods with `super`.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }

  getInfo() {
    return `${super.speak()} and is a ${this.breed}`;
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak()); // "Buddy barks"
console.log(dog.getInfo()); // "Buddy makes a sound and is a Golden Retriever"
```

### new.target – Constructor Detection

`new.target` is a metaproperty that references the constructor called with `new`.

```javascript
class Person {
  constructor(name) {
    if (new.target === Person) {
      console.log('Person constructor called');
    }
    this.name = name;
  }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    if (new.target === Employee) {
      console.log('Employee constructor called');
    }
    this.role = role;
  }
}

const person = new Person('Alice');
// "Person constructor called"

const employee = new Employee('Bob', 'Developer');
// "Employee constructor called"

// Prevent direct instantiation
class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
}

// new Abstract(); // Error: Cannot instantiate abstract class
```

---

## Section 5: Arrow Functions

### Arrow Functions

Concise syntax for writing functions using `=>`.

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

console.log(add(5, 3)); // 8

// Single parameter (parentheses optional)
const square = x => x * x;
console.log(square(4)); // 16

// No parameters
const greet = () => 'Hello!';
console.log(greet()); // "Hello!"

// Multiple statements (need braces and return)
const calculate = (a, b) => {
  const sum = a + b;
  const product = a * b;
  return { sum, product };
};

console.log(calculate(3, 4)); // { sum: 7, product: 12 }

// Returning objects (wrap in parentheses)
const makePerson = (name, age) => ({ name, age });
console.log(makePerson('Alice', 25)); // { name: 'Alice', age: 25 }
```

### Arrow Functions: When You Should Not Use

Arrow functions don't have their own `this`, `arguments`, or `super` binding.

```javascript
// DON'T use as object methods (this binding issue)
const person = {
  name: 'Alice',
  greet: () => {
    console.log(`Hello, ${this.name}`); // 'this' is not person
  }
};
person.greet(); // "Hello, undefined"

// DO use regular function
const person2 = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
person2.greet(); // "Hello, Alice"

// DON'T use as constructors
const Person = (name) => {
  this.name = name;
};
// new Person('Alice'); // TypeError: Person is not a constructor

// DON'T use when you need arguments object
const logArgs = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};

// DO use rest parameters instead
const logArgs2 = (...args) => {
  console.log(args);
};
logArgs2(1, 2, 3); // [1, 2, 3]

// DON'T use for event handlers that need 'this'
// button.addEventListener('click', () => {
//   this.classList.toggle('active'); // 'this' is not the button
// });

// DO use regular function
// button.addEventListener('click', function() {
//   this.classList.toggle('active'); // 'this' is the button
// });
```

---

## Section 6: Symbol

### Symbol – Unique Identifiers

`Symbol` creates unique, immutable primitive values used as object property keys.

```javascript
// Create unique symbols
const sym1 = Symbol();
const sym2 = Symbol();
console.log(sym1 === sym2); // false

// Symbols with descriptions
const id = Symbol('id');
const userId = Symbol('id');
console.log(id === userId); // false (each is unique)
console.log(id.description); // "id"

// Use as object properties
const person = {
  name: 'Alice',
  [id]: 123
};

console.log(person[id]); // 123
console.log(person.id); // undefined (not the same as symbol)

// Symbols are hidden from normal iteration
console.log(Object.keys(person)); // ['name']
console.log(Object.getOwnPropertySymbols(person)); // [Symbol(id)]

// Well-known symbols
const myArray = [1, 2, 3];
console.log(myArray[Symbol.iterator]); // [Function: values]

// Create global symbols
const globalSym = Symbol.for('app.id');
const sameGlobalSym = Symbol.for('app.id');
console.log(globalSym === sameGlobalSym); // true

console.log(Symbol.keyFor(globalSym)); // "app.id"
```

---

## Section 7: Iterators & Generators

### Iterators

Objects that implement the iterator protocol with a `next()` method.

```javascript
// Manual iterator
const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Custom iterator
const range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    let current = this.from;
    let last = this.to;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

### Generators

Functions that can pause execution and resume later using `function*` and `yield`.

```javascript
// Basic generator
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generator with loop
function* countTo(max) {
  for (let i = 1; i <= max; i++) {
    yield i;
  }
}

for (const num of countTo(5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Infinite generator
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();
console.log(idGen.next().value); // 1
console.log(idGen.next().value); // 2
console.log(idGen.next().value); // 3
```

### yield – Pause and Resume

`yield` pauses generator execution and can pass values in and out.

```javascript
// Two-way communication
function* dialogue() {
  const name = yield 'What is your name?';
  const age = yield `Hello ${name}, how old are you?`;
  return `${name} is ${age} years old`;
}

const conv = dialogue();
console.log(conv.next().value); // "What is your name?"
console.log(conv.next('Alice').value); // "Hello Alice, how old are you?"
console.log(conv.next(25).value); // "Alice is 25 years old"

// yield* delegates to another generator
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1();
  yield 3;
  yield 4;
}

for (const num of gen2()) {
  console.log(num); // 1, 2, 3, 4
}

// Error handling
function* errorGenerator() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log('Caught:', e);
  }
  yield 3;
}

const errGen = errorGenerator();
console.log(errGen.next().value); // 1
console.log(errGen.throw('Error!').value); // "Caught: Error!", then 3
```

---

## Section 8: Promises

### Promises – Async Operations

Promises represent the eventual completion or failure of asynchronous operations.

```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('Operation successful!');
    } else {
      reject('Operation failed!');
    }
  }, 1000);
});

// Consuming a promise
myPromise
  .then(result => {
    console.log(result); // "Operation successful!"
  })
  .catch(error => {
    console.error(error);
  });

// Practical example: Fetch data
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'Alice' });
      } else {
        reject('Invalid user ID');
      }
    }, 1000);
  });
}

fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### Promise Chaining

Execute multiple asynchronous operations in sequence.

```javascript
function step1() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Step 1 complete'), 1000);
  });
}

function step2(previousResult) {
  return new Promise(resolve => {
    setTimeout(() => resolve(previousResult + ' -> Step 2 complete'), 1000);
  });
}

function step3(previousResult) {
  return new Promise(resolve => {
    setTimeout(() => resolve(previousResult + ' -> Step 3 complete'), 1000);
  });
}

step1()
  .then(result1 => {
    console.log(result1);
    return step2(result1);
  })
  .then(result2 => {
    console.log(result2);
    return step3(result2);
  })
  .then(result3 => {
    console.log(result3);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Cleaner chaining
step1()
  .then(step2)
  .then(step3)
  .then(finalResult => console.log(finalResult))
  .catch(error => console.error(error));
```

### Promise Composition: Promise.all() & Promise.race()

Combine multiple promises together.

```javascript
// Promise.all - wait for all promises to resolve
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve(42), 1000));
const promise3 = Promise.resolve('foo');

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, 42, 'foo']
  })
  .catch(error => {
    console.error('One promise failed:', error);
  });

// If any promise rejects, Promise.all rejects
const failingPromise = Promise.reject('Error!');
Promise.all([promise1, failingPromise])
  .then(values => console.log(values))
  .catch(error => console.error(error)); // "Error!"

// Promise.race - return first settled promise
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 1000));

Promise.race([slow, fast])
  .then(value => {
    console.log(value); // "fast"
  });

// Promise.allSettled - wait for all promises to settle (ES2020)
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]).then(results => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 3 }
  // ]
});

// Promise.any - return first fulfilled promise (ES2021)
Promise.any([
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.reject('error2')
]).then(value => {
  console.log(value); // "success"
});
```

### Promise Error Handling

Handle errors in promise chains.

```javascript
// Basic error handling
fetchUser(-1)
  .then(user => console.log(user))
  .catch(error => {
    console.error('Error:', error); // "Error: Invalid user ID"
  });

// Catch in the middle of chain
step1()
  .then(step2)
  .catch(error => {
    console.error('Error in step 1 or 2:', error);
    return 'Recovered'; // Continue chain with recovery value
  })
  .then(step3)
  .then(result => console.log(result));

// Finally - always executes
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error))
  .finally(() => {
    console.log('Cleanup complete');
  });

// Multiple catch blocks
Promise.reject('Initial error')
  .catch(error => {
    console.error('First catch:', error);
    throw 'New error';
  })
  .catch(error => {
    console.error('Second catch:', error);
  });

// Async/await error handling (modern approach)
async function getUserData() {
  try {
    const user = await fetchUser(1);
    console.log(user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Done');
  }
}
```

---

## Section 9: ES6 Collections

### Map – Key-Value Pairs

`Map` holds key-value pairs where keys can be any type.

```javascript
// Create a Map
const map = new Map();

// Set values
map.set('name', 'Alice');
map.set('age', 25);
map.set(1, 'number key');
map.set(true, 'boolean key');

// Get values
console.log(map.get('name')); // "Alice"
console.log(map.get(1)); // "number key"

// Check existence
console.log(map.has('age')); // true
console.log(map.has('email')); // false

// Size
console.log(map.size); // 4

// Delete
map.delete('age');
console.log(map.has('age')); // false

// Objects as keys
const obj1 = { id: 1 };
const obj2 = { id: 2 };
map.set(obj1, 'First object');
map.set(obj2, 'Second object');
console.log(map.get(obj1)); // "First object"

// Iterate over Map
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// Map methods
map.forEach((value, key) => {
  console.log(`${key} => ${value}`);
});

console.log([...map.keys()]); // All keys
console.log([...map.values()]); // All values
console.log([...map.entries()]); // All [key, value] pairs

// Initialize with array
const map2 = new Map([
  ['fruit', 'apple'],
  ['vegetable', 'carrot'],
  ['grain', 'rice']
]);

// Clear all entries
map.clear();
console.log(map.size); // 0
```

### Set – Unique Values

`Set` holds unique values of any type.

```javascript
// Create a Set
const set = new Set();

// Add values
set.add(1);
set.add(2);
set.add(3);
set.add(2); // Duplicate, won't be added
console.log(set.size); // 3

// Check existence
console.log(set.has(2)); // true
console.log(set.has(5)); // false

// Delete
set.delete(2);
console.log(set.has(2)); // false

// Initialize with array
const numbers = new Set([1, 2, 3, 4, 4, 5, 5]);
console.log(numbers); // Set { 1, 2, 3, 4, 5 }

// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]

// Iterate over Set
for (const value of set) {
  console.log(value);
}

set.forEach(value => {
  console.log(value);
});

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Union
const union = new Set([...setA, ...setB]);
console.log(union); // Set { 1, 2, 3, 4, 5 }

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set { 3 }

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set { 1, 2 }

// Clear all values
set.clear();
console.log(set.size); // 0
```

---

## Section 10: Array Extensions

### Array.of() – Create Arrays

Create arrays from a list of arguments.

```javascript
// Array.of vs Array constructor
console.log(Array.of(7)); // [7]
console.log(Array(7)); // [ <7 empty items> ]

console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array(1, 2, 3)); // [1, 2, 3]

// Useful for creating arrays with a single element
const singleElement = Array.of('hello');
console.log(singleElement); // ['hello']

// Works with any number of arguments
console.log(Array.of()); // []
console.log(Array.of(undefined)); // [undefined]
console.log(Array.of(1, 'two', true, null)); // [1, 'two', true, null]
```

### Array.from() – Convert to Arrays

Create arrays from array-like or iterable objects.

```javascript
// From string
const str = 'hello';
const chars = Array.from(str);
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// From Set
const set = new Set([1, 2, 3]);
const arr = Array.from(set);
console.log(arr); // [1, 2, 3]

// From Map
const map = new Map([['a', 1], ['b', 2]]);
const mapArr = Array.from(map);
console.log(mapArr); // [['a', 1], ['b', 2]]

// With mapping function
const numbers = Array.from([1, 2, 3], x => x * 2);
console.log(numbers); // [2, 4, 6]

// Create range
const range = Array.from({ length: 5 }, (v, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]

// From array-like object
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const realArray = Array.from(arrayLike);
console.log(realArray); // ['a', 'b', 'c']

// From NodeList (browser)
// const divs = document.querySelectorAll('div');
// const divArray = Array.from(divs);
```

### Array find() – Find Element

Find the first element that satisfies a condition.

```javascript
const numbers = [5, 12, 8, 130, 44];

// Find first even number
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 12

// Find first number > 100
const largeNum = numbers.find(num => num > 100);
console.log(largeNum); // 130

// Return undefined if not found
const negative = numbers.find(num => num < 0);
console.log(negative); // undefined

// With objects
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Bob', age: 30 }

// With index and array parameters
const result = numbers.find((value, index, arr) => {
  console.log(`Checking index ${index}`);
  return value > 50;
});
```

### Array findIndex() – Find Index

Find the index of the first element that satisfies a condition.

```javascript
const numbers = [5, 12, 8, 130, 44];

// Find index of first even number
const index = numbers.findIndex(num => num % 2 === 0);
console.log(index); // 1

// Find index of first number > 100
const largeIndex = numbers.findIndex(num => num > 100);
console.log(largeIndex); // 3

// Return -1 if not found
const notFound = numbers.findIndex(num => num < 0);
console.log(notFound); // -1

// With objects
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const bobIndex = users.findIndex(u => u.name === 'Bob');
console.log(bobIndex); // 1

// Update element using findIndex
const targetIndex = users.findIndex(u => u.id === 2);
if (targetIndex !== -1) {
  users[targetIndex].name = 'Robert';
}
console.log(users[1]); // { id: 2, name: 'Robert' }
```

---

## Section 11: Object Extensions

### Object.assign() – Copy/Merge Objects

Copy properties from source objects to a target object.

```javascript
// Copy object
const original = { name: 'Alice', age: 25 };
const copy = Object.assign({}, original);
console.log(copy); // { name: 'Alice', age: 25 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 3, c: 4 }

// Multiple sources
const defaults = { volume: 50, brightness: 80 };
const userSettings = { volume: 75 };
const settings = Object.assign({}, defaults, userSettings);
console.log(settings); // { volume: 75, brightness: 80 }

// Modify target object
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
console.log(target); // { a: 1, b: 2, c: 3 }

// Clone with nested objects (shallow copy)
const person = { name: 'Alice', address: { city: 'NYC' } };
const clone = Object.assign({}, person);
clone.address.city = 'LA'; // Modifies original!
console.log(person.address.city); // "LA"

// Modern alternative: spread operator
const copy2 = { ...original };
const merged2 = { ...obj1, ...obj2 };
```

### Object.is() – Compare Values

Determine if two values are the same value.

```javascript
// Similar to === but with differences
console.log(Object.is(25, 25)); // true
console.log(Object.is('foo', 'foo')); // true
console.log(Object.is(null, null)); // true

// Difference with ===: NaN
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

// Difference with ===: +0 and -0
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

// Objects (reference comparison)
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(Object.is(obj1, obj2)); // false (different references)
console.log(Object.is(obj1, obj3)); // true (same reference)

// Practical use cases
function safeCompare(a, b) {
  return Object.is(a, b);
}

console.log(safeCompare(0, -0)); // false
console.log(safeCompare(NaN, NaN)); // true
```

---

## Section 12: String Extensions

### String startsWith() – Check Start

Check if a string starts with another string.

```javascript
const str = 'Hello, World!';

console.log(str.startsWith('Hello')); // true
console.log(str.startsWith('World')); // false
console.log(str.startsWith('hello')); // false (case-sensitive)

// With position parameter
console.log(str.startsWith('World', 7)); // true (start checking from index 7)
console.log(str.startsWith('o', 4)); // true

// Practical examples
const url = 'https://example.com';
if (url.startsWith('https://')) {
  console.log('Secure connection');
}

const filename = 'document.pdf';
if (filename.startsWith('doc')) {
  console.log('Document file');
}
```

### String endsWith() – Check End

Check if a string ends with another string.

```javascript
const str = 'Hello, World!';

console.log(str.endsWith('World!')); // true
console.log(str.endsWith('Hello')); // false
console.log(str.endsWith('world!')); // false (case-sensitive)

// With length parameter
console.log(str.endsWith('Hello', 5)); // true (only consider first 5 characters)
console.log(str.endsWith(',', 6)); // true

// Practical examples
const filename = 'document.pdf';
if (filename.endsWith('.pdf')) {
  console.log('PDF file');
}

const email = 'user@example.com';
if (email.endsWith('@example.com')) {
  console.log('Example.com email');
}

// File extension check
function getExtension(filename) {
  const extensions = ['.jpg', '.png', '.gif'];
  return extensions.find(ext => filename.endsWith(ext));
}

console.log(getExtension('photo.jpg')); // ".jpg"
```

### String includes() – Check Substring

Check if a string contains another string.

```javascript
const str = 'Hello, World!';

console.log(str.includes('World')); // true
console.log(str.includes('world')); // false (case-sensitive)
console.log(str.includes('Hello')); // true
console.log(str.includes('xyz')); // false

// With position parameter
console.log(str.includes('World', 8)); // false (start searching from index 8)
console.log(str.includes('World', 7)); // true

// Practical examples
const message = 'Welcome to our website';
if (message.includes('Welcome')) {
  console.log('Greeting message');
}

// Search in array of strings
const keywords = ['JavaScript', 'Python', 'Java'];
const text = 'I love JavaScript programming';
const hasKeyword = keywords.some(keyword => text.includes(keyword));
console.log(hasKeyword); // true

// Case-insensitive search
function includesIgnoreCase(str, search) {
  return str.toLowerCase().includes(search.toLowerCase());
}

console.log(includesIgnoreCase('Hello World', 'WORLD')); // true
```

---

## Section 13: Proxy & Reflection

### Proxy – Intercept Operations

Wrap objects to intercept and customize fundamental operations.

```javascript
// Basic proxy with get trap
const target = { name: 'Alice', age: 25 };
const handler = {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.name); // "Getting name", then "Alice"

// Validation with set trap
const validator = {
  set(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new TypeError('Age must be a positive number');
      }
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = -5; // TypeError: Age must be a positive number
// person.age = 'twenty'; // TypeError: Age must be a positive number

// Default values with get trap
const withDefaults = new Proxy({}, {
  get(target, property) {
    return property in target ? target[property] : 'N/A';
  }
});

withDefaults.name = 'Bob';
console.log(withDefaults.name); // "Bob"
console.log(withDefaults.age); // "N/A"

// Array negative indexing
function createArray(arr) {
  return new Proxy(arr, {
    get(target, property) {
      const index = Number(property);
      if (index < 0) {
        return target[target.length + index];
      }
      return target[property];
    }
  });
}

const arr = createArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4

// Function proxy
const multiply = (a, b) => a * b;
const loggedMultiply = new Proxy(multiply, {
  apply(target, thisArg, args) {
    console.log(`Called with: ${args}`);
    return target(...args);
  }
});

console.log(loggedMultiply(3, 4)); // "Called with: 3,4", then 12

// Has trap (in operator)
const hiddenProps = new Proxy({}, {
  has(target, property) {
    if (property.startsWith('_')) {
      return false;
    }
    return property in target;
  }
});

hiddenProps._secret = 'hidden';
hiddenProps.public = 'visible';
console.log('_secret' in hiddenProps); // false
console.log('public' in hiddenProps); // true
```

### Reflection – Runtime Manipulation

Reflect API provides methods for interceptable JavaScript operations.

```javascript
// Reflect.get - get property value
const obj = { name: 'Alice', age: 25 };
console.log(Reflect.get(obj, 'name')); // "Alice"

// Reflect.set - set property value
Reflect.set(obj, 'age', 26);
console.log(obj.age); // 26

// Reflect.has - check if property exists (like 'in')
console.log(Reflect.has(obj, 'name')); // true
console.log(Reflect.has(obj, 'email')); // false

// Reflect.deleteProperty - delete property
Reflect.deleteProperty(obj, 'age');
console.log(obj); // { name: 'Alice' }

// Reflect.ownKeys - get all own property keys
const person = { name: 'Bob', age: 30 };
console.log(Reflect.ownKeys(person)); // ['name', 'age']

// Reflect.construct - create instance (like 'new')
class Person {
  constructor(name) {
    this.name = name;
  }
}

const alice = Reflect.construct(Person, ['Alice']);
console.log(alice.name); // "Alice"

// Reflect.apply - call function
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const result = Reflect.apply(greet, null, ['Hello', 'World']);
console.log(result); // "Hello, World!"

// Using Reflect with Proxy
const target2 = { value: 10 };
const handler2 = {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const proxy2 = new Proxy(target2, handler2);
proxy2.value = 20; // "Setting value to 20"
console.log(proxy2.value); // "Getting value", then 20

// Reflect.getPrototypeOf
const proto = { type: 'Animal' };
const dog = Object.create(proto);
console.log(Reflect.getPrototypeOf(dog) === proto); // true

// Reflect.setPrototypeOf
const newProto = { type: 'Mammal' };
Reflect.setPrototypeOf(dog, newProto);
console.log(dog.type); // "Mammal"

// Reflect.defineProperty
Reflect.defineProperty(obj, 'id', {
  value: 123,
  writable: false,
  enumerable: true
});
console.log(obj.id); // 123
// obj.id = 456; // Silently fails (or throws in strict mode)

// Reflect.getOwnPropertyDescriptor
const descriptor = Reflect.getOwnPropertyDescriptor(obj, 'id');
console.log(descriptor);
// { value: 123, writable: false, enumerable: true, configurable: false }
```

---

## Summary

This guide covers the major ES6 features that transformed JavaScript development:

- **Modern Syntax**: `let`, `const`, arrow functions, template literals, and destructuring make code more concise and readable
- **Modules**: Enable better code organization and reusability
- **Classes**: Provide cleaner syntax for object-oriented programming
- **Async Patterns**: Promises and generators simplify asynchronous code
- **New Data Structures**: Map and Set offer alternatives to objects and arrays
- **Enhanced Built-ins**: Extensions to Array, Object, and String provide powerful utilities
- **Advanced Features**: Symbols, Proxy, and Reflect enable meta-programming

These features are now standard in modern JavaScript and are widely supported across browsers and Node.js environments.

---

## Additional Resources

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ECMAScript 6 Specification](https://www.ecma-international.org/ecma-262/6.0/)
- [JavaScript.info](https://javascript.info/)
- [Exploring ES6 by Dr. Axel Rauschmayer](https://exploringjs.com/es6/)