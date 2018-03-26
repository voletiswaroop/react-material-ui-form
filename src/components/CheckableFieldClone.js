// @flow

import React from 'react'

import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'


type Props = {
  field?: Object,
  fieldComp: Object,
  onConstruct: Function,
  onToggle: Function,
};

type State = {
  checked: boolean,
};

export default class CheckableFieldClone extends React.Component<Props, State> {
  static defaultProps = {
    field: {},
  }

  constructor(props: Object) {
    super(props)
    const { fieldComp } = props

    if (![Checkbox, Switch].includes(fieldComp.type)) {
      throw new Error('CheckableFieldClone should be a Checkbox or Switch')
    }
    if (fieldComp.props.name === undefined || fieldComp.props.value === undefined) {
      throw new Error('CheckableFieldClone name and value must be defined')
    }

    let checked = props.field.value
    if (props.field.value === undefined) {
      checked = fieldComp.props.checked || false
      this.props.onConstruct(fieldComp.props)
    }
    this.state = { checked }
  }

  onToggle = (event: Event, checked: boolean) => {
    const { fieldComp, fieldComp: { props: { name, value } } } = this.props
    this.setState({ checked })
    this.props.onToggle(name, value, checked)
    if (fieldComp.props.onChange !== undefined) {
      fieldComp.props.onChange(checked, { name, value }, event)
    }
  }

  render() {
    const { fieldComp } = this.props
    return React.cloneElement(fieldComp, {
      value: fieldComp.props.value,
      checked: this.state.checked,
      onChange: this.onToggle,
    })
  }
}
