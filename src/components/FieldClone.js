import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash' // eslint-disable-line import/no-extraneous-dependencies


function getRequiredProp(required, useNativeRequiredValidator) {
  if (!useNativeRequiredValidator) {
    return false
  }
  return required
}

function makeLabel(fieldComp, props) {
  const label = fieldComp.props.label || ''
  return props.field.isRequired && !props.useNativeRequiredValidator
    ? `${label} *`
    : label
}

function makeErrorAndHelperText(props) {
  let helperText = _.get(props.fieldComp.props, 'helperText')
  let isError = false

  if (!_.isEmpty(props.field) && props.field.validations.length > 0) {
    helperText = props.field.validations[0].message
    isError = true
  }
  return { helperText, isError }
}

export default class FieldClone extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    fieldComp: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onConstruct: PropTypes.func.isRequired,
    useNativeRequiredValidator: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    field: {},
  }

  constructor(props) {
    super(props)
    const { fieldComp } = props

    if (fieldComp.type.name === undefined) {
      throw new Error('FieldClone does not support native elements')
    }
    if (fieldComp.props.name === undefined || fieldComp.props.value === undefined) {
      throw new Error('FieldClone name and value must be defined')
    }

    const value = _.isEmpty(props.field) ? fieldComp.props.value : props.field.value
    const { helperText, isError } = makeErrorAndHelperText(props)

    this.state = {
      helperText,
      isError,
      value,
    }

    if (props.field.value === undefined) {
      this.props.onConstruct(fieldComp.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.field)) {
      const { helperText, isError } = makeErrorAndHelperText(nextProps)
      this.setState({
        helperText,
        isError,
        value: nextProps.field.value,
      })
    }
  }

  onBlur = (event) => {
    const { fieldComp } = this.props
    // // /* TODO: create function for condition */
    if (!fieldComp.props.select) {
      const { value } = event.target
      this.props.onValueChange(fieldComp.props.name, value)
    }
  }

  onChange = (event) => {
    const { fieldComp } = this.props
    const { value } = event.target
    const helperText = _.get(fieldComp.props, 'helperText')
    this.setState({ isError: false, helperText, value })
    /* TODO: create function for condition */
    if (fieldComp.props.select) {
      this.props.onValueChange(fieldComp.props.name, value)
    }
  }

  render() {
    const { fieldComp, ...props } = this.props
    return React.cloneElement(fieldComp, {
      value: this.state.value,
      label: makeLabel(fieldComp, props),
      error: this.state.isError,
      helperText: this.state.helperText,
      onBlur: fieldComp.props.onBlur || this.onBlur,
      onChange: fieldComp.props.onChange || this.onChange,
      required: getRequiredProp(
        fieldComp.props.required,
        this.props.useNativeRequiredValidator
      ),
    })
  }
}
