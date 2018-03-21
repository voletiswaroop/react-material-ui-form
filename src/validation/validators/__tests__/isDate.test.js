import isDate from '../isDate'


it('should be a date', () => {
  expect(isDate('2000-01-31')).toBe(true)
})
