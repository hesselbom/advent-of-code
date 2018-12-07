module.exports = (input) => {
  const re = /Step (\w) must be finished before step (\w)/g
  let instr
  let map = new Map()
  let sorted = ''

  while ((instr = re.exec(input)) != null) {
    const [_, dep, step] = instr
    const _step = (map.get(step) || { children: [], parents: [] })
    const _dep = (map.get(dep) || { children: [], parents: [] })

    _step.parents.push(dep)
    _dep.children.push(step)

    map.set(dep, _dep)
    map.set(step, _step)
  }

  let available = Array.from(map.entries())
    .filter(a => a[1].parents.length === 0)
    .map(a => a[0])
    .sort()

  while (available.length) {
    let c = available.shift()
    sorted += c
    available = available
      .concat(map.get(c).children)
      // Filter if not all deps are in sorted
      .filter(c2 => !map.get(c2).parents.find(p => sorted.indexOf(p) === -1))
      .sort()
  }

  return sorted
}
