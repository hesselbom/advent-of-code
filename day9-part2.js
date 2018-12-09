module.exports = (amountPlayers, lastMarblePoints) => {
  let current = { value: 0, prev: null, next: null }
  current.prev = current
  current.next = current
  let player = -1
  let scores = Array.from({ length: amountPlayers }, _ => 0)

  for (let i = 1; i <= lastMarblePoints; i++) {
    player = ++player % amountPlayers

    if (i % 23 === 0) {
      for (let j = 0; j < 7; j++) {
        current = current.prev
      }
      current.prev.next = current.next
      current.next.prev = current.prev
      scores[player] += i + current.value
      current = current.next
    } else {
      let newCurrent = { value: i, prev: current.next, next: current.next.next }
      current.next.next.prev = newCurrent
      current.next.next = newCurrent
      current = newCurrent
    }
  }

  return Math.max(...scores)
}
