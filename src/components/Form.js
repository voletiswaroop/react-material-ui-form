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
import DeleteFieldRowButton from './DeleteFieldRowButton'
import propNames from '../propNames'
import {
  messageMap,
  validate,
  validators as defaultValidators,
  constants as validationConstants,
} from '../validation'


function verifyFieldElement(component: any): boolean {
  const whitelist = [
    FormControlLabel,
  ]

  return whitelist.includes(component.type)
   || (_.has(component, 'props.name') && _.has(component, 'props.value'))
}

function extractFieldValidators(fieldProps: Object): Array<mixed> {
  let validators = _.get(fieldProps, propNames.FIELD_VALIDATORS)
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

function getFieldTemplate() {
  return {
    isDirty: false,
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    step: undefined,
    validations: [],
    validators: [],
    value: undefined,
  }
}

function deriveErrorSteps(fields: Object): Array<number> {
  const errorSteps = []
  _.each(fields, (field) => {
    if (field.validations.length > 0 && !errorSteps.includes(field.step)) {
      errorSteps.push(field.step)
    }
  })
  return errorSteps
}

function isValidForm(fields: Object): boolean {
  return _.size(_.filter(fields, field => field.validations.length > 0)) === 0
}

type Props = {
  activeStep?: number,
  autoComplete?: string,
  children: Array<mixed>,
  disableSubmitButtonOnError?: boolean,
  onFieldValidation?: Function,
  onSubmit: Function,
  onValuesChange?: void | Function,
  validation?: {
    messageMap?: Object,
    messageMapKeyPrefix?: string,
    requiredValidatorName?: string | boolean,
    validators?: Object,
    validate?: Function,
    validateInputOnBlur?: boolean,
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
    onFieldValidation: undefined,
    onValuesChange: undefined,
    validation: {},
    validations: {},
  }

  static getDerivedStateFromProps(nextProps: Object, prevState: Object) {
    const { fields } = prevState

    if (!_.isEmpty(fields)) {
      // add validations to fields
      _.each(nextProps.validations, (validations, name) => {
        if (_.has(fields, name)) {
          fields[name].validations = validations
        } else {
          // eslint-disable-next-line no-console
          console.warn(`validations field "${name}" does not exist`)
        }
      })
      return { fields }
    }
    return null
  }

  // eslint-disable-next-line react/sort-comp
  onValuesChange: void
  validation = {
    messageMap,
    messageMapKeyPrefix: '',
    requiredValidatorName: validationConstants.REQUIRED_VALIDATOR_NAME,
    validators: defaultValidators,
    validate,
    validateInputOnBlur: false,
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
              step: this.props.activeStep,
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
                step: this.props.activeStep,
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

  onFieldValueChange = (name: string, value: any, isDirty: boolean = false) => {
    _.defer(() => {
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: {
            ...this.state.fields[name],
            isDirty: isDirty || this.state.fields[name].isDirty,
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

      if (this.state.fields[name].isDirty) {
        this.validateField(name, value)
      }
    })
  }

  onFieldToggle = (name: string, value: any, checked: boolean) => {
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

  validateField = (name: string, value: any) => {
    const field = this.state.fields[name]

    if (!(field.value === '' && !field.isRequired) && !_.isEmpty(field.validators)) {
      const { validation } = this
      const validations = validation.validate(value, field.validators, validation)

      // update state
      field.validations = validations
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: field,
        },
      })
      // disable submit button
      if (!_.isEmpty(validations)) {
        this.disableSubmitButton()
      }
      // propogate validation
      if (this.props.onFieldValidation !== undefined) {
        let errorSteps
        if (field.step !== undefined) {
          errorSteps = deriveErrorSteps(this.state.fields)
        }
        this.props.onFieldValidation(field, errorSteps)
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
              isDirty: false,
              isPristine: true,
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

  deleteRow = (row: string) => {
    const pos: number = row.indexOf('[')
    const rowName: string = row.substr(0, pos)
    const rowIndex: number = parseInt(row.substr(pos + 1), 10)

    const { fields } = this.state
    _.each(fields, (field, fieldName) => {
      if (fieldName.startsWith(row)) {
        delete fields[fieldName]
      } else if (fieldName.startsWith(rowName)) {
        const index = parseInt(fieldName.substr(pos + 1), 10)
        if (index > rowIndex) {
          const newRow = fieldName.replace(/\[\d+\]/, `[${(index - 1)}]`)
          delete fields[fieldName]
          fields[newRow] = field
        }
      }
    })

    this.setState({ fields })
  }

  cloneChildrenRecursively(children: any): any {
    return React.Children.map(children, (child) => {
      if (_.isEmpty(child)) {
        return null
      }
      if (_.isString(child)) {
        return child
      }

      const isFieldElement = verifyFieldElement(child)
      const nestedChildren = _.isArray(child.props.children) && !isFieldElement
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
      } else if (!isFieldElement) {
        // delete row button
        if (child.props[propNames.DELETE_FIELD_ROW] !== undefined) {
          return (<DeleteFieldRowButton
            buttonComp={child}
            onRequestRowDelete={this.deleteRow}
          />)
        }
        // any other element
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
          validateInputOnBlur={this.validation.validateInputOnBlur}
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
