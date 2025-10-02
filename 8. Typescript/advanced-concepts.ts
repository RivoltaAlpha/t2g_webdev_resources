// Unions & Intersection Types

// Union Types - multiple types
type statuses = "pending" | "confirmed" | "rejected";
let my_current_order: statuses = "confirmed";

type Users = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "manager";
  home_info?: {
    address: string;
    street: string;
    zipCode: number;
  };
};

let currentUsers: Users = {
  id: 1,
  name: "yuab",
  email: "mwt@gamil.com",
  role: "admin",
};

let sample_union: string | number; // allowed to hold a sting or a number
sample_union = 5;
sample_union = "coding";

function weAreLearning(subject: string | number) {
  if (typeof subject === "string") {
    console.log("I am a string");
  } else {
    console.log("I can also be a number");
  }
}

weAreLearning("Typescript");
weAreLearning(5);

// Intersections -combining multiple types
interface Class {
  class_name: string;
  capacity: number;
  location: string;
  is_available: boolean;
}

interface Lecturer {
  lec_name: string;
  id: number;
  unit: string;
}

type Unit = Class & Lecturer;

const unit: Unit = {
  lec_name: "string",
  id: 1,
  unit: "string",
  class_name: "string",
  capacity: 50,
  location: "string",
  is_available: true
}

// Functions Types
let myArrowFunc: (name: string) => string;

myArrowFunc = function(name: string): string {
    return `Hello ${name}`
}

// parameters 
// function getProductWithId(id: number): Products {
//   return {
//     id: id,
//     name: `Awesome Gadget ${id}`,
//     price: 99.5
//   }
// }

// Callbacks
type Callback = (result:string) => void;

function fetchMyData(callback: Callback): void {
    setTimeout(() => {
        callback("Data Received from the API")
    }, 1000);
}

// use the callback
fetchMyData((result) => {
    console.log(result)
}
)

// promises 
function fetchUserData(): Promise<{id: number; name:string}> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id:1, name:"Ty"});
        }, 1000);
    });
}

fetchUserData()
    .then(user => console.log(user.name))
    .catch(error => console.error(error));


// asnc/await
async function getUser(user_id: number) {
    const response = await fetch(`/api/users/${user_id}`);
    const data = await response.json();
    return data;
}

// const users_id = localStorage.getItem('user')
const users_id = 1;

async function safeGetUser(id:number): Promise<User | null> {
    try {
        const user = await getUser(id);
        return user;
    } catch (error) {
        console.error('Failed to fetch Users', error);
        return null;
    }
}

safeGetUser(users_id);

// using async await fnc
async function main() {
    const user = await getUser(1);
    console.log(user);
}

// Typecasting - treat a value as a specific type 
let axyz: any = "Anything you want it to be";
let length_of_string: number = (<string>axyz).length;
console.log(length_of_string)

let bxyz: number = (axyz as string).length;
console.log(bxyz)

const input = document.getElementById("username") as HTMLInputElement;
input.value = "Tiff"; 

// omit 
interface OurUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | "user" | "manager";
    home_info?: {
        address: string;
        street: string;
        zipCode: number;
    };
    created_at: Date;
    updated_at: Date;
};

type FilteredUser = Omit<OurUser,'password' | 'created_at' | 'updated_at'>
type UpdateUser = Partial<Omit <OurUser, "id" | 'created_at'>>
type OtherUpdatedUser = Partial<OurUser>

let currentUser: FilteredUser = {
    id:1,
    name: "yuab",
    email: "mwt@gamil.com",
    role: "admin",
}

// Generics
function identity<T> (arg: T): T {
    return arg;
}

let gen1 = identity<string> ('hello');
console.log(gen1);
let gen2 = identity<number> (22);
console.log(gen2);
let gen3 = identity<boolean> (true);
console.log(gen3);
let gen4 = identity("string")
console.log(gen4);

function ourArray<T>(arr: T[]): T | undefined {
    return arr[0];
}

let gen_arr1 = ourArray([1,2,3,3,5]);
console.log(gen_arr1);

let gen_arr2 = ourArray(["a", "b", "c"]);
console.log(gen_arr2);

interface genInterface<T>{
    value: T;
    getValue(): T;
    setValue(val: T) : void;
}

// Generic Interface
class Box <T> implements genInterface<T>{
    constructor (public value: T) {}

    getValue(): T {
        return this.value
    }
    setValue(val: T): void {
        this.value = val;
    }
}

// API Responses generic Interface
interface ApIRes <T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: number;
    name: string;
}

const UserResponse: ApIRes <User>= {
    data: {
        id: 1,
        name: 'Tiff'
    },
    status: 200,
    message: "Data fetched"
};

const UsersResponse: ApIRes <User[]>= {
    data: [
        {id: 1,name: 'Tiff'},
        {id: 2,name: 'Tiff'},
        {id: 3,name: 'Tiff'},
        {id: 4,name: 'Tiff'}
    ],
    status: 200,
    message: "Data fetched"
};



// class generic
class DataStorage <T> {
    private data: T[] = [];

    addItem(item: T): void {
        this.data.push(item);
    }

    removeItem(item: T): void {
        this.data = this.data.filter(i => i !== item);
    }

    getItems(): T[] {
        return [...this.data]
    }
}

const text = new DataStorage<string>();
text.addItem('hello');
text.addItem('world');

const number = new DataStorage<number>();
number.addItem(1);
number.addItem(23);

