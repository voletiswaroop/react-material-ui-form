import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash' // eslint-disable-line import/no-extraneous-dependencies

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
      checked = _.get(props.field, 'checked')
    }

    this.state = {
      checked,
      value,
    }
  }

  onToggle = (event, checked) => {
    checked = _.get(event, 'target.checked') || checked
    let { value } = this.props.control.props // eslint-disable-line react/prop-types
    const { name } = this.props.control.props // eslint-disable-line react/prop-types
    value = checked ? value : ''
    this.setState({ checked, value })
    this.props.onToggle(name, value, checked)
  }

  render() {
    const { control, label } = this.props
    const onChange = (
      control.props.onChange || control.props.onToggle || this.onToggle
    )
    const controlOptions = {
      checked: this.state.checked,
      onChange,
      value: this.state.value,
    }

    return (
      <FormControlLabel
        checked={this.state.checked}
        control={React.cloneElement(control, controlOptions)}
        onChange={onChange}
        label={label}
        value={this.state.value}
      />
    )
  }
}
