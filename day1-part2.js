module.exports = (input) => {
  let changes = input.split('\n')
  let value = 0
  let map = new Map()

  map.set(value, true)

  while (true) {
    for (let change of changes) {
      value = eval(value + change)
      if (map.has(value)) return value
      map.set(value, true)
    }
  }
}
