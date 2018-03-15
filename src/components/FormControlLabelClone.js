import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'
import { FormControlLabel } from 'material-ui/Form'


export default class FormControlLabelClone extends React.Component {
  static propTypes = {
    /* eslint-disable-next-line */
    control: PropTypes.object.isRequired,
    field: PropTypes.object,
    label: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    onConstruct: PropTypes.func.isRequired,
  }

  static defaultProps = {
    field: {},
  }

  constructor(props) {
    super(props)

    if (![Checkbox, Switch].includes(props.control.type)) {
      throw new Error('invalid FormControlLabel control component')
    }

    let { checked } = props.control.props
    const { value } = props.control.props

    if (props.field.value === undefined) {
      props.onConstruct(props.control.props)
    } else {
      checked = props.field.checked // eslint-disable-line prefer-destructuring
    }

    this.state = {
      checked,
      value,
    }
  }

  onToggle = (event, checked) => {
    let { value } = this.props.control.props // eslint-disable-line react/prop-types
    const { name } = this.props.control.props // eslint-disable-line react/prop-types
    value = checked ? value : ''
    this.setState({ checked, value })
    this.props.onToggle(name, value, checked)
  }

  render() {
    const { control, label } = this.props
    const controlOptions = {
      checked: this.state.checked,
      onChange: control.props.onChange || control.props.onToggle || this.onToggle,
      value: this.state.value,
    }

    return (
      <FormControlLabel
        control={React.cloneElement(control, controlOptions)}
        label={label}
      />
    )
  }
}
