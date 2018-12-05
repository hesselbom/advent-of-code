const part1 = require('./day5-part1')

module.exports = (input) => {
  let lowest = Infinity
  for (let i = 65; i < 90; i++) {
    let unit = String.fromCharCode(i)
    let filtered = input.split('').filter(c => c.toUpperCase() !== unit).join('')
    let length = part1(filtered)
    if (length < lowest) lowest = length
  }
  return lowest
}
