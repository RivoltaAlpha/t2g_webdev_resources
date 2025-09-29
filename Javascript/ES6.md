# ES6 (ECMAScript 2015) Complete Tutorial

This comprehensive guide covers all essential ES6 features with practical examples and explanations. Before diving into ES6, ensure you have a solid understanding of JavaScript up to ES5.

---

## Summary and Best Practices

### ES6 Adoption Guidelines

**When to Use Each Feature:**

1. **Variables**: Use `const` by default, `let` when reassignment is needed, avoid `var`
2. **Functions**: Use arrow functions for short callbacks, regular functions for methods and constructors
3. **Objects**: Use object shorthand, destructuring, and spread operator for cleaner code
4. **Arrays**: Leverage new methods like `find()`, `includes()`, and array destructuring
5. **Async Code**: Prefer Promises over callbacks, consider async/await for complex chains
6. **Modules**: Always use ES6 modules for better organization and tree-shaking

### Common Pitfalls to Avoid

```javascript
// ❌ Don't: Using arrow functions as object methods
const obj = {
    name: 'Test',
    greet: () => console.log(this.name) // `this` is undefined
};

// ✅ Do: Use regular function methods
const obj2 = {
    name: 'Test',
    greet() { console.log(this.name); }
};

// ❌ Don't: Destructuring with conflicting names
// const { name, name } = obj; // SyntaxError

// ✅ Do: Use aliases for conflicting names
const { name: firstName, name: lastName } = { name: 'John', name: 'Doe' };

// ❌ Don't: Forgetting that const objects are mutable
const config = { debug: true };
config.debug = false; // This works!

// ✅ Do: Use Object.freeze() for immutable objects
const config2 = Object.freeze({ debug: true });
// config2.debug = false; // This will fail in strict mode

// ❌ Don't: Using for...in with arrays
const arr = [1, 2, 3];
for (const index in arr) {
    console.log(typeof index); // "string", not number!
}

// ✅ Do: Use for...of with arrays
for (const value of arr) {
    console.log(typeof value); // "number"
}
```

### Performance Considerations

```javascript
// Spread operator vs traditional methods
const largeArray = new Array(1000000).fill(0);

// ❌ Slower for large arrays
const copy1 = [...largeArray];

// ✅ Faster for large arrays
const copy2 = largeArray.slice();

// Map vs Object for key-value pairs
// ✅ Use Map for frequent additions/deletions
const frequentlyChanging = new Map();

// ✅ Use Object for records with known string keys
const config = { theme: 'dark', lang: 'en' };

// Set vs Array for unique values
// ✅ Use Set for uniqueness and fast lookups
const uniqueIds = new Set();

// ✅ Use Array for ordered collections
const orderedList = [];
```

### Modern JavaScript Workflow

```javascript
// Combining ES6 features effectively
class DataProcessor {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.cache = new Map();
    }

    async fetchData(endpoint, params = {}) {
        const url = `${this.apiUrl}/${endpoint}`;
        const cacheKey = `${url}-${JSON.stringify(params)}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.cache.set(cacheKey, data);
            return data;
            
        } catch (error) {
            console.error('Fetch failed:', error);
            throw error;
        }
    }

    async processUsers(userIds) {
        const promises = userIds.map(id => this.fetchData('users', { id }));
        const results = await Promise.allSettled(promises);
        
        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value)
            .filter(user => user && user.active);
    }

    // Using generator for pagination
    async* paginateData(endpoint, pageSize = 10) {
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const data = await this.fetchData(endpoint, { page, pageSize });
            
            if (data.items && data.items.length > 0) {
                yield* data.items;
                page++;
                hasMore = data.items.length === pageSize;
            } else {
                hasMore = false;
            }
        }
    }
}

// Usage example
const processor = new DataProcessor('https://api.example.com');

// Process users with error handling
processor.processUsers([1, 2, 3, 4, 5])
    .then(users => {
        const { activeUsers, inactiveUsers } = users.reduce(
            (acc, user) => {
                const key = user.active ? 'activeUsers' : 'inactiveUsers';
                acc[key].push(user);
                return acc;
            },
            { activeUsers: [], inactiveUsers: [] }
        );
        
        console.log(`Found ${activeUsers.length} active users`);
    })
    .catch(error => console.error('Processing failed:', error));

// Async iteration example
async function loadAllData() {
    const allData = [];
    
    for await (const item of processor.paginateData('products')) {
        allData.push(item);
        
        // Process in batches to avoid memory issues
        if (allData.length >= 100) {
            console.log(`Processed ${allData.length} items so far...`);
        }
    }
    
    return allData;
}
```

### Browser Support and Transpilation

Most ES6 features are well-supported in modern browsers, but for older browser support:

```javascript
// Use Babel for transpilation
// .babelrc example:
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "ie >= 11"]
      }
    }]
  ]
}

// Polyfills for missing features
// Include in your HTML or bundle:
// <script src="https://polyfill.io/v3/polyfill.min.js"></script>

// Feature detection
if (typeof Symbol !== 'undefined') {
    // Use Symbol features
} else {
    // Fallback for older browsers
}

// Progressive enhancement
const supportsES6 = (() => {
    try {
        new Function('(a = 0) => a');
        return true;
    } catch (e) {
        return false;
    }
})();

