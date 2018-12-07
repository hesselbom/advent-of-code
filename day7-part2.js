module.exports = (workers, added, input) => {
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

  let counters = []
  let seconds = 0

  while (true) {
    if (available.length === 0 && counters.length === 0) break

    while (available.length && counters.length < workers) {
      let c = available.shift()
      counters.push({ c, timeLeft: c.charCodeAt(0) - 65 + added + 1 })
    }

    for (let counter of counters) {
      counter.timeLeft -= 1

      if (counter.timeLeft <= 0) {
        sorted += counter.c

        available = available
          .concat(map.get(counter.c).children)
          // Filter if not all deps are in sorted
          .filter(c2 => !map.get(c2).parents.find(p => sorted.indexOf(p) === -1))
          .sort()
      }
    }

    counters = counters.filter(counter => counter.timeLeft > 0)
    seconds += 1
  }

  return seconds
}
