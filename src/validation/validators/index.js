import validators from 'validator' // eslint-disable-line import/no-extraneous-dependencies

import isAlias from './isAlias'
import isDate from './isDate'
import isNumber from './isNumber'
import isSerial from './isSerial'
import isTime from './isTime'
import isSize from './isSize'
import isRequired from './isRequired'


validators.isAlias = isAlias
validators.isDate = isDate
validators.isNumber = isNumber
validators.isSerial = isSerial
validators.isTime = isTime
validators.isSize = isSize
validators.isRequired = isRequired

export default validators
