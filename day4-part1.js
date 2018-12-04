const BEGINS = 1
const FALLS_ASLEEP = 2
const WAKES_UP = 3

module.exports = (input) => {
  let re = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)/
  let guardRe = /Guard #(\d+)/
  let guards = new Map()
  let guardId
  let logs = input.split('\n').map(s => {
    let guard
    let [_, year, month, date, hour, minute, msg] = s.match(re)
    let type = (
      msg === 'wakes up' ? WAKES_UP : msg === 'falls asleep' ? FALLS_ASLEEP : BEGINS
    )

    if (type === BEGINS) {
      guard = parseInt(msg.match(guardRe)[1])
    }

    return { guard, minute: parseInt(minute), date: new Date(year+'-'+month+'-'+date+'T'+hour+':'+minute+':00.000Z'), type }
  })
    .sort((a, b) => a.date - b.date)


  for (let i = 0; i < logs.length; i++) {
    let log = logs[i]

    switch (log.type) {
      case BEGINS:
        guardId = log.guard
        break
      case FALLS_ASLEEP: {
        let {minutes, overlaps} = guards.get(guardId) || {minutes:0, overlaps:new Map()}
        minutes += logs[i + 1].minute - log.minute
        for (let j = log.minute; j < logs[i + 1].minute; j++) {
          overlaps.set(j, (overlaps.get(j) || 0) + 1)
        }
        guards.set(guardId, { minutes, overlaps })
        break
      }
    }
  }

  guards = Array.from(guards.entries()).sort((a, b) => b[1].minutes - a[1].minutes)
  let guard = guards[0]
  let overlaps = Array.from(guard[1].overlaps.entries()).sort((a, b) => b[1] - a[1])

  return guard[0] * overlaps[0][0]
}
