# JavaScript Concepts - Complete Teaching Guide

This comprehensive guide covers essential JavaScript concepts with detailed explanations and practical code examples for effective learning and teaching.

## Table of Contents
1. [Introduction to JavaScript](#introduction-to-javascript)
2. [Arrays](#arrays)
3. [Loops](#loops)
4. [Objects](#objects)
5. [Functions](#functions)
6. [Closure](#closure)
7. [Promises](#promises)
8. [Async/Await](#asyncawait)
9. [The 'this' Keyword](#the-this-keyword)
10. [Simple Form Validation](#simple-form-validation)
11. [Regular Expressions](#regular-expressions)

---

## Introduction to JavaScript

JavaScript is a high-level, interpreted programming language that runs in browsers and servers. It's dynamic, weakly typed, and supports multiple programming paradigms.

### Key Characteristics:
- **Interpreted**: No compilation step required
- **Dynamic**: Variables can change types at runtime
- **Event-driven**: Responds to user interactions
- **Prototype-based**: Object-oriented through prototypes

### Basic Syntax Examples:

```javascript
// Variables
let name = "John";           // Block-scoped, can be reassigned
const age = 25;              // Block-scoped, cannot be reassigned
var city = "New York";       // Function-scoped (avoid when possible)

// Data Types
let string = "Hello World";
let number = 42;
let boolean = true;
let undefined_var;           // undefined
let null_var = null;
let symbol = Symbol("id");
let bigint = 123n;

// Type checking
console.log(typeof string);  // "string"
console.log(typeof number);  // "number"

// Basic operations
let sum = 10 + 5;           // 15
let greeting = "Hello" + " World";  // "Hello World"
```

### Teaching Points:
- JavaScript is case-sensitive
- Semicolons are optional but recommended
- Use `const` by default, `let` when reassignment is needed
- Avoid `var` in modern JavaScript

---

## Arrays

Arrays are ordered collections of elements that can hold any data type.

### Array Creation and Basic Operations:

```javascript
// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["text", 42, true, null];
let empty = [];

// Array constructor (less common)
let colors = new Array("red", "green", "blue");

// Accessing elements
console.log(fruits[0]);      // "apple"
console.log(fruits.length);  // 3

// Modifying arrays
fruits[1] = "grape";         // Change element
fruits.push("mango");        // Add to end
let removed = fruits.pop();  // Remove from end
fruits.unshift("kiwi");      // Add to beginning
fruits.shift();              // Remove from beginning
```

### Array Methods:

```javascript
let numbers = [1, 2, 3, 4, 5];

// Non-mutating methods
let doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
let evens = numbers.filter(n => n % 2 === 0); // [2, 4]
let sum = numbers.reduce((acc, n) => acc + n, 0); // 15
let found = numbers.find(n => n > 3);         // 4
let hasEven = numbers.some(n => n % 2 === 0); // true

// Mutating methods
numbers.sort((a, b) => b - a);  // [5, 4, 3, 2, 1] (descending)
numbers.reverse();              // [1, 2, 3, 4, 5]
numbers.splice(2, 1, 10);       // Remove 1 element at index 2, add 10

// Iteration
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
```

### Teaching Points:
- Arrays are zero-indexed
- Length property is dynamic
- Arrays can hold mixed data types
- Understand mutating vs non-mutating methods

---

## Loops

Loops allow you to execute code repeatedly based on conditions.

### For Loop:

```javascript
// Traditional for loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// For...of loop (for arrays and iterables)
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
    console.log(fruit);
}

// For...in loop (for object properties)
let person = { name: "John", age: 30, city: "NYC" };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

### While Loops:

```javascript
// While loop
let count = 0;
while (count < 3) {
    console.log(`Count: ${count}`);
    count++;
}

// Do-while loop (executes at least once)
let num = 0;
do {
    console.log(`Number: ${num}`);
    num++;
} while (num < 3);
```

### Loop Control:

```javascript
// Break and continue
for (let i = 0; i < 10; i++) {
    if (i === 3) continue;  // Skip iteration when i is 3
    if (i === 7) break;     // Exit loop when i is 7
    console.log(i);
}

// Nested loops
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i}-${j}`);
    }
}
```

### Teaching Points:
- Choose the right loop type for the situation
- Be careful with infinite loops
- `for...of` for values, `for...in` for keys
- `break` exits the loop, `continue` skips to next iteration

---

## Objects

Objects are collections of key-value pairs and the fundamental building blocks in JavaScript.

### Object Creation:

```javascript
// Object literal (most common)
let person = {
    name: "John",
    age: 30,
    city: "New York",
    isEmployed: true
};

// Constructor function
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
let myCar = new Car("Toyota", "Camry", 2022);

// Object.create()
let animal = {
    species: "unknown",
    makeSound: function() {
        console.log("Some sound");
    }
};
let dog = Object.create(animal);
dog.species = "Canine";
```

### Working with Objects:

```javascript
let student = {
    name: "Alice",
    grades: [85, 90, 78],
    info: {
        age: 20,
        major: "Computer Science"
    },
    
    // Method
    getAverage: function() {
        return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
    }
};

// Accessing properties
console.log(student.name);        // Dot notation
console.log(student["name"]);     // Bracket notation
console.log(student.info.age);    // Nested access

// Adding/modifying properties
student.email = "alice@email.com";
student.age = 21;

// Deleting properties
delete student.email;

// Checking if property exists
console.log("name" in student);           // true
console.log(student.hasOwnProperty("name")); // true
```

### Object Methods:

```javascript
let obj = { a: 1, b: 2, c: 3 };

// Get keys, values, entries
console.log(Object.keys(obj));    // ["a", "b", "c"]
console.log(Object.values(obj));  // [1, 2, 3]
console.log(Object.entries(obj)); // [["a", 1], ["b", 2], ["c", 3]]

// Copying objects
let shallow = Object.assign({}, obj);
let spread = { ...obj };

// Deep copy (for nested objects)
let deepCopy = JSON.parse(JSON.stringify(obj));
```

### Teaching Points:
- Objects are reference types
- Properties can be accessed with dot or bracket notation
- Methods are functions stored as object properties
- `this` refers to the object in methods

---

## Functions

Functions are reusable blocks of code that perform specific tasks.

### Function Declarations and Expressions:

```javascript
// Function Declaration (hoisted)
function greet(name) {
    return `Hello, ${name}!`;
}

// Function Expression (not hoisted)
const add = function(a, b) {
    return a + b;
};

// Arrow Functions (ES6)
const multiply = (a, b) => a * b;
const square = x => x * x;
const sayHello = () => console.log("Hello!");

// Arrow function with block body
const processArray = arr => {
    const result = arr.map(x => x * 2);
    return result.filter(x => x > 5);
};
```

### Parameters and Arguments:

```javascript
// Default parameters
function greetUser(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Destructuring parameters
function createUser({name, age, email}) {
    return {
        id: Math.random(),
        name,
        age,
        email,
        createdAt: new Date()
    };
}

// Usage examples
console.log(greetUser());                    // "Hello, Guest!"
console.log(sum(1, 2, 3, 4, 5));           // 15
console.log(createUser({name: "John", age: 25, email: "john@email.com"}));
```

### Higher-Order Functions:

```javascript
// Function that returns a function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // 10

// Function that takes a function as parameter
function operateOnArray(arr, operation) {
    return arr.map(operation);
}

const numbers = [1, 2, 3, 4, 5];
const squared = operateOnArray(numbers, x => x * x);
console.log(squared); // [1, 4, 9, 16, 25]
```

### Teaching Points:
- Functions are first-class objects in JavaScript
- Arrow functions have different `this` behavior
- Understanding hoisting differences
- Functions can be passed as arguments and returned from other functions

---

## Closure

Closure is when a function has access to variables from its outer (enclosing) scope even after the outer function has finished executing.

### Basic Closure Example:

```javascript
function outerFunction(x) {
    // This is the outer function's scope
    
    function innerFunction(y) {
        // Inner function has access to outer function's variables
        return x + y;
    }
    
    return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8 - inner function still remembers x = 5
```

### Practical Closure Examples:

```javascript
// Counter with closure
function createCounter() {
    let count = 0;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count variable is private and can't be accessed directly

// Function factory with closure
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeting("Hello");
const sayGoodbye = createGreeting("Goodbye");

console.log(sayHello("Alice"));    // "Hello, Alice!"
console.log(sayGoodbye("Bob"));    // "Goodbye, Bob!"
```

### Module Pattern with Closure:

```javascript
const calculator = (function() {
    let result = 0;
    
    return {
        add: function(x) {
            result += x;
            return this;
        },
        subtract: function(x) {
            result -= x;
            return this;
        },
        multiply: function(x) {
            result *= x;
            return this;
        },
        getResult: function() {
            return result;
        },
        reset: function() {
            result = 0;
            return this;
        }
    };
})();

// Method chaining with closure
calculator.add(10).multiply(2).subtract(5).getResult(); // 15
```

### Teaching Points:
- Closure creates private variables
- Inner functions retain access to outer scope
- Commonly used for data privacy and function factories
- Important for understanding module patterns

---

## Promises

Promises represent the eventual completion or failure of an asynchronous operation.

### Creating and Using Promises:

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

// Consuming a Promise
myPromise
    .then(result => {
        console.log(result);
        return "Next step";
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error.message);
    })
    .finally(() => {
        console.log("Promise completed");
    });
```

### Promise Utilities:

```javascript
// Promise.all() - waits for all promises to resolve
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log(results); // [1, 2, 3]
    });

// Promise.race() - resolves with the first completed promise
const fastPromise = new Promise(resolve => setTimeout(() => resolve("fast"), 100));
const slowPromise = new Promise(resolve => setTimeout(() => resolve("slow"), 500));

Promise.race([fastPromise, slowPromise])
    .then(result => {
        console.log(result); // "fast"
    });

// Promise.allSettled() - waits for all promises to settle
Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another success")
])
.then(results => {
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log('Success:', result.value);
        } else {
            console.log('Error:', result.reason);
        }
    });
});
```

### Practical Promise Example:

```javascript
// Simulating API calls
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: "John", email: "john@email.com" },
                2: { id: 2, name: "Jane", email: "jane@email.com" }
            };
            
            const user = users[id];
            if (user) {
                resolve(user);
            } else {
                reject(new Error("User not found"));
            }
        }, 1000);
    });
}

