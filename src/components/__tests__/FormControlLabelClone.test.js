import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'

import FormControlLabelClone from '../FormControlLabelClone'


describe('<FormControlLabelClone>:<Checkbox>', () => {
  const field = {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [],
    validators: [],
    value: undefined,
  }

  const wrapper = shallow(
    <FormControlLabelClone
      control={<Checkbox checked={false} name="love" value="yes" />}
      field={field}
      label="I love love"
      onConstruct={jest.fn()}
      onToggle={jest.fn()}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should not throw if field type prop is Checkbox or Switch', () => {
    function checkType() {
      if (![Checkbox, Switch].includes(wrapper.instance().props.control.type)) {
        throw new Error('FieldClone does not support native elements')
      }
    }
    expect(checkType).not.toThrow()
  })

  it('should call onConstruct', () => {
    expect(wrapper.instance().props.onConstruct).toHaveBeenCalled()
  })

  it('should set state', () => {
    const { control } = wrapper.instance().props
    expect(wrapper.state()).toMatchObject({
      checked: control.props.checked,
      value: control.props.value,
    })
  })

  it('should handle onToggle events', () => {
    const checked = true
    const event = { target: { checked } }
    wrapper.simulate('change', event)
    expect(wrapper.state()).toMatchObject({
      checked,
      value: wrapper.state('value'),
    })
    expect(wrapper.instance().props.onToggle).toHaveBeenCalled()
  })
})
