// Lesson 1
isPrime = (n) => {
    if (typeof n !== "number" || isNaN(n) || n <= 1) {
        return false
    }
    for (let i = 2; i <= n ** 0.5; i++) {
        if (n % i === 0)
            return false
    }
    return true
}
console.log(isPrime(11))

// Lesson 2
isPerfectNumber = (n) => {
    if (typeof n !== "number" || isNaN(n) || n <= 1) {
        return false
    }
    let sum = 0
    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            sum += i
        }
    }
    return sum === n
}
console.log(isPerfectNumber(18))