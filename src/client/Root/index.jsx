import React from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FormList from '~/pages/FormList'

import styles from './index.css'

const Root = ({ id, className, store }) => {
  const classes = cx(styles.className, 'one-button--root', className)

  return (
    <Provider store={store}>
      <Router>
        <div id={id} className={classes}>
          <ul>
            <li><Link to="/typeform">typeform</Link></li>
          </ul>
          <div>
            <Route path="/typeform" component={FormList} />
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default Root
