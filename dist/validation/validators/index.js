"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isAlias = _interopRequireDefault(require("./isAlias"));

var _isDate = _interopRequireDefault(require("./isDate"));

var _isNumber = _interopRequireDefault(require("./isNumber"));

var _isSerial = _interopRequireDefault(require("./isSerial"));

var _isTime = _interopRequireDefault(require("./isTime"));

var _isSize = _interopRequireDefault(require("./isSize"));

var _isRequired = _interopRequireDefault(require("./isRequired"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies
_validator.default.isAlias = _isAlias.default;
_validator.default.isDate = _isDate.default;
_validator.default.isNumber = _isNumber.default;
_validator.default.isSerial = _isSerial.default;
_validator.default.isTime = _isTime.default;
_validator.default.isSize = _isSize.default;
_validator.default.isRequired = _isRequired.default;
var _default = _validator.default;
exports.default = _default;
//# sourceMappingURL=index.js.map