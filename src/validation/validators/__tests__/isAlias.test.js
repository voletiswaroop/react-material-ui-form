import isAlias from '../isAlias'


it('should be an alias', () => {
  expect(isAlias('azAZ09-_.')).toBe(true)
})
