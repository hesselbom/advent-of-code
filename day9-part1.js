module.exports = (amountPlayers, lastMarblePoints) => {
  let marbles = [0]
  let player = -1
  let current = 0
  let lowestRemaining = 1
  let scores = Array.from({ length: amountPlayers }, _ => 0)

  for (let i = 0; i < lastMarblePoints; i++) {
    player = ++player % amountPlayers
    if (lowestRemaining % 23 === 0) {
      scores[player] += lowestRemaining
      let removeAt = current - 7
      if (removeAt < 0) removeAt += marbles.length
      scores[player] += marbles.splice(removeAt, 1)[0]
      current = removeAt
      lowestRemaining++
    } else {
      current = ((current + 1) % (marbles.length)) + 1
      marbles.splice(current, 0, lowestRemaining++)
    }
  }

  return Math.max(...scores)
}
