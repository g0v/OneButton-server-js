import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '~/actions'
import * as func from '~/types/func'

import styles from './index.css'

class Form extends PureComponent {
  render() {
    const { id, className, form } = this.props
    const classes = cx(styles.className, 'one-button--form', className)

    return (
      <span>form</span>
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
