const daynine = require('./day9-part2')

test('day 9 part 2', () => {
  expect(daynine(9, 25)).toBe(32)
  expect(daynine(10, 1618)).toBe(8317)
  expect(daynine(13, 7999)).toBe(146373)
  expect(daynine(17, 1104)).toBe(2764)
  expect(daynine(21, 6111)).toBe(54718)
  expect(daynine(30, 5807)).toBe(37305)

  console.log(daynine(428, 72061 * 100))
})
