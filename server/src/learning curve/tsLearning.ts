// import keys from "./config/keys";

//variables

// let firstName = "Adham";
// console.log(firstName);

//functions

// function greeting(firstName: string) {
//     return `Hello ${firstName}`
// }

// function greeting2(firstName: string, lastName?: string) {
//     if(lastName) return `Hello ${firstName} ${lastName}`
//     else return `Hello ${firstName}`
// }

// console.log(greeting("Adham"));
// console.log(greeting2("Adham", "Muzaffarov"));

//Unions:

// function checkType(arg: number | string) {
//     if(typeof arg === "number") return "The value is number"
//     else return "The value is string"
// }

// console.log(checkType("ADham"));

// Type Aliases:

// type Arg = {
//     firstName: string,
//     lastName: string,
//     age: number,
//     interests: string[]
// }

// function details(x: Arg) {
//     return `My full name is ${x.firstName} ${x.lastName}. I'm ${x.age} years old. My interests are ${x.interests.join(",")}`
// } 

// console.log(details(
//     {firstName: "Adham", 
//     lastName: "Muzaffarov", 
//     age: 21, 
//     interests: ["programming", "anime"]}
// ));

// Interfaces:

// interface Arg {
//     firstName: string,
//     lastName: string,
//     age: number,
//     interests: string[]
// }

// function details(x: Arg) {
//     return `My full name is ${x.firstName} ${x.lastName}. I'm ${x.age} years old. My interests are ${x.interests.join(",")}`
// } 

// console.log(details(
//     {firstName: "Adham", 
//     lastName: "Muzaffarov", 
//     age: 21, 
//     interests: ["programming", "anime"]}
// ));

// Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

// interface Person {
//     firstName: string;
// }

// interface Person {
//     lastName?: string;
// }

// const Adham: Person =  {firstName: "Adham"}
// console.log(Adham);

// Arrays:

// let colors: string[] = ["red", "blue", "green"];
// console.log(colors);

// let colors: Array<string> = ["red", "blue", "green"];
// console.log(colors);

//Narrowing:

// function padLeft(padding: number | string, input: string) {
//     if (typeof padding === "number") {
//       return " ".repeat(padding) + input;
//     }
//     return padding + input;
//   }

// console.log(padLeft(10, "aka"));

// Function Type Expressions

// function greeter(fn: (a: string) => void) {
//     fn("Hello");
// }
   
//   function printToConsole(a: string) {
//     console.log(a);
//   }
   
// greeter(printToConsole);

// function greeter(fn: () => void) {
//     fn();
// }
   
//   function printToConsole() {
//     console.log("Hello World2");
//   }
   
// greeter(printToConsole);

// interface StringArray {
//     [index: number]: string
// }

// const arr: StringArray = ["a", "b", "c"]
// console.log(arr[2]);

// interface Person {
//     firstName: string,
//     lastName: string,
//     age: number
// }

// interface AdminRole extends Person {
//     role: number
// }

// let admin: AdminRole = {
//     firstName: "Adham",
//     lastName: "Muzaffarov",
//     age: 22,
//     role: 1
// }

console.log(admin);














