module.exports = (input) => {
  let points = input.split('\n')
    .map(r => {
      const [_, x, y, vx, vy] = r.match(/position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/)
      return { x: parseInt(x), y: parseInt(y), vx: parseInt(vx), vy: parseInt(vy) }
    })

  const movePoints = (by) => {
    for (let point of points) {
      point.x += point.vx * by
      point.y += point.vy * by
    }
  }

  const render = () => {
    let s = ''
    let lowestY = Math.min(...points.map(p => p.y))
    let highestY = Math.max(...points.map(p => p.y))
    let lowestX = Math.min(...points.map(p => p.x))
    let highestX = Math.max(...points.map(p => p.x))
    for (let i = lowestY; i <= highestY; i++) {
      for (let j = lowestX; j <= highestX; j++) {
        let point = points.find(p => p.x === j && p.y === i)
        s += point ? '#' : '.'
      }
      s += '\n'
    }
    return s
  }

  let lastBoundingArea = Infinity
  for (let i = 0; i < 100000; i++) {
    movePoints(1)

    let lowestY = Math.min(...points.map(p => p.y))
    let highestY = Math.max(...points.map(p => p.y))
    let lowestX = Math.min(...points.map(p => p.x))
    let highestX = Math.max(...points.map(p => p.x))
    let height = highestY - lowestY
    let width = highestY - lowestY
    let boundingArea = width * height

    if (boundingArea > lastBoundingArea) {
      movePoints(-1)
      return render()
      break
    }
    lastBoundingArea = boundingArea
  }
}
