module.exports = (input) => (
  input
    .split('\n')
    .reduce((value, change) => (
      eval(value + change)
    ), 0)
)