if (supportsES6) {
    // Use ES6 features
} else {
    // Load ES5 fallback
}
```

### Testing ES6 Code

```javascript
// Example using Jest
describe('ES6 Features', () => {
    test('arrow functions preserve this context', () => {
        const obj = {
            name: 'Test',
            getName: function() {
                const arrow = () => this.name;
                return arrow();
            }
        };
        
        expect(obj.getName()).toBe('Test');
    });

    test('destructuring works correctly', () => {
        const [a, b, ...rest] = [1, 2, 3, 4, 5];
        
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(rest).toEqual([3, 4, 5]);
    });

    test('async/await handles promises', async () => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        
        const start = Date.now();
        await delay(100);
        const elapsed = Date.now() - start;
        
        expect(elapsed).toBeGreaterThanOrEqual(100);
    });
});
```

---

## Conclusion

ES6 introduced powerful features that make JavaScript more expressive, readable, and maintainable. Key takeaways:

1. **Modern Syntax**: Use `let`/`const`, arrow functions, and template literals for cleaner code
2. **Better Data Structures**: Leverage Maps, Sets, and enhanced arrays for better performance
3. **Async Programming**: Master Promises and async patterns for handling asynchronous operations
4. **Code Organization**: Use modules and classes to structure large applications
5. **Functional Programming**: Embrace destructuring, spread operator, and array methods

Practice these concepts regularly and gradually incorporate them into your projects. The combination of these features enables you to write more robust and maintainable JavaScript applications.

### Further Learning

- **Next Steps**: Learn ES2017+ features (async/await, Object.entries, etc.)
- **Tools**: Explore Babel, ESLint, and modern build tools
- **Frameworks**: Apply ES6 knowledge in React, Vue, or other frameworks
- **Best Practices**: Study style guides (Airbnb, Google) for consistent ES6 usage

Happy coding with ES6! 🚀 Section 1: New ES6 Syntax

### `let` - Block-Scoped Variables

The `let` keyword allows you to declare variables that are limited to the scope of a block statement.

```javascript
// Block scope example
if (true) {
    let blockScoped = "I'm block scoped";
    console.log(blockScoped); // "I'm block scoped"
}
// console.log(blockScoped); // ReferenceError: blockScoped is not defined

// Loop example
for (let i = 0; i < 3; i++) {
    console.log(i); // 0, 1, 2
}
// console.log(i); // ReferenceError: i is not defined
```

### `let` vs `var` - Key Differences

Understanding the differences between `let` and `var` is crucial for modern JavaScript development.

```javascript
// 1. Scope difference
function scopeExample() {
    if (true) {
        var varVariable = "var is function scoped";
        let letVariable = "let is block scoped";
    }
    console.log(varVariable); // "var is function scoped" - accessible
    // console.log(letVariable); // ReferenceError - not accessible
}

// 2. Hoisting difference
console.log(varHoisted); // undefined (hoisted but not initialized)
// console.log(letHoisted); // ReferenceError (temporal dead zone)

var varHoisted = "var";
let letHoisted = "let";

// 3. Re-declaration
var name = "John";
var name = "Jane"; // No error

let age = 25;
// let age = 30; // SyntaxError: Identifier 'age' has already been declared
```

### `const` - Constants

The `const` keyword creates constants that cannot be reassigned after declaration.

```javascript
// Basic const usage
const PI = 3.14159;
console.log(PI); // 3.14159

// PI = 3.14; // TypeError: Assignment to constant variable

// const with objects (contents can be modified)
const person = {
    name: "Alice",
    age: 30
};

person.age = 31; // This is allowed
person.city = "New York"; // This is allowed
console.log(person); // { name: "Alice", age: 31, city: "New York" }

// person = {}; // TypeError: Assignment to constant variable

// const with arrays
const colors = ["red", "green", "blue"];
colors.push("yellow"); // This is allowed
console.log(colors); // ["red", "green", "blue", "yellow"]

// colors = []; // TypeError: Assignment to constant variable
```

### Default Function Parameters

Set default values for function parameters when no argument is provided.

```javascript
// Basic default parameters
function greet(name = "World", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

console.log(greet()); // "Hello, World!"
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"

// Default parameters with expressions
function createUser(name, role = "user", id = Math.random()) {
    return { name, role, id };
}

console.log(createUser("John")); // { name: "John", role: "user", id: 0.123... }

// Using previous parameters in defaults
function multiply(a, b = a * 2) {
    return a * b;
}

console.log(multiply(5)); // 50 (5 * 10)
console.log(multiply(5, 3)); // 15 (5 * 3)
```

### Rest Parameter

The rest parameter allows you to represent an indefinite number of arguments as an array.

```javascript
// Basic rest parameter
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(10, 20)); // 30

// Rest parameter with other parameters
function introduce(firstName, lastName, ...hobbies) {
    console.log(`Hi, I'm ${firstName} ${lastName}`);
    console.log(`My hobbies are: ${hobbies.join(", ")}`);
}

introduce("John", "Doe", "reading", "swimming", "coding");
// Hi, I'm John Doe
// My hobbies are: reading, swimming, coding

// Rest parameter in arrow functions
const multiply = (...args) => args.reduce((acc, val) => acc * val, 1);
console.log(multiply(2, 3, 4)); // 24
```

### Spread Operator

The spread operator expands iterables into individual elements.

```javascript
// Spreading arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Spreading in function calls
function add(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6

// Spreading objects
const person = { name: "John", age: 30 };
const employee = { ...person, job: "Developer", age: 31 };
console.log(employee); // { name: "John", age: 31, job: "Developer" }

// Copying arrays
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (unchanged)
console.log(copy); // [1, 2, 3, 4]
```

### Object Literal Syntax Extensions

ES6 provides shorthand syntax for object properties and methods.

```javascript
const name = "Alice";
const age = 30;

// Property shorthand
const person = { name, age }; // Same as { name: name, age: age }
console.log(person); // { name: "Alice", age: 30 }

// Method shorthand
const calculator = {
    add(a, b) { // Same as add: function(a, b)
        return a + b;
    },
    multiply(a, b) {
        return a * b;
    }
};

console.log(calculator.add(5, 3)); // 8

// Computed property names
const prop = "dynamicKey";
const obj = {
    [prop]: "value",
    [`${prop}2`]: "another value"
};
console.log(obj); // { dynamicKey: "value", dynamicKey2: "another value" }
```

### `for...of` Loop

Iterate over iterable objects like arrays, strings, maps, and sets.

```javascript
// Iterating over arrays
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}
// apple
// banana
// orange

// Iterating over strings
for (const char of "Hello") {
    console.log(char);
}
// H e l l o

// Getting index with entries()
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
// 0: apple
// 1: banana
// 2: orange

// Iterating over Maps
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}
// a: 1
// b: 2
```

### Octal and Binary Literals

ES6 provides new syntax for representing binary and octal numbers.

```javascript
// Binary literals (0b prefix)
const binary = 0b1010; // 10 in decimal
console.log(binary); // 10

// Octal literals (0o prefix)
const octal = 0o755; // 493 in decimal
console.log(octal); // 493

