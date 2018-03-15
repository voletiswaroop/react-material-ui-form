export default function isSize(value, ...rest) {
  let min
  let max
  if (typeof (rest) === 'object') {
    min = rest.min || 0
    max = rest.max // eslint-disable-line
  } else {
    [min, max] = rest
  }
  return value >= min && (max === undefined || value <= max)
}
