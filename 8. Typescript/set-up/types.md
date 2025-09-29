 in TypeScript:

a type is a label that describes the different properties and methods that a value has
every value has a type.

TypeScript inherits the built-in types from JavaScript. TypeScript types are categorized into:

Primitive types.
Object types.

Primitive types
The following illustrates the primitive types in TypeScript:

Name	Description
string	Represent text data.
number	Represent numeric values.
boolean	Have true and false values.
null	Have one value: null.
undefined	Have one value: undefined. It is the default value of an uninitialized variable.
symbol	Represent a unique constant value.
Object types
Object types are functions, arrays, classes, etc. Later, you’ll learn how to create custom object types.

Purposes of types in TypeScript
There are two main purposes of types in TypeScript:

First, types are used by the TypeScript compiler to analyze your code for errors.
Second, types allow you to understand what values are associated with variables.

Summary
In TypeScript, every value is associated with a type.
A type is a label that describes the properties and methods that a value has.
TypeScript compiler uses types to analyze your code for hunting bugs and errors.


Type annotations in variables and constants
The following syntax shows how to specify type annotations for variables and constants:

let variableName: type;
let variableName: type = value;
const constantName: type = value;
Code language: JavaScript (javascript)
In this syntax, the type annotation comes after the variable or constant name and is preceded by a colon (:).

The following example uses number annotation for a variable:

let counter: number;

You can both use a type annotation for a variable and initialize it in a single statement like this:

let counter: number = 1;

Type annotation examples
Arrays
To annotate an array type you use a specific type followed by a square bracket : type[] :

let arrayName: type[];
Code language: JavaScript (javascript)
For example, the following declares an array of strings:

let names: string[] = ['John', 'Jane', 'Peter', 'David', 'Mary'];
Code language: JavaScript (javascript)
Objects
To specify a type for an object, you use the object type annotation. For example:

let person: {
  name: string;
  age: number;
};

person = {
  name: 'John',
  age: 25,
}; // valid
Code language: JavaScript (javascript)
In this example, the person object only accepts an object that has two properties: name with the string type and age with the number type.

Function arguments & return types
The following shows a function annotation with parameter type annotation and return type annotation:

let greeting : (name: string) => string;
Code language: JavaScript (javascript)
In this example, you can assign any function that accepts a string and returns a string to the greeting variable:

greeting = function (name: string) {
    return `Hi ${name}`;
};
Code language: JavaScript (javascript)
The following causes an error because the function that is assigned to the greeting variable doesn’t match its function type.

greeting = function () {
    console.log('Hello');
};