module.exports = (input) => {
  const numbers = input.split(' ').map(n => parseInt(n))
  let i = 0

  const followNode = () => {
    let childNodes = numbers[i++]
    let metadataEntries = numbers[i++]
    let value = 0
    let nodes = []

    for (let j = 0; j < childNodes; j++) {
      nodes.push(followNode())
    }

    for (let j = 0; j < metadataEntries; j++) {
      let entry = numbers[i++]

      if (childNodes === 0) value += entry
      else if (entry <= nodes.length) value += nodes[entry - 1]
    }

    return value
  }

  return followNode()
}
