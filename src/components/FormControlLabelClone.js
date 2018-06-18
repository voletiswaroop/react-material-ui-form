// @flow

import React from 'react'
import _ from 'lodash'

import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'


type Props = {
  control: Object,
  field?: Object,
  label: string,
  onToggle: Function,
  onConstruct: Function,
};

type State = {
  checked: boolean,
  value: string,
};

export default class FormControlLabelClone extends React.Component<Props, State> {
  static defaultProps = {
    field: {},
  }

  constructor(props: Object) {
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

  onToggle = (event: SyntheticInputEvent<Element>, checked: boolean) => {
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