// Converting to different bases
const num = 255;
console.log(num.toString(2)); // "11111111" (binary)
console.log(num.toString(8)); // "377" (octal)
console.log(num.toString(16)); // "ff" (hexadecimal)
```

### Template Literals

Template literals provide an easy way to create multiline strings and embed expressions.

```javascript
// Basic template literal
const name = "World";
const greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, World!"

// Multiline strings
const multiline = `
    This is a
    multiline
    string
`;
console.log(multiline);

// Expression evaluation
const a = 5;
const b = 10;
console.log(`${a} + ${b} = ${a + b}`); // "5 + 10 = 15"

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

const user = "Alice";
const score = 95;
const message = highlight`User ${user} scored ${score} points!`;
console.log(message); // "User <strong>Alice</strong> scored <strong>95</strong> points!"
```

---

## Section 2: Destructuring

### Array Destructuring

Extract values from arrays and assign them to variables.

```javascript
// Basic array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first); // "red"
console.log(second); // "green"
console.log(third); // "blue"

// Skipping elements
const [primary, , tertiary] = colors;
console.log(primary); // "red"
console.log(tertiary); // "blue"

// Default values
const [a, b, c, d = "yellow"] = colors;
console.log(d); // "yellow"

// Rest in destructuring
const numbers = [1, 2, 3, 4, 5];
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Swapping variables
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// Nested array destructuring
const nested = [[1, 2], [3, 4]];
const [[a1, a2], [b1, b2]] = nested;
console.log(a1, a2, b1, b2); // 1, 2, 3, 4
```

### Object Destructuring

Extract properties from objects and assign them to variables.

```javascript
// Basic object destructuring
const person = { name: "Alice", age: 30, city: "New York" };
const { name, age, city } = person;
console.log(name); // "Alice"
console.log(age); // 30

// Renaming variables
const { name: personName, age: personAge } = person;
console.log(personName); // "Alice"
console.log(personAge); // 30

// Default values
const { name: n, job = "Unemployed" } = person;
console.log(n); // "Alice"
console.log(job); // "Unemployed"

// Nested object destructuring
const user = {
    id: 1,
    profile: {
        firstName: "John",
        lastName: "Doe",
        social: {
            twitter: "@johndoe"
        }
    }
};

const {
    profile: {
        firstName,
        lastName,
        social: { twitter }
    }
} = user;

console.log(firstName); // "John"
console.log(lastName); // "Doe"
console.log(twitter); // "@johndoe"

// Function parameter destructuring
function displayUser({ name, age, email = "N/A" }) {
    console.log(`Name: ${name}, Age: ${age}, Email: ${email}`);
}

displayUser({ name: "Bob", age: 25 }); // Name: Bob, Age: 25, Email: N/A
```

---

## Section 3: ES6 Modules

### ES6 Modules

ES6 modules provide a standardized way to organize and share code between files.

**math.js (exporting module)**
```javascript
// Named exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Alternative export syntax
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

export { subtract, divide };

// Default export
export default class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(num) {
        this.result += num;
        return this;
    }
    
    getResult() {
        return this.result;
    }
}
```

**main.js (importing module)**
```javascript
// Named imports
import { add, multiply, PI } from './math.js';
console.log(add(5, 3)); // 8
console.log(PI); // 3.14159

// Importing with aliases
import { subtract as minus, divide as div } from './math.js';
console.log(minus(10, 4)); // 6

// Import all named exports
import * as Math from './math.js';
console.log(Math.add(2, 3)); // 5

// Default import
import Calculator from './math.js';
const calc = new Calculator();
console.log(calc.add(10).add(5).getResult()); // 15

// Mixed imports
import Calculator, { PI, add } from './math.js';
```

---

## Section 4: ES6 Classes

### Class Declaration

ES6 classes provide a cleaner syntax for creating constructor functions and prototypes.

```javascript
// Basic class declaration
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
    }
    
    haveBirthday() {
        this.age++;
        return `Happy birthday! Now I'm ${this.age}`;
    }
}

const person1 = new Person("Alice", 30);
console.log(person1.introduce()); // "Hi, I'm Alice and I'm 30 years old"
console.log(person1.haveBirthday()); // "Happy birthday! Now I'm 31"
```

### Getters and Setters

Define accessor properties using `get` and `set` keywords.

```javascript
class Circle {
    constructor(radius) {
        this._radius = radius;
    }
    
    // Getter
    get radius() {
        return this._radius;
    }
    
    // Setter
    set radius(value) {
        if (value <= 0) {
            throw new Error("Radius must be positive");
        }
        this._radius = value;
    }
    
    get area() {
        return Math.PI * this._radius ** 2;
    }
    
    get circumference() {
        return 2 * Math.PI * this._radius;
    }
}

const circle = new Circle(5);
console.log(circle.radius); // 5
console.log(circle.area); // 78.53981633974483

circle.radius = 10;
console.log(circle.area); // 314.1592653589793

// circle.radius = -5; // Error: Radius must be positive
```

### Class Expression

Define classes using class expressions.

```javascript
// Named class expression
const Rectangle = class Shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
};

// Anonymous class expression
const Square = class {
    constructor(side) {
        this.side = side;
    }
    
    getArea() {
        return this.side ** 2;
    }
};

const rect = new Rectangle(5, 10);
console.log(rect.getArea()); // 50

const square = new Square(4);
console.log(square.getArea()); // 16
```

### Static Methods

Define methods that belong to the class itself, not its instances.

```javascript
class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
}

// Call static methods on the class
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.factorial(5)); // 120

// Cannot call on instances
const utils = new MathUtils();
// console.log(utils.add(2, 3)); // TypeError: utils.add is not a function
```

### Static Properties

Define properties shared by all instances of a class.

```javascript
class Counter {
    static count = 0;
    static instances = [];
    
    constructor(name) {
        this.name = name;
        Counter.count++;
        Counter.instances.push(this);
    }
    
    static getCount() {
        return Counter.count;
    }
    
    static getAllInstances() {
        return Counter.instances;
    }
}

const counter1 = new Counter("First");
const counter2 = new Counter("Second");

console.log(Counter.getCount()); // 2
console.log(Counter.getAllInstances().length); // 2
```

### Computed Properties

Use expressions as property names in class definitions.

```javascript
const methodName = "greet";
const propName = "name";

