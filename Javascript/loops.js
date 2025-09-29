// Control flow statements
// If statements

// if(condition) {
//     // logic
// } else {
//     // then execute this
// }
// ==, <, >, =>, =<

let temp = 29;
if(temp > 23) {
    console.log("Today the weather is hot")
} else {
    console.log("Its cold")
}

if(temp > 19) {
    console.log("Today the weather is hot")
} else if (temp < 12 ) {
    console.log("Its really cold")
} else {
        console.log("The weather is fair")
}

// Switch statements syntax
// switch() {
//     case1 "case1": 
//         // logic
//         break;
//     case2 "case2": 
//         // logic        
//         break;
//     case3 "case3": 
//         // logic
//         break;
//     case4 "case4": 
//         // logic
//         break;
//     default:     // default case
//         console.log("conditions not met")
// }

let dayOfWeek = "Monday";

switch (dayOfWeek) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
        console.log("Its Saturday")
        break;
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular day");
}

// Loops
// while loop
// let i = 0;
// while(i <= 4) {
//     console.log("i is currently " + i);
//     i++;
// }

// for loops
for(let j = 0; j <= 5; j++) {
        console.log("j is currently " + j);
}