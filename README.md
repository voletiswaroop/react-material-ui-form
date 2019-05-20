### react-material-ui-form

[![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/react-material-ui-form.svg)](https://www.npmjs.com/package/react-material-ui-form)
[![Build Status](https://travis-ci.com/voletiswaroop/react-material-ui-form.svg)](https://travis-ci.com/voletiswaroop/react-material-ui-form)
[![Codecov](https://img.shields.io/codecov/c/github/voletiswaroop/react-material-ui-form.svg)](https://codecov.io/gh/voletiswaroop/react-material-ui-form/)

1. [About](#about)
2. [Setup](#setup)
3. [Props](#props)
    - [Form props](#form-props-optional)
    - [Field props](#field-props)
    - [Other props](#other-props)
4. [Examples](#examples)
    - [Nested fields](#nested-fields)
    - [Custom validation messages](#custom-validation-messages)
    - [Custom validators](#custom-validators)
    - [Custom validation logic](#custom-validation-logic)
    - [Server validations](#server-validations)
    - [Misc form settings](#form-autocomplete-and-on-error-submission)
    - [Getting values on field update](#getting-form-values-on-field-update)
    - [Stepper](#stepper)
    - [Dynamic array fields](#dynamic-array-fields-notice-the-deletefieldrow-prop-on-the-remove-row-button)
    - [Custom component handler](#custom-components-with-custom-handlers)
5. [Contributing](#contributing)
6. [License](#license)

## About

_react-material-ui-form_ is a React wrapper for [Material-UI](https://material-ui.com/getting-started/usage/) form components. Simply replace the `<form>` element with `<MaterialUIForm>` to get out-of-the-box state and validation support ***as-is***. There's no need to use any other components, alter your form's nesting structure, or write onChange handlers.

Validation is done with [validator.js](https://github.com/chriso/validator.js) but you can extend/customize validation messages, validators, and use your own validation logic too. Steppers, dynamic array fields and custom components are also supported.

#### use and requirements

- requires React 16.3.0 or newer
- supports official and unofficial Material-UI fields (other input elements are rendered without state/validation support)
- every input field must have `value` and `name` props
- every input field should NOT have `onChange` and `onBlur` props (unless you need custom field-specific logic)
- add a `data-validators` prop to any input field (or FormControl / FormControlLabel) to specify validation rules

#### extra validators

_react-material-ui-form_ extends [_validator.js_ validators](https://github.com/chriso/validator.js#validators) with the following validators:

- isAlias `/^[a-zA-Z0-9-_\.]*$/i`
- isDate
- isNumber `/^([,.\d]+)$/`
- isRequired `value.length !== 0`
- isSerial `/^([-\s\da-zA-Z]+)$/`
- isSize `value >= min && value <= max`
- isTime
- [isLength(min,max)](#custom-validation-messages) `[{ isLength: { min: 2, max: 50 } }]`

#### _Supported field components_

- TextField
- TextField { select }
- TextField { multiline, textarea }
- Checkbox 
- RadioGroup
- Radio
- FormControlLabel (control prop)
- FormLabel
- InputLabel

## Setup

#### install
```
npm install --save react-material-ui-form
```

#### demo
1. `$ git clone https://github.com/voletiswaroop/react-material-ui-form.git`
2. `$ cd react-material-ui-form`
3. `$ npm install && npm run dev`

## Props

#### Form props (optional):

Prop                          | Description               | Default
------------------------------| --------------------------|------------
[***class***] _[string]_ | Sets `className` attribute to the form |
[***id***] _[string]_ | Sets `id` attribute to the form |
[***name***] _[string]_ | Sets `name` attribute to the form |
[***action***] _[string]_ | Sets `action` attribute to the form |
[***activeStep***](#stepper) _[number]_ | Use together with `onFieldValidation` for better Stepper support | 
[***autoComplete***](#form-autocomplete-and-on-error-submission) _[string]_ | Sets form _autoComplete_ prop. Accepts one of ["on", "off"] | "off"
[***disableSubmitButtonOnError***](#form-autocomplete-and-on-error-submission) _[boolean]_ | Disables submit button if any errors exist | true 
[***onFieldValidation***](#stepper) _[func]_ | Returns _@field_ and _@errorSteps_ (if `activeStep` prop is provided) on field validation |
[***onSubmit***](#nested-fields) _[func]_ | Returns _@values_ and _@pristineValues_ on form submission |
[***onValuesChange***](#getting-form-values-on-field-update) _[func]_ | Returns _@values_ and _@pristineValues_ on field value change |
***validation*** _[object]_   | Object specifing validation config options (prefixed below with ↳) |
↳ [***messageMap***](#custom-validation-messages) _[object]_ | A key-value list where the key is the validator name and the value is the error message. Is exposed as a _react-material-ui-form_ export parameter | _object_
↳ [***messageKeyPrefix***](#custom-validation-messages) _[string]_ | Optional prefix to apply to all messageMap keys. If specified, field validator names will automatically be appended the prefix | ""
↳ [***requiredValidatorName***](#custom-validation-logic) _[boolean, string]_ | Specifies the validator name and matching messegeMap key for required fields. To disable and rely on the native _required_ field prop, set to `false` | "isRequired"
↳ [***validate***](#custom-validation-logic) _[func]_ | Overrides the internal validate method. Receives the following parameters: _@fieldValue_, _@fieldValidators_, and _@...rest_ (where _@...rest_ is the **validation** prop object) | _func_
↳ [***validators***](#custom-validators) _[object]_ | Defaults to an extended validator.js object. Is exposed as a _react-material-ui-form_ export parameter | _object_
↳ ***validateInputOnBlur*** _[boolean]_ | Makes text input validations happen on blur instead of on change | false
[***validations***](#server-validations) _[object]_ | Validations to pass to the form (i.e. from the server). Should be an object with keys representing field _name_ props and values as arrays of field error messages. The first error message will be displayed per field | 

#### Field props:

Prop                          | Description               | Required
------------------------------| --------------------------|------------
***value*** _[any]_ | The value of the field. If empty set an empty string | Yes
***name*** _[string]_ | The name of the field | Yes
***data-validators*** _[string, array[object]]_ | Validators to apply to the field. Multiple validator names can be specified with a comma-delimited string |  
***onBlur*** _[func]_ | A custom handler that will be called after the field's `onBlur` event. Provides _@value/checked_, _@field_ and _@event_ parameters | 
***onChange*** _[func]_ | A custom handler that will be called after the field's `onChange` event. Provides _@value/checked_, _@field_ and _@event_ parameters |  

#### Other props:

Prop                     | Value             | Description       
-------------------------| ------------------|------------------------
[***deletefieldrow***](#dynamic-array-fields-notice-the-deletefieldrow-prop-on-the-remove-row-button) _[string]_ | Field **name** prop up to and including the row index (i.e. _rooms[2]_) | Add to button components that use _onClick_ to remove any array field rows

## Material-UI form production build classnames conflict issues
To avoid default material-ui production build classnames conflict issues include your entire form inside <JssProvider> 
Example: [Nested fields](#nested-fields)

## Examples

#### Nested fields:
```jsx
import MaterialUIForm from 'react-material-ui-form'
import JssProvider from 'react-jss/lib/JssProvider';

class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // get all values and pristineValues on form submission
  }

  customInputHandler = (value, { name }, event) => {
    // the form will update the field as usual, and then call this handler
    // if you want to have complete control of the field, change the "value" prop to "defaultValue"
  }

  customToggleHandler = (checked, { name, value }, event) => {
    // the form will update the field as usual, and then call this handler
    // if you want to have complete control of the field, change the "value" prop to "defaultValue"
  }

  render() {
    return (
      <JssProvider>
        <MaterialUIForm onSubmit={this.submit}>
          <TextField label="Name" type="text" name="name" value="" data-validators="isRequired,isAlpha" onChange={this.customInputHandler} />
        
          <fieldset>
            <legend>Nested</legend>
            <Checkbox checked name="love" value="yes" onChange={this.customToggleHandler} />
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
          
          <FormControl>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="Gender" name="gender"  value="male">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" /> 
            </RadioGroup>
          </FormControl>
          
          <Button variant="raised" type="reset">Reset</Button>
          <Button variant="raised" type="submit">Submit</Button>
        </MaterialUIForm>
      </JssProvider>
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
    // get all values and pristineValues on form submission
  }

  render() {
    return (
      <MaterialUIForm onSubmit={this.submit} validation={{ messageMap: customMessageMap, validators, }}>
        <TextField label="Write anything..." type="text" name="trickster" value="" helperText="this is not a trick" data-validators="isBorat" />

        <Button variant="raised" type="submit">Submit</Button>
      </MaterialUIForm>
    )
  }
}

```

#### Custom validation messages:
```jsx
const customFormMsg = Object.assign(messageMap, { 
  isEmail: 'Please enter a valid email address',  
  isLength:'Must be 2-50 characters', 
})
class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // get all values and pristineValues on form submission
  }
render() {
  return (
    <MaterialUIForm onSubmit={this.submit} validation={{ messageMap: customFormMsg}}>
      <TextField label="Name" type="text" name="FirstName" value="Name" data-validators="isLength" />
      <TextField label="Email" type="text" name="Email" value="abc@xyz.com" data-validators="isRequired,isEmail" />
      <Button variant="raised" type="submit">Submit</Button>
    </MaterialUIForm>
    )
  }
}

```

#### Custom validation logic:
```jsx
import MaterialUIForm from 'react-material-ui-form'
 

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
    // get all values and pristineValues on form submission
  }

  render() {
    return (
      <MaterialUIForm onSubmit={this.submit} validation={{ requiredValidatorName: false, validate, ...validationOptions, }}>
        <TextField label="Whatever you write isn't gonna be good enough" type="text" name="test" value="" data-validators="whatever - our custom validator will ignore this" required />

        <Button variant="raised" type="submit">Submit</Button>
      </MaterialUIForm>
    )
  }
}
```

#### Server validations:
```jsx
import MaterialUIForm from 'react-material-ui-form'
 

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
    // get all values and pristineValues on form submission
  }

  render() {
    return (
      <MaterialUIForm onSubmit={this.submit} validations={this.state.mockServerValidations}>
        <TextField label="Name" type="text" name="name" value="doge" />

        <Button variant="raised" type="submit">Submit</Button>
      </MaterialUIForm>
    )
  }
}
```

#### Form autoComplete and "on error" submission:
```jsx
import MaterialUIForm from 'react-material-ui-form'
 

class MyForm extends React.Component {
  submit = (values, pristineValues) => {
    // get all values and pristineValues on form submission
  }

  render() {
    return (
      <MaterialUIForm autoComplete="on" disableSubmitButtonOnError={false} onSubmit={this.submit}>
        <TextField label="Name" type="text" name="name" value="doge" data-validators="isInt" />

        <Button variant="raised" type="submit">Submit</Button>
      </MaterialUIForm>
    )
  }
}
```

#### Getting form values on field update:
```jsx
import MaterialUIForm from 'react-material-ui-form'
 

class MyForm extends React.Component {
  handleValuesChange = (values, pristineValues) => {
    // get all values and pristineValues when any field updates
  }

  handleFieldValidations = (field) => {
    // get field object when its validation status updates
  }

  submit = (values, pristineValues) => {
    // get all values and pristineValues on form submission
  }

  render() {
    return (
      <MaterialUIForm onSubmit={this.submit} onValuesChange={this.handleValuesChange} onFieldValidation={this.handleFieldValidations}>
        <TextField label="Name" name="name" value="doge" required />

        <Button variant="raised" type="submit">Submit</Button>
      </MaterialUIForm>
    )
  }
}
```

#### Stepper:
```jsx
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import MaterialUIForm from 'react-material-ui-form'
 

function getSteps() {
  return [
    'Step 1',
    'Step 2',
  ]
}

class MyForm extends React.Component {
  state = {
    activeStep: 0,
    errorSteps: [],
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
    // get all values and pristineValues on form submission
  }

  updateErrorSteps = (field, errorSteps) => {
    this.setState({ errorSteps })
  }

  render() {
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, i) => (
            <Step key={label}>
              <StepLabel error={errorSteps.includes(i)}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <MaterialUIForm activeStep={activeStep} onFieldValidation={this.updateErrorSteps} onSubmit={this.submit}>
          {activeStep === 0 &&
            <React.Fragment>
              <TextField label="Name" name="name" value="" required />
              <Button variant="raised" onClick={this.clickNext}>Next</Button>
            </React.Fragment>
          }

          {activeStep === 1 &&
            <React.Fragment>
              <TextField label="Address" name="address" value="" required />
              <Button variant="raised" onClick={this.clickBack}>Back</Button>
              <Button variant="raised" type="submit">Submit</Button>
            </React.Fragment>
          }
        </MaterialUIForm>
      </div>
    )
  }
}
```

#### Dynamic array fields (notice the `deletefieldrow` prop on the "Remove Row" button):
```jsx
import MaterialUIForm from 'react-material-ui-form'
import formData from 'form-data-to-object'
 

class MyForm extends React.Component {
  state = {
    rows: [{ _id: _.uniqueId() }],
    onSubmitValues: null,
  }

  addRow = () => {
    const { rows } = this.state
    rows.push({ _id: _.uniqueId() })
    this.setState({ rows })
  }

  removeRow = (index) => {
    const { rows } = this.state
    if (rows.length > 1) {
      rows.splice(index, 1)
      this.setState({ rows })
    }
  }

  submit = (values, pristineValues) => {
    // you can parse values to turn:
    // rows[0][label]: "label"
    // into:
    // rows: [{ label: "label" }]
    const parsedValues = formData.toObj(values)
  }

  render() {
    const steps = getSteps()

    return (
      <MaterialUIForm onSubmit={this.submit}>
        {this.state.rows.map((row, i) => (
          <Fragment key={row._id}>
            <TextField label="Label" name={`rows[${i}][label]`} value="" required />
            <TextField label="Value" name={`rows[${i}][value]`} value="" />
            { this.state.rows.length > 1 &&
              <Button onClick={()=> this.removeRow(i)} deletefieldrow={`rows[${i}]`}>Remove Row</Button>
            }
          </Fragment>
        ))}
        
        <Button variant="raised" onClick={this.addRow}>Add row</Button>
        <Button variant="raised" color="primary" type="submit">Submit</Button>
      </MaterialUIForm>
    )
  }
}
```

#### Custom components with custom handlers:
```jsx
import MaterialUIForm from 'react-material-ui-form'
 

class MyForm extends React.Component {
  uploadFile = (event) => {
    console.log(event.target.files)
  }

  render() {
    return (
      <div>
        <MaterialUIForm>
          {'Upload file: '}
          <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" multiple type="file" onChange={this.uploadFile} />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">Upload</Button>
          </label>
        </MaterialUIForm>
      </div>
    )
  }
}
```

## Contributing

This is a new project and contributions are welcome so feel free to [open an issue](https://github.com/voletiswaroop/react-material-ui-form/issues) or fork and create a pull request. Collaborators are also welcome - please send an email to swaroop.voleti@gmail.com.

## Special Thanks to unitedhubs 

This project is an extended version of https://github.com/unitedhubs/material-ui-form/

## License

This project is licensed under the terms of the [MIT license](https://github.com/voletiswaroop/react-material-ui-form/blob/dev/LICENSE).
