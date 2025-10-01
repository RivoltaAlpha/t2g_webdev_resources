# JavaScript Programming Concepts Teaching Guide

A comprehensive guide covering fundamental programming concepts with practical examples and code samples for students using JavaScript.

## Table of Contents
1. [Variables and Data Types](#variables-and-data-types)
2. [Control Structures](#control-structures)
3. [Functions](#functions)
4. [Object-Oriented Programming](#object-oriented-programming)
5. [Data Structures](#data-structures)
6. [Algorithms](#algorithms)
7. [Error Handling](#error-handling)
8. [File I/O and APIs](#file-io-and-apis)
9. [Recursion](#recursion)
10. [Time and Space Complexity](#time-and-space-complexity)

---

## Variables and Data Types

Variables are containers that store data values. Understanding data types is crucial for effective programming.

### Key Concepts:
- **Variables**: Named storage locations in memory
- **Data Types**: Categories that determine what kind of data can be stored
- **Type Coercion**: JavaScript's automatic type conversion
- **Scope**: Where variables can be accessed in your code

### Variable Declarations
```javascript
// ES6+ variable declarations
let age = 25;           // Block-scoped, can be reassigned
const name = "Alice";   // Block-scoped, cannot be reassigned
var oldStyle = "avoid"; // Function-scoped, avoid using

// Multiple declarations
let x = 1, y = 2, z = 3;
```

### Primitive Data Types
```javascript
// Numbers (JavaScript has only one number type)
let integerNum = 42;
let floatNum = 3.14159;
let scientificNum = 2.5e10;
let infinity = Infinity;
let notANumber = NaN;

console.log(typeof integerNum); // "number"

// Strings
let singleQuotes = 'Hello, World!';
let doubleQuotes = "Hello, World!";
let templateLiteral = `Hello, ${name}!`;
let multiLine = `This is a
multi-line string`;

// Boolean
let isStudent = true;
let isGraduated = false;

// Null and Undefined
let emptyValue = null;      // Intentional absence of value
let notDefined;             // undefined (declared but not assigned)

// Symbols (ES6+)
let uniqueId = Symbol('id');

// BigInt (for large integers)
let bigNumber = 123456789012345678901234567890n;

console.log(typeof bigNumber); // "bigint"
```

### Complex Data Types
```javascript
// Objects
let student = {
    name: "Alice",
    age: 20,
    grade: "A",
    courses: ["Math", "Physics", "Chemistry"]
};

// Arrays
let numbers = [1, 2, 3, 4, 5];
let mixedArray = [1, "hello", true, null, {key: "value"}];

// Functions (are objects in JavaScript)
function greet() {
    return "Hello!";
}

// Dates
let now = new Date();
let specificDate = new Date("2025-09-27");
```

### Variable Scope Examples
```javascript
const globalVar = "I'm global";

function demonstrateScope() {
    const localVar = "I'm local";
    let blockVar = "I'm block scoped";
    
    if (true) {
        let innerBlockVar = "I'm in an inner block";
        console.log(globalVar);     // Accessible
        console.log(localVar);      // Accessible
        console.log(blockVar);      // Accessible
        console.log(innerBlockVar); // Accessible
    }
    
    // console.log(innerBlockVar); // Error: not accessible here
    
    return localVar;
}

console.log(globalVar); // Accessible
// console.log(localVar); // Error: not accessible here

// Hoisting demonstration
console.log(hoistedVar); // undefined (not error due to hoisting)
var hoistedVar = "I'm hoisted";

// let and const are not hoisted in the same way
// console.log(notHoisted); // Error: Cannot access before initialization
let notHoisted = "I'm not hoisted";
```

---

## Control Structures

Control structures determine the flow of program execution.

### Conditional Statements

#### Basic If-Else
```javascript
function checkGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

// Ternary operator for simple conditions
const studentScore = 85;
const grade = studentScore >= 60 ? "Pass" : "Fail";
console.log(`Score: ${studentScore}, Grade: ${checkGrade(studentScore)}`);
```

#### Switch Statements
```javascript
function handleDay(day) {
    switch (day.toLowerCase()) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            return "Weekday";
        case "saturday":
        case "sunday":
            return "Weekend";
        default:
            return "Invalid day";
    }
}

console.log(handleDay("Monday"));   // Weekday
console.log(handleDay("Saturday")); // Weekend
```

### Loops

#### For Loops
```javascript
// Traditional for loop
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
}

// For...of loop (iterates over values)
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(`I like ${fruit}`);
}

// For...in loop (iterates over keys/indices)
for (const index in fruits) {
    console.log(`${index}: ${fruits[index]}`);
}

// Object iteration
const studentGrades = { Alice: 95, Bob: 87, Carol: 92 };
for (const [name, grade] of Object.entries(studentGrades)) {
    console.log(`${name}: ${grade}`);
}

// Array methods as alternatives to loops
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

const uppercaseFruits = fruits.map(fruit => fruit.toUpperCase());
const longFruits = fruits.filter(fruit => fruit.length > 5);
```

#### While Loops
```javascript
// Basic while loop
let count = 0;
while (count < 5) {
    console.log(`Count is ${count}`);
    count++;
}

// Do-while loop (executes at least once)
let userInput;
do {
    userInput = prompt("Enter 'quit' to exit:");
    console.log(`You entered: ${userInput}`);
} while (userInput !== "quit");

// While loop with complex condition
function guessNumber() {
    const secret = 7;
    let guess = 0;
    let attempts = 0;
    
    while (guess !== secret && attempts < 5) {
        guess = parseInt(prompt("Guess the number (1-10):"));
        attempts++;
        
        if (guess < secret) {
            console.log("Too low!");
        } else if (guess > secret) {
            console.log("Too high!");
        } else {
            console.log(`Correct! It took you ${attempts} attempts.`);
            return;
        }
    }
    
    if (attempts >= 5) {
        console.log(`Sorry, you've run out of attempts. The number was ${secret}.`);
    }
}
```

#### Loop Control
```javascript
// Break and continue
for (let i = 0; i < 10; i++) {
    if (i === 3) {
        continue; // Skip this iteration
    }
    if (i === 7) {
        break;    // Exit the loop
    }
    console.log(i);
}
// Output: 0, 1, 2, 4, 5, 6

// Labeled breaks for nested loops
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer; // Breaks out of both loops
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}
```

---

## Functions

Functions are reusable blocks of code that perform specific tasks.

### Function Declarations and Expressions
```javascript
// Function declaration (hoisted)
function greet(name, greeting = "Hello") {
    /**
     * Greets a person with a customizable message.
     * @param {string} name - The person's name
     * @param {string} greeting - The greeting message (default: "Hello")
     * @returns {string} The formatted greeting
     */
    return `${greeting}, ${name}!`;
}

// Function expression (not hoisted)
const greetExpression = function(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
};

// Arrow functions (ES6+)
const greetArrow = (name, greeting = "Hello") => {
    return `${greeting}, ${name}!`;
};

// Concise arrow function (implicit return)
const greetConcise = (name, greeting = "Hello") => `${greeting}, ${name}!`;

// Function calls
console.log(greet("Alice"));                    // Hello, Alice!
console.log(greet("Bob", "Good morning"));      // Good morning, Bob!
```

### Advanced Function Features
```javascript
// Rest parameters (variable arguments)
function calculateAverage(...numbers) {
    /**
     * Calculate average of variable number of arguments.
     * @param {...number} numbers - Numbers to average
     * @returns {number} The average value
     */
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

console.log(calculateAverage(1, 2, 3, 4, 5)); // 3

// Spread operator
const nums = [1, 2, 3, 4, 5];
console.log(calculateAverage(...nums)); // 3

// Destructuring parameters
function createProfile({ name, age, city = "Unknown", ...rest }) {
    /**
     * Create a user profile with flexible attributes.
     * @param {Object} userData - User data object
     * @returns {Object} User profile
     */
    return {
        name,
        age,
        city,
        ...rest
    };
}

const user = createProfile({
    name: "Alice", 
    age: 25, 
    city: "New York", 
    occupation: "Engineer"
});
console.log(user);

// Higher-order functions
function applyOperation(numbers, operation) {
    /**
     * Apply an operation to all numbers in an array.
     * @param {number[]} numbers - Array of numbers
     * @param {Function} operation - Operation to apply
     * @returns {number[]} Array of results
     */
    return numbers.map(operation);
}

const cube = x => x ** 3;
const square = x => x ** 2;

const cubedNumbers = applyOperation([1, 2, 3, 4], cube);
const squaredNumbers = applyOperation([1, 2, 3, 4], square);

console.log(cubedNumbers);  // [1, 8, 27, 64]
console.log(squaredNumbers); // [1, 4, 9, 16]
```

### Closures and Advanced Concepts
```javascript
// Closures
function createCounter() {
    let count = 0;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue());  // 2

// Function composition
const add = x => y => x + y;        // Curried function
const multiply = x => y => x * y;   // Curried function

const add5 = add(5);
const multiply3 = multiply(3);

const compose = (f, g) => x => f(g(x));
const add5ThenMultiply3 = compose(multiply3, add5);

console.log(add5ThenMultiply3(10)); // (10 + 5) * 3 = 45

// Immediately Invoked Function Expression (IIFE)
const result = (function(x, y) {
    return x + y;
})(5, 3);

console.log(result); // 8

// Generator functions
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
```

---

## Object-Oriented Programming

JavaScript supports OOP through prototypes and ES6 classes.

### ES6 Classes
```javascript
class Student {
    /**
     * A class representing a student.
     */
    
    // Static property (shared by all instances)
    static schoolName = "ABC University";
    
    constructor(name, age, studentId) {
        /**
         * Initialize a new student.
         * @param {string} name - Student's name
         * @param {number} age - Student's age  
         * @param {string} studentId - Student's ID
         */
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.courses = [];
        this._gpa = 0.0; // Private-ish property (convention)
    }
    
    enrollCourse(course) {
        /**
         * Enroll the student in a course.
         * @param {string} course - Course name
         */
        if (!this.courses.includes(course)) {
            this.courses.push(course);
            console.log(`${this.name} enrolled in ${course}`);
        } else {
            console.log(`${this.name} is already enrolled in ${course}`);
        }
    }
    
    calculateGPA(grades) {
        /**
         * Calculate GPA based on grades.
         * @param {number[]} grades - Array of grades
         * @returns {number} Calculated GPA
         */
        if (grades.length > 0) {
            this._gpa = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
        }
        return this._gpa;
    }
    
    // Getter
    get gpa() {
        return this._gpa;
    }
    
    // Setter
    set gpa(value) {
        if (value >= 0 && value <= 4.0) {
            this._gpa = value;
        } else {
            throw new Error("GPA must be between 0 and 4.0");
        }
    }
    
    toString() {
        /**
         * String representation of the student.
         * @returns {string} Student info
         */
        return `Student: ${this.name} (ID: ${this.studentId}, GPA: ${this._gpa.toFixed(2)})`;
    }
    
    // Static method
    static compareGPA(student1, student2) {
        return student2.gpa - student1.gpa;
    }
}

// Creating objects
const alice = new Student("Alice Johnson", 20, "S12345");
const bob = new Student("Bob Smith", 19, "S12346");

// Using methods
alice.enrollCourse("Mathematics");
alice.enrollCourse("Physics");
alice.calculateGPA([3.8, 3.9, 3.7]);

console.log(alice.toString()); // Student: Alice Johnson (ID: S12345, GPA: 3.80)
console.log(Student.schoolName); // ABC University
```

### Inheritance
```javascript
class Person {
    /**
     * Base class for all persons.
     */
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }
    
    // Method to be overridden
    getRole() {
        return "Person";
    }
}

class Student extends Person {
    /**
     * Student class extending Person.
     */
    
    constructor(name, age, studentId) {
        super(name, age); // Call parent constructor
        this.studentId = studentId;
        this.courses = [];
    }
    
    // Override parent method
    introduce() {
        return `Hi, I'm ${this.name}, a student with ID ${this.studentId}.`;
    }
    
    getRole() {
        return "Student";
    }
    
    study(subject) {
        return `${this.name} is studying ${subject}.`;
    }
}

class Teacher extends Person {
    /**
     * Teacher class extending Person.
     */
    
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
        this.students = [];
    }
    
    introduce() {
        return `Hello, I'm ${this.name} and I teach ${this.subject}.`;
    }
    
    getRole() {
        return "Teacher";
    }
    
    addStudent(student) {
        if (student instanceof Student) {
            this.students.push(student);
            console.log(`${student.name} added to ${this.name}'s class`);
        } else {
            console.log("Only Student instances can be added");
        }
    }
    
    teach() {
        return `${this.name} is teaching ${this.subject}.`;
    }
}

// Usage
const student = new Student("Alice", 20, "S001");
const teacher = new Teacher("Dr. Smith", 45, "Mathematics");

console.log(student.introduce()); // Hi, I'm Alice, a student with ID S001.
console.log(teacher.introduce()); // Hello, I'm Dr. Smith and I teach Mathematics.

teacher.addStudent(student);
console.log(student.study("Calculus"));
console.log(teacher.teach());
```

### Encapsulation with Private Fields (ES2022)
```javascript
class BankAccount {
    /**
     * A bank account with private fields.
     */
    
    // Private fields (ES2022)
    #balance;
    #transactionHistory;
    
    constructor(accountHolder, initialBalance = 0) {
        this.accountHolder = accountHolder;
        this.#balance = initialBalance;
        this.#transactionHistory = [];
    }
    
    // Public getter for balance
    get balance() {
        return this.#balance;
    }
    
    deposit(amount) {
        /**
         * Deposit money into the account.
         * @param {number} amount - Amount to deposit
         * @returns {number} New balance
         */
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        
        this.#balance += amount;
        this.#transactionHistory.push(`Deposited $${amount}`);
        return this.#balance;
    }
    
    withdraw(amount) {
        /**
         * Withdraw money from the account.
         * @param {number} amount - Amount to withdraw
         * @returns {number} New balance
         */
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this.#balance) {
            throw new Error("Insufficient funds");
        }
        
        this.#balance -= amount;
        this.#transactionHistory.push(`Withdrew $${amount}`);
        return this.#balance;
    }
    
    getTransactionHistory() {
        /**
         * Get a copy of transaction history.
         * @returns {string[]} Copy of transaction history
         */
        return [...this.#transactionHistory]; // Return a copy, not reference
    }
    
    // Private method
    #validateAmount(amount) {
        return typeof amount === 'number' && amount > 0;
    }
}

// Usage
const account = new BankAccount("John Doe", 1000);
console.log(`Initial balance: $${account.balance}`);

account.deposit(500);
console.log(`After deposit: $${account.balance}`);

account.withdraw(200);
console.log(`After withdrawal: $${account.balance}`);

console.log("Transaction history:", account.getTransactionHistory());

// console.log(account.#balance); // Error: Private field '#balance' must be declared in an enclosing class
```

### Prototype-based OOP (Traditional JavaScript)
```javascript
// Constructor function (pre-ES6 way)
function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

// Adding methods to prototype
Vehicle.prototype.getInfo = function() {
    return `${this.year} ${this.make} ${this.model}`;
};

Vehicle.prototype.start = function() {
    return `${this.getInfo()} is starting...`;
};

// Inheritance with prototypes
function Car(make, model, year, doors) {
    Vehicle.call(this, make, model, year); // Call parent constructor
    this.doors = doors;
}

// Set up inheritance
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Override method
Car.prototype.getInfo = function() {
    return `${Vehicle.prototype.getInfo.call(this)} (${this.doors} doors)`;
};

// Usage
const myCar = new Car("Toyota", "Camry", 2020, 4);
console.log(myCar.getInfo()); // 2020 Toyota Camry (4 doors)
console.log(myCar.start());   // 2020 Toyota Camry (4 doors) is starting...
```

---

## Data Structures

Data structures organize and store data efficiently for different operations.

### Arrays and Array Methods
```javascript
// Array creation and basic operations
const numbers = [1, 2, 3, 4, 5];
const mixedArray = [1, "hello", true, null, {key: "value"}];

// Array methods
const fruits = ["apple", "banana", "orange"];

// Adding elements
fruits.push("grape");           // Add to end
fruits.unshift("strawberry");   // Add to beginning
console.log(fruits); // ["strawberry", "apple", "banana", "orange", "grape"]

// Removing elements
const lastFruit = fruits.pop();        // Remove from end
const firstFruit = fruits.shift();     // Remove from beginning
console.log(lastFruit);  // "grape"
console.log(firstFruit); // "strawberry"

// Array iteration methods
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]
console.log(sum);     // 15

// Advanced array methods
const users = [
    {name: "Alice", age: 25, city: "New York"},
    {name: "Bob", age: 30, city: "Boston"},
    {name: "Carol", age: 22, city: "New York"}
];

// Find methods
const alice = users.find(user => user.name === "Alice");
const newYorkers = users.filter(user => user.city === "New York");
const hasMinor = users.some(user => user.age < 18);
const allAdults = users.every(user => user.age >= 18);

console.log(alice);      // {name: "Alice", age: 25, city: "New York"}
console.log(newYorkers); // [{name: "Alice", ...}, {name: "Carol", ...}]
console.log(hasMinor);   // false
console.log(allAdults);  // true
```

### Custom Data Structures

#### Dynamic Array Implementation
```javascript
class DynamicArray {
    /**
     * A simple implementation of a dynamic array.
     */
    
    constructor() {
        this._data = [];
        this._size = 0;
    }
    
    append(item) {
        /**
         * Add item to the end of the array.
         * @param {*} item - Item to add
         */
        this._data[this._size] = item;
        this._size++;
    }
    
    insert(index, item) {
        /**
         * Insert item at specified index.
         * @param {number} index - Index to insert at
         * @param {*} item - Item to insert
         */
        if (index < 0 || index > this._size) {
            throw new Error("Index out of range");
        }
        
        // Shift elements to the right
        for (let i = this._size; i > index; i--) {
            this._data[i] = this._data[i - 1];
        }
        
        this._data[index] = item;
        this._size++;
    }
    
    remove(item) {
        /**
         * Remove first occurrence of item.
         * @param {*} item - Item to remove
         */
        const index = this.indexOf(item);
        if (index !== -1) {
            this.removeAt(index);
        } else {
            throw new Error("Item not found");
        }
    }
    
    removeAt(index) {
        /**
         * Remove item at specified index.
         * @param {number} index - Index to remove from
         */
        if (index < 0 || index >= this._size) {
            throw new Error("Index out of range");
        }
        
        // Shift elements to the left
        for (let i = index; i < this._size - 1; i++) {
            this._data[i] = this._data[i + 1];
        }
        
        this._size--;
        delete this._data[this._size]; // Clean up
    }
    
    indexOf(item) {
        for (let i = 0; i < this._size; i++) {
            if (this._data[i] === item) {
                return i;
            }
        }
        return -1;
    }
    
    get length() {
        return this._size;
    }
    
    get(index) {
        if (index < 0 || index >= this._size) {
            throw new Error("Index out of range");
        }
        return this._data[index];
    }
    
    toString() {
        const elements = [];
        for (let i = 0; i < this._size; i++) {
            elements.push(this._data[i]);
        }
        return `[${elements.join(', ')}]`;
    }
}

// Usage
const arr = new DynamicArray();
for (let i = 0; i < 5; i++) {
    arr.append(i * 2);
}
console.log(`Array: ${arr.toString()}`); // [0, 2, 4, 6, 8]
```

## Error Handling

Error handling helps programs gracefully manage unexpected situations.

### Basic Exception Handling
```javascript
function safeDivide(a, b) {
    /**
     * Safely divide two numbers with error handling.
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number|null} Result or null on error
     */
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError("Both arguments must be numbers!");
        }
        
        if (b === 0) {
            throw new Error("Cannot divide by zero!");
        }
        
        return a / b;
    } catch (error) {
        if (error instanceof TypeError) {
            console.log(`Type Error: ${error.message}`);
        } else if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Unexpected error: ${error}`);
        }
        return null;
    } finally {
        console.log("Division operation completed.");
    }
}

// Examples
console.log(safeDivide(10, 2));     // 5
console.log(safeDivide(10, 0));     // Error: Cannot divide by zero!
console.log(safeDivide(10, "2"));   // Type Error: Both arguments must be numbers!

async function readFileAsync(filename) {
    /**
     * Simulate reading a file with error handling.
     */
    try {
        // Simulate file operation
        if (filename === "nonexistent.txt") {
            throw new Error(`File '${filename}' not found`);
        }
        
        if (filename === "restricted.txt") {
            throw new Error(`Permission denied to read '${filename}'`);
        }
        
        // Simulate successful read
        return `Contents of ${filename}`;
    } catch (error) {
        console.log(`File operation failed: ${error.message}`);
        return null;
    }
}

// Usage with async/await
async function testFileRead() {
    const result1 = await readFileAsync("document.txt");
    const result2 = await readFileAsync("nonexistent.txt");
    console.log(result1); // Contents of document.txt
    console.log(result2); // null
}

testFileRead();
```

### Custom Error Classes
```javascript
class InsufficientFundsError extends Error {
    /**
     * Custom error for banking operations.
     */
    constructor(balance, amount) {
        super(`Insufficient funds: Balance ${balance}, Attempted ${amount}`);
        this.name = 'InsufficientFundsError';
        this.balance = balance;
        this.amount = amount;
    }
}

class InvalidAmountError extends Error {
    constructor(amount) {
        super(`Invalid amount: ${amount}. Amount must be positive.`);
        this.name = 'InvalidAmountError';
        this.amount = amount;
    }
}

class BankAccount {
    /**
     * Bank account with custom error handling.
     */
    
    constructor(initialBalance = 0) {
        this.balance = initialBalance;
    }
    
    withdraw(amount) {
        /**
         * Withdraw money with custom exceptions.
         * @param {number} amount - Amount to withdraw
         * @returns {number} New balance
         */
        if (amount <= 0) {
            throw new InvalidAmountError(amount);
        }
        
        if (amount > this.balance) {
            throw new InsufficientFundsError(this.balance, amount);
        }
        
        this.balance -= amount;
        return this.balance;
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new InvalidAmountError(amount);
        }
        
        this.balance += amount;
        return this.balance;
    }
}

// Usage with custom exceptions
const account = new BankAccount(100);

try {
    account.withdraw(150);
} catch (error) {
    if (error instanceof InsufficientFundsError) {
        console.log(`Transaction failed: ${error.message}`);
        console.log(`Available balance: ${error.balance}`);
    } else if (error instanceof InvalidAmountError) {
        console.log(`Invalid transaction: ${error.message}`);
    } else {
        console.log(`Unexpected error: ${error.message}`);
    }
}

// Promise-based error handling
function asyncOperation(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Async operation failed"));
            } else {
                resolve("Async operation succeeded");
            }
        }, 1000);
    });
}

// Using promises
asyncOperation(false)
    .then(result => console.log(result))
    .catch(error => console.error(`Promise rejected: ${error.message}`));

// Using async/await
async function handleAsyncOperation() {
    try {
        const result = await asyncOperation(true);
        console.log(result);
    } catch (error) {
        console.error(`Async error: ${error.message}`);
    }
}

handleAsyncOperation();
```

---

## File I/O and APIs

JavaScript handles file operations and API requests differently in browsers vs Node.js environments.

### Browser File Operations
```javascript
// File input handling in browser
function setupFileHandler() {
    /**
     * Set up file input handler for browser.
     */
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.json,.csv';
    
    fileInput.addEventListener('change', handleFileSelect);
    document.body.appendChild(fileInput);
}

function handleFileSelect(event) {
    /**
     * Handle file selection in browser.
     */
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const content = e.target.result;
        console.log('File content:', content);
        
        // Process different file types
        if (file.name.endsWith('.json')) {
            try {
                const jsonData = JSON.parse(content);
                console.log('Parsed JSON:', jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
            }
        }
    };
    
    reader.onerror = function(e) {
        console.error('Error reading file:', e.target.error);
    };
    
    reader.readAsText(file);
}

// Download file in browser
function downloadFile(content, filename, contentType = 'text/plain') {
    /**
     * Download content as file in browser.
     * @param {string} content - Content to download
     * @param {string} filename - Name of file
     * @param {string} contentType - MIME type
     */
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

// Example: Create and download JSON file
const sampleData = {
    students: [
        { name: "Alice", grade: "A", age: 20 },
        { name: "Bob", grade: "B", age: 19 }
    ],
    course: "JavaScript Programming",
    date: new Date().toISOString()
};

// downloadFile(JSON.stringify(sampleData, null, 2), 'students.json', 'application/json');
```

### Fetch API for HTTP Requests
```javascript
// GET request
async function fetchUserData(userId) {
    /**
     * Fetch user data from API.
     * @param {number} userId - User ID
     * @returns {Object|null} User data or null on error
     */
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        return null;
    }
}

// POST request
async function createPost(title, body, userId) {
    /**
     * Create a new post via API.
     * @param {string} title - Post title
     * @param {string} body - Post content
     * @param {number} userId - User ID
     * @returns {Object|null} Created post or null on error
     */
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                body,
                userId
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newPost = await response.json();
        console.log('Created post:', newPost);
        return newPost;
    } catch (error) {
        console.error('Error creating post:', error.message);
        return null;
    }
}

// Using the functions
async function demonstrateAPI() {
    // Fetch user
    const user = await fetchUserData(1);
    if (user) {
        console.log('User name:', user.name);
        console.log('User email:', user.email);
    }
    
    // Create post
    const post = await createPost(
        'My First Post',
        'This is the content of my first post!',
        1
    );
}

// demonstrateAPI();

// Working with multiple requests
async function fetchMultipleUsers(userIds) {
    /**
     * Fetch multiple users concurrently.
     * @param {number[]} userIds - Array of user IDs
     * @returns {Object[]} Array of user objects
     */
    try {
        const promises = userIds.map(id => fetchUserData(id));
        const users = await Promise.all(promises);
        return users.filter(user => user !== null);
    } catch (error) {
        console.error('Error fetching multiple users:', error.message);
        return [];
    }
}

// Usage
// fetchMultipleUsers([1, 2, 3]).then(users => {
//     console.log('Fetched users:', users.map(u => u.name));
// });
```

### Local Storage and Session Storage
```javascript
class StorageManager {
    /**
     * Utility class for browser storage operations.
     */
    
    static saveToLocalStorage(key, data) {
        /**
         * Save data to localStorage.
         * @param {string} key - Storage key
         * @param {*} data - Data to save
         */
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            console.log(`Data saved to localStorage with key: ${key}`);
        } catch (error) {
            console.error('Error saving to localStorage:', error.message);
        }
    }
    
    static loadFromLocalStorage(key) {
        /**
         * Load data from localStorage.
         * @param {string} key - Storage key
         * @returns {*} Parsed data or null
         */
        try {
            const jsonData = localStorage.getItem(key);
            if (jsonData === null) {
                console.log(`No data found for key: ${key}`);
                return null;
            }
            return JSON.parse(jsonData);
        } catch (error) {
            console.error('Error loading from localStorage:', error.message);
            return null;
        }
    }
    
    static removeFromLocalStorage(key) {
        /**
         * Remove data from localStorage.
         * @param {string} key - Storage key
         */
        try {
            localStorage.removeItem(key);
            console.log(`Data removed from localStorage for key: ${key}`);
        } catch (error) {
            console.error('Error removing from localStorage:', error.message);
        }
    }
    
    static clearLocalStorage() {
        /**
         * Clear all localStorage data.
         */
        try {
            localStorage.clear();
            console.log('All localStorage data cleared');
        } catch (error) {
            console.error('Error clearing localStorage:', error.message);
        }
    }
}

// Example usage
const studentData = {
    name: "Alice Johnson",
    courses: ["Math", "Physics", "Chemistry"],
    gpa: 3.8,
    lastLogin: new Date().toISOString()
};

// Save and load data
StorageManager.saveToLocalStorage('currentStudent', studentData);
const loadedStudent = StorageManager.loadFromLocalStorage('currentStudent');
console.log('Loaded student:', loadedStudent);

