// Task 1
let classA = [
    'An', 'Binh', 'Chi'
]
let classB = classA
classB[0] = 'An Updated'
console.log(classA)
/* The name "An" in classA changed because classA and classB point to the same memory address.
When classB was created from classA, both variables referenced the same array in memory (0x01).
Therefore, changing the value at index 0 using classB also affected classA.*/

// Task2
// Addition = 102 because JavaScript performs type coercion.
// It converts the number 2 to a string, so "10" + "2" results in "102".

// When using the `-` operator, JavaScript first tries to convert to a string; if it cannot, it automatically converts to a number, so the result is 8.

// The result is `NaN` because JavaScript tries the two type conversion methods, and if it cannot convert the values to numbers, it returns this result.

//Task 3
let age
let mathScore
let isVip
age = 9
mathScore = 10
isVip = false
let canEnter = (age >= 10 && mathScore > 7) || isVip
console.log(canEnter)
age = 9
mathScore = 10
isVip = true
canEnter = (age >= 10 && mathScore > 7) || isVip
console.log(canEnter)
// Logic
// Yes, The sane result

// Task 4
// laptop.brand = Apple
// laptop.brand = 16GB
// // It affects the original laptop object because both variables reference the same memory location


