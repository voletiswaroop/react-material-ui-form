'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormControlLabelClone = (_temp = _class = function (_React$Component) {
  _inherits(FormControlLabelClone, _React$Component);

  function FormControlLabelClone(props) {
    _classCallCheck(this, FormControlLabelClone);

    var _this = _possibleConstructorReturn(this, (FormControlLabelClone.__proto__ || Object.getPrototypeOf(FormControlLabelClone)).call(this, props));

    _initialiseProps.call(_this);

    if (![_Checkbox2.default, _Switch2.default].includes(props.control.type)) {
      throw new Error('invalid FormControlLabel control component');
    }

    var checked = props.control.props.checked;
    var value = props.control.props.value;


    if (props.field.value === undefined) {
      props.onConstruct(props.control.props);
    } else {
      checked = _lodash2.default.get(props.field, 'checked');
    }

    _this.state = {
      checked: checked,
      value: value
    };
    return _this;
  }

  _createClass(FormControlLabelClone, [{
    key: 'render',
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

      return _react2.default.createElement(_FormControlLabel2.default, {
        checked: this.state.checked,
        control: _react2.default.cloneElement(control, controlOptions),
        onChange: onChange,
        label: label,
        value: this.state.value
      });
    }
  }]);

  return FormControlLabelClone;
}(_react2.default.Component), _class.defaultProps = {
  field: {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onToggle = function (event, checked) {
    checked = _lodash2.default.get(event, 'target.checked') || checked;
    var value = _this2.props.control.props.value; // eslint-disable-line react/prop-types

    var name = _this2.props.control.props.name; // eslint-disable-line react/prop-types

    value = checked ? value : '';
    _this2.setState({ checked: checked, value: value });
    _this2.props.onToggle(name, value, checked);
  };
}, _temp);
exports.default = FormControlLabelClone;