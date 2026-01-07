// Lesson 1
 const getTriangleType =  (a, b, c)=> {
     if (typeof a !== "number" || isNaN(a) ||
         typeof b !== "number" || isNaN(b) ||
         typeof c !== "number" || isNaN(c) ||
         a <= 0 || b <= 0 || c <= 0) {
         return "Invalid input";
     }

    if (a + b <= c || a + c <= b || b + c <= a) {
        return "Not a triangle"
    }

     const a2 = a * a;
     const b2 = b * b;
     const c2 = c * c;

    if (a === b && b === c ) {
        return "Equilateral triangle"
    }
    else if (a2 === b2  + c2 || b2 === a2 + c2 || c2 === a2 + b2) {
        return "Right triangle"
    }
    else if (a === b || a === c || b === c) {
        return "Isosceles triangle";
    }
    else {
         return "Scalene triangle"
    }
}
console.log(getTriangleType(5, 5, 7))

// Lesson 2
const isPerfectSquare = (a) => {
    if (typeof a !== "number" || isNaN(a)) {
        return "Invalid input";
    }

    if (a < 0 ) {
        return "Not perfect square"
    }
    const squareRoot = a ** 0.5
    if (Number.isInteger(squareRoot)) {
        return "Is a perfect square"
    }
    else {
        return "Is not a perfect square"
    }
}
console.log(isPerfectSquare(25))