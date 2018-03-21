import isTime from '../isTime'


it('should be a H:i time format', () => {
  expect(isTime('12:59')).toBe(true)
})
