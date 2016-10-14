import React from 'react'
import { render } from 'react-dom'
import styles from './client.css'

const app = (
  <div className={styles.className}>
    HELP!
  </div>
)

render(app, document.getElementById('app'))
