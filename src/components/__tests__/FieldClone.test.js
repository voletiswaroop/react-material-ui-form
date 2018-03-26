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

  const wrapper = shallow(
    <FieldClone
      field={field}
      fieldComp={(
        <TextField
          data-validators="isRequired,isAlpha"
          label="Name"
          type="text"
          name="name"
          onBlur={jest.fn()}
          onChange={jest.fn()}
          value="mufasa"
        />
      )}
      onConstruct={jest.fn()}
      onValueChange={jest.fn()}
      useNativeRequiredValidator={false}
      validateInputOnBlur
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should not throw if field type prop is undefined', () => {
    function checkTypeName() {
      if (wrapper.instance().props.fieldComp.type.name === undefined) {
        throw new Error('FieldClone does not support native elements')
      }
    }
    expect(checkTypeName).not.toThrow()
  })

  it('should not throw if field component name and value are defined', () => {
    function testNameAndValueProps() {
      const { name, value } = wrapper.instance().props.fieldComp.props
      if (name === undefined || value === undefined) {
        throw new Error('FieldClone name and value must be defined')
      }
    }
    expect(testNameAndValueProps).not.toThrow()
  })

  it('should set state', () => {
    expect(wrapper.state()).toMatchObject({
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

describe('<FieldClone>:<Select>', () => {
  const field = {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [{ code: 'error', message: 'invalid' }],
    validators: [],
    value: undefined,
  }

  const wrapper = shallow(
    <FieldClone
      field={field}
      fieldComp={(
        <TextField
          select
          label="Color"
          name="color"
          value=""
          SelectProps={{ native: true }}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </TextField>
      )}
      onConstruct={jest.fn()}
      onValueChange={jest.fn()}
      useNativeRequiredValidator
      validateInputOnBlur={false}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should handle onChange events', () => {
    const value = 'blue'
    const event = { target: { value } }
    const { onValueChange } = wrapper.instance().props
    wrapper.find(TextField).simulate('change', event)
    expect(wrapper.state()).toMatchObject({
      helperText: undefined,
      isError: false,
      value,
    })
    expect(onValueChange).toBeCalledWith(wrapper.prop('name'), value)
  })
})

describe('<FieldClone> Invalid props', () => {
  const field = {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [{ code: 'error', message: 'invalid' }],
    validators: [],
    value: undefined,
  }

  it('should throw if field type prop is undefined', () => {
    let error
    try {
      shallow(
        <FieldClone
          field={field}
          fieldComp={(
            <div>invalid</div>
          )}
          onConstruct={jest.fn()}
          onValueChange={jest.fn()}
          useNativeRequiredValidator
          validateInputOnBlur={false}
        />
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })

  it('should throw if field component name and value are undefined', () => {
    let error
    try {
      shallow(
        <FieldClone
          field={field}
          fieldComp={(
            <TextField type="text" />
          )}
          onConstruct={jest.fn()}
          onValueChange={jest.fn()}
          useNativeRequiredValidator
          validateInputOnBlur={false}
        />
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })
})
