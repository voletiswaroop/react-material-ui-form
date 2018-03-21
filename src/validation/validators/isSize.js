import _ from 'lodash' // eslint-disable-line import/no-extraneous-dependencies


export default function isSize(value, rest) {
  let min
  let max
  if (_.isArray(rest)) {
    [min, max] = rest
  } else {
    min = rest.min || 0
    max = rest.max // eslint-disable-line
  }
  return value >= min && (max === undefined || value <= max)
}
