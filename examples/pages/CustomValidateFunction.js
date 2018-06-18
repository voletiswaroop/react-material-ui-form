import React from 'react'

import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import Form from '../../src/index'
import styles from '../styles'


const dividerStyle = { margin: '20px 0' }

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

@withStyles(styles)
export default class CustomValidateFunction extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    onSubmitValues: null,
  }

  submit = (values, pristineValues) => {
    // eslint-disable-next-line no-console
    console.log('submit values:', values, 'pristine values:', pristineValues)
    this.setState({ onSubmitValues: values })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid item xs className={classes.gridItem}>
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
              fullWidth
            />
            <Divider style={dividerStyle} />

            <Button variant="raised" type="submit">Submit</Button>
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
