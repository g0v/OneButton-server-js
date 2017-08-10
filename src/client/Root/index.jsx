import React from 'react'
import cx from 'classnames'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import styles from './index.css'

const Root = ({ id, className }) => {
  const classes = cx(styles.className, 'one-button--root', className)

  return (
    <Router>
      <ul>
        <li><Link to="/typeform">typeform</Link></li>
      </ul>
    </Router>
  )
}

export default Root
