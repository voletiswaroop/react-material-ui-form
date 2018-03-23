"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "messageMap", {
  enumerable: true,
  get: function get() {
    return _messageMap.default;
  }
});
Object.defineProperty(exports, "validators", {
  enumerable: true,
  get: function get() {
    return _validators.default;
  }
});
Object.defineProperty(exports, "constants", {
  enumerable: true,
  get: function get() {
    return _constants2.default;
  }
});
exports.validate = exports.createValidation = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _messageMap = _interopRequireDefault(require("./messageMap"));

var _validators = _interopRequireDefault(require("./validators"));

var _constants2 = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies
function sprintf(str, args) {
  var predicate;

  if (_lodash.default.isString(args)) {
    predicate = args;
  } else if (_lodash.default.isObject(args) && !_lodash.default.isArray(args)) {
    args = Object.values(args);

    predicate = function predicate(match, number) {
      return args[number] !== undefined ? args[number] : match;
    };
  } else {
    predicate = function predicate(match, number) {
      return (// eslint-disable-next-line no-nested-ternary
        args[number] !== undefined ? _lodash.default.isArray(args) ? args.join(', ') : args[number] : match
      );
    };
  }

  return str.replace(/{(\d+)}/g, predicate);
}

var validationMessageMap = _lodash.default.clone(_messageMap.default);

var createValidation = function createValidation(validatorName, args, config) {
  if (!_lodash.default.isEmpty(config.messageMap)) {
    validationMessageMap = config.messageMap;
  }

  var code = validatorName; // first check if prefix code exists

  if (!validatorName.startsWith(config.messageMapKeyPrefix)) {
    var prefixedCode = "".concat(config.messageMapKeyPrefix).concat(validatorName);

    if (_lodash.default.has(validationMessageMap, prefixedCode)) {
      code = prefixedCode;
    }
  }

  var message = validationMessageMap[code];

  if (message !== undefined && (_lodash.default.isNumber(args) || !_lodash.default.isEmpty(args))) {
    message = sprintf(message, args);
  }

  return {
    code: code,
    message: message
  };
};

exports.createValidation = createValidation;

var validate = function validate(value, fieldValidators, config) {
  var validations = [];

  if (_lodash.default.isEmpty(fieldValidators)) {
    return [];
  } else if (!_lodash.default.isArray(fieldValidators)) {
    // eslint-disable-next-line no-console
    console.error('invalid validators format:', fieldValidators);
    return false;
  }

  fieldValidators.forEach(function (validator) {
    var args;
    var validatorName = validator;

    if (_lodash.default.isObject(validator) && _lodash.default.size(validator) === 1) {
      args = Object.values(validator)[0]; // eslint-disable-line prefer-destructuring

      validatorName = Object.keys(validator)[0]; // eslint-disable-line prefer-destructuring
    } else if (!_lodash.default.isString(validator)) {
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

exports.validate = validate;
//# sourceMappingURL=index.js.map