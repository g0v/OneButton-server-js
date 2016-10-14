import React from 'react'
import { render } from 'react-dom'
import styles from './index.css'

const app = (
  <div className={styles.className}>
    hello, world
  </div>
)

render(app, document.getElementById('app'))
