import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import TextField from 'material-ui/TextField'

import FieldClone from '../FieldClone'


describe('<FieldClone>:<TextField>', () => {
  const field = {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [],
    validators: [],
    value: undefined,
  }
  const onFieldConstruct = jest.fn()
  const onFieldToggle = jest.fn()
  const onFieldValueChange = jest.fn()

  const wrapper = shallow(
    <FieldClone
      field={field}
      onConstruct={onFieldConstruct}
      onToggle={onFieldToggle}
      onValueChange={onFieldValueChange}
      useNativeRequiredValidator={false}
    >
      <TextField
        label="Name"
        type="text"
        name="name"
        value="mufasa"
        data-validators="isRequired,isAlpha"
      />
    </FieldClone>
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should have a single child', () => {
    expect(wrapper.find(TextField)).toHaveLength(1)
  })

  it('should not throw if field type prop is undefined', () => {
    function checkTypeName() {
      if (wrapper.instance().props.children.type.name === undefined) {
        throw new Error('FieldClone does not support native elements')
      }
    }
    expect(checkTypeName).not.toThrow()
  })

  it('should not throw if field component name and value are defined', () => {
    function testNameAndValueProps() {
      const { name, value } = wrapper.instance().props.children.props
      if (name === undefined || value === undefined) {
        throw new Error('FieldClone name and value must be defined')
      }
    }
    expect(testNameAndValueProps).not.toThrow()
  })

  it('should set state', () => {
    expect(wrapper.state()).toMatchObject({
      checked: null,
      helperText: undefined,
      isError: false,
      value: undefined,
    })
  })

  it('should call onConstruct', () => {
    expect(wrapper.instance().props.onConstruct).toHaveBeenCalled()
  })

  it('should have a rendered child with an undefined value prop', () => {
    expect(wrapper.prop('value')).toBeUndefined()
  })

  it('should have a rendered label', () => {
    expect(wrapper.state('checked')).toBeNull()
    expect(wrapper.prop('label')).toBeDefined()
  })

  it('should handle onChange events', () => {
    const value = 'x'
    const event = { target: { value } }
    wrapper.find(TextField).simulate('change', event)
    expect(wrapper.state()).toMatchObject({
      helperText: undefined,
      isError: false,
      value,
    })
  })

  it('should handle onBlur events', () => {
    const value = 'x'
    const event = { target: { value } }
    const { onValueChange } = wrapper.instance().props
    wrapper.find(TextField).simulate('blur', event)
    expect(onValueChange).toBeCalledWith(wrapper.prop('name'), value)
  })

  it('should update props', () => {
    const value = 'x'
    wrapper.setProps({ field: { value, validations: [] } })
    expect(wrapper.instance().props.field.validations).toBeDefined()
    expect(wrapper.state('value')).toEqual(value)
  })
})
