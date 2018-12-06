module.exports = (input) => {
  const coordinates = input.split('\n').map(s => ({
    x: parseInt(s.split(', ')[0]),
    y: parseInt(s.split(', ')[1])
  }))
  let biggest = 0

  for (let i = 0; i < coordinates.length; i++) {
    const coord = coordinates[i]

    const checked = new Map()
    const toCheck = [coord]
    let area = 0

    while (toCheck.length) {
      const c = toCheck.pop()
      const infinite = !(
        coordinates.find(a => a !== c && a.x > c.x) &&
        coordinates.find(a => a !== c && a.y > c.y) &&
        coordinates.find(a => a !== c && a.x < c.x) &&
        coordinates.find(a => a !== c && a.y < c.y)
      )

      if (infinite) continue

      if (checked.has(`${c.x}x${c.y}`)) continue
      checked.set(`${c.x}x${c.y}`, true)

      const dist = Math.abs(coord.x - c.x) + Math.abs(coord.y - c.y)
      const closest = coordinates.findIndex(c2 => (
        c2 !== coord &&
        Math.abs(c2.x - c.x) + Math.abs(c2.y - c.y) <= dist
      ))

      if (closest === -1) {
        area += 1

        toCheck.push({ x: c.x - 1, y: c.y })
        toCheck.push({ x: c.x + 1, y: c.y })
        toCheck.push({ x: c.x, y: c.y - 1 })
        toCheck.push({ x: c.x, y: c.y + 1 })
      }
    }

    if (area > biggest) {
      biggest = area
    }
  }

  return biggest
}
