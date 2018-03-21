import isNumber from '../isNumber'


it('should be a number', () => {
  expect(isNumber('1,123.45')).toBe(true)
})
