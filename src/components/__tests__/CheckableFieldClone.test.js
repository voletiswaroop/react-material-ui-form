import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Checkbox from 'material-ui/Checkbox'

import CheckableFieldClone from '../CheckableFieldClone'


const field = {
  isPristine: true,
  isRequired: null,
  pristineValue: null,
  validations: [],
  validators: [],
  value: undefined,
}

describe('<CheckableFieldClone>:<Checkbox>', () => {
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

describe('<CheckableFieldClone> Invalid props', () => {
  it('should throw if control type is other than Checkbox or Switch', () => {
    let error
    try {
      shallow(
        <CheckableFieldClone
          field={field}
          fieldComp={<input />}
          onConstruct={jest.fn()}
          onToggle={jest.fn()}
        />
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })

  it('should throw if control type fieldComp has no name or value props', () => {
    let error
    try {
      shallow(
        <CheckableFieldClone
          field={field}
          fieldComp={(<Checkbox
            onChange={jest.fn()}
            checked
          />)}
          onConstruct={jest.fn()}
          onToggle={jest.fn()}
        />
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })
})
