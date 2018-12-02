const oneDiff = (a, b) => {
  let diffAt = -1
  for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) !== b.charAt(i)) {
      if (diffAt > -1) return false
      diffAt = i
    }
  }
  if (diffAt > -1) {
    let str = ''
    for (let i = 0; i < a.length; i++) {
      if (i !== diffAt) {
        str += a.charAt(i)
      }
    }
    return str
  }
}

module.exports = (input) => {
  let twos = 0
  let threes = 0
  let ids = input.split('\n')

  for (let a of ids) {
    for (let b of ids) {
      let diff = oneDiff(a, b)
      if (diff) return diff
    }
  }
}
