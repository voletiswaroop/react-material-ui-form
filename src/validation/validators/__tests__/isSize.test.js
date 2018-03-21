import isSize from '../isSize'


it('should be a within a min/max range', () => {
  expect(isSize(5, { min: 4 })).toBe(true)
  expect(isSize(5, { max: 4 })).toBe(false)
  expect(isSize(5, [4, 6])).toBe(true)
})
