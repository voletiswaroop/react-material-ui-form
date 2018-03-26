'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = exports.messageMap = exports.constants = exports.validate = exports.createValidation = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _messageMap = require('./messageMap');

var _messageMap2 = _interopRequireDefault(_messageMap);

var _validators = require('./validators');

var _validators2 = _interopRequireDefault(_validators);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sprintf(str, args) {
  var predicate = void 0;
  if (_lodash2.default.isString(args)) {
    predicate = args;
  } else if (_lodash2.default.isObject(args) && !_lodash2.default.isArray(args)) {
    args = Object.values(args);
    predicate = function predicate(match, number) {
      return args[number] !== undefined ? args[number] : match;
    };
  } else {
    predicate = function predicate(match, number) {
      return (
        // eslint-disable-next-line no-nested-ternary
        args[number] !== undefined ? _lodash2.default.isArray(args) ? args.join(', ') : args[number] : match
      );
    };
  }
  return str.replace(/{(\d+)}/g, predicate);
}

var validationMessageMap = _lodash2.default.clone(_messageMap2.default);

var createValidation = exports.createValidation = function createValidation(validatorName, args, config) {
  if (!_lodash2.default.isEmpty(config.messageMap)) {
    validationMessageMap = config.messageMap;
  }

  var code = validatorName;
  // first check if prefix code exists
  if (!validatorName.startsWith(config.messageMapKeyPrefix)) {
    var prefixedCode = '' + config.messageMapKeyPrefix + validatorName;
    if (_lodash2.default.has(validationMessageMap, prefixedCode)) {
      code = prefixedCode;
    }
  }

  var message = validationMessageMap[code];
  if (message !== undefined && (_lodash2.default.isNumber(args) || !_lodash2.default.isEmpty(args))) {
    message = sprintf(message, args);
  }
  return { code: code, message: message };
};

var validate = exports.validate = function validate(value, fieldValidators, config) {
  var validations = [];
  if (!_lodash2.default.isArray(fieldValidators) || _lodash2.default.isEmpty(fieldValidators)) {
    return [];
  }

  fieldValidators.forEach(function (validator) {
    var args = void 0;
    var validatorName = validator;
    if (_lodash2.default.isObject(validator) && _lodash2.default.size(validator) === 1) {
      args = Object.values(validator)[0]; // eslint-disable-line prefer-destructuring
      validatorName = Object.keys(validator)[0]; // eslint-disable-line prefer-destructuring
    } else if (!_lodash2.default.isString(validator)) {
      console.error('invalid validator:', validator); // eslint-disable-line
    }

    if (config.validators[validatorName] === undefined) {
      console.error('undefined validator:', validatorName); // eslint-disable-line
    } else {
      value = String(value);
      var validation = config.validators[validatorName](value, args);
      if (!validation) {
        validations.push(createValidation(validatorName, args, config));
      }
    }
  });

  return validations;
};

exports.constants = _constants2.default;
exports.messageMap = _messageMap2.default;
exports.validators = _validators2.default;