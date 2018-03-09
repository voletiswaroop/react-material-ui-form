import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import Form from '../src/index'


export default class Root extends Component {
  submit = (values, pristineValues) => {
    console.log('values:', values, 'pristineValues:', pristineValues)
  }

  render() {
    return (
      <div style={{ width: '400px' }}>
        <Form onSubmit={this.submit}>
          <div>
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
          </div>
          <TextField
            select
            label="Amount"
            helperText="Amount should be an integer"
            name="amount"
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
          <Button variant="raised" type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.querySelector('#root'))
