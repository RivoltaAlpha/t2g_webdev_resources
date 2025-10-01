let array1 = [1,2,3,4,5,6];
// actual length -1 

let fruits = ["apples","mangoes","Bananas"];
let mixedarray = ["apples","mangoes","Bananas",1,2,3,4,5,6, true, null];

console.log(fruits.length);
console.log(fruits[1])

// sort,search, pop, combine, map, filter, find, reduce, remove and 

// Objects 
// key - value
let person = {
    name: "jack",
    gender: "male",
    age: 5,
    isAStudent: false
};

products = [{
    id: 1,
    item: "tomatoes",
},{},{}];

console.log("our object person is", person.name);

// Dates, Sets Maps
// Dates
let now = new Date();
let myBirthday = new Date("2000-04-22");

console.log(myBirthday.getFullYear());
console.log(myBirthday.getMonth());
console.log(myBirthday.getDate());
console.log(myBirthday.getDay());

// sets 
let numbers = new Set([1,2,3,3,4,5,6,6,6,6,6]);
console.log(numbers);

// Maps 
let students = new Map()
students.set("tiff", "classrep")
students.set("dan", "president")
students.set("asha", 15)
