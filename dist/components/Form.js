'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormHelperText = require('@material-ui/core/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _FormLabel = require('@material-ui/core/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _FormControlClone = require('./FormControlClone');

var _FormControlClone2 = _interopRequireDefault(_FormControlClone);

var _FormControlLabelClone = require('./FormControlLabelClone');

var _FormControlLabelClone2 = _interopRequireDefault(_FormControlLabelClone);

var _FieldClone = require('./FieldClone');

var _FieldClone2 = _interopRequireDefault(_FieldClone);

var _CheckableFieldClone = require('./CheckableFieldClone');

var _CheckableFieldClone2 = _interopRequireDefault(_CheckableFieldClone);

var _DeleteFieldRowButton = require('./DeleteFieldRowButton');

var _DeleteFieldRowButton2 = _interopRequireDefault(_DeleteFieldRowButton);

var _propNames = require('../propNames');

var _propNames2 = _interopRequireDefault(_propNames);

var _validation2 = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function verifyFieldElement(component) {
  var whitelist = [_FormControlLabel2.default];

  return whitelist.includes(component.type) || _lodash2.default.has(component, 'props.name') && _lodash2.default.has(component, 'props.value');
}

function extractFieldValidators(fieldProps) {
  var validators = _lodash2.default.get(fieldProps, _propNames2.default.FIELD_VALIDATORS);
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

function getFieldTemplate() {
  return {
    isDirty: false,
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    step: undefined,
    validations: [],
    validators: [],
    value: undefined
  };
}

function deriveErrorSteps(fields) {
  var errorSteps = [];
  _lodash2.default.each(fields, function (field) {
    if (field.validations.length > 0 && !errorSteps.includes(field.step)) {
      errorSteps.push(field.step);
    }
  });
  return errorSteps;
}

function isValidForm(fields) {
  return _lodash2.default.size(_lodash2.default.filter(fields, function (field) {
    return field.validations.length > 0;
  })) === 0;
}

var Form = (_temp = _class = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.validation = {
      messageMap: _validation2.messageMap,
      messageMapKeyPrefix: '',
      requiredValidatorName: _validation2.constants.REQUIRED_VALIDATOR_NAME,
      validators: _validation2.validators,
      validate: _validation2.validate,
      validateInputOnBlur: false
    };

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
              step: _this.props.activeStep,
              value: value
            })))
          });
        });
        // other inputs
      } else if (!_lodash2.default.isBoolean(checked)) {
        var _requiredValidatorName = _this.validation.requiredValidatorName;

        if (!_lodash2.default.has(_this.state.fields, name)) {
          var _validators = extractFieldValidators(fieldProps);

          if (required && !_lodash2.default.isEmpty(_requiredValidatorName)) {
            _validators.unshift(_requiredValidatorName);
          }
          var isRequired = required || _validators.includes(_requiredValidatorName);
          // set any validations on first construct
          var _validations = [];
          if (!_lodash2.default.has(_this.state.fields, name) && _lodash2.default.has(_this.props.validations, name)) {
            _validations = _this.props.validations[name];
          }

          _lodash2.default.defer(function () {
            _this.setState({
              fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, getFieldTemplate(), {
                isRequired: isRequired,
                pristineValue: value,
                step: _this.props.activeStep,
                validators: _validators,
                validations: _validations,
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
      var isDirty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _lodash2.default.defer(function () {
        _this.setState({
          fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, _this.state.fields[name], {
            isDirty: isDirty || _this.state.fields[name].isDirty,
            isPristine: false,
            validations: [],
            value: value
          })))
        });

        if (isValidForm(_this.state.fields)) {
          _this.enableSubmitButton();
        }
        if (_this.onValuesChange !== undefined) {
          _this.onValuesChange(getFieldValues(_this.state.fields), getPristineFieldValues(_this.state.fields));
        }

        if (_this.state.fields[name].isDirty) {
          _this.validateField(name, value);
        }
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

      if (!(field.value === '' && !field.isRequired) && !_lodash2.default.isEmpty(field.validators)) {
        var _validation = _this.validation;

        var _validations2 = _validation.validate(value, field.validators, _validation);

        // update state
        field.validations = _validations2;
        _this.setState({
          fields: _extends({}, _this.state.fields, _defineProperty({}, name, field))
        });
        // disable submit button
        if (!_lodash2.default.isEmpty(_validations2)) {
          _this.disableSubmitButton();
        }
        // propogate validation
        if (_this.props.onFieldValidation !== undefined) {
          var errorSteps = void 0;
          if (field.step !== undefined) {
            errorSteps = deriveErrorSteps(_this.state.fields);
          }
          _this.props.onFieldValidation(field, errorSteps);
        }
      }
    };

    _this.reset = function () {
      var fields = _this.state.fields;

      _lodash2.default.defer(function () {
        _lodash2.default.each(fields, function (field, name) {
          _this.setState({
            fields: _extends({}, _this.state.fields, _defineProperty({}, name, _extends({}, _this.state.fields[name], {
              isDirty: false,
              isPristine: true,
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

    _this.deleteRow = function (row) {
      var pos = row.indexOf('[');
      var rowName = row.substr(0, pos);
      var rowIndex = parseInt(row.substr(pos + 1), 10);

      var fields = _this.state.fields;

      _lodash2.default.each(fields, function (field, fieldName) {
        if (fieldName.startsWith(row)) {
          delete fields[fieldName];
        } else if (fieldName.startsWith(rowName)) {
          var index = parseInt(fieldName.substr(pos + 1), 10);
          if (index > rowIndex) {
            var newRow = fieldName.replace(/\[\d+\]/, '[' + (index - 1) + ']');
            delete fields[fieldName];
            fields[newRow] = field;
          }
        }
      });

      _this.setState({ fields: fields });
    };

    _this.onValuesChange = props.onValuesChange;
    _this.validation = Object.assign(_this.validation, props.validation);
    _this.state = {
      disableSubmitButton: false,
      fields: {}
    };
    return _this;
  }

  // eslint-disable-next-line react/sort-comp


  _createClass(Form, [{
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

        var isFieldElement = verifyFieldElement(child);
        var nestedChildren = _lodash2.default.isArray(child.props.children) && !isFieldElement ? _lodash2.default.filter(child.props.children, function (v) {
          return _lodash2.default.isObject(v) || _lodash2.default.isString(v);
        }) : false;

        // nested elements
        if (nestedChildren !== false) {
          // FormControl element with field/group name-value props
          if (child.type === _FormControl2.default) {
            var fieldElement = nestedChildren.find(function (el) {
              return ![_FormLabel2.default, _InputLabel2.default, _FormHelperText2.default].includes(el.type) && el.props.name !== undefined && el.props.value !== undefined;
            });
            if (fieldElement !== undefined) {
              var _name = fieldElement.props.name;

              return _react2.default.createElement(_FormControlClone2.default, {
                key: _name,
                field: _this2.state.fields[_name],
                formControlComp: child,
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
        } else if (!isFieldElement) {
          // delete row button
          if (child.props[_propNames2.default.DELETE_FIELD_ROW] !== undefined) {
            return _react2.default.createElement(_DeleteFieldRowButton2.default, {
              buttonComp: child,
              onRequestRowDelete: _this2.deleteRow
            });
          }
          // any other element
          return child;
        }
        // clone control label
        if (child.type === _FormControlLabel2.default) {
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
          useNativeRequiredValidator: !_this2.validation.requiredValidatorName,
          validateInputOnBlur: _this2.validation.validateInputOnBlur
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        {
          autoComplete: this.props.autoComplete,
          className: this.props.className,
          onReset: this.reset,
          onSubmit: this.submit,
          style: this.props.style,
          id: this.props.id,
          method: this.props.method,
          action: this.props.action,
          name: this.props.name
        },
        this.cloneChildrenRecursively(this.props.children)
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var fields = prevState.fields;


      if (!_lodash2.default.isEmpty(fields)) {
        // add validations to fields
        _lodash2.default.each(nextProps.validations, function (validations, name) {
          if (_lodash2.default.has(fields, name)) {
            fields[name].validations = validations;
          } else {
            // eslint-disable-next-line no-console
            console.warn('validations field "' + name + '" does not exist');
          }
        });
        return { fields: fields };
      }
      return null;
    }
  }]);

  return Form;
}(_react2.default.Component), _class.defaultProps = {
  activeStep: 0,
  autoComplete: 'off',
  className: undefined,
  disableSubmitButtonOnError: true,
  onFieldValidation: undefined,
  onValuesChange: undefined,
  style: {},
  validation: {},
  validations: {},
  id: undefined,
  method: undefined,
  action: undefined,
  name: undefined }, _temp);
exports.default = Form;