import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import store from '~/store'
import Root from './Root'

import 'normalize.css/normalize.css'
import styles from './index.css'

const s = store()
const app = (
  <div className={styles.className}>
    <Root store={s} />
  </div>
)

render(app, document.getElementById('app'))
