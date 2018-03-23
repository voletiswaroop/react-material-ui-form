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

var _Checkbox = _interopRequireDefault(require("material-ui/Checkbox"));

var _Switch = _interopRequireDefault(require("material-ui/Switch"));

var _FormControlClone = _interopRequireDefault(require("./FormControlClone"));

var _FormControlLabelClone = _interopRequireDefault(require("./FormControlLabelClone"));

var _FieldClone = _interopRequireDefault(require("./FieldClone"));

var _CheckableFieldClone = _interopRequireDefault(require("./CheckableFieldClone"));

var _validation = require("../validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FIELD_VALIDATORS_PROP_NAME = 'data-validators';

function checkElementInteractivity(component) {
  var whitelist = [_Form.FormControlLabel];
  return whitelist.includes(component.type) || _lodash.default.has(component, 'props.name') && _lodash.default.has(component, 'props.value');
}

function isValidForm(fields) {
  return _lodash.default.size(_lodash.default.filter(fields, function (field) {
    return field.validations.length > 0;
  })) === 0;
}

function getFieldValues(fields) {
  var values = {};

  _lodash.default.each(fields, function (field, name) {
    if (_lodash.default.get(field, 'checked') !== false) {
      values[name] = field.value;
    }
  });

  return values;
}

function getPristineFieldValues(fields) {
  var values = {};

  _lodash.default.each(fields, function (field, name) {
    if (!field.isPristine && _lodash.default.get(field, 'checked') !== false) {
      values[name] = field.pristineValue;
    }
  });

  return values;
}

function extractFieldValidators(fieldProps) {
  var validators = _lodash.default.get(fieldProps, FIELD_VALIDATORS_PROP_NAME);

  if (validators !== undefined) {
    if (_lodash.default.isString(validators)) {
      validators = validators.replace(/\s/g, '').split(',');
    } else if (!_lodash.default.isArray(validators)) {
      validators = [validators];
    }

    return validators;
  }

  return [];
}

function getFieldTemplate() {
  return {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [],
    validators: [],
    value: undefined
  };
}

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "onFieldConstruct", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(fieldProps) {
        var checked = fieldProps.checked,
            name = fieldProps.name,
            required = fieldProps.required,
            value = fieldProps.value; // checkable input

        if (checked === true) {
          _lodash.default.defer(function () {
            _this.setState({
              fields: _objectSpread({}, _this.state.fields, _defineProperty({}, name, _objectSpread({}, getFieldTemplate(), {
                checked: checked || false,
                value: value
              })))
            });
          }); // other inputs

        } else if (!_lodash.default.isBoolean(checked)) {
          var requiredValidatorName = _this.validation.requiredValidatorName;

          if (!_lodash.default.has(_this.state.fields, name)) {
            var validators = extractFieldValidators(fieldProps);

            if (required && !_lodash.default.isEmpty(requiredValidatorName)) {
              validators.unshift(requiredValidatorName);
            }

            var isRequired = required || validators.includes(requiredValidatorName); // set any validations on first construct

            var validations = [];

            if (!_lodash.default.has(_this.state.fields, name) && _lodash.default.has(_this.props.validations, name)) {
              validations = _this.props.validations[name];
            }

            _lodash.default.defer(function () {
              _this.setState({
                fields: _objectSpread({}, _this.state.fields, _defineProperty({}, name, _objectSpread({}, getFieldTemplate(), {
                  isRequired: isRequired,
                  pristineValue: value,
                  validators: validators,
                  validations: validations,
                  value: value
                })))
              });

              if (!_lodash.default.isEmpty(value)) {
                _this.validateField(name, value);
              }
            });
          }
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onFieldValueChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(name, _value) {
        _lodash.default.defer(function () {
          _this.setState({
            fields: _objectSpread({}, _this.state.fields, _defineProperty({}, name, _objectSpread({}, _this.state.fields[name], {
              isPristine: false,
              validations: [],
              value: _value
            })))
          });

          if (isValidForm(_this.state.fields)) {
            _this.enableSubmitButton();

            if (_this.props.onValuesChange !== null) {
              _this.props.onValuesChange(getFieldValues(_this.state.fields), getPristineFieldValues(_this.state.fields));
            }
          }

          _this.validateField(name, _value);
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onFieldToggle", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(name, _value2, checked) {
        _this.setState({
          fields: _objectSpread({}, _this.state.fields, _defineProperty({}, name, _objectSpread({}, _this.state.fields[name], {
            checked: checked,
            isPristine: false,
            validations: [],
            value: _value2
          })))
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "validateField", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(name, _value3) {
        var field = _this.state.fields[name];

        if (!_lodash.default.isEmpty(field.validators)) {
          var _assertThisInitialize = _assertThisInitialized(_this),
              validation = _assertThisInitialize.validation;

          var validations = validation.validate(_value3, field.validators, validation);
          field.validations = validations;

          _this.setState({
            fields: _objectSpread({}, _this.state.fields, _defineProperty({}, name, field))
          });

          if (!_lodash.default.isEmpty(validations)) {
            _this.disableSubmitButton();
          }
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "reset", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var fields = _this.state.fields;

        _lodash.default.defer(function () {
          _lodash.default.each(fields, function (field, name) {
            _this.setState({
              fields: _objectSpread({}, _this.state.fields, _defineProperty({}, name, _objectSpread({}, _this.state.fields[name], {
                value: ''
              })))
            });
          });
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "submit", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.preventDefault();
        var isValid = true;
        var fields = _this.state.fields;

        _lodash.default.each(fields, function (field, name) {
          if (field.isRequired && field.value === '') {
            _this.validateField(name, '');

            isValid = false;
          }
        });

        if (isValid) {
          _this.props.onSubmit(getFieldValues(fields), getPristineFieldValues(fields));
        }
      }
    });
    _this.validation = Object.assign({
      messageMap: _validation.messageMap,
      messageMapKeyPrefix: '',
      requiredValidatorName: _validation.constants.REQUIRED_VALIDATOR_NAME,
      validators: _validation.validators,
      validate: _validation.validate
    }, props.validation);
    _this.state = {
      disableSubmitButton: false,
      fields: {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var fields = this.state.fields;

      _lodash.default.each(nextProps.validations, function (validations, name) {
        if (_lodash.default.has(fields, name)) {
          fields[name].validations = validations;
        } else {
          // eslint-disable-next-line no-console
          console.warn("validations field \"".concat(name, "\" does not exist"));
        }
      });

      this.setState({
        fields: fields
      });
    }
  }, {
    key: "enableSubmitButton",
    value: function enableSubmitButton() {
      if (this.state.disableSubmitButton) {
        this.setState({
          disableSubmitButton: false
        });
      }
    }
  }, {
    key: "disableSubmitButton",
    value: function disableSubmitButton() {
      if (this.props.disableSubmitButtonOnError) {
        this.setState({
          disableSubmitButton: true
        });
      }
    }
  }, {
    key: "cloneChildrenRecursively",
    value: function cloneChildrenRecursively(children) {
      var _this2 = this;

      return _react.default.Children.map(children, function (child) {
        if (_lodash.default.isEmpty(child)) {
          return null;
        }

        if (_lodash.default.isString(child)) {
          return child;
        }

        var isInteractiveElement = checkElementInteractivity(child);
        var nestedChildren = _lodash.default.isArray(child.props.children) && !isInteractiveElement ? _lodash.default.filter(child.props.children, function (v) {
          return _lodash.default.isObject(v) || _lodash.default.isString(v);
        }) : false; // nested elements

        if (nestedChildren !== false) {
          // FormControl element with field/group name-value props
          if (child.type === _Form.FormControl) {
            var fieldElement = nestedChildren.find(function (el) {
              return ![_Form.FormLabel, _Input.InputLabel, _Form.FormHelperText].includes(el.type) && el.props.name !== undefined && el.props.value !== undefined;
            });

            if (fieldElement !== undefined) {
              var _name = fieldElement.props.name;
              return _react.default.createElement(_FormControlClone.default, {
                key: _name,
                field: _this2.state.fields[_name],
                formControlElement: child,
                onConstruct: _this2.onFieldConstruct,
                onValueChange: _this2.onFieldValueChange
              });
            }
          } // non-FormControl element


          return _react.default.cloneElement(child, {
            children: _this2.cloneChildrenRecursively(nestedChildren)
          });
        } // add disable functionality to submit button


        if (child.props.type === 'submit') {
          return _react.default.cloneElement(child, {
            disabled: _this2.state.disableSubmitButton
          }); // non-interactive elements should be rendered as is
        } else if (!isInteractiveElement) {
          return child;
        } // clone control label


        if (child.type === _Form.FormControlLabel) {
          var _name2 = child.props.control.props.name;
          return _react.default.createElement(_FormControlLabelClone.default, {
            key: _name2,
            field: _this2.state.fields[_name2],
            control: child.props.control,
            label: child.props.label,
            onConstruct: _this2.onFieldConstruct,
            onToggle: _this2.onFieldToggle
          });
        } // clone input element


        var name = child.props.name; // checkable

        if (child.type === _Checkbox.default || child.type === _Switch.default) {
          return _react.default.createElement(_CheckableFieldClone.default, {
            key: name,
            field: _this2.state.fields[name],
            fieldComp: child,
            onConstruct: _this2.onFieldConstruct,
            onToggle: _this2.onFieldToggle
          });
        }

        return _react.default.createElement(_FieldClone.default, {
          key: name,
          field: _this2.state.fields[name],
          fieldComp: child,
          onConstruct: _this2.onFieldConstruct,
          onValueChange: _this2.onFieldValueChange,
          useNativeRequiredValidator: !_this2.validation.requiredValidatorName
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("form", {
        onReset: this.reset,
        onSubmit: this.submit,
        autoComplete: this.props.autoComplete
      }, this.cloneChildrenRecursively(this.props.children));
    }
  }]);

  return Form;
}(_react.default.Component);

exports.default = Form;
Object.defineProperty(Form, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    autoComplete: _propTypes.default.string,
    children: _propTypes.default.array.isRequired,
    disableSubmitButtonOnError: _propTypes.default.bool,
    onSubmit: _propTypes.default.func.isRequired,
    onValuesChange: _propTypes.default.func,
    validation: _propTypes.default.shape({
      messageMap: _propTypes.default.object,
      messageMapKeyPrefix: _propTypes.default.string,
      requiredValidatorName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
      validators: _propTypes.default.object,
      validate: _propTypes.default.func
    }),
    validations: _propTypes.default.object
  }
});
Object.defineProperty(Form, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    autoComplete: 'off',
    disableSubmitButtonOnError: true,
    onValuesChange: null,
    validation: {},
    validations: {}
  }
});
//# sourceMappingURL=Form.js.map