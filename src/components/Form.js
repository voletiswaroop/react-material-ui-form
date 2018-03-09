import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FieldClone from './FieldClone'
import { validate } from '../validation'


const FIELD_VALIDATORS_PROP_NAME = 'data-validators'
const REQUIRED_VALIDATOR_CODE = 'notEmpty'

function checkElementInteractivity(element) {
  return _.has(element, 'props.name') && _.has(element, 'props.value')
}

function isValidForm(fields) {
  return _.size(_.filter(fields, field => field.validations.length > 0)) === 0
}

function getFieldValues(fields) {
  const values = {}
  _.each(fields, (field, name) => { values[name] = field.value })
  return values
}

function getPristineFieldValues(fields) {
  const values = {}
  _.each(fields, (field, name) => {
    if (!field.isPristine) {
      values[name] = field.pristineValue
    }
  })
  return values
}

function extractFieldValidators(fieldProps) {
  let validators = _.get(fieldProps, FIELD_VALIDATORS_PROP_NAME)
  if (validators !== undefined) {
    if (_.isString(validators)) {
      validators = validators.replace(/\s/g, '').split(',')
    } else if (!_.isArray(validators)) {
      validators = [validators]
    }
    return validators
  }
  return null
}

function getFieldTemplate() {
  return {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [],
    validators: [],
    value: null,
  }
}

export default class Form extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    disableSubmitButtonOnError: PropTypes.bool,
    validate: PropTypes.func,
    validations: PropTypes.object,
    validationMessageMap: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    disableSubmitButtonOnError: true,
    validate: null,
    validations: {},
    validationMessageMap: {},
  }

  constructor(props) {
    super(props)
    this.validate = props.validate || validate
    this.state = {
      disableSubmitButton: false,
      fields: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fields } = this.state
    _.each(nextProps.validations, (validations, name) => {
      fields[name].validations = validations
    })
    this.setState({ fields })
  }

  registerField = (fieldProps) => {
    const { name, value, required } = fieldProps
    if (!_.has(this.state.fields, name)) {
      const validators = extractFieldValidators(fieldProps)
      const isRequired = (
        !_.isEmpty(validators)
        && (required || validators.includes(REQUIRED_VALIDATOR_CODE))
      )

      _.defer(() => {
        this.setState({
          fields: {
            ...this.state.fields,
            [name]: {
              ...getFieldTemplate(),
              isRequired,
              pristineValue: value,
              validators,
              value,
            },
          },
        })

        if (!_.isEmpty(validators) && !_.isEmpty(value)) {
          this.validateField(name, value)
        }
      })
    }
  }

  updateFieldValue = (name, value) => {
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

      this.validateField(name, value)
    })
  }

  validateField = (name, value) => {
    const field = this.state.fields[name]

    let validations = []
    if (value !== '') {
      validations = this.validate(
        String(value),
        field.validators,
        this.props.validationMessageMap,
      )
    }

    field.validations = validations
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: field,
      },
    })
  }

  submit = (event) => {
    event.preventDefault()
    const { fields } = this.state
    _.each(fields, (field, name) => {
      if (field.isRequired
        && _.isEmpty(field.value)
        && !_.isNumber(field.value)
        && field.value !== 0
      ) {
        this.validateField(name, '')
      }
    })

    if (!isValidForm(fields)) {
      this.disableSubmitButton()
    } else {
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

  renderChildrenRecursively(children) {
    return React.Children.map(children, (child) => {
      // skip blanks
      if (_.isEmpty(child)) {
        return null
      }

      const isInteractiveElement = checkElementInteractivity(child)
      // use recursion on nested elements
      const nestedChildren = (
        _.isArray(child.props.children) && !isInteractiveElement
      )
        ? _.filter(child.props.children, _.isObject)
        : false
      if (!_.isEmpty(nestedChildren)) {
        return (
          <child.type>
            {this.renderChildrenRecursively(nestedChildren)}
          </child.type>
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
      // clone all input elements
      const { name } = child.props
      return (
        <FieldClone
          field={this.state.fields[name]}
          key={name}
          onValueChange={this.updateFieldValue}
          onConstruct={this.registerField}
        >
          {child}
        </FieldClone>
      )
    })
  }

  render() {
    return (
      <form
        onSubmit={this.submit}
        autoComplete="false"
      >
        { this.renderChildrenRecursively(this.props.children) }
      </form>
    )
  }
}
