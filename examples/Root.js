import React from 'react'
import ReactDOM from 'react-dom'

/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Link, Route } from 'react-router-dom'

import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
/* eslint-enable import/no-extraneous-dependencies */

import './styles.less'
import './markdown.css'
import NestedFields from './pages/NestedFields'
import CustomValidationMessages from './pages/CustomValidationMessages'
import CustomValidators from './pages/CustomValidators'
import CustomValidateFunction from './pages/CustomValidateFunction'
import Steppers from './pages/Steppers'
import DynamicArrayFields from './pages/DynamicArrayFields'
import MiscProps from './pages/MiscProps'
import ReadmeHTML from '../README.md'


const wrapperStyle = {
  backgroundColor: 'white',
  height: 'inherit',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const Readme = () => (
  <div
    className="markdown github"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: ReadmeHTML }}
  />
)

const Root = () => (
  <div style={wrapperStyle}>
    <CssBaseline />
    <BrowserRouter>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Button>
              <Link to="/">Nested Fields</Link>
            </Button>
            <Button>
              <Link to="/custom-validation-messages">
                Custom Validation Messages
              </Link>
            </Button>
            <Button>
              <Link to="/custom-validators">Custom Validators</Link>
            </Button>
            <Button>
              <Link to="/custom-validate-function">
                Custom Validate Function
              </Link>
            </Button>
            <Button>
              <Link to="/steppers">Steppers</Link>
            </Button>
            <Button>
              <Link to="/dynamic-array-fields">Dynamic Array Fields</Link>
            </Button>
            <Button>
              <Link to="/misc-props">Misc Props</Link>
            </Button>
            <Button>
              <Link to="/readme">Readme</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={NestedFields} />
        <Route
          path="/custom-validation-messages"
          component={CustomValidationMessages}
        />
        <Route path="/custom-validators" component={CustomValidators} />
        <Route
          path="/custom-validate-function"
          component={CustomValidateFunction}
        />
        <Route path="/steppers" component={Steppers} />
        <Route path="/dynamic-array-fields" component={DynamicArrayFields} />
        <Route path="/misc-props" component={MiscProps} />
        <Route path="/readme" component={Readme} />
      </div>
    </BrowserRouter>
  </div>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
