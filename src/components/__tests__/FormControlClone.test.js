import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Input, { InputLabel } from 'material-ui/Input'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

import FormControlClone from '../FormControlClone'


const field = {
  isPristine: true,
  isRequired: null,
  pristineValue: null,
  validations: [],
  validators: [],
  value: undefined,
}

describe('<FormControlClone>:<Select>', () => {
  const formControlElement = (
    <FormControl required>
      <InputLabel htmlFor="age-helper">Age</InputLabel>
      <Select value="" name="age">
        <MenuItem value=""><em>Please select your age ...</em></MenuItem>
        <MenuItem value={10}>Teens</MenuItem>
        <MenuItem value={20}>Twenties</MenuItem>
        <MenuItem value={30}>Thirties</MenuItem>
        <MenuItem value="40+">Fourties +</MenuItem>
      </Select>
      <FormHelperText>Some important helper text</FormHelperText>
    </FormControl>
  )

  const wrapper = shallow(
    <FormControlClone
      field={field}
      formControlElement={formControlElement}
      onConstruct={jest.fn()}
      onValueChange={jest.fn()}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // TODO: how to simulate on children?
  // it('should handle onChange events of children', () => {
  //   const value = '10'
  //   const event = { target: { value } }
  //   wrapper.find(FormControlClone).simulate('change', event)
  //   expect(wrapper.state()).toMatchObject({
  //     isError: false,
  //     value,
  //   })
  //   expect(wrapper.instance().props.onValueChange).toHaveBeenCalled()
  // })
})

describe('<FormControlClone>:<RadioGroup>', () => {
  const formControlElement = (
    <FormControl
      component="fieldset"
      required
    >
      <FormLabel component="legend">
        RadioGroup FormControl
      </FormLabel>
      <RadioGroup
        name="certainty"
        value=""
      >
        <FormControlLabel
          value="high"
          control={<Radio />}
          label="I swear"
        />
        <FormControlLabel
          value="soso"
          control={<Radio />}
          label="Probably"
        />
        <FormControlLabel
          value="low"
          control={<Radio />}
          label="Maybe"
        />
      </RadioGroup>
    </FormControl>
  )

  const wrapper = shallow(
    <FormControlClone
      field={field}
      formControlElement={formControlElement}
      onConstruct={jest.fn()}
      onValueChange={jest.fn()}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
