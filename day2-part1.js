module.exports = (input) => {
  let twos = 0
  let threes = 0
  let ids = input.split('\n')

  for (let id of ids) {
    let split = id.split('').sort()
    let two = false
    let three = false

    for (let i = 0; i < split.length; i++) {
      if (split[i] === split[i + 1]) {
        if (split[i] === split[i + 2]) {
          three = true
          i += 2
        } else {
          two = true
          i += 1
        }
      }
    }

    if (two) twos++
    if (three) threes++
  }

  return twos * threes
}
