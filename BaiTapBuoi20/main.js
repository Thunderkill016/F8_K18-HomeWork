let name = "Hoang"
let age  = 24
let isStudent   = false
console.log("Name: " + name)
console.log("Age: " + age)
console.log("Is student: " + isStudent)

let a = 5
let b = 10
a = 20
b = 15
console.log(a,b)

// const is different from let because its value cannot be changed after initialization
// Use const when you do not want to change the value, such as constants or IDs
// The following code is incorrect because const cannot be reassigned after initialization

// Number
// Number
// Boolean
// Array
// Object
// Object
// Undefined
let student = {
    name: 'Hoang',
    age : 24,
    scores: [1, 2 , 3]
}
console.log(student)

let  numericValue = Number("1000")
let stringStatus = String(1000)
let isEnabled = String(true)
console.log(numericValue, typeof numericValue)
console.log(stringStatus, typeof stringStatus)
console.log(isEnabled, typeof isEnabled)

// False
// True
// False
// True
// False
// True

const numbers = [4, 3 , 1 , 5, 1]
console.log(numbers[0], numbers[4])
// When assigning a = numbers, both a and numbers reference the same memory location, so they are related to each other
