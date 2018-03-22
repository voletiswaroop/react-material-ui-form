import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Checkbox from 'material-ui/Checkbox'
import Switch from 'material-ui/Switch'

import CheckableFieldClone from '../CheckableFieldClone'


describe('<CheckableFieldClone>:<Checkbox>', () => {
  const field = {
    isPristine: true,
    isRequired: null,
    pristineValue: null,
    validations: [],
    validators: [],
    value: undefined,
  }

  const wrapper = shallow(
    <CheckableFieldClone
      field={field}
      fieldComp={(<Checkbox
        onChange={jest.fn()}
        checked
        name="foo"
        value="bar"
      />)}
      onConstruct={jest.fn()}
      onToggle={jest.fn()}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should handle onToggle events', () => {
    const checked = false
    const event = { target: { checked } }
    wrapper.simulate('change', event)
    expect(wrapper.instance().props.onToggle).toHaveBeenCalled()
  })
})
