"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Checkbox = _interopRequireDefault(require("material-ui/Checkbox"));

var _Switch = _interopRequireDefault(require("material-ui/Switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var CheckableFieldClone =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CheckableFieldClone, _React$Component);

  function CheckableFieldClone(props) {
    var _this;

    _classCallCheck(this, CheckableFieldClone);

    _this = _possibleConstructorReturn(this, (CheckableFieldClone.__proto__ || Object.getPrototypeOf(CheckableFieldClone)).call(this, props));

    _initialiseProps.call(_assertThisInitialized(_this));

    var fieldComp = props.fieldComp;

    if (![_Checkbox.default, _Switch.default].includes(fieldComp.type)) {
      throw new Error('CheckableFieldClone should be a Checkbox or Switch');
    }

    if (fieldComp.type.name === undefined) {
      throw new Error('CheckableFieldClone does not support native elements');
    }

    if (fieldComp.props.name === undefined || fieldComp.props.value === undefined) {
      throw new Error('CheckableFieldClone name and value must be defined');
    }

    var checked = props.field.value;

    if (props.field.value === undefined) {
      checked = fieldComp.props.checked || false;

      _this.props.onConstruct(fieldComp.props);
    }

    _this.state = {
      checked: checked
    };
    return _this;
  }

  _createClass(CheckableFieldClone, [{
    key: "render",
    value: function render() {
      var fieldComp = this.props.fieldComp;
      return _react.default.cloneElement(fieldComp, {
        value: fieldComp.props.value,
        checked: this.state.checked,
        onChange: this.onToggle
      });
    }
  }]);

  return CheckableFieldClone;
}(_react.default.Component);

exports.default = CheckableFieldClone;
Object.defineProperty(CheckableFieldClone, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    field: _propTypes.default.object,
    fieldComp: _propTypes.default.object.isRequired,
    onToggle: _propTypes.default.func.isRequired,
    onConstruct: _propTypes.default.func.isRequired
  }
});
Object.defineProperty(CheckableFieldClone, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    field: {}
  }
});

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  Object.defineProperty(this, "onToggle", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, checked) {
      var _this2$props = _this2.props,
          fieldComp = _this2$props.fieldComp,
          _this2$props$fieldCom = _this2$props.fieldComp.props,
          name = _this2$props$fieldCom.name,
          value = _this2$props$fieldCom.value;

      _this2.setState({
        checked: checked
      });

      _this2.props.onToggle(name, value, checked);

      if (fieldComp.props.onChange !== undefined) {
        fieldComp.props.onChange(checked, {
          name: name,
          value: value
        }, event);
      }
    }
  });
};
//# sourceMappingURL=CheckableFieldClone.js.map