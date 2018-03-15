import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'


function getElementFromProps(props) {
  return React.Children.only(props.children)
}

function getRequiredProp(required, useNativeRequiredValidator) {
  if (!useNativeRequiredValidator) {
    return false
  }
  return required
}

function makeIsCheckableAndChecked(el) {
  let checked = null
  const isCheckable = el.type === Checkbox || el.type === Switch
  if (isCheckable) {
    checked = el.props.checked || false
  }
  return { isCheckable, checked }
}

function makeLabel(el, props) {
  const label = el.props.label || ''
  return props.field.isRequired && !props.useNativeRequiredValidator
    ? `${label} *`
    : label
}

function makeErrorAndHelperText(props, isCheckable) {
  const el = getElementFromProps(props)
  let helperText = _.get(el.props, 'helperText')
  let isError = false

  if (!isCheckable
    && !_.isEmpty(props.field)
    && props.field.validations.length > 0
  ) {
    helperText = props.field.validations[0].message
    isError = true
  }
  return { helperText, isError }
}

export default class FieldClone extends React.Component {
  static propTypes = {
    /* eslint-disable-next-line */
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    field: PropTypes.object,
    onToggle: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onConstruct: PropTypes.func.isRequired,
    useNativeRequiredValidator: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    field: {},
  }

  constructor(props) {
    super(props)
    const el = getElementFromProps(props)

    if (el.type.name === undefined) {
      throw new Error('FieldClone does not support native elements')
    }
    if (el.props.name === undefined || el.props.value === undefined) {
      throw new Error('FieldClone name and value must be defined')
    }

    const value = _.isEmpty(props.field) ? el.props.value : props.field.value
    const { isCheckable, checked } = makeIsCheckableAndChecked(el)
    const { helperText, isError } = makeErrorAndHelperText(props, isCheckable)

    this.state = {
      helperText,
      isError,
      value,
      checked,
    }

    if (props.field.value === undefined) {
      this.props.onConstruct(el.props)
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
    const el = getElementFromProps(this.props)
    // // /* TODO: create function for condition */
    if (!el.props.select) {
      const { value } = event.target
      this.props.onValueChange(el.props.name, value)
    }
  }

  onChange = (event) => {
    const el = getElementFromProps(this.props)
    const { value } = event.target
    const helperText = _.get(el.props, 'helperText')
    this.setState({ isError: false, helperText, value })
    /* TODO: create function for condition */
    if (el.props.select) {
      this.props.onValueChange(el.props.name, value)
    }
  }

  onToggle = (event, checked) => {
    const el = getElementFromProps(this.props)
    const value = checked ? el.props.value : ''
    this.setState({ checked, value })
    this.props.onToggle(el.props.name, value, checked)
  }

  render() {
    const el = getElementFromProps(this.props)
    let options = {
      value: this.state.value,
    }

    if (this.state.checked === null) {
      options = Object.assign(options, {
        label: makeLabel(el, this.props),
        error: this.state.isError,
        helperText: this.state.helperText,
        onBlur: el.props.onBlur || this.onBlur,
        onChange: el.props.onChange || this.onChange,
        required: getRequiredProp(
          el.props.required,
          this.props.useNativeRequiredValidator
        ),
      })
    } else {
      options = Object.assign(options, {
        checked: this.state.checked,
        onChange: el.props.onChange || el.props.onToggle || this.onToggle,
      })
    }

    return React.cloneElement(el, options)
  }
}
