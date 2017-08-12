import React from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainNav from '~/components/MainNav'
import FormList from '~/pages/FormList'
import Form from '~/pages/Form'

import styles from './index.css'

const Root = ({ id, className, store }) => {
  const classes = cx(styles.className, 'one-button--root', className)

  return (
    <Provider store={store}>
      <Router>
        <div id={id} className={classes}>
          <MainNav />
          <div>
            <Route path="/typeform" component={FormList} />
            <Route path="/typeform/:uid" component={Form} />
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default Root
