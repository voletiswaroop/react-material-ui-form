import isSerial from '../isSerial'


it('should be a serial number', () => {
  expect(isSerial('12-abcd-34-E')).toBe(true)
})
