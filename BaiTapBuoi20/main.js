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

// const khác let là ko thay đổi được giá trị sau khi khởi tạo giá trị
// Dùng const khi ko muốn thay đổi giá trị vd như hằng số hoặc id
// Đoạn code sau sai vì const ko thể thay đổi giá trị sau khi khởi tạo

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
    scope: [1, 2 , 3]
}
console.log(student)

let d = Number("1000")
let e = String(1000)
let f = String(true)
console.log(d, typeof d)
console.log(e, typeof e)
console.log(f ,typeof f)

// False
// True
// False
// True
// False
// True

const numbers = [4, 3 , 1 , 5, 1]
console.log(numbers[0], numbers[4])
// Khi gán a = numbers, cả a và numbers cùng tham chiếu tới một vùng nhớ nên nó sẽ liên quan đến nhau