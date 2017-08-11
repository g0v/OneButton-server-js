import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter, Link, Route } from 'react-router-dom'
import * as actions from '~/actions'
import * as func from '~/types/func'

import styles from './index.css'

class FormList extends PureComponent {
  render() {
    const { id, className } = this.props
    const classes = cx(styles.className, 'one-button--form-list', className)

    return (
      <div id={id} className={classes}>
        <div>form</div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({}),
  dispatch => ({ actions: func.map(dispatch, actions) })
)(FormList))
