import React from 'react'
import PropTypes from 'prop-types'

import { FormControl, FormHelperText, FormLabel } from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'


function getErrorAndHelperText(field) {
  let helperText
  let isError = false
  if (!_.isEmpty(field) && field.validations.length > 0) {
    helperText = field.validations[0].message
    isError = true
  }
  return { helperText, isError }
}

export default class FormControlClone extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    formControlElement: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onConstruct: PropTypes.func.isRequired,
  }

  static defaultProps = {
    field: {},
  }

  constructor(props) {
    super(props)

    const { error, required } = props.formControlElement.props

    let name
    let value
    let helperText
    let isError = error

    React.Children.forEach(props.formControlElement.props.children, (child) => {
      if (child.type === FormHelperText) {
        helperText = String(child.props.children)
        this.helperText = helperText
      } else if (child.type !== FormLabel
        && child.type !== InputLabel
        && child.props.name !== undefined
        && child.props.value !== undefined
      ) {
        name = child.props.name // eslint-disable-line prefer-destructuring
        value = child.props.value // eslint-disable-line prefer-destructuring
      }
    })

    if (props.formControlElement.type !== FormControl
      || name === undefined
      || value === undefined
    ) {
      throw new Error('invalid FormControl control children')
    }

    if (props.field.value === undefined) {
      props.onConstruct({ name, value, required })
    } else {
      value = props.field.value // eslint-disable-line prefer-destructuring
      if (!_.isEmpty(props.field) && props.field.validations.length > 0) {
        const fieldError = getErrorAndHelperText(props.field)
        helperText = fieldError.helperText // eslint-disable-line prefer-destructuring
        isError = fieldError.isError // eslint-disable-line prefer-destructuring
      }
    }

    this.name = name
    this.state = {
      helperText,
      isError,
      value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.field)) {
      const { helperText, isError } = getErrorAndHelperText(nextProps.field)
      this.setState({
        helperText,
        isError,
        value: nextProps.field.value,
      })
    }
  }

  onChange = (event) => {
    const { value } = event.target
    this.setState({ isError: false, helperText: this.helperText, value })
    this.props.onValueChange(this.name, value)
  }

  render() {
    const { formControlElement, formControlElement: { props } } = this.props

    let hasHelperText = false
    const children = React.Children.map(props.children, (child) => {
      // label
      if (child.type === FormLabel || child.type === InputLabel) {
        return child
      }
      // helper text
      if (child.type === FormHelperText) {
        hasHelperText = true
        return React.cloneElement(child, {
          children: this.state.helperText,
        })
      }
      // field
      return React.cloneElement(child, {
        onChange: child.props.onChange || this.onChange,
        value: this.state.value,
      })
    })
    // support for dynamic helper text
    if (!hasHelperText && this.state.helperText !== undefined) {
      children.push(<FormHelperText key={1}>{this.state.helperText}</FormHelperText>)
    }

    return (
      React.cloneElement(formControlElement, {
        error: this.state.isError,
        children,
      })
    )
  }
}
