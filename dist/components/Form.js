'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; // eslint-disable-line import/no-extraneous-dependencies

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Form = require('material-ui/Form');

var _Input = require('material-ui/Input');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Switch = require('material-ui/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _FormControlClone = require('./FormControlClone');

var _FormControlClone2 = _interopRequireDefault(_FormControlClone);

var _FormControlLabelClone = require('./FormControlLabelClone');

var _FormControlLabelClone2 = _interopRequireDefault(_FormControlLabelClone);

var _FieldClone = require('./FieldClone');

var _FieldClone2 = _interopRequireDefault(_FieldClone);

var _CheckableFieldClone = require('./CheckableFieldClone');

var _CheckableFieldClone2 = _interopRequireDefault(_CheckableFieldClone);

var _validation = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FIELD_VALIDATORS_PROP_NAME = 'data-validators';

function checkElementInteractivity(component) {
  var whitelist = [_Form.FormControlLabel];

  return whitelist.includes(component.type) || _lodash2.default.has(component, 'props.name') && _lodash2.default.has(component, 'props.value');
}

function isValidForm(fields) {
  return _lodash2.default.size(_lodash2.default.filter(fields, function (field) {
    return field.validations.length > 0;
  })) === 0;
}

function getFieldValues(fields) {
  var values = {};
  _lodash2.default.each(fields, function (field, name) {
    if (_lodash2.default.get(field, 'checked') !== false) {
      values[name] = field.value;
    }
  });
  return values;
}

function getPristineFieldValues(fields) {
  var values = {};
  _lodash2.default.each(fields, function (field, name) {
    if (!field.isPristine && _lodash2.default.get(field, 'checked') !== false) {
      values[name] = field.pristineValue;
    }
  });
  return values;
}

function extractFieldValidators(fieldProps) {
  var validators = _lodash2.default.get(fieldProps, FIELD_VALIDATORS_PROP_NAME);
  if (validators !== undefined) {
    if (_lodash2.default.isString(validators)) {
      validators = validators.replace(/\s/g, '').split(',');
    } else if (!_lodash2.default.isArray(validators)) {
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

var Form = (_temp = _class = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.onFieldConstruct = function (fieldProps) {
      var checked = fieldProps.checked,
          name = fieldProps.name,
          required = fieldProps.required,
          value = fieldProps.value;

      // checkable input

      if (checked === true) {
        _lodash2.default.defer(function () {
          _this.setState({
            fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, getFieldTemplate(), {
              checked: checked || false,
              value: value
            })))
          });
        });
        // other inputs
      } else if (!_lodash2.default.isBoolean(checked)) {
        var requiredValidatorName = _this.validation.requiredValidatorName;

        if (!_lodash2.default.has(_this.state.fields, name)) {
          var validators = extractFieldValidators(fieldProps);

          if (required && !_lodash2.default.isEmpty(requiredValidatorName)) {
            validators.unshift(requiredValidatorName);
          }
          var isRequired = required || validators.includes(requiredValidatorName);

          // set any validations on first construct
          var validations = [];
          if (!_lodash2.default.has(_this.state.fields, name) && _lodash2.default.has(_this.props.validations, name)) {
            validations = _this.props.validations[name];
          }

          _lodash2.default.defer(function () {
            _this.setState({
              fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, getFieldTemplate(), {
                isRequired: isRequired,
                pristineValue: value,
                validators: validators,
                validations: validations,
                value: value
              })))
            });

            if (!_lodash2.default.isEmpty(value)) {
              _this.validateField(name, value);
            }
          });
        }
      }
    };

    _this.onFieldValueChange = function (name, value) {
      _lodash2.default.defer(function () {
        _this.setState({
          fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, _this.state.fields[name], {
            isPristine: false,
            validations: [],
            value: value
          })))
        });

        if (isValidForm(_this.state.fields)) {
          _this.enableSubmitButton();
          if (_this.props.onValuesChange !== null) {
            _this.props.onValuesChange(getFieldValues(_this.state.fields), getPristineFieldValues(_this.state.fields));
          }
        }

        _this.validateField(name, value);
      });
    };

    _this.onFieldToggle = function (name, value, checked) {
      _this.setState({
        fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, _this.state.fields[name], {
          checked: checked,
          isPristine: false,
          validations: [],
          value: value
        })))
      });
    };

    _this.validateField = function (name, value) {
      var field = _this.state.fields[name];
      if (!_lodash2.default.isEmpty(field.validators)) {
        var validation = _this.validation;

        var validations = validation.validate(value, field.validators, validation);

        field.validations = validations;
        _this.setState({
          fields: _extends({}, _this.state.fields, _defineProperty({}, name, field))
        });

        if (!_lodash2.default.isEmpty(validations)) {
          _this.disableSubmitButton();
        }
      }
    };

    _this.reset = function () {
      var fields = _this.state.fields;

      _lodash2.default.defer(function () {
        _lodash2.default.each(fields, function (field, name) {
          _this.setState({
            fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, _this.state.fields[name], {
              value: ''
            })))
          });
        });
      });
    };

    _this.submit = function (event) {
      event.preventDefault();
      var isValid = true;
      var fields = _this.state.fields;

      _lodash2.default.each(fields, function (field, name) {
        if (field.isRequired && field.value === '') {
          _this.validateField(name, '');
          isValid = false;
        }
      });
      if (isValid) {
        _this.props.onSubmit(getFieldValues(fields), getPristineFieldValues(fields));
      }
    };

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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var fields = this.state.fields;

      _lodash2.default.each(nextProps.validations, function (validations, name) {
        if (_lodash2.default.has(fields, name)) {
          fields[name].validations = validations;
        } else {
          // eslint-disable-next-line no-console
          console.warn('validations field "' + name + '" does not exist');
        }
      });
      this.setState({ fields: fields });
    }
  }, {
    key: 'enableSubmitButton',
    value: function enableSubmitButton() {
      if (this.state.disableSubmitButton) {
        this.setState({ disableSubmitButton: false });
      }
    }
  }, {
    key: 'disableSubmitButton',
    value: function disableSubmitButton() {
      if (this.props.disableSubmitButtonOnError) {
        this.setState({ disableSubmitButton: true });
      }
    }
  }, {
    key: 'cloneChildrenRecursively',
    value: function cloneChildrenRecursively(children) {
      var _this2 = this;

      return _react2.default.Children.map(children, function (child) {
        if (_lodash2.default.isEmpty(child)) {
          return null;
        }
        if (_lodash2.default.isString(child)) {
          return child;
        }

        var isInteractiveElement = checkElementInteractivity(child);
        var nestedChildren = _lodash2.default.isArray(child.props.children) && !isInteractiveElement ? _lodash2.default.filter(child.props.children, function (v) {
          return _lodash2.default.isObject(v) || _lodash2.default.isString(v);
        }) : false;

        // nested elements
        if (nestedChildren !== false) {
          // FormControl element with field/group name-value props
          if (child.type === _Form.FormControl) {
            var fieldElement = nestedChildren.find(function (el) {
              return ![_Form.FormLabel, _Input.InputLabel, _Form.FormHelperText].includes(el.type) && el.props.name !== undefined && el.props.value !== undefined;
            });
            if (fieldElement !== undefined) {
              var _name = fieldElement.props.name;

              return _react2.default.createElement(_FormControlClone2.default, {
                key: _name,
                field: _this2.state.fields[_name],
                formControlElement: child,
                onConstruct: _this2.onFieldConstruct,
                onValueChange: _this2.onFieldValueChange
              });
            }
          }
          // non-FormControl element
          return _react2.default.cloneElement(child, {
            children: _this2.cloneChildrenRecursively(nestedChildren)
          });
        }
        // add disable functionality to submit button
        if (child.props.type === 'submit') {
          return _react2.default.cloneElement(child, {
            disabled: _this2.state.disableSubmitButton
          });
          // non-interactive elements should be rendered as is
        } else if (!isInteractiveElement) {
          return child;
        }
        // clone control label
        if (child.type === _Form.FormControlLabel) {
          var _name2 = child.props.control.props.name;

          return _react2.default.createElement(_FormControlLabelClone2.default, {
            key: _name2,
            field: _this2.state.fields[_name2],
            control: child.props.control,
            label: child.props.label,
            onConstruct: _this2.onFieldConstruct,
            onToggle: _this2.onFieldToggle
          });
        }
        // clone input element
        var name = child.props.name;

        // checkable

        if (child.type === _Checkbox2.default || child.type === _Switch2.default) {
          return _react2.default.createElement(_CheckableFieldClone2.default, {
            key: name,
            field: _this2.state.fields[name],
            fieldComp: child,
            onConstruct: _this2.onFieldConstruct,
            onToggle: _this2.onFieldToggle
          });
        }

        return _react2.default.createElement(_FieldClone2.default, {
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
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        {
          onReset: this.reset,
          onSubmit: this.submit,
          autoComplete: this.props.autoComplete
        },
        this.cloneChildrenRecursively(this.props.children)
      );
    }
  }]);

  return Form;
}(_react2.default.Component), _class.propTypes = {
  autoComplete: _propTypes2.default.string,
  children: _propTypes2.default.array.isRequired,
  disableSubmitButtonOnError: _propTypes2.default.bool,
  onSubmit: _propTypes2.default.func.isRequired,
  onValuesChange: _propTypes2.default.func,
  validation: _propTypes2.default.shape({
    messageMap: _propTypes2.default.object,
    messageMapKeyPrefix: _propTypes2.default.string,
    requiredValidatorName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    validators: _propTypes2.default.object,
    validate: _propTypes2.default.func
  }),
  validations: _propTypes2.default.object
}, _class.defaultProps = {
  autoComplete: 'off',
  disableSubmitButtonOnError: true,
  onValuesChange: null,
  validation: {},
  validations: {}
}, _temp);
exports.default = Form;