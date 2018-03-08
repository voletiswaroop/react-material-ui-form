import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'


function getElementFromProps(props) {
  return React.Children.only(props.children)
}

function makeLabel(props) {
  const el = getElementFromProps(props)
  const label = el.props.label || ''
  return props.field.isRequired && !_.get(el.props, 'required')
    ? `${label} *`
    : label
}

function makeErrorAndHelperText(props) {
  const el = getElementFromProps(props)
  let helperText = _.get(el.props, 'helperText')
  let isError = false
  if (!_.isEmpty(props.field) && props.field.validations.length > 0) {
    helperText = props.field.validations[0].message
    isError = true
  }
  return { helperText, isError }
}

const styles = theme => ({
  invalid: {
    color: theme.palette.error[500],
    fontWeight: 800,
  },
})

@withStyles(styles)
export default class FieldClone extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    classes: PropTypes.object.isRequired,
    field: PropTypes.object,
    onValueChange: PropTypes.func.isRequired,
    onConstruct: PropTypes.func.isRequired,
  }

  static defaultProps = {
    classes: {},
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
    const { helperText, isError } = makeErrorAndHelperText(props)

    this.state = {
      helperText,
      isError,
      value,
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
    event.stopPropagation()
    const el = getElementFromProps(this.props)
    // // /* TODO: create function for condition */
    if (!el.props.select) {
      const value = event.target.value
      this.props.onValueChange(el.props.name, value)
    }
  }

  onChange = (event) => {
    event.stopPropagation()
    const el = getElementFromProps(this.props)
    const value = event.target.value
    const helperText = _.get(el.props, 'helperText')
    this.setState({ isError: false, helperText, value })
    /* TODO: create function for condition */
    if (el.props.select) {
      this.props.onValueChange(el.props.name, value)
    }
  }

  render() {
    const el = getElementFromProps(this.props)
    const { classes, ...props } = this.props

    return React.cloneElement(el, {
      error: this.state.isError,
      helperText: this.state.helperText,
      label: makeLabel(props),
      onBlur: el.props.onBlur || this.onBlur,
      onChange: el.props.onChange || this.onChange,
      value: this.state.value,
    })
  }
}
