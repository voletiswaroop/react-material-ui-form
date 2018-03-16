[![npm package](https://img.shields.io/npm/v/material-ui-form.svg)](https://www.npmjs.com/package/material-ui-form)
[![Build Status](https://travis-ci.org/unitedhubs/material-ui-form.svg?branch=dev)](https://travis-ci.org/unitedhubs/material-ui-form)
[![PeerDependencies](https://img.shields.io/david/peer/unitedhubs/material-ui-form.svg)](https://david-dm.org/unitedhubs/material-ui-form?type=peer)
[![Dependencies](https://img.shields.io/david/unitedhubs/material-ui-form.svg)](https://david-dm.org/unitedhubs/material-ui-form)
[![DevDependencies](https://img.shields.io/david/dev/unitedhubs/material-ui-form.svg)](https://david-dm.org/unitedhubs/material-ui-form?type=dev)

## About

_material-ui-form_ is a minimal wrapper for your form so you can get state and validation management "as-is" without having to configure anything or make changes to any of your form components or nesting structure.

It also supports validation out-of-the-box (using [validator.js](https://github.com/chriso/validator.js)) and allows you to extend its validation messages, validators, and use your own validation logic if you need to.

The wrapper keeps all values and validations in its own state, allowing for functionality like steppers (multi-page forms) and conditional form fields.

#### conditions

- only supports [Material-UI](https://material-ui-1dab0.firebaseapp.com/getting-started/usage/) fields (and custom Material-UI fields)
- must set `value` and `name` props on every field
- remove any `onChange` and `onBlur` props (unless you want to customize that logic)
- set a `data-validators` prop on a field to specify its validators

#### extra validators

_validator.js_ validators are extended with these handy bad-boys:

- isAlias: _/^[a-zA-Z0-9-_\.]*$/i_
- isDate
- isNumber: _/^([,.\d]+)$/_
- isRequired: _value.length !== 0_
- isSerial: _/^([-\s\da-zA-Z]+)$/_
- isSize: _value >= min && value <= max_
- isTime

#### _NOTE!_

While most Material-UI field components are supported there may be some that are not. Support for Material-UI field component props is another issue. Please [check here](https://github.com/unitedhubs/material-ui-form/issues/5) to see what is currently tested to be working.  

## Setup

#### install
```
npm install --save material-ui-form
```

#### demo
1. `$ git clone https://github.com/unitedhubs/material-ui-form.git`
2. `$ cd material-ui-form`
3. `$ npm install && npm start`

## Props

#### Form props (optional):

Prop                          | Description               | Default
------------------------------| --------------------------|------------
***autoComplete*** _[string]_ | sets form _autoComplete_ prop | "off"
***disableSubmitButtonOnError*** _[bool]_ | disables submit button if any errors exist | true 
***onSubmit*** _[func]_       | returns _@values_ and _@pristineValues_ on form submission|
***onValuesChange*** _[func]_ | returns _@values_ and _@pristineValues_ on field value change|
***validation*** _[object]_   | object specifing validation config options (listed below) |
***validation.messageMap*** _[object]_ | a key-value list where the key is the validator name and the value is the error message. Is exposed as a _material-ui-form_ parameter |
***validation.messageKeyPrefix*** _[string]_ | optional prefix to apply to all messageMap keys. If specified, field validator names will automatically be appended the prefix | ""
***validation.requiredValidatorName*** _[bool, string]_ | specifies the required validator name and matching messegeMap key for required fields. To disable and rely on the native _required_ field prop, set to `false` | "isRequired"
***validation.validate*** _[func]_ | overrides the internal validate method. Receives the following parameters: _@fieldValue_, _@fieldValidators_, and _@...rest_ (where _@...rest_ is the **validation** prop object) | 
***validation.validators*** _[object]_ | Defaults to the extended validator.js object. Is exposed as a _material-ui-form_ parameter |  

#### Field props:

Prop                          | Description               | Required
------------------------------| --------------------------|------------
***value*** _[any]_ | The value of the field. If empty set an empty string | Yes
***name*** _[string]_ | The name of the field | Yes
***data-validators*** _[string, array[object]]_ | Validators to apply to the field. Multiple validator names can be specified with a comma-delimited string |  

## Examples

#### Nested fields:
```jsx
import Form from 'material-ui-form'


class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form onSubmit={this.submit}>
        <TextField
          label="Name"
          type="text"
          name="name"
          value=""
          data-validators="isRequired,isAlpha"
        />

        <fieldset>
          <legend>Nested</legend>
          <Checkbox checked name="love" value="yes" />
          <span>I love it</span>

          <FormControl required>
            <InputLabel>Age</InputLabel>
            <Select value="" name="age">
              <MenuItem value=""><em>Please select your age ...</em></MenuItem>
              <MenuItem value={10}>Teens</MenuItem>
              <MenuItem value={20}>Twenties</MenuItem>
              <MenuItem value={30}>Thirties</MenuItem>
              <MenuItem value="40+">Fourties +</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>

        </fieldset>
        <Button variant="raised" type="reset">Reset</Button>
        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Custom validation messages:
```jsx
import Form, { messageMap } from '../../src/index'
 

const customMessageMap = Object.assign(messageMap, {
  myCustomPrefix_isInt: 'Invalid integer',
  myCustomPrefix_isEmail: 'メールアドレスが無効です',
  myCustomPrefix_isIn: '「{0}」のいずれかを記入してください',
  myCustomPrefix_isWhitelisted: '文字は「{0}」から選択してください',
  myCustomPrefix_isLength: '文字数は{0}以上{1}以下であることは条件',
})

class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        validation={{
          messageMap: customMessageMap,
          messageKeyPrefix: 'myCustomPrefix_',
        }}
      >
        <TextField
          label="Email"
          type="text"
          name="email"
          value="invalid@email."
          data-validators="isEmail"
          fullWidth
        />

        <TextField
          label="Inclusion"
          type="number"
          name="number"
          value="3"
          data-validators={[{ isIn: [1, 2, 4] }]}
          fullWidth
        />

        <TextField
          label="Whitelisted characters"
          type="text"
          name="whitelisted"
          value="abc1234"
          data-validators={[{ isWhitelisted: 'abc123' }]}
          fullWidth
        />

        <TextField
          label="Lenght test"
          type="text"
          name="length"
          value="123"
          data-validators={[{ isLength: { min: 4, max: 5 } }]}
          fullWidth
        />

        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Custom validators:
```jsx
import Form, { messageMap, validators } from '../../src/index'
 

validators.isBorat = value => value === 'borat'
const customMessageMap = Object.assign(messageMap, {
  isBorat: 'NAAAAAT! You can only write "borat" lol',
})

class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        validation={{
          messageMap: customMessageMap,
          validators,
        }}
      >
        <TextField
          label="Write anything..."
          type="text"
          name="trickster"
          value=""
          helperText="this is not a trick"
          data-validators="isBorat"
        />

        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Custom validation logic:
```jsx
import Form from 'material-ui-form'
 

function validate(value, fieldValidators, options) {
  const fieldValidations = []
  fieldValidators.forEach((validator) => {
    const validation = {
      code: String(validator),
      message: 'its invalid so maybe try harder...',
    }
    if (_.has(options, 'genericMessage')) {
      validation.message = options.genericMessage
    }
    fieldValidations.push(validation)
  })
  return fieldValidations
}

const validationOptions = {
  genericMessage: 'yeah... *tisk*',
}

class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        validation={{
          requiredValidatorName: false,
          validate,
          ...validationOptions,
        }}
      >
        <TextField
          label="Whatever you write isn't gonna be good enough"
          type="text"
          name="test"
          value=""
          data-validators="whatever - our custom validator will ignore this"
          required
        />

        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Server validations:
```jsx
import Form from 'material-ui-form'
 

const mockServerValidations = {
  name: [{ code: 'isInvalid', message: 'such invalid...' }],
}

class MyForm extends React.Component {
  state = {
    mockServerValidations,
  }

  componentDidMount() {
    let validations = {
      name: [{ message: 'such WOOOOOOOOOW...' }],
    }

    setTimeout(() => {
      this.setState({ mockServerValidations: validations })
    }, 1500)

    setTimeout(() => {
      validations = {
        name: [{ message: 'so still haven\'t watched Italian Spiderman?' }],
      }
      this.setState({ mockServerValidations: validations })
    }, 3000)
  }

  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        validations={this.state.mockServerValidations}
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value="doge"
        />

        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Form autoComplete and "on error" submission:
```jsx
import Form from 'material-ui-form'
 

class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form
        autoComplete="on"
        disableSubmitButtonOnError={false}
        onSubmit={this.submit}
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value="doge"
          data-validators="isInt"
        />

        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Getting form values on field change:
```jsx
import Form from 'material-ui-form'
 

class MyForm extends React.Component {
  handleValuesChange = (values, pristineValues) => {
    // on field change you get the form values and pristineValues
  }

  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        onValuesChange={this.handleValuesChange}
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value="doge"
        />

        <Button variant="raised" type="submit">Submit</Button>
      </Form>
    )
  }
}
```

#### Multi-page form:
```jsx
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import Form from 'material-ui-form'
 

function getSteps() {
  return [
    'Step 1',
    'Step 2',
  ]
}

class MyForm extends React.Component {
  state = {
    activeStep: 0,
  }

  clickNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    })
  }

  clickBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  }

  submit = (values, pristineValues) => {
    // on form submission you get the values and pristineValues
  }

  render() {
    const steps = getSteps()

    return (
      <div>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Form onSubmit={this.submit}>
          {this.state.activeStep === 0 &&
            <React.Fragment>
              <TextField
                label="Name"
                type="text"
                name="name"
                value=""
              />
              <Button variant="raised" onClick={this.clickNext}>Next</Button>
            </React.Fragment>
          }

          {this.state.activeStep === 1 &&
            <React.Fragment>
              <TextField
                label="Address"
                type="text"
                name="address"
                value=""
              />
              <Button variant="raised" onClick={this.clickBack}>Back</Button>
              <Button variant="raised" type="submit">Submit</Button>
            </React.Fragment>
          }
        </Form>
      </div>
    )
  }
}
```

## Contributing

This is a new project and contributions are welcome so feel free to [open an issue](https://github.com/unitedhubs/material-ui-form/issues) or fork and create a pull request. Collaborators are also welcome - please send an email to info@unitedhubs.com.

## License

This project is licensed under the terms of the [MIT license](https://github.com/unitedhubs/material-ui-form/blob/dev/LICENSE).