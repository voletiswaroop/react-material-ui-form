// @flow

import React from 'react'
import _ from 'lodash'

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'
import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'

import FormControlClone from './FormControlClone'
import FormControlLabelClone from './FormControlLabelClone'
import FieldClone from './FieldClone'
import CheckableFieldClone from './CheckableFieldClone'
import {
  messageMap,
  validate,
  validators as defaultValidators,
  constants as validationConstants,
} from '../validation'


const FIELD_VALIDATORS_PROP_NAME = 'data-validators'

function checkElementInteractivity(component: any): boolean {
  const whitelist = [
    FormControlLabel,
  ]

  return whitelist.includes(component.type)
   || (_.has(component, 'props.name') && _.has(component, 'props.value'))
}

function isValidForm(fields: Object): boolean {
  return _.size(_.filter(fields, field => field.validations.length > 0)) === 0
}

function getFieldValues(fields: Object): Object {
  const values = {}
  _.each(fields, (field, name) => {
    if (_.get(field, 'checked') !== false) {
      values[name] = field.value
    }
  })
  return values
}

function getPristineFieldValues(fields: Object): Object {
  const values = {}
  _.each(fields, (field, name) => {
    if (!field.isPristine && _.get(field, 'checked') !== false) {
      values[name] = field.pristineValue
    }
  })
  return values
}

function extractFieldValidators(fieldProps: Object): Array<mixed> {
  let validators = _.get(fieldProps, FIELD_VALIDATORS_PROP_NAME)
  if (validators !== undefined) {
    if (_.isString(validators)) {
      validators = validators.replace(/\s/g, '').split(',')
    } else if (!_.isArray(validators)) {
      validators = [validators]
    }
    return validators
  }
  return []
}

function getFieldTemplate() {
  return {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [],
    validators: [],
    value: undefined,
  }
}

type Props = {
  autoComplete?: string,
  children: Array<mixed>,
  disableSubmitButtonOnError?: boolean,
  onSubmit: Function,
  onValuesChange?: void | Function,
  validation?: {
    messageMap?: Object,
    messageMapKeyPrefix?: string,
    requiredValidatorName?: string | boolean,
    validators?: Object,
    validate?: Function,
  },
  validations: Object,
};

type State = {
  disableSubmitButton: boolean,
  fields: Object,
};

export default class Form extends React.Component<Props, State> {
  static defaultProps = {
    autoComplete: 'off',
    disableSubmitButtonOnError: true,
    onValuesChange: undefined,
    validation: {},
    validations: {},
  }

  // eslint-disable-next-line react/sort-comp
  onValuesChange: void
  validation = {
    messageMap,
    messageMapKeyPrefix: '',
    requiredValidatorName: validationConstants.REQUIRED_VALIDATOR_NAME,
    validators: defaultValidators,
    validate,
  }

