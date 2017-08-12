import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as actions from '~/actions'
import * as func from '~/types/func'
import * as F from '~/types/typeform/form'
import { map } from 'ramda'

import styles from './index.css'

class FormTitle extends PureComponent {
  render() {
    const { id, className, form = F.empty } = this.props
    const classes = cx('one-button--form-title', className)

    return (
      <span id={id} className={classes}>
        <Link to={`/typeform/${form.id}`}>{ form.title }</Link>
      </span>
    )
  }
}

class FormList extends PureComponent {
  componentWillMount() {
    const { actions } = this.props

    // fetch forms
    actions.typeform.list()
      .then(map(actions.typeform.resultList))
  }

  render() {
    const { id, className, typeform } = this.props
    const classes = cx(styles.className, 'one-button--form-list', className)

    return (
      <ul id={id} className={classes}>{
        map(
          uid => <li><FormTitle form={typeform.results[uid]} /></li>,
          typeform.list
        )
      }</ul>
    )
  }
}

export default withRouter(connect(
  state => {
    const { typeform } = state
    return { typeform }
  },
  dispatch => ({ actions: func.map(dispatch, actions) })
)(FormList))
