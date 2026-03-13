function startCountdown(seconds) {
    let current = seconds

    const intervalId = setInterval(() => {
        if (current > 0) {
            console.log(current)
            current -= 1
            return
        }

        console.log("Hết giờ!")
        clearInterval(intervalId)
    }, 1000)
}

startCountdown(5)
