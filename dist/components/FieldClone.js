"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// eslint-disable-line import/no-extraneous-dependencies
function getRequiredProp(required, useNativeRequiredValidator) {
  if (!useNativeRequiredValidator) {
    return false;
  }

  return required;
}

function makeLabel(fieldComp, props) {
  var label = fieldComp.props.label || '';
  return props.field.isRequired && !props.useNativeRequiredValidator ? "".concat(label, " *") : label;
}

function makeErrorAndHelperText(props) {
  var helperText = _lodash.default.get(props.fieldComp.props, 'helperText');

  var isError = false;

  if (!_lodash.default.isEmpty(props.field) && props.field.validations.length > 0) {
    helperText = props.field.validations[0].message;
    isError = true;
  }

  return {
    helperText: helperText,
    isError: isError
  };
}

var FieldClone =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FieldClone, _React$Component);

  function FieldClone(props) {
    var _this;

    _classCallCheck(this, FieldClone);

    _this = _possibleConstructorReturn(this, (FieldClone.__proto__ || Object.getPrototypeOf(FieldClone)).call(this, props));

    _initialiseProps.call(_assertThisInitialized(_this));

    var fieldComp = props.fieldComp;

    if (fieldComp.type.name === undefined) {
      throw new Error('FieldClone does not support native elements');
    }

    if (fieldComp.props.name === undefined || fieldComp.props.value === undefined) {
      throw new Error('FieldClone name and value must be defined');
    }

    var value = _lodash.default.isEmpty(props.field) ? fieldComp.props.value : props.field.value;

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
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!_lodash.default.isEmpty(nextProps.field)) {
        var _makeErrorAndHelperTe2 = makeErrorAndHelperText(nextProps),
            helperText = _makeErrorAndHelperTe2.helperText,
            isError = _makeErrorAndHelperTe2.isError;

        this.setState({
          helperText: helperText,
          isError: isError,
          value: nextProps.field.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          fieldComp = _props.fieldComp,
          props = _objectWithoutProperties(_props, ["fieldComp"]);

      return _react.default.cloneElement(fieldComp, {
        value: this.state.value,
        label: makeLabel(fieldComp, props),
        error: this.state.isError,
        helperText: this.state.helperText,
        onBlur: this.onBlur,
        onChange: this.onChange,
        required: getRequiredProp(fieldComp.props.required, this.props.useNativeRequiredValidator)
      });
    }
  }]);

  return FieldClone;
}(_react.default.Component);

exports.default = FieldClone;
Object.defineProperty(FieldClone, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    field: _propTypes.default.object,
    fieldComp: _propTypes.default.object.isRequired,
    onValueChange: _propTypes.default.func.isRequired,
    onConstruct: _propTypes.default.func.isRequired,
    useNativeRequiredValidator: _propTypes.default.bool.isRequired
  }
});
Object.defineProperty(FieldClone, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    field: {}
  }
});

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  Object.defineProperty(this, "onBlur", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      var _this2$props = _this2.props,
          fieldComp = _this2$props.fieldComp,
          name = _this2$props.fieldComp.props.name;
      var value = event.target.value; // // /* TODO: create function for condition */

      if (!fieldComp.props.select) {
        _this2.props.onValueChange(name, value);
      }

      if (fieldComp.props.onBlur !== undefined) {
        fieldComp.props.onBlur(value, {
          name: name
        }, event);
      }
    }
  });
  Object.defineProperty(this, "onChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      var _this2$props2 = _this2.props,
          fieldComp = _this2$props2.fieldComp,
          name = _this2$props2.fieldComp.props.name;
      var value = event.target.value;

      var helperText = _lodash.default.get(fieldComp.props, 'helperText');

      _this2.setState({
        isError: false,
        helperText: helperText,
        value: value
      });
      /* TODO: create function for condition */


      if (fieldComp.props.select) {
        _this2.props.onValueChange(name, value);
      }

      if (fieldComp.props.onChange !== undefined) {
        fieldComp.props.onChange(value, {
          name: name
        }, event);
      }
    }
  });
};
//# sourceMappingURL=FieldClone.js.map