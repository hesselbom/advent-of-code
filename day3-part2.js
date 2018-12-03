const intersects = (a, b) => (
  !(
    b.l > a.r ||
    b.r <= a.l ||
    b.t > a.b ||
    b.b <= a.t
  )
)

module.exports = (input) => {
  let claims = input.split('\n')
  let map = new Map()
  let re = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
  let squares = claims.map(claim => {
    let [_, id, x, y, w, h] = claim.match(re)

    return {
      id: parseInt(id),
      l: parseInt(x),
      r: parseInt(x) + parseInt(w),
      t: parseInt(y),
      b: parseInt(y) + parseInt(h)
    }
  })

  for (let a of squares) {
    let intersectsAny = false
    for (let b of squares) {
      if (a !== b && intersects(a, b)) {
        intersectsAny = true
        break
      }
    }
    if (!intersectsAny) return a.id
  }
}