// Chain multiple async operations
fetchUser(1)
    .then(user => {
        console.log("User:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
```

### Teaching Points:
- Promises solve callback hell
- Three states: pending, fulfilled, rejected
- Always handle errors with `.catch()`
- Promise chains pass values through `.then()`

---

## Async/Await

Async/await provides a cleaner syntax for working with asynchronous code, making it look more like synchronous code.

### Basic Async/Await:

```javascript
// Async function declaration
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Async arrow function
const getData = async () => {
    const data = await fetchData();
    return data;
};

// Using async function
async function main() {
    try {
        const result = await getData();
        console.log(result);
    } catch (error) {
        console.error('Main error:', error);
    }
}

main();
```

### Converting Promises to Async/Await:

```javascript
// Promise version
function getUserWithPromises(id) {
    return fetchUser(id)
        .then(user => {
            console.log('User found:', user.name);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log('Posts loaded:', posts.length);
            return { user, posts };
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Async/await version
async function getUserWithAsync(id) {
    try {
        const user = await fetchUser(id);
        console.log('User found:', user.name);
        
        const posts = await fetchUserPosts(user.id);
        console.log('Posts loaded:', posts.length);
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Parallel vs Sequential Execution:

```javascript
// Sequential execution (slower)
async function sequential() {
    console.time('Sequential');
    
    const user1 = await fetchUser(1);
    const user2 = await fetchUser(2);
    const user3 = await fetchUser(3);
    
    console.timeEnd('Sequential');
    return [user1, user2, user3];
}

// Parallel execution (faster)
async function parallel() {
    console.time('Parallel');
    
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    
    console.timeEnd('Parallel');
    return [user1, user2, user3];
}

// Mixed approach
async function mixed() {
    // These run in parallel
    const userPromise = fetchUser(1);
    const configPromise = fetchConfig();
    
    // Wait for both
    const [user, config] = await Promise.all([userPromise, configPromise]);
    
    // This runs after both above are complete
    const posts = await fetchUserPosts(user.id);
    
    return { user, config, posts };
}
```

### Error Handling Patterns:

```javascript
// Multiple try-catch blocks
async function handleMultipleOperations() {
    let user;
    let posts;
    
    try {
        user = await fetchUser(1);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
    
    try {
        posts = await fetchUserPosts(user.id);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        posts = []; // Provide default
    }
    
    return { user, posts };
}

// Helper function for error handling
async function withErrorHandling(asyncFn, defaultValue = null) {
    try {
        return await asyncFn();
    } catch (error) {
        console.error('Operation failed:', error);
        return defaultValue;
    }
}

// Usage
const user = await withErrorHandling(() => fetchUser(1), { name: 'Guest' });
```

### Teaching Points:
- `async` functions always return a Promise
- `await` can only be used inside `async` functions
- Error handling with try/catch is more intuitive
- Be mindful of sequential vs parallel execution

---

## The 'this' Keyword

The `this` keyword refers to the object that is executing the current function. Its value depends on how the function is called.

### 'this' in Different Contexts:

```javascript
// Global context
console.log(this); // In browser: window object, in Node.js: global object

// Object method
const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hi, I'm ${this.name}`); // 'this' refers to person object
    },
    
    getAge: function() {
        return this.age;
    }
};

person.greet(); // "Hi, I'm John"

// Method stored in variable loses context
const greetFunction = person.greet;
greetFunction(); // "Hi, I'm undefined" - 'this' is not person anymore
```

### Arrow Functions and 'this':

```javascript
const obj = {
    name: "Alice",
    
    regularMethod: function() {
        console.log("Regular:", this.name); // 'this' refers to obj
        
        const innerFunction = function() {
            console.log("Inner regular:", this.name); // 'this' is undefined/window
        };
        
        const innerArrow = () => {
            console.log("Inner arrow:", this.name); // 'this' refers to obj
        };
        
        innerFunction();
        innerArrow();
    },
    
    arrowMethod: () => {
        console.log("Arrow method:", this.name); // 'this' is undefined/window
    }
};

obj.regularMethod();
obj.arrowMethod();
```

### Binding 'this':

```javascript
const user = {
    name: "Bob",
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};

// call() - invoke immediately with specific 'this'
user.greet.call({ name: "Charlie" }); // "Hello, Charlie"

// apply() - similar to call but takes array of arguments
function introduce(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

introduce.apply({ name: "David" }, ["Hi", "!"]); // "Hi, I'm David!"

// bind() - creates new function with bound 'this'
const boundGreet = user.greet.bind({ name: "Eve" });
boundGreet(); // "Hello, Eve"

// Practical example: event handlers
class Button {
    constructor(element) {
        this.element = element;
        this.clickCount = 0;
        
        // Without bind, 'this' would refer to the button element
        this.element.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick() {
        this.clickCount++;
        console.log(`Clicked ${this.clickCount} times`);
    }
}
```

### 'this' in Classes:

```javascript
class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this; // Method chaining
    }
    
    multiply(value) {
        this.result *= value;
        return this;
    }
    
    getResult() {
        return this.result;
    }
    
    // Arrow function as class property (always bound to instance)
    reset = () => {
        this.result = 0;
        return this;
    }
}

const calc = new Calculator();
calc.add(5).multiply(2).getResult(); // 10

// Method extracted but still works due to arrow function
const resetFn = calc.reset;
resetFn(); // Still works correctly
```

### Common 'this' Pitfalls and Solutions:

```javascript
// Problem: Lost context in callbacks
class Timer {
    constructor() {
        this.seconds = 0;
    }
    
    // Problem version
    startProblematic() {
        setInterval(function() {
            this.seconds++; // 'this' is undefined
            console.log(this.seconds);
        }, 1000);
    }
    
    // Solution 1: Arrow function
    startWithArrow() {
        setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
    
    // Solution 2: bind
    startWithBind() {
        setInterval(function() {
            this.seconds++;
            console.log(this.seconds);
        }.bind(this), 1000);
    }
    
    // Solution 3: Store reference
    startWithReference() {
        const self = this;
        setInterval(function() {
            self.seconds++;
            console.log(self.seconds);
        }, 1000);
    }
}
```

### Teaching Points:
- `this` value is determined by how function is called, not where it's defined
- Arrow functions inherit `this` from enclosing scope
- Use `bind()`, `call()`, or `apply()` to explicitly set `this`
- Class methods automatically bind `this` to the instance

---

## Simple Form Validation

Form validation ensures user input meets required criteria before submission.

### HTML Form Structure:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .form-group {
            margin-bottom: 15px;
        }
        .error {
            color: red;
            font-size: 0.9em;
        }
        .success {
            color: green;
        }
        input.invalid {
            border: 2px solid red;
        }
        input.valid {
            border: 2px solid green;
        }
    </style>
</head>
<body>
    <form id="userForm">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <div class="error" id="usernameError"></div>
        </div>
        
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <div class="error" id="emailError"></div>
        </div>
        
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <div class="error" id="passwordError"></div>
        </div>
        
        <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <div class="error" id="confirmPasswordError"></div>
        </div>
        
        <button type="submit">Submit</button>
    </form>
</body>
</html>
```

### JavaScript Validation Logic:

```javascript
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.rules = {};
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }
    
    // Define validation rules
    addRule(fieldName, validatorFunction, errorMessage) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push({ validator: validatorFunction, message: errorMessage });
        return this;
    }
    
    // Validate individual field
    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rules = this.rules[fieldName] || [];
        
        this.clearErrors(input);
        
        for (let rule of rules) {
            if (!rule.validator(value, this.form)) {
                this.showError(input, rule.message);
                return false;
            }
        }
        
        this.showSuccess(input);
        return true;
    }
    
    // Validate entire form
    validateForm() {
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validateForm()) {
            console.log('Form is valid, submitting...');
            this.submitForm();
        } else {
            console.log('Form has errors');
        }
    }
    
    // Submit form (replace with actual submission logic)
    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        console.log('Submitting data:', data);
        
        // Simulate API call
        setTimeout(() => {
            alert('Form submitted successfully!');
            this.form.reset();
            this.clearAllErrors();
        }, 1000);
    }
    
    // UI helper methods
    showError(input, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        
        const errorDiv = document.getElementById(input.name + 'Error');
        if (errorDiv) {
            errorDiv.textContent = message;
        }
    }
    
    showSuccess(input) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    }
    
    clearErrors(input) {
        input.classList.remove('invalid');
        const errorDiv = document.getElementById(input.name + 'Error');
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    }
    
    clearAllErrors() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            this.clearErrors(input);
        });
    }
}

// Validation functions
const validators = {
    required: (value) => value.length > 0,
    
    minLength: (min) => (value) => value.length >= min,
    
    maxLength: (max) => (value) => value.length <= max,
    
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    password: (value) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
    },
    
    confirmPassword: (value, form) => {
        const password = form.querySelector('[name="password"]').value;
        return value === password;
    },
    
    username: (value) => {
        // Alphanumeric and underscores only, 3-20 characters
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(value);
    }
};

// Initialize form validator
const validator = new FormValidator('userForm');

// Add validation rules
validator
    .addRule('username', validators.required, 'Username is required')
    .addRule('username', validators.username, 'Username must be 3-20 characters, alphanumeric and underscores only')
    .addRule('email', validators.required, 'Email is required')
    .addRule('email', validators.email, 'Please enter a valid email address')
    .addRule('password', validators.required, 'Password is required')
    .addRule('password', validators.password, 'Password must be at least 8 characters with uppercase, lowercase, and number')
    .addRule('confirmPassword', validators.required, 'Please confirm your password')
    .addRule('confirmPassword', validators.confirmPassword, 'Passwords do not match');
```

### Alternative Validation Approaches:

```javascript
// Simple validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

// Event-driven validation
document.getElementById('email').addEventListener('input', function(e) {
    const email = e.target.value;
    const errorDiv = document.getElementById('emailError');
    
    if (email && !validateEmail(email)) {
        errorDiv.textContent = 'Invalid email format';
        e.target.classList.add('invalid');
    } else {
        errorDiv.textContent = '';
        e.target.classList.remove('invalid');
    }
});

// Custom validation with HTML5 API
function setCustomValidity() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    confirmPassword.addEventListener('input', function() {
        if (this.value !== password.value) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });
}
```

### Teaching Points:
- Validate on both client and server side
- Provide immediate feedback for better user experience
- Use appropriate input types (email, tel, url)
- Regular expressions are powerful for pattern matching
- HTML5 provides built-in validation features

---

## Conclusion

This guide covers the fundamental JavaScript concepts essential for modern web development. Each topic builds upon the previous ones, creating a solid foundation for understanding JavaScript's capabilities and patterns.

### Key Takeaways:
1. **JavaScript Fundamentals**: Understanding variables, data types, and basic syntax
2. **Data Structures**: Arrays and objects are the building blocks of JavaScript applications
3. **Control Flow**: Loops and conditional statements control program execution
4. **Functions**: First-class objects that enable code reusability and modularity
5. **Advanced Concepts**: Closures, promises, and async/await enable powerful programming patterns
6. **Context Management**: Understanding `this` is crucial for object-oriented pro