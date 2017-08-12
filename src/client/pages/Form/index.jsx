import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '~/actions'
import * as func from '~/types/func'
import LongText from '~/components/Typeform/LongText'
import { map } from 'ramda'

import styles from './index.css'

const renderField = (field) => {
  switch (field.type) {
    case 'long_text':
      return <LongText />
    default:
      return <div>unknown field</div>
  }
}

class Form extends PureComponent {
  render() {
    const { id, className, form } = this.props
    const classes = cx(styles.className, 'one-button--form', className)

    return (
      <div id={id} className={classes}>
        <h1>{ form.title }</h1>
        <ul>{ map(renderField, form.fields) }</ul>
      </div>
    )
  }
}

export default withRouter(connect(
  (state, { match }) => {
    const { results } = state.typeform
    const form = results[match.params.uid]
    return { form }
  },
  dispatch => ({ actions: func.map(dispatch, actions) })
)(Form))
