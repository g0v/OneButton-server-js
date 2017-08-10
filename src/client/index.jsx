import React from 'react'
import { render } from 'react-dom'
import Root from './Root'

import styles from './index.css'

const app = (
  <div className={styles.className}>
    <Root />
  </div>
)

render(app, document.getElementById('app'))
