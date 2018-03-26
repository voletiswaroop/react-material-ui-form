// @flow

import React from 'react'
import _ from 'lodash'


function getRequiredProp(
  required: ?boolean,
  useNativeRequiredValidator: boolean
): boolean {
  if (!useNativeRequiredValidator) {
    return false
  }
  return required || false
}

function makeLabel(fieldComp: Object, props: Object): string {
  const label: string = fieldComp.props.label || ''
  return props.field.isRequired && !props.useNativeRequiredValidator
    ? `${label} *`
    : label
}

function makeErrorAndHelperText(props: Object): Object {
  let helperText: ?string = _.get(props.fieldComp.props, 'helperText')
  let isError: boolean = false

  if (!_.isEmpty(props.field) && props.field.validations.length > 0) {
    helperText = props.field.validations[0].message
    isError = true
  }
  return { helperText, isError }
}

type Props = {
  field?: Object,
  fieldComp: Object,
  onConstruct: Function,
  onValueChange: Function,
  useNativeRequiredValidator: boolean,
  validateInputOnBlur: boolean,
};

type State = {
  helperText: ?string,
  isError: boolean,
  value: mixed,
};

export default class FieldClone extends React.Component<Props, State> {
  static defaultProps = {
    field: {},
  }

  constructor(props: Object) {
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

  componentWillReceiveProps(nextProps: Object) {
    if (!_.isEmpty(nextProps.field)) {
      const { helperText, isError } = makeErrorAndHelperText(nextProps)
      this.setState({
        helperText,
        isError,
        value: nextProps.field.value,
      })
    }
  }

  onBlur = (event: SyntheticInputEvent<Element>) => {
    const {
      fieldComp,
      fieldComp: { props: { name } },
      validateInputOnBlur,
    } = this.props
    const { value } = event.target
    // // /* TODO: create function for condition */
    if (validateInputOnBlur && !fieldComp.props.select) {
      this.props.onValueChange(name, value)
    }
    if (fieldComp.props.onBlur !== undefined) {
      fieldComp.props.onBlur(value, { name }, event)
    }
  }

  onChange = (event: SyntheticInputEvent<Element>) => {
    const {
      fieldComp,
      fieldComp: { props: { name } },
      validateInputOnBlur,
    } = this.props
    const { value } = event.target
    if (fieldComp.props.select || validateInputOnBlur) {
      const helperText: ?string = _.get(fieldComp.props, 'helperText')
      this.setState({ isError: false, helperText, value })
    }
    /* TODO: create function for condition */
    if (!validateInputOnBlur || fieldComp.props.select) {
      this.props.onValueChange(name, value)
    }
    if (fieldComp.props.onChange !== undefined) {
      fieldComp.props.onChange(value, { name }, event)
    }
  }

  render() {
    const { fieldComp, ...props } = this.props
    return React.cloneElement(fieldComp, {
      value: this.state.value,
      label: makeLabel(fieldComp, props),
      error: this.state.isError,
      helperText: this.state.helperText,
      onBlur: this.onBlur,
      onChange: this.onChange,
      required: getRequiredProp(
        fieldComp.props.required,
        this.props.useNativeRequiredValidator
      ),
    })
  }
}
