import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

import Form, { messageMap, validators } from '../../src/index'
import styles from '../styles'


const dividerStyle = { margin: '20px 0' }

validators.isBorat = value => value === 'borat'
const customMessageMap = Object.assign(messageMap, {
  isBorat: 'NAAAAAT! You can only write "borat" lol',
})

@withStyles(styles)
export default class CustomValidators extends React.Component {
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
