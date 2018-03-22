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

    const value = _.isEmpty(props.field) ? fieldComp.props.value : props.field.value

    this.state = {
      value,
      checked: fieldComp.props.checked || false,
    }

    if (props.field.value === undefined) {
      this.props.onConstruct(fieldComp.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.field)) {
      this.setState({ value: nextProps.field.value })
    }
  }

  onToggle = (event, checked) => {
    const { fieldComp } = this.props
    const value = checked ? fieldComp.props.value : ''
    this.setState({ checked, value })
    this.props.onToggle(fieldComp.props.name, value, checked)
  }

  render() {
    const { fieldComp } = this.props
    return React.cloneElement(fieldComp, {
      value: this.state.value,
      checked: this.state.checked,
      onChange: fieldComp.props.onToggle || this.onToggle,
    })
  }
}
