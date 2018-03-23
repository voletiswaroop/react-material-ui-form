"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSize;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// eslint-disable-line import/no-extraneous-dependencies
function isSize(value, rest) {
  var min;
  var max;

  if (_lodash.default.isArray(rest)) {
    var _rest = _slicedToArray(rest, 2);

    min = _rest[0];
    max = _rest[1];
  } else {
    min = rest.min || 0;
    max = rest.max; // eslint-disable-line
  }

  return value >= min && (max === undefined || value <= max);
}
//# sourceMappingURL=isSize.js.map