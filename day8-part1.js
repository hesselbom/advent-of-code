module.exports = (input) => {
  const numbers = input.split(' ').map(n => parseInt(n))
  let i = 0
  let total = 0

  const followNode = () => {
    let childNodes = numbers[i++]
    let metadataEntries = numbers[i++]

    for (let j = 0; j < childNodes; j++) {
      followNode()
    }

    for (let j = 0; j < metadataEntries; j++) {
      total += numbers[i++]
    }
  }

  followNode()

  return total
}
