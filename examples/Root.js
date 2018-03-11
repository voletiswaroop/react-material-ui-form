import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

/* eslint-disable import/no-extraneous-dependencies */
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
/* eslint-enable import/no-extraneous-dependencies */

import Form from '../src/index'
// import Form from '../dist/main'


function getSteps() {
  return [
    'Step 1',
    'Step 2',
  ]
}

export default class Root extends Component {
  state = {
    activeStep: 0,
    amounts: [true], // hack
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

  addAmount = () => {
    const amounts = _.clone(this.state.amounts)
    amounts.push(true)
    this.setState({ amounts })
  }

  submit = (values, pristineValues) => {
    console.log('submit values:', values, 'pristine values:', pristineValues)
  }

  render() {
    console.log('Form:', this.props, this.state)

    const steps = getSteps()

    return (
      <div style={{ width: '400px' }}>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Form onSubmit={this.submit}>
          {this.state.activeStep === 0 &&
            <Fragment>
              <TextField
                label="Name"
                type="text"
                name="name"
                value=""
                required
                fullWidth
              />
              <TextField
                label="Email"
                type="text"
                name="email"
                value="alias@example."
                data-validators="isEmail"
                fullWidth
              />
              <Button variant="raised" onClick={this.requestClose}>Cancel</Button>
              <Button variant="raised" onClick={this.clickNext}>Next</Button>
            </Fragment>
          }

          {this.state.activeStep === 1 &&
            <Fragment>
              {this.state.amounts.map((amount, i) => (
                <TextField
                  key={amount}
                  select
                  label="Amount"
                  helperText="Amount should be an integer"
                  name={`amounts[${i}]`}
                  value=""
                  data-validators="isInt"
                  margin="normal"
                  fullWidth
                >
                  <MenuItem value="0">Zero</MenuItem>
                  <MenuItem value={10.5}>Ten and a half</MenuItem>
                  <MenuItem value="20">Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              ))}
              <Button variant="raised" onClick={this.addAmount}>Add amount</Button>
              <Button variant="raised" onClick={this.clickBack}>Back</Button>
              <Button variant="raised" type="submit">Create</Button>
            </Fragment>
          }
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.querySelector('#root'))
