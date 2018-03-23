"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Form = require("material-ui/Form");

var _Input = require("material-ui/Input");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function getErrorAndHelperText(field) {
  var helperText;
  var isError = false;

  if (!_lodash.default.isEmpty(field) && field.validations.length > 0) {
    helperText = field.validations[0].message;
    isError = true;
  }

  return {
    helperText: helperText,
    isError: isError
  };
}

var FormControlClone =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormControlClone, _React$Component);

  function FormControlClone(props) {
    var _this;

    _classCallCheck(this, FormControlClone);

    _this = _possibleConstructorReturn(this, (FormControlClone.__proto__ || Object.getPrototypeOf(FormControlClone)).call(this, props));

    _initialiseProps.call(_assertThisInitialized(_this));

    var _props$formControlEle = props.formControlElement.props,
        error = _props$formControlEle.error,
        required = _props$formControlEle.required;
    var name;
    var value;
    var helperText;
    var isError = error;

    _react.default.Children.forEach(props.formControlElement.props.children, function (child) {
      if (child.type === _Form.FormHelperText) {
        helperText = String(child.props.children);
        _this.helperText = helperText;
      } else if (child.type !== _Form.FormLabel && child.type !== _Input.InputLabel && child.props.name !== undefined && child.props.value !== undefined) {
        name = child.props.name; // eslint-disable-line prefer-destructuring

        value = child.props.value; // eslint-disable-line prefer-destructuring
      }
    });

    if (props.formControlElement.type !== _Form.FormControl || name === undefined || value === undefined) {
      throw new Error('invalid FormControl control children');
    }

    if (props.field.value === undefined) {
      props.onConstruct({
        name: name,
        value: value,
        required: required
      });
    } else {
      value = props.field.value; // eslint-disable-line prefer-destructuring

      if (!_lodash.default.isEmpty(props.field) && props.field.validations.length > 0) {
        var fieldError = getErrorAndHelperText(props.field);
        helperText = fieldError.helperText; // eslint-disable-line prefer-destructuring

        isError = fieldError.isError; // eslint-disable-line prefer-destructuring
      }
    }

    _this.name = name;
    _this.state = {
      helperText: helperText,
      isError: isError,
      value: value
    };
    return _this;
  }

  _createClass(FormControlClone, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!_lodash.default.isEmpty(nextProps.field)) {
        var _getErrorAndHelperTex = getErrorAndHelperText(nextProps.field),
            helperText = _getErrorAndHelperTex.helperText,
            isError = _getErrorAndHelperTex.isError;

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
      var _this2 = this;

      var _props = this.props,
          formControlElement = _props.formControlElement,
          props = _props.formControlElement.props;
      var hasHelperText = false;

      var children = _react.default.Children.map(props.children, function (child) {
        // label
        if (child.type === _Form.FormLabel || child.type === _Input.InputLabel) {
          return child;
        } // helper text


        if (child.type === _Form.FormHelperText) {
          hasHelperText = true;
          return _react.default.cloneElement(child, {
            children: _this2.state.helperText
          });
        } // field


        return _react.default.cloneElement(child, {
          onChange: child.props.onChange || _this2.onChange,
          value: _this2.state.value
        });
      }); // support for dynamic helper text


      if (!hasHelperText && this.state.helperText !== undefined) {
        children.push(_react.default.createElement(_Form.FormHelperText, {
          key: 1
        }, this.state.helperText));
      }

      return _react.default.cloneElement(formControlElement, {
        error: this.state.isError,
        children: children
      });
    }
  }]);

  return FormControlClone;
}(_react.default.Component);

exports.default = FormControlClone;
Object.defineProperty(FormControlClone, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    field: _propTypes.default.object,
    formControlElement: _propTypes.default.object.isRequired,
    onValueChange: _propTypes.default.func.isRequired,
    onConstruct: _propTypes.default.func.isRequired
  }
});
Object.defineProperty(FormControlClone, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    field: {}
  }
});

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  Object.defineProperty(this, "onChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      var value = event.target.value;

      _this3.setState({
        isError: false,
        helperText: _this3.helperText,
        value: value
      });

      _this3.props.onValueChange(_this3.name, value);
    }
  });
};
//# sourceMappingURL=FormControlClone.js.map