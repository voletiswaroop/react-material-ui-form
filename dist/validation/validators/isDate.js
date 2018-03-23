"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var dateRegExp = new RegExp(['^(19|20)\\d\\d([- /.])(0[1-9]|1[012])\\2', '(0[1-9]|[12][0-9]|3[01])$'].join(''), 'i');

var _default = function _default(value) {
  return dateRegExp.test(value);
};

exports.default = _default;
//# sourceMappingURL=isDate.js.map