// // let, var, const

let x: number = 10;
var y: number = 6;
const myname: string = "Tiffany"

// Types
let isActive: boolean = false;
let isNotActive: boolean = true;

let our_any_value: any = 4;
our_any_value = "yes"// okay
our_any_value = true;

// functions

function eat(food: string): string {
    return `I am eating ${food}`
}

function eating(food: number): string {
    const totalNumberOfFoods = `I am eating ${food} Chapatis`
    return totalNumberOfFoods;
}

const myfood = eat('Chapati')
// console.log(myfood)

const totalNumber = eating(5)
console.log(totalNumber)

//void
function my_void_func(message: string): void {
    console.log(message)
}

my_void_func('My return type is void')

// // never 
function throwError(message: string): never {
    throw new Error(message)
}

// // Loops

let age: number = 20;

if (age >= 18){
    console.log('Adult');
} else if (age >= 13) {
    console.log('You are a teenager!')
} else {
    console.log('You are just a kid😂!')
}

// objects

let person_y: {
    name: string;
    age: number;
    gender: string;
    is_student?: boolean;
    location?: {
        address: string;
        street: string;
        zipCode: number;
    }
}

person_y = {
    name: 'Tiffany',
    age: 20,
    gender: 'female'
}

// // Arrays Typed

let numbers: number[] = [1,3,4,5,5]; //op 1
let number_list: Array<number> = [2,3,4,5,6]; //op 2

let names: string[] = ["tiff", 'dan', 'Asha'];
let names_list: Array<string> = ['Debbie','max']

names_list.push("victor")
console.log(names_list)

// Tuples 

let student: [name: string, regno: number, course: string]
student = ['Tiffany', 12, 'Computer Science']

// Interfaces

interface Product {
    id: number;
    name: string;
    price: number;
    tag?: string;
    description?: {
        local_name: string;
        ingr: string;
    }
}

function getProduct(id: number): Product {
  return {
    id: id,
    name: `Awesome Gadget ${id}`,
    price: 99.5
  }
}

interface Person {
    name: string;
    age: number;
    gender: string;
    location?: {
        address: string;
        street: string;
        zipCode: number;
    }
}

interface Employee extends Person {
    employee_id: number;
    department: string;
}

let employee: Employee = {
    name: "Jane",
    age: 25,
    gender: 'female',
    employee_id:1,
    department: 'sales'
}

// Type Aliases - primitives, unions, tuples 
// Basic alias
type student_reg_no = number | string;

let my_reg: student_reg_no = 'ct101/g/12438/21';
let their_reg: student_reg_no = 6;

// object alias
type student = {
    name: string;
    uni: string;
};

let student_details = {
    name: 'Tiffany',
    uni: 'Chuka'
}

// Union Types
type status = "pending" | "confirmed" | "rejected";
let my_order: status = "confirmed"

type User = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | "user" | "manager";
    home_info?: {
        address: string;
        street: string;
        zipCode: number;
    };
};

let currentUser: User = {
    id:1,
    name: "yuab",
    email: "mwt@gamil.com",
    role: "admin",
}

type tuples = [number, string];