class DynamicClass {
    constructor(name) {
        this[propName] = name;
    }
    
    [methodName]() {
        return `Hello, ${this[propName]}!`;
    }
    
    [`${methodName}Loudly`]() {
        return this[methodName]().toUpperCase();
    }
}

const obj = new DynamicClass("Alice");
console.log(obj.greet()); // "Hello, Alice!"
console.log(obj.greetLoudly()); // "HELLO, ALICE!"
```

### Inheritance

Extend classes using `extends` and `super` keywords.

```javascript
// Base class
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    makeSound() {
        return "Some generic animal sound";
    }
    
    introduce() {
        return `I'm ${this.name}, a ${this.species}`;
    }
}

// Derived class
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "dog"); // Call parent constructor
        this.breed = breed;
    }
    
    makeSound() {
        return "Woof!";
    }
    
    introduce() {
        return `${super.introduce()} of breed ${this.breed}`;
    }
    
    wagTail() {
        return `${this.name} is wagging tail happily!`;
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.introduce()); // "I'm Buddy, a dog of breed Golden Retriever"
console.log(dog.makeSound()); // "Woof!"
console.log(dog.wagTail()); // "Buddy is wagging tail happily!"
```

### `new.target` Metaproperty

The `new.target` metaproperty detects whether a function was called with `new`.

```javascript
class MyClass {
    constructor() {
        console.log(new.target); // Points to the constructor being called
        console.log(new.target.name); // Class name
    }
}

class ExtendedClass extends MyClass {
    constructor() {
        super();
    }
}

new MyClass(); // Logs: [class MyClass] and "MyClass"
new ExtendedClass(); // Logs: [class ExtendedClass] and "ExtendedClass"

// Abstract class pattern using new.target
class AbstractClass {
    constructor() {
        if (new.target === AbstractClass) {
            throw new Error("Cannot instantiate abstract class");
        }
    }
}

class ConcreteClass extends AbstractClass {
    constructor() {
        super();
    }
}

// new AbstractClass(); // Error: Cannot instantiate abstract class
const concrete = new ConcreteClass(); // Works fine
```

---

## Section 5: Arrow Functions

### Arrow Functions Syntax

Arrow functions provide a shorter syntax for writing functions.

```javascript
// Traditional function
const add1 = function(a, b) {
    return a + b;
};

// Arrow function
const add2 = (a, b) => a + b;

// Arrow function with single parameter (parentheses optional)
const square = x => x * x;

// Arrow function with no parameters
const greet = () => "Hello, World!";

// Arrow function with multiple statements
const processData = (data) => {
    const processed = data.map(x => x * 2);
    return processed.filter(x => x > 10);
};

console.log(add2(3, 4)); // 7
console.log(square(5)); // 25
console.log(greet()); // "Hello, World!"
console.log(processData([2, 5, 8, 12])); // [16, 24]

// Arrow functions in array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens); // [2, 4]
console.log(sum); // 15
```

### When NOT to Use Arrow Functions

Arrow functions don't have their own `this` context and other limitations.

```javascript
// 1. Object methods (this binding issue)
const person = {
    name: "Alice",
    // DON'T: Arrow function
    greetArrow: () => {
        console.log(`Hello, I'm ${this.name}`); // undefined (this is not person)
    },
    // DO: Regular function
    greetRegular() {
        console.log(`Hello, I'm ${this.name}`); // "Hello, I'm Alice"
    }
};

person.greetArrow(); // "Hello, I'm undefined"
person.greetRegular(); // "Hello, I'm Alice"

// 2. Event handlers (when you need this to be the element)
// DON'T:
// button.addEventListener('click', () => {
//     this.style.backgroundColor = 'red'; // this is not the button
// });

// DO:
// button.addEventListener('click', function() {
//     this.style.backgroundColor = 'red'; // this is the button
// });

// 3. Constructors (arrow functions can't be constructors)
// DON'T:
// const Person = (name) => {
//     this.name = name; // TypeError: cannot set property of undefined
// };

// DO:
function Person(name) {
    this.name = name;
}

// 4. Functions that need arguments object
// DON'T:
// const showArgs = () => {
//     console.log(arguments); // ReferenceError: arguments is not defined
// };

// DO:
function showArgs() {
    console.log(arguments);
}

// Alternative with rest parameters:
const showArgsArrow = (...args) => {
    console.log(args);
};
```

---

## Section 6: Symbol

### Symbol Primitive Type

Symbols are unique identifiers that can be used as object property keys.

```javascript
// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol("description");
const sym3 = Symbol("description");

console.log(sym1); // Symbol()
console.log(sym2); // Symbol(description)
console.log(sym2 === sym3); // false (each symbol is unique)

// Using symbols as object properties
const id = Symbol("id");
const user = {
    name: "John",
    [id]: 12345
};

console.log(user[id]); // 12345
console.log(user.name); // "John"

// Symbols are not enumerable
console.log(Object.keys(user)); // ["name"]
for (let key in user) {
    console.log(key); // Only prints "name"
}

// Global symbol registry
const globalSym1 = Symbol.for("global");
const globalSym2 = Symbol.for("global");
console.log(globalSym1 === globalSym2); // true

console.log(Symbol.keyFor(globalSym1)); // "global"

// Well-known symbols
const myArray = [1, 2, 3];
myArray[Symbol.iterator] = function* () {
    for (let i = this.length - 1; i >= 0; i--) {
        yield this[i];
    }
};

console.log([...myArray]); // [3, 2, 1] (reversed iteration)
```

---

## Section 7: Iterators & Generators

### Iterators

Iterators provide a standard way to traverse through data structures.

```javascript
// Creating a custom iterator
function createRangeIterator(start, end) {
    let current = start;
    
    return {
        next() {
            if (current < end) {
                return { value: current++, done: false };
            } else {
                return { done: true };
            }
        }
    };
}

const iterator = createRangeIterator(1, 4);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }

