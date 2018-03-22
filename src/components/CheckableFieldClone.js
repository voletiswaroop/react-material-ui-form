import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash' // eslint-disable-line import/no-extraneous-dependencies

import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'


export default class CheckableFieldClone extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    fieldComp: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    onConstruct: PropTypes.func.isRequired,
  }

  static defaultProps = {
    field: {},
  }

  constructor(props) {
    super(props)
    const { fieldComp } = props

    if (![Checkbox, Switch].includes(fieldComp.type)) {
      throw new Error('CheckableFieldClone should be a Checkbox or Switch')
    }
    if (fieldComp.type.name === undefined) {
      throw new Error('CheckableFieldClone does not support native elements')
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

  onToggle = (event, checked) => {
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
