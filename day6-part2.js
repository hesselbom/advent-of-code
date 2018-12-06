module.exports = (maxSum, input) => {
  const coordinates = input.split('\n').map(s => ({
    x: parseInt(s.split(', ')[0]),
    y: parseInt(s.split(', ')[1])
  }))
  const lowestX = coordinates.reduce((res, cur) => cur.x < res ? cur.x : res, Infinity)
  const lowestY = coordinates.reduce((res, cur) => cur.y < res ? cur.y : res, Infinity)
  const highestX = coordinates.reduce((res, cur) => cur.x > res ? cur.x : res, 0)
  const highestY = coordinates.reduce((res, cur) => cur.y > res ? cur.y : res, 0)

  let region = 0

  for (let x = lowestX; x < highestX; x++) {
    for (let y = lowestY; y < highestY; y++) {
      let totalDist = 0

      for (let coord of coordinates) {
        totalDist += Math.abs(coord.x - x) + Math.abs(coord.y - y)
        if (totalDist >= maxSum) break
      }

      if (totalDist < maxSum) region++
    }
  }

  return region
}
