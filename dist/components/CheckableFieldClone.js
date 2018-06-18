'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckableFieldClone = (_temp = _class = function (_React$Component) {
  _inherits(CheckableFieldClone, _React$Component);

  function CheckableFieldClone(props) {
    _classCallCheck(this, CheckableFieldClone);

    var _this = _possibleConstructorReturn(this, (CheckableFieldClone.__proto__ || Object.getPrototypeOf(CheckableFieldClone)).call(this, props));

    _initialiseProps.call(_this);

    var fieldComp = props.fieldComp;


    if (![_Checkbox2.default, _Switch2.default].includes(fieldComp.type)) {
      throw new Error('CheckableFieldClone should be a Checkbox or Switch');
    }
    if (fieldComp.props.name === undefined || fieldComp.props.value === undefined) {
      throw new Error('CheckableFieldClone name and value must be defined');
    }

    var checked = props.field.value;
    if (props.field.value === undefined) {
      checked = fieldComp.props.checked || false;
      _this.props.onConstruct(fieldComp.props);
    }
    _this.state = { checked: checked };
    return _this;
  }

  _createClass(CheckableFieldClone, [{
    key: 'render',
    value: function render() {
      var fieldComp = this.props.fieldComp;

      return _react2.default.cloneElement(fieldComp, {
        value: fieldComp.props.value,
        checked: this.state.checked,
        onChange: this.onToggle
      });
    }
  }]);

  return CheckableFieldClone;
}(_react2.default.Component), _class.defaultProps = {
  field: {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onToggle = function (event, checked) {
    var _props = _this2.props,
        fieldComp = _props.fieldComp,
        _props$fieldComp$prop = _props.fieldComp.props,
        name = _props$fieldComp$prop.name,
        value = _props$fieldComp$prop.value;

    _this2.setState({ checked: checked });
    _this2.props.onToggle(name, value, checked);
    if (fieldComp.props.onChange !== undefined) {
      fieldComp.props.onChange(checked, { name: name, value: value }, event);
    }
  };
}, _temp);
exports.default = CheckableFieldClone;