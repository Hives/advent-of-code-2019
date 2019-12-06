const digits = n => {
    let temp = n
    const output = []

    while (temp > 0) {
        const d = temp % 10
        temp = Math.trunc(temp/10)
        output.push(d)
    }

    return output.reverse()
}

module.exports = digits
