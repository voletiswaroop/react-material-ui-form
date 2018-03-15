const dateRegExp = new RegExp(
  ['^(19|20)\\d\\d([- /.])(0[1-9]|1[012])\\2', '(0[1-9]|[12][0-9]|3[01])$'].join(''),
  'i'
)

export default value => dateRegExp.test(value)
