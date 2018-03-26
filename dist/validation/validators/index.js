'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isAlias = require('./isAlias');

var _isAlias2 = _interopRequireDefault(_isAlias);

var _isDate = require('./isDate');

var _isDate2 = _interopRequireDefault(_isDate);

var _isNumber = require('./isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isSerial = require('./isSerial');

var _isSerial2 = _interopRequireDefault(_isSerial);

var _isTime = require('./isTime');

var _isTime2 = _interopRequireDefault(_isTime);

var _isSize = require('./isSize');

var _isSize2 = _interopRequireDefault(_isSize);

var _isRequired = require('./isRequired');

var _isRequired2 = _interopRequireDefault(_isRequired);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_validator2.default.isAlias = _isAlias2.default;
_validator2.default.isDate = _isDate2.default;
_validator2.default.isNumber = _isNumber2.default;
_validator2.default.isSerial = _isSerial2.default;
_validator2.default.isTime = _isTime2.default;
_validator2.default.isSize = _isSize2.default;
_validator2.default.isRequired = _isRequired2.default;

exports.default = _validator2.default;