// Making an object iterable
const range = {
    start: 1,
    end: 5,
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        
        return {
            next() {
                if (current < end) {
                    return { value: current++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

// Now we can use for...of
for (const num of range) {
    console.log(num); // 1, 2, 3, 4
}

console.log([...range]); // [1, 2, 3, 4]
```

### Generators

Generators are functions that can pause and resume execution.

```javascript
// Basic generator function
function* simpleGenerator() {
    console.log("First yield");
    yield 1;
    console.log("Second yield");
    yield 2;
    console.log("Third yield");
    yield 3;
    console.log("Generator finished");
}

const gen = simpleGenerator();
console.log(gen.next()); // "First yield", { value: 1, done: false }
console.log(gen.next()); // "Second yield", { value: 2, done: false }
console.log(gen.next()); // "Third yield", { value: 3, done: false }
console.log(gen.next()); // "Generator finished", { value: undefined, done: true }

// Generator with infinite sequence
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3

// Generator for array-like iteration
function* arrayGenerator(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

const fruits = ["apple", "banana", "cherry"];
const fruitGen = arrayGenerator(fruits);

for (const fruit of fruitGen) {
    console.log(fruit); // apple, banana, cherry
}
```

### `yield` Keyword

The `yield` keyword pauses generator execution and returns a value.

```javascript
// yield with values
function* numberGenerator() {
    yield 10;
    yield 20;
    yield 30;
    return 40; // This becomes the final value when done: true
}

const numGen = numberGenerator();
console.log(numGen.next()); // { value: 10, done: false }
console.log(numGen.next()); // { value: 20, done: false }
console.log(numGen.next()); // { value: 30, done: false }
console.log(numGen.next()); // { value: 40, done: true }

// yield with input (two-way communication)
function* twoWayGenerator() {
    const input1 = yield "First yield";
    console.log("Received:", input1);
    
    const input2 = yield "Second yield";
    console.log("Received:", input2);
    
    return "Done";
}

const twoWayGen = twoWayGenerator();
console.log(twoWayGen.next()); // { value: "First yield", done: false }
console.log(twoWayGen.next("Hello")); // Logs "Received: Hello", returns { value: "Second yield", done: false }
console.log(twoWayGen.next("World")); // Logs "Received: World", returns { value: "Done", done: true }

// yield* for delegating to another generator
function* innerGenerator() {
    yield 1;
    yield 2;
}

function* outerGenerator() {
    yield 0;
    yield* innerGenerator();
    yield 3;
}

console.log([...outerGenerator()]); // [0, 1, 2, 3]
```

---

## Section 8: Promises

### JavaScript Promises

Promises represent the eventual completion or failure of an asynchronous operation.

```javascript
// Creating a Promise
const simplePromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
        if (success) {
            resolve("Operation successful!");
        } else {
            reject("Operation failed!");
        }
    }, 1000);
});

// Consuming a Promise
simplePromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Operation completed");
    });

// Promise utility functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUserData(id) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 500);
    });
}

// Using the utility functions
delay(1000)
    .then(() => console.log("Delay completed"))
    .then(() => fetchUserData(123))
    .then(user => console.log("User data:", user))
    .catch(error => console.log("Error:", error.message));
```

### Promise Chaining

Execute multiple asynchronous operations in sequence.

```javascript
// Sequential promise chaining
function step1() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Step 1 completed"), 1000);
    });
}

function step2(previousResult) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`${previousResult} -> Step 2 completed`), 1000);
    });
}

function step3(previousResult) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`${previousResult} -> Step 3 completed`), 1000);
    });
}

// Chain the promises
step1()
    .then(result1 => {
        console.log(result1);
        return step2(result1);
    })
    .then(result2 => {
        console.log(result2);
        return step3(result2);
    })
    .then(finalResult => {
        console.log(finalResult);
        // Output: "Step 1 completed -> Step 2 completed -> Step 3 completed"
    })
    .catch(error => {
        console.error("Error in chain:", error);
    });

// Simplified chaining
step1()
    .then(step2)
    .then(step3)
    .then(result => console.log("Final:", result));

// Promise chaining with data transformation
function fetchUser(id) {
    return Promise.resolve({ id, name: `User ${id}` });
}

function fetchUserPosts(user) {
    return Promise.resolve({
        ...user,
        posts: [`Post 1 by ${user.name}`, `Post 2 by ${user.name}`]
    });
}

function formatUserData(userData) {
    return Promise.resolve(`${userData.name} has ${userData.posts.length} posts`);
}

fetchUser(1)
    .then(fetchUserPosts)
    .then(formatUserData)
    .then(result => console.log(result)); // "User 1 has 2 posts"
```

### Promise Composition: `Promise.all()` & `Promise.race()`

Combine multiple promises in different ways.

```javascript
// Promise.all() - waits for all promises to resolve
const promise1 = delay(1000).then(() => "First");
const promise2 = delay(2000).then(() => "Second");
const promise3 = delay(1500).then(() => "Third");

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All resolved:", results); // ["First", "Second", "Third"]
    })
    .catch(error => {
        console.log("One failed:", error);
    });

// Promise.all() with mixed data types
const mixedPromises = [
    42, // Non-promise value
    Promise.resolve("Hello"),
    delay(1000).then(() => "World")
];

Promise.all(mixedPromises)
    .then(results => console.log(results)); // [42, "Hello", "World"]

// Promise.race() - resolves with the first settled promise
const slow = delay(2000).then(() => "Slow");
const fast = delay(1000).then(() => "Fast");

Promise.race([slow, fast])
    .then(result => console.log("Winner:", result)); // "Winner: Fast"

// Promise.allSettled() - waits for all to settle (resolve or reject)
const promises = [
    Promise.resolve("Success 1"),
    Promise.reject("Error 1"),
    Promise.resolve("Success 2")
];

Promise.allSettled(promises)
    .then(results => {
        console.log(results);
        // [
        //   { status: "fulfilled", value: "Success 1" },
        //   { status: "rejected", reason: "Error 1" },
        //   { status: "fulfilled", value: "Success 2" }
        // ]
    });

// Promise.any() - resolves with the first fulfilled promise
Promise.any([
    Promise.reject("Error 1"),
    delay(2000).then(() => "Success 1"),
    delay(1000).then(() => "Success 2")
])
    .then(result => console.log("First success:", result)); // "First success: Success 2"
