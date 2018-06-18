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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getRequiredProp(required, useNativeRequiredValidator) {
  if (!useNativeRequiredValidator) {
    return false;
  }
  return required || false;
}

function makeLabel(fieldComp, props) {
  var label = fieldComp.props.label || '';
  return props.field.isRequired && !props.useNativeRequiredValidator ? label + ' *' : label;
}

function makeErrorAndHelperText(props) {
  var helperText = _lodash2.default.get(props.fieldComp.props, 'helperText');
  var isError = false;

  if (!_lodash2.default.isEmpty(props.field) && props.field.validations.length > 0) {
    helperText = props.field.validations[0].message;
    isError = true;
  }
  return { helperText: helperText, isError: isError };
}

var FieldClone = (_temp = _class = function (_React$Component) {
  _inherits(FieldClone, _React$Component);

  function FieldClone(props) {
    _classCallCheck(this, FieldClone);

    var _this = _possibleConstructorReturn(this, (FieldClone.__proto__ || Object.getPrototypeOf(FieldClone)).call(this, props));

    _initialiseProps.call(_this);

    var fieldComp = props.fieldComp;


    if (fieldComp.type.name === undefined) {
      throw new Error('FieldClone does not support native elements');
    }
    if (fieldComp.props.name === undefined || fieldComp.props.value === undefined) {
      throw new Error('FieldClone name and value must be defined');
    }

    var value = _lodash2.default.isEmpty(props.field) ? fieldComp.props.value : props.field.value;

    var _makeErrorAndHelperTe = makeErrorAndHelperText(props),
        helperText = _makeErrorAndHelperTe.helperText,
        isError = _makeErrorAndHelperTe.isError;

    _this.state = {
      helperText: helperText,
      isError: isError,
      value: value
    };

    if (props.field.value === undefined) {
      _this.props.onConstruct(fieldComp.props);
    }
    return _this;
  }

  _createClass(FieldClone, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          fieldComp = _props.fieldComp,
          props = _objectWithoutProperties(_props, ['fieldComp']);

      return _react2.default.cloneElement(fieldComp, {
        value: this.state.value,
        label: makeLabel(fieldComp, props),
        error: this.state.isError,
        helperText: this.state.helperText,
        onBlur: this.onBlur,
        onChange: this.onChange,
        required: getRequiredProp(fieldComp.props.required, this.props.useNativeRequiredValidator)
      });
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      if (!_lodash2.default.isEmpty(nextProps.field)) {
        var _makeErrorAndHelperTe2 = makeErrorAndHelperText(nextProps),
            _helperText = _makeErrorAndHelperTe2.helperText,
            _isError = _makeErrorAndHelperTe2.isError;

        return {
          helperText: _helperText,
          isError: _isError,
          value: nextProps.field.value
        };
      }
      return null;
    }
  }]);

  return FieldClone;
}(_react2.default.Component), _class.defaultProps = {
  field: {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onBlur = function (event) {
    var _props2 = _this2.props,
        isDirty = _props2.field.isDirty,
        fieldComp = _props2.fieldComp,
        name = _props2.fieldComp.props.name,
        validateInputOnBlur = _props2.validateInputOnBlur;
    var value = event.target.value;
    // // /* TODO: create function for condition */

    if ((!isDirty || validateInputOnBlur) && !fieldComp.props.select) {
      _this2.props.onValueChange(name, value, true);
    }
    if (fieldComp.props.onBlur !== undefined) {
      fieldComp.props.onBlur(value, { name: name }, event);
    }
  };

  this.onChange = function (event) {
    var _props3 = _this2.props,
        fieldComp = _props3.fieldComp,
        name = _props3.fieldComp.props.name,
        validateInputOnBlur = _props3.validateInputOnBlur;
    var value = event.target.value;

    if (fieldComp.props.select || validateInputOnBlur) {
      var _helperText2 = _lodash2.default.get(fieldComp.props, 'helperText');
      _this2.setState({ isError: false, helperText: _helperText2, value: value });
    }
    /* TODO: create function for condition */
    if (!validateInputOnBlur || fieldComp.props.select) {
      _this2.props.onValueChange(name, value, fieldComp.props.select);
    }
    if (fieldComp.props.onChange !== undefined) {
      fieldComp.props.onChange(value, { name: name }, event);
    }
  };
}, _temp);
exports.default = FieldClone;