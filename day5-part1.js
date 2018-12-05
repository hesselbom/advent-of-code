module.exports = (input) => {
  for (let i = 0; i < input.length - 1; i++) {
    let a = input.charAt(i)
    let b = input.charAt(i + 1)
    if (a.toLowerCase() === b.toLowerCase() && a !== b) {
      input = input.substr(0, i) + input.substr(2 + i)
      i -= 2
    }
  }
  return input.length
}
