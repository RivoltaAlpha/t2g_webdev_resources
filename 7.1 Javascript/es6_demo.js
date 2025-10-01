// // let, var, const 
// // loops, conditional statements 
// let x = 10;

// var y = 20;
// var y = 29;

// const xy = 34;

// // template literals
// function greet(name='Guest', greeting='Hello') {
//     return `${greeting}, ${name}`
// }

// console.log(greet())
// console.log(greet('Tiffany'))

// // Rest parameter 
// //  ...

// function sum(...numbers) {
//     return numbers.reduce((total,num) => total + num, 0);
// }

// console.log(sum(1,2,3,4,5))

// Spread operator
// ...
// const array1 = [1,2,3]
// const array2 = [4,5,6]
// const combinedArray = [...array1,...array2]
// console.log(combinedArray)

// // const user = id = 1, email, contact, location
// const name = "xv"  // -> xyz

// const formData  = [name, ...email, contact]


// // Destructuring
// const [a,b,c] = [1,2,3]
// console.log(a)
// console.log(b)
// console.log(c)

// // skip elements
// const [x,,z] = [1,2,3]
// console.log(x)
// console.log(z)

// //Rest Pattern
// const [head, ...tail ] = [1,2,3,4,5,6];
// console.log(head)
// console.log(tail)

// Objects
// const person = {
//     name: "tiff",
//     age: 20,
//     gender:"female"
// };

// const {name, age} = person;
// const x = {}


// console.log(name);
// console.log(age);

// const user = {
//     id: 1,
//     profile: {
//         username:"ty",
//         email: "mwt@gmail.com"
//     },
//     role: "User"
// }

// const {profile: {username, email}, id, role} = user;
// console.log(email);
// console.log(username)

// Modules
// imports exports 

// import from named exports 
// import { greeting } from "./intro.js"; 
// greeting();

// // alias
// import { greeting as newGreeting } from "./intro.js"; 
// newGreeting();

// // default 
// import greetTiff from "./intro.js";
// // call fnc
// const callfnc = greetTiff("Tiff");
// console.log(callfnc);

// classes 
// class Person {
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     greet() {
//         return `Hello my name is name${name}`
//     }
//     getAge() {
//         return `My age is ${age}`
//     }
// }

// => 
// Tradidtional Functions
// function sum(...numbers) {
//     return numbers.reduce((total,num) => total + num, 0);
// }

// const summation = (a,b) => {
//     console.log(a);
//     console.log(b);
// }

// summation(2,4);


// create a promise
const myPromise = new Promise((resolve,reject) => {
    const success = true;

    setTimeout(() => {
        if(success){
            resolve('Operation Is a go')
        } else {
            reject('Failed')
        }
    }, 1000);
});

//consume the promise
myPromise
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error(error)
});


// fetch data
function fetchUser(user_id) {
    const usersId = 1;
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if(user_id = usersId){
            resolve({id: user_id, name: 'Tiff'})
        } else {
            reject('Failed to fetch user')
        }
    }, 1000);  
    })
}


// errors 
fetchUser(24)
    .then(user => console.log(user))
    .catch(error => {
        console.error('Error found is:', error)
    })

async function getUser() {
    try {
        const user = await fetchUser(1)
        console.log(user)
    } catch (error) {
        console.log(error)
    } finally {
        console.log('Fnc executed ')
    }
}