import {
  constants,
  createValidation,
  messageMap,
  validate,
  validators,
} from '../index'


const config = {
  messageMap,
  messageMapKeyPrefix: '',
  requiredValidatorName: constants.REQUIRED_VALIDATOR_NAME,
  validators,
}

function extendMessageMap(prefix, validatorName) {
  return Object.assign(config.messageMap, {
    [`${prefix}${validatorName}`]: 'Invalid',
  })
}

describe('validate method', () => {
  it('should be an empty array if there are no validators', () => {
    expect(validate('x', [], config)).toEqual([])
    expect(validate('x', ['***'], config)).toEqual([])
  })

  it('should be false if validators is not an array', () => {
    expect(validate('x', 'isRequired', config)).toBe(false)
  })

  it('should be an empty array if validator is invalid', () => {
    expect(validate('x', [null], config)).toEqual([])
  })

  it('should be an empty array if true', () => {
    expect(validate('x', ['isRequired'], config)).toEqual([])
    expect(validate('x', [{ isIn: ['x', 'y', 'z'] }], config)).toEqual([])
  })

  it('should not be an empty array if validations exist', () => {
    expect(validate('x', ['isInt'], config)).not.toEqual([])
  })
})

describe('createValidation with args', () => {
  it('should return object with code', () => {
    let validatorName = 'isLength'
    expect(createValidation(validatorName, { min: 4 }, config)).toMatchObject({
      code: validatorName,
    })
    expect(createValidation(validatorName, [4], config)).toMatchObject({
      code: validatorName,
    })

    validatorName = 'isIn'
    expect(createValidation(validatorName, [1, 2], config)).toMatchObject({
      code: validatorName,
    })

    validatorName = 'isWhitelisted'
    expect(createValidation(validatorName, 'abc', config)).toMatchObject({
      code: validatorName,
    })

    validatorName = 'isEmail'
    expect(createValidation(validatorName, true, config)).toMatchObject({
      code: validatorName,
    })
  })
})

describe('createValidation with prefix method', () => {
  const prefix = 'myPrefix:'
  const validatorName = 'isRequired'
  config.messageMapKeyPrefix = prefix
  config.messageMap = extendMessageMap(prefix, validatorName)

  it('should return object with code', () => {
    expect(createValidation(validatorName, undefined, config)).toMatchObject({
      code: prefix + validatorName,
    })
  })
})
