import React from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Header from '~/components/Header'
import FormList from '~/pages/FormList'
import Form from '~/pages/Form'

import styles from './index.css'

const Root = ({ id, className, store }) => {
  const classes = cx(styles.className, 'ob--root', className)

  return (
    <Provider store={store}>
      <Router>
        <div id={id} className={classes}>
          <Header />
          <Container className={styles.content}>
            <Route exact path="/typeform" component={FormList} />
            <Route exact path="/typeform/:uid" component={Form} />
          </Container>
        </div>
      </Router>
    </Provider>
  )
}

export default Root