```

### Promise Error Handling

Handle errors effectively in promise chains.

```javascript
// Basic error handling
function riskyOperation() {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        setTimeout(() => {
            if (random > 0.5) {
                resolve(`Success with ${random}`);
            } else {
                reject(new Error(`Failed with ${random}`));
            }
        }, 1000);
    });
}

riskyOperation()
    .then(result => {
        console.log("Operation succeeded:", result);
        return "Next step";
    })
    .then(result => {
        console.log("Continuing with:", result);
    })
    .catch(error => {
        console.log("Error caught:", error.message);
    })
    .finally(() => {
        console.log("Cleanup operations");
    });

// Error recovery in chains
function attemptOperation() {
    return riskyOperation()
        .catch(error => {
            console.log("First attempt failed, trying again...");
            return riskyOperation(); // Retry
        })
        .catch(error => {
            console.log("Second attempt failed, using fallback");
            return "Fallback value";
        });
}

attemptOperation()
    .then(result => console.log("Final result:", result));

// Throwing errors in then()
Promise.resolve("Start")
    .then(result => {
        if (result === "Start") {
            throw new Error("Something went wrong");
        }
        return result;
    })
    .then(result => {
        console.log("This won't execute");
    })
    .catch(error => {
        console.log("Caught thrown error:", error.message);
    });

// Multiple catch blocks
Promise.reject("Initial error")
    .catch(error => {
        console.log("First catch:", error);
        throw new Error("New error from first catch");
    })
    .catch(error => {
        console.log("Second catch:", error.message);
        return "Recovered";
    })
    .then(result => {
        console.log("Finally:", result); // "Finally: Recovered"
    });
```

---

## Section 9: ES6 Collections

### Map

Map holds key-value pairs and remembers the original insertion order of keys.

```javascript
// Creating and using Maps
const map = new Map();

// Setting values
map.set('name', 'Alice');
map.set('age', 30);
map.set(1, 'number key');
map.set(true, 'boolean key');

// Getting values
console.log(map.get('name')); // 'Alice'
console.log(map.get(1)); // 'number key'
console.log(map.get('nonexistent')); // undefined

// Map properties and methods
console.log(map.size); // 4
console.log(map.has('age')); // true
console.log(map.delete('age')); // true
console.log(map.has('age')); // false

// Initializing Map with array of arrays
const map2 = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    [3, 'value3']
]);

// Iterating over Maps
for (const [key, value] of map2) {
    console.log(`${key}: ${value}`);
}

// Using objects as keys
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objectMap = new Map();

objectMap.set(obj1, 'First object');
objectMap.set(obj2, 'Second object');

console.log(objectMap.get(obj1)); // 'First object'

// Map methods for iteration
const fruits = new Map([
    ['apple', 5],
    ['banana', 3],
    ['orange', 8]
]);

// keys(), values(), entries()
console.log([...fruits.keys()]); // ['apple', 'banana', 'orange']
console.log([...fruits.values()]); // [5, 3, 8]
console.log([...fruits.entries()]); // [['apple', 5], ['banana', 3], ['orange', 8]]

// forEach
fruits.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// Converting Map to Array and Object
const mapArray = [...fruits];
const mapObject = Object.fromEntries(fruits);
console.log(mapArray); // [['apple', 5], ['banana', 3], ['orange', 8]]
console.log(mapObject); // { apple: 5, banana: 3, orange: 8 }
```

### Set

Set holds unique values of any type.

```javascript
// Creating and using Sets
const set = new Set();

// Adding values
set.add(1);
set.add(2);
set.add(2); // Duplicate, won't be added
set.add('hello');
set.add({ name: 'object' });

console.log(set.size); // 4
console.log(set.has(1)); // true
console.log(set.has(3)); // false

// Initializing Set with array
const set2 = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log(set2); // Set(5) { 1, 2, 3, 4, 5 }

// Removing duplicates from array
const numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// Set methods
console.log(set.delete(1)); // true
console.log(set.has(1)); // false

// Iterating over Sets
const colors = new Set(['red', 'green', 'blue']);

for (const color of colors) {
    console.log(color);
}

colors.forEach(color => console.log(color));

// Set operations (union, intersection, difference)
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...setA, ...setB]);
console.log(union); // Set(6) { 1, 2, 3, 4, 5, 6 }

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set(2) { 3, 4 }

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set(2) { 1, 2 }

// Working with objects in Sets
const objSet = new Set();
const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

objSet.add(person1);
objSet.add(person2);
objSet.add(person1); // Won't be added again (same reference)

console.log(objSet.size); // 2
```

---

## Section 10: Array Extensions

### Array.of()

Create arrays from a variable number of arguments.

```javascript
// Array.of() vs Array constructor
console.log(Array(3)); // [empty × 3] - creates array with 3 empty slots
console.log(Array.of(3)); // [3] - creates array with single element 3

console.log(Array(1, 2, 3)); // [1, 2, 3]
console.log(Array.of(1, 2, 3)); // [1, 2, 3] - same result

// Array.of() with different types
console.log(Array.of()); // []
console.log(Array.of(undefined)); // [undefined]
console.log(Array.of(1, 'hello', true, null)); // [1, 'hello', true, null]

// Practical usage
function createArray(...elements) {
    return Array.of(...elements);
}

console.log(createArray(1, 2, 3)); // [1, 2, 3]
console.log(createArray('a')); // ['a']
```

### Array.from()

Create arrays from array-like or iterable objects.

```javascript
// Converting string to array
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']

// Converting Set to array
const set = new Set([1, 2, 3]);
console.log(Array.from(set)); // [1, 2, 3]

// Converting NodeList to array (browser environment)
// const divs = document.querySelectorAll('div');
// const divArray = Array.from(divs);

// Array.from() with mapping function
console.log(Array.from('12345', x => parseInt(x))); // [1, 2, 3, 4, 5]
console.log(Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]

// Creating arrays with specific length and values
console.log(Array.from({ length: 5 }, (_, index) => index)); // [0, 1, 2, 3, 4]
console.log(Array.from({ length: 3 }, () => 'hello')); // ['hello', 'hello', 'hello']

// Converting array-like objects
const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
console.log(Array.from(arrayLike)); // ['a', 'b', 'c']

