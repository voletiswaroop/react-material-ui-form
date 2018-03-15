import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable import/no-extraneous-dependencies */
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
/* eslint-enable import/no-extraneous-dependencies */

import Form, { messageMap } from '../../src/index'
import styles from '../styles'


const dividerStyle = { margin: '20px 0' }

const customMessageMap = Object.assign(messageMap, {
  myCustomPrefix_isInt: 'Invalid integer',
  myCustomPrefix_isEmail: 'メールアドレスが無効です',
  myCustomPrefix_isIn: '「{0}」のいずれかを記入してください',
  myCustomPrefix_isWhitelisted: '文字は「{0}」から選択してください',
  myCustomPrefix_isLength: '文字数は{0}以上{1}以下であることは条件',
})

@withStyles(styles)
export default class CustomValidationMessages extends React.Component {
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
              messageKeyPrefix: 'myCustomPrefix_',
            }}
          >
            <TextField
              label="Integer"
              type="text"
              name="integer"
              value="this field's validation message is like the default one"
              data-validators="isInt"
              fullWidth
            />
            <Divider style={dividerStyle} />

            <TextField
              label="Email"
              type="text"
              name="email"
              value="but@thisonesisnt."
              data-validators="isEmail"
              fullWidth
            />
            <Divider style={dividerStyle} />

            <TextField
              label="Inclusion"
              type="number"
              name="number"
              value="3"
              data-validators={[{ isIn: [1, 2, 4] }]}
              fullWidth
            />
            <Divider style={dividerStyle} />

            <TextField
              label="Whitelisted characters"
              type="text"
              name="whitelisted"
              value="abc1234"
              data-validators={[{ isWhitelisted: 'abc123' }]}
              fullWidth
            />
            <Divider style={dividerStyle} />

            <TextField
              label="Lenght test"
              type="text"
              name="length"
              value="abc"
              data-validators={[{ isLength: { min: 4, max: 5 } }]}
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
