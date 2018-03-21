import _ from 'lodash' // eslint-disable-line import/no-extraneous-dependencies

import messageMap from './messageMap'
import validators from './validators'

export constants from './constants'


function sprintf(str, args) {
  let predicate
  if (_.isString(args)) {
    predicate = args
  } else if (_.isObject(args) && !_.isArray(args)) {
    args = Object.values(args)
    predicate = (match, number) => (
      args[number] !== undefined ? args[number] : match
    )
  } else {
    predicate = (match, number) => (
      // eslint-disable-next-line no-nested-ternary
      args[number] !== undefined
        ? (_.isArray(args) ? args.join(', ') : args[number])
        : match
    )
  }
  return str.replace(/{(\d+)}/g, predicate)
}

let validationMessageMap = _.clone(messageMap)

export const createValidation = (validatorName, args, config) => {
  if (!_.isEmpty(config.messageMap)) {
    validationMessageMap = config.messageMap
  }

  let code = validatorName
  // first check if prefix code exists
  if (!validatorName.startsWith(config.messageMapKeyPrefix)) {
    const prefixedCode = `${config.messageMapKeyPrefix}${validatorName}`
    if (_.has(validationMessageMap, prefixedCode)) {
      code = prefixedCode
    }
  }

  let message = validationMessageMap[code]
  if (message !== undefined && (_.isNumber(args) || !_.isEmpty(args))) {
    message = sprintf(message, args)
  }
  return { code, message }
}

export const validate = (value, fieldValidators, config) => {
  const validations = []
  if (_.isEmpty(fieldValidators)) {
    return []
  } else if (!_.isArray(fieldValidators)) {
    // eslint-disable-next-line no-console
    console.error('invalid validators format:', fieldValidators)
    return false
  }

  fieldValidators.forEach((validator) => {
    let args
    let validatorName = validator
    if (_.isObject(validator) && _.size(validator) === 1) {
      args = Object.values(validator)[0] // eslint-disable-line prefer-destructuring
      validatorName = Object.keys(validator)[0] // eslint-disable-line prefer-destructuring
    } else if (!_.isString(validator)) {
      console.error('invalid validator:', validator) // eslint-disable-line
    }

    if (config.validators[validatorName] === undefined) {
      console.error('undefined validator:', validatorName) // eslint-disable-line
    } else {
      value = String(value)
      const validation = config.validators[validatorName](value, args)
      if (!validation) {
        validations.push(createValidation(validatorName, args, config))
      }
    }
  })

  return validations
}

export {
  messageMap,
  validators,
}