// Range function using Array.from
const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);
console.log(range(1, 6)); // [1, 2, 3, 4, 5]
console.log(range(0, 10)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Array find()

Find the first element that satisfies a condition.

```javascript
const users = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 35, active: true },
    { id: 4, name: 'Diana', age: 28, active: true }
];

// Find first user with age > 30
const olderUser = users.find(user => user.age > 30);
console.log(olderUser); // { id: 3, name: 'Charlie', age: 35, active: true }

// Find first inactive user
const inactiveUser = users.find(user => !user.active);
console.log(inactiveUser); // { id: 2, name: 'Bob', age: 30, active: false }

// Find user by name
const alice = users.find(user => user.name === 'Alice');
console.log(alice); // { id: 1, name: 'Alice', age: 25, active: true }

// Returns undefined if not found
const youngUser = users.find(user => user.age < 20);
console.log(youngUser); // undefined

// Using with primitive arrays
const numbers = [1, 3, 5, 8, 10, 12];
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 8

// With complex conditions
const premiumUser = users.find(user => {
    return user.active && user.age >= 30 && user.name.startsWith('C');
});
console.log(premiumUser); // { id: 3, name: 'Charlie', age: 35, active: true }
```

### Array findIndex()

Find the index of the first element that satisfies a condition.

```javascript
const products = [
    { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
    { id: 2, name: 'Book', price: 15, category: 'Education' },
    { id: 3, name: 'Phone', price: 800, category: 'Electronics' },
    { id: 4, name: 'Desk', price: 300, category: 'Furniture' }
];

// Find index of first expensive product
const expensiveIndex = products.findIndex(product => product.price > 500);
console.log(expensiveIndex); // 0 (Laptop)

// Find index of product by name
const phoneIndex = products.findIndex(product => product.name === 'Phone');
console.log(phoneIndex); // 2

// Returns -1 if not found
const cheapIndex = products.findIndex(product => product.price < 10);
console.log(cheapIndex); // -1

// Using with primitive arrays
const grades = [85, 92, 78, 96, 88];
const firstAIndex = grades.findIndex(grade => grade >= 90);
console.log(firstAIndex); // 1 (grade 92)

// Practical example: updating array element
const updateProduct = (products, id, updates) => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        return true;
    }
    return false;
};

const productsCopy = [...products];
updateProduct(productsCopy, 2, { price: 12 });
console.log(productsCopy[1]); // { id: 2, name: 'Book', price: 12, category: 'Education' }

// Removing element by condition
const removeByCondition = (array, condition) => {
    const index = array.findIndex(condition);
    if (index !== -1) {
        return array.splice(index, 1)[0];
    }
    return null;
};

const numbers = [10, 20, 30, 40, 50];
const removed = removeByCondition(numbers, num => num > 25);
console.log(removed); // 30
console.log(numbers); // [10, 20, 40, 50]
```

---

## Section 11: Object Extensions

### Object.assign()

Copy properties from source objects to a target object.

```javascript
// Basic usage
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 3, c: 5, d: 6 }
console.log(target); // Same as result (target is modified)

// Cloning an object (shallow copy)
const original = { name: 'Alice', age: 30, hobbies: ['reading', 'coding'] };
const clone = Object.assign({}, original);
console.log(clone); // { name: 'Alice', age: 30, hobbies: ['reading', 'coding'] }

// Modifying clone doesn't affect original (for primitive values)
clone.name = 'Bob';
console.log(original.name); // 'Alice' (unchanged)

// But nested objects are shared (shallow copy limitation)
clone.hobbies.push('swimming');
console.log(original.hobbies); // ['reading', 'coding', 'swimming'] (affected!)

// Merging objects
const defaults = { theme: 'dark', lang: 'en', notifications: true };
const userSettings = { theme: 'light', fontSize: 14 };
const finalSettings = Object.assign({}, defaults, userSettings);
console.log(finalSettings); // { theme: 'light', lang: 'en', notifications: true, fontSize: 14 }

// Using with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const mergedArray = Object.assign([], arr1, arr2);
console.log(mergedArray); // [4, 5, 3] (indices 0 and 1 overwritten)

// Better array merging with spread operator
const betterMerged = [...arr1, ...arr2];
console.log(betterMerged); // [1, 2, 3, 4, 5]

// Function to merge user preferences
function mergePreferences(defaultPrefs, userPrefs) {
    return Object.assign({}, defaultPrefs, userPrefs);
}

const defaultPrefs = { autoSave: true, theme: 'light', pageSize: 10 };
const userPrefs = { theme: 'dark', pageSize: 25 };
console.log(mergePreferences(defaultPrefs, userPrefs));
// { autoSave: true, theme: 'dark', pageSize: 25 }
```

### Object.is()

Compare two values for equality (similar to === but with special cases).

```javascript
// Regular equality comparisons
console.log(Object.is(1, 1)); // true
console.log(Object.is('hello', 'hello')); // true
console.log(Object.is(true, true)); // true
console.log(Object.is(null, null)); // true
console.log(Object.is(undefined, undefined)); // true

// Same as === for most cases
console.log(Object.is(1, '1')); // false
console.log(Object.is(0, false)); // false
console.log(Object.is(null, undefined)); // false

// Special cases where Object.is() differs from ===
console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false

console.log(Object.is(0, -0)); // false
console.log(0 === -0); // true

console.log(Object.is(+0, -0)); // false
console.log(+0 === -0); // true

// With objects and arrays (reference comparison)
const obj1 = { name: 'Alice' };
const obj2 = { name: 'Alice' };
const obj3 = obj1;

console.log(Object.is(obj1, obj2)); // false (different objects)
console.log(Object.is(obj1, obj3)); // true (same reference)

// Practical usage in array methods
const numbers = [1, 2, NaN, 4, NaN, 6];

// Using Object.is to find NaN values
const hasNaN = numbers.some(num => Object.is(num, NaN));
console.log(hasNaN); // true

// Count NaN values
const nanCount = numbers.filter(num => Object.is(num, NaN)).length;
console.log(nanCount); // 2

// Custom includes function that works with NaN
function includesValue(array, value) {
    return array.some(item => Object.is(item, value));
}

console.log(includesValue([1, 2, NaN], NaN)); // true
console.log([1, 2, NaN].includes(NaN)); // true (native includes also works with NaN in modern JS)

// Polyfill example for older environments
if (!Object.is) {
    Object.is = function(x, y) {
        // Handle NaN case
        if (x !== x && y !== y) {
            return true;
        }
        // Handle -0 and +0 case
        if (x === 0 && y === 0) {
            return 1 / x === 1 / y;
        }
        // Regular equality
        return x === y;
    };
}
```

---

## Section 12: String Extensions

### String startsWith()

Check if a string starts with specified characters.

```javascript
// Basic usage
const greeting = "Hello, World!";
console.log(greeting.startsWith("Hello")); // true
console.log(greeting.startsWith("Hi")); // false

// Case sensitive
console.log(greeting.startsWith("hello")); // false
console.log(greeting.startsWith("Hello")); // true

// With position parameter
const sentence = "The quick brown fox";
console.log(sentence.startsWith("quick")); // false
console.log(sentence.startsWith("quick", 4)); // true (start checking from index 4)
console.log(sentence.startsWith("The")); // true
console.log(sentence.startsWith("The", 0)); // true

// Practical examples
const url = "https://www.example.com";
console.log(url.startsWith("http")); // true
console.log(url.startsWith("https")); // true
console.log(url.startsWith("ftp")); // false

// File extension checking
const filenames = ["image.jpg", "document.pdf", "script.js", "style.css"];
const imageFiles = filenames.filter(filename => 
    filename.startsWith("image") || 
    filename.toLowerCase().startsWith("img")
);
console.log(imageFiles); // ["image.jpg"]

// Protocol checking function
function getProtocol(url) {
    if (url.startsWith("https://")) return "HTTPS";
    if (url.startsWith("http://")) return "HTTP";
    if (url.startsWith("ftp://")) return "FTP";
    return "Unknown";
}

console.log(getProtocol("https://example.com")); // "HTTPS"
console.log(getProtocol("ftp://files.example.com")); // "FTP"
```

### String endsWith()

Check if a string ends with specified characters.

```javascript
// Basic usage
const filename = "document.pdf";
console.log(filename.endsWith(".pdf")); // true
console.log(filename.endsWith(".doc")); // false

// Case sensitive
console.log(filename.endsWith(".PDF")); // false
console.log(filename.endsWith(".pdf")); // true

// With length parameter (considers only first n characters)
const text = "Hello, World!";
console.log(text.endsWith("World", 12)); // true (considers "Hello, World")
console.log(text.endsWith("Hello", 5)); // true (considers "Hello")
console.log(text.endsWith("World")); // false (full string ends with "!")

// File type validation
function isImageFile(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

console.log(isImageFile("photo.JPG")); // true
console.log(isImageFile("document.pdf")); // false
console.log(isImageFile("icon.svg")); // true

// URL validation
const urls = [
    "https://example.com",
    "https://api.example.com/v1/",
    "http://localhost:3000/api",
    "ftp://files.example.com/"
];

const apiUrls = urls.filter(url => url.endsWith("/api") || url.endsWith("/api/"));
console.log(apiUrls); // ["https://api.example.com/v1/", "http://localhost:3000/api"]

// Email domain extraction
function getDomain(email) {
    if (!email.includes("@")) return null;
    return email.substring(email.indexOf("@") + 1);
}

function isGmailAddress(email) {
    return email.toLowerCase().endsWith("@gmail.com");
}

console.log(isGmailAddress("user@gmail.com")); // true
console.log(isGmailAddress("user@yahoo.com")); // false
```

### String includes()

Check if a string contains another string.

```javascript
// Basic usage
const message = "The quick brown fox jumps over the lazy dog";
console.log(message.includes("fox")); // true
console.log(message.includes("cat")); // false

// Case sensitive
console.log(message.includes("Fox")); // false
console.log(message.includes("fox")); // true

// With position parameter (start searching from index)
console.log(message.includes("the")); // true (finds "the" at beginning)
console.log(message.includes("the", 5)); // true (finds "the" later in string)
console.log(message.includes("The", 5)); // false (capital "The" only at start)

// Practical examples
const userInput = "Hello World 123!@#";

// Input validation
function containsNumbers(str) {
    return /\d/.test(str) || str.includes("1") || str.includes("2") || str.includes("3") ||
           str.includes("4") || str.includes("5") || str.includes("6") || 
           str.includes("7") || str.includes("8") || str.includes("9") || str.includes("0");
}

// Better approach using includes with array
function hasNumbers(str) {
    return ['0','1','2','3','4','5','6','7','8','9'].some(num => str.includes(num));
}

console.log(hasNumbers(userInput)); // true

// Search functionality
const products = [
    "Apple iPhone 13",
    "Samsung Galaxy S21",
    "Google Pixel 6",
    "OnePlus 9 Pro"
];

function searchProducts(query) {
    return products.filter(product => 
        product.toLowerCase().includes(query.toLowerCase())
    );
}

console.log(searchProducts("apple")); // ["Apple iPhone 13"]
console.log(searchProducts("galaxy")); // ["Samsung Galaxy S21"]
console.log(searchProducts("pro")); // ["OnePlus 9 Pro"]

// Tag/keyword checking
const blogPost = {
    title: "JavaScript ES6 Features",
    content: "This post covers modern JavaScript features including arrow functions, classes, and more.",
    tags: ["javascript", "es6", "programming"]
};

function hasKeyword(post, keyword) {
    const searchText = `${post.title} ${post.content} ${post.tags.join(' ')}`.toLowerCase();
    return searchText.includes(keyword.toLowerCase());
}

console.log(hasKeyword(blogPost, "arrow")); // true
console.log(hasKeyword(blogPost, "python")); // false

// Multiple keyword search
function hasAnyKeyword(text, keywords) {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

function hasAllKeywords(text, keywords) {
    const lowerText = text.toLowerCase();
    return keywords.every(keyword => lowerText.includes(keyword.toLowerCase()));
}

const searchKeywords = ["javascript", "features"];
console.log(hasAnyKeyword(blogPost.title, searchKeywords)); // true
console.log(hasAllKeywords(blogPost.title, searchKeywords)); // false (doesn't contain "features")
```

---

##