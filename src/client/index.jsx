import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import store from '~/store'
import * as A from '~/actions'
import * as func from '~/types/func'
import Root from './Root'
import { map } from 'ramda'

import 'normalize.css/normalize.css'
import styles from './index.css'

const s = store()
const actions = func.map(s.dispatch, A)

const fetchData = async () => {
  const ids = await actions.typeform.formList()
  map(async (uid) => {
    await actions.typeform.form(uid)
    const ids = await actions.typeform.resultList(uid)
    map(async (token) => {
      actions.typeform.result(uid, token)
    }, ids)
  }, ids)
}

const app = (
  <div className={styles.className}>
    <Root store={s} />
  </div>
)

render(app, document.getElementById('app'))
fetchData()
