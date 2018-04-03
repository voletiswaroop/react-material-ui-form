import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import { withStyles } from 'material-ui/styles'

import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Divider from 'material-ui/Divider'

import Form from '../../src/index'
import styles from '../styles'


const dividerStyle = { margin: '20px 0' }

const formControlStyle = {
  padding: '20px',
  margin: '20px 0 0',
  display: 'inherit',
  border: '1px solid gray',
}

function getSteps() {
  return [
    'Step 1',
    'Step 2',
  ]
}

@withStyles(styles)
export default class Steppers extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    activeStep: 0,
    amounts: [true], // hack
    onSubmitValues: null,
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
    // eslint-disable-next-line no-console
    console.log('submit values:', values, 'pristine values:', pristineValues)
    this.setState({ onSubmitValues: values })
  }

  render() {
    const steps = getSteps()
    const { classes } = this.props

    return (
      <Grid
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid item xs className={classes.gridItem}>
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
                <Divider style={dividerStyle} />
                <Button variant="raised" onClick={this.clickNext}>Next</Button>
              </Fragment>
            }

            {this.state.activeStep === 1 &&
              <Fragment>
                {this.state.amounts.map((amount, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={amount + i}>
                    <TextField
                      select
                      label="Amount"
                      helperText="Amount should be an integer"
                      name={`amounts[${i}]`}
                      value=""
                      data-validators="isInt"
                      required
                      margin="normal"
                      fullWidth
                    >
                      <MenuItem value="0">Zero</MenuItem>
                      <MenuItem value={10.5}>Ten and a half</MenuItem>
                      <MenuItem value="20">Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                    <Divider style={dividerStyle} />
                  </Fragment>
                ))}
                <Button variant="raised" onClick={this.addAmount}>Add amount</Button>
                <Button variant="raised" onClick={this.clickBack}>Back</Button>
                <Button variant="raised" type="submit">Submit</Button>
              </Fragment>
            }
          </Form>
        </Grid>
        <Grid item xs className={classes.gridItem}>
          <pre>
            {this.state.onSubmitValues &&
              JSON.stringify(this.state.onSubmitValues, null, 2)
            }
          </pre>
        </Grid>
      </Grid>
    )
  }
}