  constructor(props: Object) {
    super(props)

    this.onValuesChange = props.onValuesChange
    this.validation = Object.assign(this.validation, props.validation)
    this.state = {
      disableSubmitButton: false,
      fields: {},
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    const { fields } = this.state
    _.each(nextProps.validations, (validations, name) => {
      if (_.has(fields, name)) {
        fields[name].validations = validations
      } else {
        // eslint-disable-next-line no-console
        console.warn(`validations field "${name}" does not exist`)
      }
    })
    this.setState({ fields })
  }

  onFieldConstruct = (fieldProps: Object) => {
    const {
      checked,
      name,
      required,
      value,
    } = fieldProps

    // checkable input
    if (checked === true) {
      _.defer(() => {
        this.setState({
          fields: {
            ...this.state.fields,
            [name]: {
              ...getFieldTemplate(),
              checked: checked || false,
              value,
            },
          },
        })
      })
    // other inputs
    } else if (!_.isBoolean(checked)) {
      const { requiredValidatorName } = this.validation
      if (!_.has(this.state.fields, name)) {
        const validators = extractFieldValidators(fieldProps)

        if (required && !_.isEmpty(requiredValidatorName)) {
          validators.unshift(requiredValidatorName)
        }
        const isRequired = required || validators.includes(requiredValidatorName)
        // set any validations on first construct
        let validations = []
        if (!_.has(this.state.fields, name)
          && _.has(this.props.validations, name)
        ) {
          validations = this.props.validations[name]
        }

        _.defer(() => {
          this.setState({
            fields: {
              ...this.state.fields,
              [name]: {
                ...getFieldTemplate(),
                isRequired,
                pristineValue: value,
                validators,
                validations,
                value,
              },
            },
          })

          if (!_.isEmpty(value)) {
            this.validateField(name, value)
          }
        })
      }
    }
  }

  onFieldValueChange = (name: string, value: mixed) => {
    _.defer(() => {
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: {
            ...this.state.fields[name],
            isPristine: false,
            validations: [],
            value,
          },
        },
      })

      if (isValidForm(this.state.fields)) {
        this.enableSubmitButton()
      }
      if (this.onValuesChange !== undefined) {
        this.onValuesChange(
          getFieldValues(this.state.fields),
          getPristineFieldValues(this.state.fields)
        )
      }

      this.validateField(name, value)
    })
  }

  onFieldToggle = (name: string, value: mixed, checked: boolean) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: {
          ...this.state.fields[name],
          checked,
          isPristine: false,
          validations: [],
          value,
        },
      },
    })
  }

  validateField = (name: string, value: mixed) => {
    const field = this.state.fields[name]
    if (!_.isEmpty(field.validators)) {
      const { validation } = this
      const validations = validation.validate(value, field.validators, validation)

      field.validations = validations
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: field,
        },
      })

      if (!_.isEmpty(validations)) {
        this.disableSubmitButton()
      }
    }
  }

  reset = () => {
    const { fields } = this.state
    _.defer(() => {
      _.each(fields, (field, name) => {
        this.setState({
          fields: {
            ...this.state.fields,
            [name]: {
              ...this.state.fields[name],
              value: '',
            },
          },
        })
      })
    })
  }

  submit = (event: Event) => {
    event.preventDefault()
    let isValid = true
    const { fields } = this.state
    _.each(fields, (field, name) => {
      if (field.isRequired && field.value === '') {
        this.validateField(name, '')
        isValid = false
      }
    })
    if (isValid) {
      this.props.onSubmit(
        getFieldValues(fields),
        getPristineFieldValues(fields)
      )
    }
  }

  enableSubmitButton() {
    if (this.state.disableSubmitButton) {
      this.setState({ disableSubmitButton: false })
    }
  }

  disableSubmitButton() {
    if (this.props.disableSubmitButtonOnError) {
      this.setState({ disableSubmitButton: true })
    }
  }

  cloneChildrenRecursively(children: any): any {
    return React.Children.map(children, (child) => {
      if (_.isEmpty(child)) {
        return null
      }
      if (_.isString(child)) {
        return child
      }

      const isInteractiveElement = checkElementInteractivity(child)
      const nestedChildren = _.isArray(child.props.children) && !isInteractiveElement
        ? _.filter(child.props.children, v => (_.isObject(v) || _.isString(v)))
        : false

      // nested elements
      if (nestedChildren !== false) {
        // FormControl element with field/group name-value props
        if (child.type === FormControl) {
          const fieldElement = nestedChildren.find(el =>
            ![FormLabel, InputLabel, FormHelperText].includes(el.type)
            && el.props.name !== undefined
            && el.props.value !== undefined)
          if (fieldElement !== undefined) {
            const { name } = fieldElement.props
            return (
              <FormControlClone
                key={name}
                field={this.state.fields[name]}
                formControlComp={child}
                onConstruct={this.onFieldConstruct}
                onValueChange={this.onFieldValueChange}
              />
            )
          }
        }
        // non-FormControl element
        return (
          React.cloneElement(child, {
            children: this.cloneChildrenRecursively(nestedChildren),
          })
        )
      }
      // add disable functionality to submit button
      if (child.props.type === 'submit') {
        return React.cloneElement(child, {
          disabled: this.state.disableSubmitButton,
        })
      // non-interactive elements should be rendered as is
      } else if (!isInteractiveElement) {
        return child
      }
      // clone control label
      if (child.type === FormControlLabel) {
        const { name } = child.props.control.props
        return (
          <FormControlLabelClone
            key={name}
            field={this.state.fields[name]}
            control={child.props.control}
            label={child.props.label}
            onConstruct={this.onFieldConstruct}
            onToggle={this.onFieldToggle}
          />
        )
      }
      // clone input element
      const { name } = child.props

      // checkable
      if (child.type === Checkbox || child.type === Switch) {
        return (
          <CheckableFieldClone
            key={name}
            field={this.state.fields[name]}
            fieldComp={child}
            onConstruct={this.onFieldConstruct}
            onToggle={this.onFieldToggle}
          />
        )
      }

      return (
        <FieldClone
          key={name}
          field={this.state.fields[name]}
          fieldComp={child}
          onConstruct={this.onFieldConstruct}
          onValueChange={this.onFieldValueChange}
          useNativeRequiredValidator={!this.validation.requiredValidatorName}
        />
      )
    })
  }

  render() {
    return (
      <form
        onReset={this.reset}
        onSubmit={this.submit}
        autoComplete={this.props.autoComplete}
      >
        { this.cloneChildrenRecursively(this.props.children) }
      </form>
    )
  }
}
