// Lesson 1
function scoreStudents(score) {
    if (score < 0 || score > 10) {
        console.log("Invalid score!")
        return
    }
    if (score >= 9) {
        return ("Excellent")
    } else if (score >= 8) {
        return ("Very Good")
    } else if (score >= 6.5) {
        return ("Good")
    } else if (score >= 5) {
        return ("Average")
    } else {
        return ("Weak")
    }
}

console.log(scoreStudents(5.5))

// Lesson 2
function daysInMonth(month) {
    let days
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31
            break
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30
            break
        case 2:
            days = 28
            break
        default:
            return 'Month not available'
    }
    return days
}

console.log(daysInMonth(1))

// Lesson 3
let n = 21
const checkEvenOdd = n % 2 === 0 ? 'even' : 'odd'
console.log(checkEvenOdd)

// Lesson 4
let age = 13
let ticketPrice = age < 13 ? 100000 * (50 / 100) : 100000
console.log(ticketPrice)

// Lesson 5
function convertTemp(celsius) {
    return celsius * 1.8 + 32
}
console.log(convertTemp(25))

// Lesson 6

function calculatorElectricBill(kWh) {
    let totalBill
    if (kWh <= 50) {
        totalBill = kWh * 1678
    } else if (kWh <= 100) {
        totalBill = 50 * 1678 + (kWh - 50) * 1734
    } else if (kWh <= 200) {
        totalBill = 50 * 1678 + 50 * 1734 + (kWh - 100) * 2014
    } else {
        totalBill = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kWh - 200) * 2536
    }
    return totalBill
}
console.log(calculatorElectricBill(235))

