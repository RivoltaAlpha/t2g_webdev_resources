let message: string = 'hello world'
console.log(message);

// Type Annotation 
let counter: number;
counter = 1;

let countera: number = 1

// array
// let array: type[];
let array1: string[] = ['tiff', 'steve'];

// objects
let person: {
    name: string,
    age: number,
}

person = {
    name: 'tiff',
    age: 22,
}

//functions
let greeting: (name: string) => string;
greeting = (name:string) => {
    return`Hi ${name} `
}