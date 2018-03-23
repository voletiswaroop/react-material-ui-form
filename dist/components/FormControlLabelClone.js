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

var _Form = require("material-ui/Form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FormControlLabelClone =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormControlLabelClone, _React$Component);

  function FormControlLabelClone(props) {
    var _this;

    _classCallCheck(this, FormControlLabelClone);

    _this = _possibleConstructorReturn(this, (FormControlLabelClone.__proto__ || Object.getPrototypeOf(FormControlLabelClone)).call(this, props));

    _initialiseProps.call(_assertThisInitialized(_this));

    if (![_Checkbox.default, _Switch.default].includes(props.control.type)) {
      throw new Error('invalid FormControlLabel control component');
    }

    var checked = props.control.props.checked;
    var value = props.control.props.value;

    if (props.field.value === undefined) {
      props.onConstruct(props.control.props);
    } else {
      checked = _lodash.default.get(props.field, 'checked');
    }

    _this.state = {
      checked: checked,
      value: value
    };
    return _this;
  }

  _createClass(FormControlLabelClone, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          control = _props.control,
          label = _props.label;
      var onChange = control.props.onChange || control.props.onToggle || this.onToggle;
      var controlOptions = {
        checked: this.state.checked,
        onChange: onChange,
        value: this.state.value
      };
      return _react.default.createElement(_Form.FormControlLabel, {
        checked: this.state.checked,
        control: _react.default.cloneElement(control, controlOptions),
        onChange: onChange,
        label: label,
        value: this.state.value
      });
    }
  }]);

  return FormControlLabelClone;
}(_react.default.Component);

exports.default = FormControlLabelClone;
Object.defineProperty(FormControlLabelClone, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /* eslint-disable-next-line */
    control: _propTypes.default.object.isRequired,
    field: _propTypes.default.object,
    label: _propTypes.default.string.isRequired,
    onToggle: _propTypes.default.func.isRequired,
    onConstruct: _propTypes.default.func.isRequired
  }
});
Object.defineProperty(FormControlLabelClone, "defaultProps", {
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
      checked = _lodash.default.get(event, 'target.checked') || checked;
      var value = _this2.props.control.props.value; // eslint-disable-line react/prop-types

      var name = _this2.props.control.props.name; // eslint-disable-line react/prop-types

      value = checked ? value : '';

      _this2.setState({
        checked: checked,
        value: value
      });

      _this2.props.onToggle(name, value, checked);
    }
  });
};
//# sourceMappingURL=FormControlLabelClone.js.map