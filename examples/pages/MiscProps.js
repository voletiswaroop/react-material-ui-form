import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable import/no-extraneous-dependencies */
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
/* eslint-enable import/no-extraneous-dependencies */


import Form from '../../src/index'
import styles from '../styles'


const dividerStyle = { margin: '20px 0' }

const mockServerValidations = {
  name: [{ code: 'isInvalid', message: 'such invalid...' }],
}

@withStyles(styles)
export default class MiscProps extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    onSubmitValues: null,
    mockServerValidations,
  }

  componentDidMount() {
    setTimeout(() => {
      const newMockServerValidations = {
        name: [{ message: 'such WOOOOOOOOOW...' }],
      }
      this.setState({ mockServerValidations: newMockServerValidations })
    }, 1500)
  }

  handleValuesChange = (values, pristineValues) => {
    // eslint-disable-next-line no-console
    console.log('new values:', values, 'pristine values:', pristineValues)
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
            autoComplete="on"
            disableSubmitButtonOnError={false}
            onSubmit={this.submit}
            onValuesChange={this.handleValuesChange}
            validations={this.state.mockServerValidations}
          >
            <TextField
              label="Name"
              type="text"
              name="name"
              value="doge"
              fullWidth
            />

            <Divider style={dividerStyle} />

            <Button variant="raised" type="reset">Reset</Button>
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
