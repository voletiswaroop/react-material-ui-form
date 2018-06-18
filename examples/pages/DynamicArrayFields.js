import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import Form from '../../src/index'
import styles from '../styles'


const inputStyle = {
  marginRight: '20px',
  width: '250px',
}

@withStyles(styles)
export default class DynamicArrayFields extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

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
          <Form onSubmit={this.submit}>
            {this.state.rows.map((row, i) => (
              <Fragment key={row._id}>
                <TextField
                  label="Label"
                  name={`rows[${i}][label]`}
                  value=""
                  style={inputStyle}
                  required
                />
                <TextField
                  label="Value"
                  name={`rows[${i}][value]`}
                  value=""
                  style={inputStyle}
                />
                { this.state.rows.length > 1 &&
                  <Button
                    onClick={() => this.removeRow(i)}
                    deletefieldrow={`rows[${i}]`}
                  >
                    Remove Row
                  </Button>
                }
              </Fragment>
            ))}
            <br /><br />
            <Button variant="raised" onClick={this.addRow}>Add row</Button>
            <Divider style={{ margin: '20px 0' }} />
            <Button variant="raised" color="primary" type="submit">Submit</Button>
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
