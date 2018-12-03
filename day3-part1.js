module.exports = (input) => {
  let claims = input.split('\n')
  let map = new Map()
  let overlaps = 0
  let re = /(\d+),(\d+): (\d+)x(\d+)/

  for (let claim of claims) {
    let [_, x, y, w, h] = claim.match(re)

    x = parseInt(x)
    y = parseInt(y)
    w = parseInt(w)
    h = parseInt(h)

    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        let key = i + ',' + j
        let amount = map.get(key) || 0

        if (amount === 1) {
          overlaps++
        }

        map.set(key, amount + 1)
      }
    }
  }

  return overlaps
}
